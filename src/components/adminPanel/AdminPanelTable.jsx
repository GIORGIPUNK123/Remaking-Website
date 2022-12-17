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
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { itemsState } from '../../atoms';
export const AdminPanelTable = (props) => {
  const items = useRecoilValue(itemsState);
  return (
    <TableContainer overflowY="scroll" h="50%">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Type</Th>
            <Th>Price</Th>
            <Th>Sale Price</Th>
            <Th>Gel Price</Th>
            <Th>Sale Gel Price</Th>
            <Th>Images</Th>
            <Th>In Stock</Th>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              <Td textAlign="center"> {item.id} </Td>
              <Td textAlign="center"> {item.type} </Td>
              <Td textAlign="center"> {item.price} </Td>
              <Td textAlign="center"> {item.salePrice} </Td>
              <Td textAlign="center"> {item.gelPrice} </Td>
              <Td textAlign="center">{item.saleGelPrice}</Td>
              <Td display="flex" justifyContent="space-evenly" w="250px">
                {item.images.map((image, index) => (
                  <Button
                    variant="solid"
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
              <Td textAlign="center"> {item.inStock} </Td>
              <Td textAlign="center"> {item.name} </Td>
              <Button colorScheme={'blue'} style={{ marginLeft: '25px' }}>
                <Link to={'./edit/' + item.id}> Edit </Link>
              </Button>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};