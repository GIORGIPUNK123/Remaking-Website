import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React from 'react';
export const ImagesInput = (props: any) => {
  return (
    <FormControl isInvalid={props.errorMessage}>
      <FormLabel>{props.label}</FormLabel>
      <Box w='100%' display='flex' alignItems='center'>
        <Input
          id={props.id}
          value={props.inputValue}
          onChange={props.handleChange}
          min={props.min}
          onBlur={props.onBlur}
          mr={props.imagesValues.length <= 1 ? '0' : '5'}
        />
        {props.imagesValues == undefined ||
        props.imagesValues.length <= 1 ? null : (
          <Button
            colorScheme='blue'
            onClick={() => {
              props.removeFunc();
            }}
          >
            Remove Link
          </Button>
        )}
      </Box>
      {props.errorMessage ? (
        <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
      ) : (
        <FormHelperText>{props.helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
