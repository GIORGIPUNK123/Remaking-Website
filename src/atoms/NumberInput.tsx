import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput as NumberInputModule,
  NumberInputField,
  FormHelperText,
} from "@chakra-ui/react";
import React from "react";
export const NumberInput = (props: {
  inputValue: number;
  id: string;
  errorMessage?: string;
  label: string;
  handleChange: any;
  onBlur: any;
  min: number;
  helperText: string;
}) => (
  <FormControl isInvalid={!!props.errorMessage}>
    <FormLabel>{props.label}</FormLabel>
    <NumberInputModule id={props.id} value={props.inputValue} min={props.min}>
      <NumberInputField onChange={props.handleChange} onBlur={props.onBlur} />
    </NumberInputModule>
    {!!props.errorMessage ? (
      <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
    ) : (
      <FormHelperText>{props.helperText}</FormHelperText>
    )}
  </FormControl>
);
