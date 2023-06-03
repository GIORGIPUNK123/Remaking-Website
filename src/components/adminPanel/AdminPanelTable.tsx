import {
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  DarkMode,
  Button,
  useColorMode,
  Box,
  useDisclosure,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import { ItemType } from '../../types';
export const AdminPanelTable = (props: any) => {
  const navigate = useNavigate();
  return (
    <TableContainer overflowY='scroll' h='50%'>
      <Table variant='simple'>
        <Thead>
          {props.itemsArr.length > 0 &&
            Object.keys(props.itemsArr[0]).map((key, index) => (
              <Th key={index}>{key}</Th>
            ))}
        </Thead>
        <Tbody>
          {props.itemsArr
            ?.sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((item) => (
              <Tr key={item.id}>
                {Object.values(item).map((value: any, index) => {
                  if (Array.isArray(value)) {
                    return (
                      <Td
                        key={index}
                        display='flex'
                        justifyContent='space-evenly'
                        w='250px'
                      >
                        {item.images.map((image, index) => (
                          <Button
                            variant='solid'
                            key={index}
                            onClick={() => {
                              props.setActiveImage(image);
                              props.onOpen();
                            }}
                          >
                            {index}
                          </Button>
                        ))}
                      </Td>
                    );
                  } else {
                    return (
                      <Td key={index} textAlign='center'>
                        {value}
                      </Td>
                    );
                  }
                })}
                <Button
                  onClick={() => {
                    navigate('./edit/' + item.id);
                  }}
                  colorScheme={'blue'}
                  style={{ marginLeft: '25px' }}
                >
                  Edit
                </Button>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
