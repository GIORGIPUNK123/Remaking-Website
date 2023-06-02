import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import React from 'react';

export const SelectInput = (props: {
  optionsArr: (string | number)[];
  inputValue: string | number;
  handleChange: any;
  onBlur: any;
  label: string;
  id: string;
}) => (
  <FormControl>
    <FormLabel>{props.label}</FormLabel>
    <Select
      id={props.id}
      onChange={props.handleChange}
      onBlur={props.onBlur}
      value={props.inputValue}
    >
      {props.optionsArr.map((option, i) => (
        <option key={i}>{option}</option>
      ))}
    </Select>
  </FormControl>
);
