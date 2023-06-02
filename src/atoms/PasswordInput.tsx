import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
export const PasswordInput = (props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <FormControl isInvalid={props.errorMessage}>
      <FormLabel>{props.label}</FormLabel>
      <InputGroup size="md">
        <Input
          id={props.id}
          value={props.inputValue}
          onChange={props.handleChange}
          min={props.min}
          onBlur={props.onBlur}
          type={show ? "text" : "password"}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      {props.errorMessage ? (
        <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
      ) : (
        <FormHelperText>{props.helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
