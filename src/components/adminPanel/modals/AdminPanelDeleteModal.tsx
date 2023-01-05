import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
  Select,
  Button,
  Text,
} from "@chakra-ui/react";
import { itemsState } from "../../../atoms";
import { useRecoilValue } from "recoil";
export const AdminPanelDeleteModal = (props: any) => {
  const items = useRecoilValue(itemsState);
  const [minItem, setMinItem] = useState(1);

  useEffect(() => {
    if (items.length > 0) {
      setMinItem(
        items.reduce((prev, curr) => (prev.id < curr.id ? prev : curr)).id
      );
    }
  }, [items]);

  const [deleteId, setDeleteId] = useState("");

  const deleteAlertDisplay = deleteId === "" ? "flex" : "none";
  console.log(deleteId);
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={() => {
        props.onClose();
        setDeleteId("");
      }}
      className="admin-panel-modal"
    >
      <ModalOverlay />
      <ModalContent w="80%" maxW="auto">
        <ModalHeader justifyContent="center" display="flex">
          <Text fontSize="4xl">Delete An Item</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody justifyContent="center" display="flex">
          <Select
            variant="filled"
            placeholder="Select Id"
            onChange={(e) => setDeleteId(e.target.value)}
          >
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id}_{item.name}
              </option>
            ))}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Alert
            status="error"
            w="50%"
            mr="50%"
            borderRadius="2xl"
            display={deleteAlertDisplay}
          >
            <AlertIcon />
            <AlertTitle>Select Item To Delete Please</AlertTitle>
          </Alert>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => {
              if (deleteId != "") {
                fetch("http://localhost:3006/delete", {
                  method: "POST",
                  body: deleteId,
                })
                  .then((response) => {
                    console.log(response);
                    console.log("I am dumb duck");
                    return response.text();
                  })
                  .then((data) => {
                    console.log(data);
                    props.onClose();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                // props.onClose();
              }
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
