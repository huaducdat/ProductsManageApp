import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Upload,
  message,
} from "antd";
import { useParams } from "react-router-dom";

import { PlusOutlined, DeleteOutlined, LinkOutlined } from "@ant-design/icons";

const ACCEPTED = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const MAX_MB = 5;
const fileToBase64 = (file) =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });

export default function EditModal({ open, product, onSave, onCancel }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");
  const [form] = Form.useForm();
  //set form when open
  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        title: product?.title ?? "",
      });
      setPreview(product?.image ?? "");
    } else {
      form.resetFields();
      setPreview("");
    }
  }, [open, product, form]);

  const beforeUpload = (file) => {
    if (!ACCEPTED.includes(file.type)) {
      message.error("only get PNG, JPG, WEBP, GIF.");
      return Upload.LIST_IGNORE;
    }
    if (file.size / 1024 / 1024 > MAX_MB) {
      message.error(`max-size ${MAX_MB}MB.`);
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const handleFileChange = async ({ file }) => {
    if (!file || !file.originFileObj) return;
    try {
      setUploading(true);
      const base64 = await fileToBase64(file.originFileObj);
      setPreview(base64);
      form.setFieldsValue({ image: base64 });
    } catch {
      message.error("can't read Image file.");
    } finally {
      setUploading(false);
    }
  };

  const handleUseUrl = async () => {
    const url = (await form.getFieldValue("image"))?.trim();
    if (!url)
      return message.info("Nhập URL ảnh vào ô bên dưới rồi bấm Áp dụng.");
    // Optional: kiểm tra URL đơn giản
    if (!/^https?:\/\/.+/i.test(url)) {
      return message.error("URL không hợp lệ. Hãy dùng dạng http(s)://");
    }
    setPreview(url);
    message.success("Đã áp dụng URL ảnh.");
  };

  return (
    <Modal
      open={open}
      title="Edit Product information"
      onCancel={onCancel}
      destroyOnClose
      maskClosable={false}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="image"
          label={`product's Image`}
          tooltip="Please choose the file or paste URL. "
          rules={[
            {
              validator: (_, v) => {
                if (!v) return Promise.resolve();
                if (typeof v === "string" && v.length > 0)
                  return Promise.resolve();
                return Promise.reject(new Error("Invalid Image"));
              },
            },
          ]}
        >
          <Space direction="vertical" style={{ width: "100%" }} size="small">
            {preview ? (
              <div className="w-full">
                <Image
                  src={preview}
                  alt="product"
                  width="100%"
                  style={{
                    maxHeight: 220,
                    objectFit: "contain",
                    borderRadius: 8,
                  }}
                  placeholder
                />
                <Space style={{ marginTop: 8 }}>
                  <Upload
                    accept={ACCEPTED.join(",")}
                    maxCount={1}
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    customRequest={({ file, onSuccess }) => {
                      // Chặn upload thực; convert base64 và set form
                      handleFileChange({ file: { originFileObj: file } });
                      setTimeout(() => onSuccess && onSuccess("ok"), 0);
                    }}
                  >
                    <Button icon={<PlusOutlined />} loading={uploading}>
                      Change Image
                    </Button>
                  </Upload>
                  <Button danger icon={<DeleteOutlined />}>
                    Delete
                  </Button>
                </Space>
              </div>
            ) : (
              <Upload
                accept={ACCEPTED.join(",")}
                maxCount={1}
                listType="picture-card"
                showUploadList={false}
                beforeUpload={beforeUpload}
                customRequest={({ file, onSuccess }) => {
                  handleFileChange({ file: { originFileObj: file } });
                  setTimeout(() => onSuccess && onSuccess("ok"), 0);
                }}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Chọn ảnh</div>
                </div>
              </Upload>
            )}

            <Input
              placeholder="Paste URL image (http/https) if don't upload image"
              prefix={<LinkOutlined />}
              onChange={(e) => form.setFieldsValue({ image: e.target.value })}
              value={form.getFieldValue("image")}
            />
            <Button onClick={handleUseUrl}>Acept URL</Button>
          </Space>
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter the Title" }]}
        >
          <Input placeholder="Title of Product" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
