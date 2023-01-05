import { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Loading } from '../Loading';
import { AdminPanelImageModal } from './modals/AdminPanelImageModal';

export const AdminPanelInput = (props) => {
  // console.log(props.errorMessage);
  if (props.number) {
    return (
      <FormControl isInvalid={props.errorMessage}>
        <FormLabel>{props.label}</FormLabel>
        <NumberInput id={props.id} value={props.inputValue} min={props.min}>
          <NumberInputField
            onChange={props.handleChange}
            onBlur={props.onBlur}
          />
        </NumberInput>
        <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
      </FormControl>
    );
  } else if (props.text) {
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
  } else if (props.password) {
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
            type={show ? 'text' : 'password'}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
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
  } else {
    return (
      <FormControl isInvalid={props.errorMessage}>
        <FormLabel>{props.label}</FormLabel>
        <div
          key={props.itemKey}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Input
            id={props.id}
            value={props.inputValue}
            onChange={props.handleChange}
            min={props.min}
            onBlur={props.onBlur}
            mr="5"
          />
          {props.imagesValues == undefined ||
          props.imagesValues.length <= 1 ? null : (
            <Button
              colorScheme="blue"
              onClick={() => {
                props.removeFunc();
              }}
            >
              Remove Link
            </Button>
          )}
        </div>
        {props.errorMessage ? (
          <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
        ) : (
          <FormHelperText>{props.helperText}</FormHelperText>
        )}
      </FormControl>
    );
  }
};
