import { useState, useEffect } from "react";
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
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
export const StringInput = (props: any) => {
  return (
    <FormControl isInvalid={props.errorMessage}>
      <FormLabel>{props.label}</FormLabel>
      <Input
        id={props.id}
        value={props.inputValue}
        onChange={props.handleChange}
        min={props.min}
        onBlur={props.onBlur}
      />
      {props.errorMessage ? (
        <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
      ) : (
        <FormHelperText>{props.helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
