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
import { Loading } from "../Loading";
export const AdminPanelImageInput = (props) => {
  const [activeImage, setActiveImage] = useState("");
  const [items, setItems] = useState(props.items);
  if (items === undefined) {
    <Loading />;
  } else {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [imageLinks, setImageLinks] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const checkerror = () => {
      if (inputValue.slice(0, 4) === "http" && !inputValue.includes(" ")) {
        return false;
      }
      return true;
    };
    const isError = checkerror();
    console.log(isError);
    console.log(inputValue);

    return (
      <>
        <AdminPanelImageModal
          onOpen={onOpen}
          items={items}
          onClose={onClose}
          isOpen={isOpen}
          activeImage={activeImage}
        />
        <FormControl isInvalid={isError}>
          <FormLabel>{props.label}</FormLabel>
          <InputGroup>
            <InputLeftElement
              w={`${65 * imageLinks.length}px`}
              ml="6px"
              display="flex"
              justifyContent="space-between"
            >
              {imageLinks.length === 0
                ? null
                : imageLinks.map((imageLink, index) => {
                    return (
                      <>
                        <Button
                          key={index + 1}
                          h="1.75rem"
                          // w='1.5'
                          size="sm"
                          colorScheme="blue"
                          onClick={() => {
                            setActiveImage(imageLinks[index]);
                            onOpen();
                          }}
                        >
                          Link {index + 1}
                        </Button>
                      </>
                    );
                  })}
            </InputLeftElement>
            <Input
              pl={`${70 * imageLinks.length + 20}px`}
              pr="100px"
              value={inputValue}
              min={props.min}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <InputRightElement width="auto" mr="6px">
              <Button
                type="solid"
                colorScheme="teal"
                h="1.75rem"
                size="sm"
                onClick={() => {
                  if (!isError) {
                    const tempFunc = () => {
                      const tempArr = [...imageLinks];
                      tempArr.push(inputValue);
                      setImageLinks(tempArr);
                      setInputValue("");
                      console.log(imageLinks);
                      props.getValue(tempArr);
                      props.getBoolean(!isError);
                    };
                    tempFunc();
                  }
                }}
              >
                Add Link
              </Button>
            </InputRightElement>
          </InputGroup>
          {imageLinks.length === 0
            ? null
            : imageLinks.map((imageLink, index) => {
                return (
                  <>
                    <Button
                      mt="7px"
                      mr="10px"
                      rightIcon={<CloseIcon />}
                      key={index + 1}
                      h="1.75rem"
                      size="sm"
                      colorScheme="red"
                      onClick={() => {
                        const tempArr = [...imageLinks];
                        tempArr.splice(index, 1);
                        setImageLinks(tempArr);
                        console.log(imageLinks);
                      }}
                    >
                      Link {index + 1}
                    </Button>
                  </>
                );
              })}
          {!isError ? (
            <FormHelperText>{props.helperText}</FormHelperText>
          ) : (
            <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
          )}
        </FormControl>
      </>
    );
    <AdminPanelImageModal onOpen={onOpen} isOpen={isOpen} onClose={onClose} />;
  }
};
