import { Box, Paper, Typography } from "@mui/material";
import {
  Button,
  Card,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  message,
  Alert,
  Image,
} from "antd";
import { useState } from "react";
import { Link as MuiLink } from "@mui/material";
import "./login.css";
import { useSpring, animated } from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import bg from "./Imgs/self-storage-all.png";
import logo from "./Imgs/CompanyLogo1.png";

const AnimatedAntButton = animated(Button);

export default function Login() {
  const navigate = useNavigate();
  const [{ transform }, api] = useSpring(() => ({ transform: "scale(1)" }));
  const bounce = () => {
    api.start({
      to: async (next) => {
        await next({ transform: "scale(0.7)" });
        await next({ transform: "scale(1.2)" });
        await next({ transform: "scale(1)" });
      },
      config: { tension: 1800, friction: 26, clamp: true },
      reset: true,
    });
  };
  const [loading, setLoadindg] = useState(false);
  const [errMs, setErrMs] = useState("");
  const onFinish = async (values) => {
    setLoadindg(true);
    message.loading({ content: "Signing in...", key: "login" });

    await new Promise((r) => setTimeout(r, 1000));
    if (values.email === "admin@gmail.com" && values.password === "123456") {
      message.success({ content: "Welcome!", key: "login", duration: 2 });
      navigate("/DashBoard");
    } else {
      message.error({ content: "Invalid email or password", key: "login" });
      setErrMs("Email or Password incorrect. Please try another.");
    }
    setLoadindg(false);
  };
  return (
    <Box
      className="
        min-h-svh min-w-svw flex flex-col items-center justify-stretch
        bg-gradient-to-br from-indigo-500 via-sky-500 to-purple-600 
      "
      sx={{ minHeight: "100vh" }}
    >
      <div
        className=" [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] 
      [mask-repeat:no-repeat] 
      [mask-size:100%_100%] 
      [-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]
         flex flex-col h-[50vh] w-full overflow-hidden bg-gray-400 bg-blend-multiply justify-center items-center bg-cover bg bg-center relative"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="w-full h-full backdrop-blur-[3px] absolute z-0"></div>
        <Image
          src={logo}
          alt="logo"
          className="z-10 object-contain"
          style={{ height: "200px" }}
        />
        <Typography
          variant="overline"
          color="white"
          fontWeight={900}
          sx={{ fontSize: "2rem" }}
          className="z-10"
        >
          Welcom to DHMall Products Manage
        </Typography>
      </div>
      <Card
        title={
          <Typography variant="h5" fontWeight={700}>
            Login
          </Typography>
        }
        className="w-full max-w-md z-20"
        bordered={false}
        headStyle={{
          backgroundColor: "#2149ffff",
          color: "white",
        }}
        style={{
          marginTop: "-45px",
        }}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          {errMs && (
            <Alert
              message={errMs}
              type="error"
              showIcon
              closable
              className="mb-4"
              onClose={() => setErrMs("")}
            />
          )}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter email." },
              { type: "email", message: "Invalid email." },
            ]}
          >
            <Input placeholder="email@gmail.com" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter Password.",
              },
            ]}
          >
            <Input.Password placeholder="*********" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember</Checkbox>
          </Form.Item>
          <Form.Item>
            <AnimatedAntButton
              className="my-btn"
              type="primary"
              htmlType="submit"
              block
              size="middle"
              loading={loading}
              style={{ transform, transformOrigin: "center" }}
              onClick={bounce}
            >
              Sign In
            </AnimatedAntButton>
          </Form.Item>
          <div className="flex flex-col gap-1">
            <MuiLink>Don't have an account? click here.</MuiLink>
            <Typography variant="caption" color="text.secondary">
              Hint: admin@gmail.com | pass: 123456
            </Typography>
          </div>
        </Form>
      </Card>
    </Box>
  );
}
