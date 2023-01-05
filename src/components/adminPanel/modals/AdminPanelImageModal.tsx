import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";

import { itemsState } from "../../../atoms";
import { useRecoilValue } from "recoil";
export const AdminPanelImageModal = (props: any) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      className="admin-panel-modal"
    >
      <ModalOverlay />
      <ModalContent w="80%" maxW="auto">
        <ModalHeader justifyContent="center" display="flex">
          <Text fontSize="4xl">Image</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody justifyContent="center" display="flex">
          <img
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
              borderWidth: "4px",
              borderStyle: "solid",
            }}
            src={props.activeImage}
            alt="image"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              props.onClose();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
