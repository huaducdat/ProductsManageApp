import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
  Button as MuiButton,
} from "@mui/material";
import { Button, Popconfirm } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { useSpring, animated, useTrail } from "@react-spring/web";
import { DeleteOutlined } from "@ant-design/icons";
import EditModal from "./EditModal";
import AddIcon from "@mui/icons-material/Add";

export const cooldown = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Products({ lst }) {
  const [addOpening, setAddOpenning] = useState(false);

  const [editting, setEditting] = useState(null);
  const handleSave = () => {};

  const [btnID, setBtnID] = useState(undefined);
  const [state, setState] = useState(undefined);
  const [processing, setProcessing] = useState(false);
  const [deleBtn, setDeleBtn] = useState(undefined);
  const fakeWait = async (time, id, state) => {
    setState(state);
    setBtnID(id);
    await cooldown(time);
    setBtnID(null);
    setState(undefined);
  };

  const trail = useTrail(lst.length, {
    from: { opacity: 0, transform: "translate(120px, 60px)" },
    to: { opacity: 1, transform: "translate(0px, 0px)" },
    config: { tension: 180, friction: 30 },
  });

  return (
    <Box
      className="flex flex-col w-full justify-start items-center border-2 border-blue-400 rounded-2xl"
      sx={{ px: 3, py: 2 }}
    >
      <Typography
        variant="overline"
        color="primary"
        fontWeight={900}
        textAlign="center"
        fontSize="2rem"
      >
        Produsts List
      </Typography>
      <MuiButton
        variant="contained"
        sx={{ mb: 1, fontWeight: "800", gap: 1 }}
        className="font-black"
        onClick={() => {}}
      >
        {" "}
        <AddIcon /> Add Product
      </MuiButton>
      <Divider className="w-full" sx={{ mb: 1 }} />
      <Stack
        direction="row"
        flexWrap="wrap"
        className="justify-center items-center gap-2"
      >
        {trail.map((style, i) => {
          const ite = lst[i];
          return (
            <animated.div key={ite.id} style={style}>
              <Card
                elevation={3}
                className="w-3xs flex flex-col p-1 h-96"
                sx={{ p: 1 }}
              >
                <CardActionArea
                  className="overflow-visible focus:outline-none justify-center items-center"
                  sx={{
                    "&:focus": { outline: "none" },
                    display: "flex",
                    overflow: "visible",
                    bgcolor: "rgba(241, 241, 241, 1)",
                    "&:hover": { bgcolor: "rgba(24, 24, 24, 1)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={ite.image}
                    alt={ite.title}
                    className="object-fill h-32 p-1"
                    sx={{
                      height: 180,
                      objectFit: "contain",
                      p: 1,
                      "&:hover": {
                        transform: "scale(1.05)",
                        transition: ".3s linear .2s",
                        bgcolor: "transparent",
                        filter:
                          "drop-shadow(0 0 3px rgba(221, 253, 255, 1)) drop-shadow(0 0 9px rgba(119, 189, 255, 1))",
                      },
                    }}
                  />
                </CardActionArea>

                <CardContent className="overflow-hidden">
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    color="text.primary"
                    className="shrink"
                  >
                    {ite.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="shrink"
                  >
                    {ite.description}
                  </Typography>
                </CardContent>

                <CardActions>
                  <div className="flex flex-col gap-1 w-full">
                    <Button
                      type="default"
                      block
                      loading={btnID === ite.id && state === "detail"}
                      icon={<SearchOutlined />}
                      onClick={() => fakeWait(300, ite.id, "detail")}
                    >
                      Show in Detail
                    </Button>
                    <Button
                      type="primary"
                      block
                      loading={btnID === ite.id && state === "edit"}
                      icon={<EditOutlined />}
                      onClick={async () => {
                        fakeWait(300, ite.id, "edit");
                        const openModal = (ms) =>
                          new Promise(() => {
                            setTimeout(() => {
                              setEditting(ite);
                            }, ms);
                          });
                        await openModal(300);
                      }}
                    >
                      Edit
                    </Button>
                    <Popconfirm
                      open={processing && deleBtn === ite.id}
                      placement="bottom"
                      title="Do you want to Delete?"
                      description={`You can't return this action after deleted`}
                      onCancel={() => {
                        setProcessing(false);
                        setDeleBtn(undefined);
                      }}
                      onConfirm={() => {
                        setProcessing(false);
                        setDeleBtn(undefined);
                      }}
                      onOpenChange={(visible) => {
                        if (!visible) {
                          setProcessing(false);
                          setDeleBtn(undefined);
                        }
                      }}
                    >
                      <Button
                        type="default"
                        block
                        danger
                        loading={btnID === ite.id && state === "delete"}
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          setTimeout(() => {
                            setProcessing(true);
                            setDeleBtn(ite.id);
                          }, 400);
                          fakeWait(300, ite.id, "delete");
                        }}
                      >
                        Delete
                      </Button>
                    </Popconfirm>
                  </div>
                </CardActions>
              </Card>
            </animated.div>
          );
        })}
      </Stack>
      <EditModal
        open={!!editting}
        product={editting}
        onsave={handleSave}
        onCancel={() => {
          setEditting(null);
        }}
      />
    </Box>
  );
}
