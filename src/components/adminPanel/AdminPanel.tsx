import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminPanelAddModal } from "./modals/AdminPanelAddModal";
import { AdminPanelDeleteModal } from "./modals/AdminPanelDeleteModal";
import { AdminPanelImageModal } from "./modals/AdminPanelImageModal";
import { AdminPanelTable } from "./AdminPanelTable";
import { Button, useColorMode, useDisclosure } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState, macsState } from "../../atoms";
import { Loading } from "../Loading";
import { getMacs } from "../../functions/fetchFuncions";
export const AdminPanel = (props: any) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
  const [items, setItems] = useRecoilState(macsState);
  const currentUser = useRecoilValue(currentUserState);
  if (isLoading === true) {
    return <Loading />;
  }
  if (Object.keys(currentUser).length === 0) {
    navigate("../login");
  }
  if (currentUser.rank !== "admin") {
    navigate("../");
  }
  const [activeImage, setActiveImage] = useState();

  return (
    <>
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
            props.getItemsFunction(setItems);
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
    </>
  );
};
