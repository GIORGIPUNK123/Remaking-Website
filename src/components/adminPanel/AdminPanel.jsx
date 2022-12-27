import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminPanelAddModal } from "./modals/AdminPanelAddModal";
import { AdminPanelDeleteModal } from "./modals/AdminPanelDeleteModal";
import { AdminPanelImageModal } from "./modals/AdminPanelImageModal";
import { AdminPanelTable } from "./AdminPanelTable";
import {
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  DarkMode,
  Button,
  useColorMode,
  Box,
  useDisclosure,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  Spinner,
  Center,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { itemsState } from "../../atoms";
import { useCookies } from "react-cookie";
import { Loading } from "../Loading";

export const AdminPanel = (props) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState("waiting");
  const { colorMode, toggleColorMode } = useColorMode();
  console.log(colorMode);
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenImage,
    onOpen: onOpenImage,
    onClose: onCloseImage,
  } = useDisclosure();
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const [items, setItems] = useRecoilState(itemsState);
  const getItemsFunction = (setState) => {
    fetch("http://localhost:3006/items")
      .then((response) => response.json())
      .then((data) => {
        setState(data);
        console.log("fetched");
      })
      .catch((err) => console.log(err));
  };
  const toast = useToast();
  const [cookies, setCookie, removeCookie] = useCookies("accessToken");
  console.log("cookies ", cookies);
  console.log("Token ", cookies.accessToken);

  if (cookies.accessToken == undefined) {
    useEffect(() => {
      navigate("../login");
    }, []);
  }
  useEffect(() => {
    axios({
      url: "http://localhost:3006/adminpanel",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    })
      .then((res) => {
        console.log("loggedIn: ", loggedIn);
        console.log("res.status ", res.status);
        console.log("values ", res.data);
        console.log("cookies ", cookies);
        setLoggedIn(true);
        toast({
          title: res.data.message,
          // description: "test",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        console.log("loggedIn: ", loggedIn);
        console.log("Error: ", err);
        setLoggedIn(false);
        toast({
          title: err.message,
          // description: "test",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  }, []);

  // const displayError = () => {};

  const [activeImage, setActiveImage] = useState();
  console.log(items.length);
  if (loggedIn == true) {
    return (
      <div className="admin-panel">
        <div className="admin-panel-top">
          <h1 className="admin-panel-heading">Admin Panel</h1>
        </div>
        <Button
          colorScheme="blue"
          variant="solid"
          style={{
            height: "50px",
            position: "absolute",
            top: "70px",
            right: "10%",
            width: "150px",
            fontSize: "2vh",
          }}
          className="admin-panel-refresh"
          onClick={() => {
            getItemsFunction(setItems);
          }}
        >
          Refresh
        </Button>
        <Button
          onClick={toggleColorMode}
          style={{ position: "absolute", top: "70px", left: "10%" }}
        >
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
        <AdminPanelTable setActiveImage={setActiveImage} onOpen={onOpenImage} />
        <AdminPanelDeleteModal onClose={onCloseDelete} isOpen={isOpenDelete} />
        <AdminPanelImageModal
          onClose={onCloseImage}
          isOpen={isOpenImage}
          activeImage={activeImage}
        />
        <AdminPanelAddModal onClose={onCloseAdd} isOpen={isOpenAdd} />
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <div className="fetch-buttons">
            <Button
              variant="solid"
              colorScheme="red"
              style={{
                height: "80px",
                width: "250px",
                fontSize: "2vh",
              }}
              onClick={() => {
                onOpenDelete();
              }}
            >
              Delete
            </Button>
            <Button
              variant="solid"
              colorScheme="green"
              style={{
                height: "80px",
                width: "250px",
                fontSize: "2vh",
              }}
              onClick={() => {
                onOpenAdd();
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    );
  } else if (loggedIn == "waiting") {
    return <Loading />;
  } else navigate("../");
};
