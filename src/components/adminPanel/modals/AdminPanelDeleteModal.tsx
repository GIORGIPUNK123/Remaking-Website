import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
  Select,
  Button,
  Text,
} from '@chakra-ui/react';
import { ItemType } from '../../../types';
import { useSelector } from 'react-redux';
export const AdminPanelDeleteModal = (props: any) => {
  const itemsObj = useSelector(
    (state: {
      items: { items: ItemType[]; error: boolean; loading: boolean };
    }) => state.items
  );
  const [minItem, setMinItem] = useState(1);

  useEffect(() => {
    if (itemsObj.items.length !== 0) {
      setMinItem(
        itemsObj.items.reduce((prev, curr) => (prev.id < curr.id ? prev : curr))
          .id
      );
    }
  }, [itemsObj]);

  const [deleteId, setDeleteId] = useState('');
  console.log(
    'deleteCat: ',
    itemsObj.items.find((item) => item.id === parseInt(deleteId))?.category
  );
  const deleteAlertDisplay = deleteId === '' ? 'flex' : 'none';
  console.log(deleteId);
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={() => {
        props.onClose();
        setDeleteId('');
      }}
      // @ts-ignore
      className='admin-panel-modal'
    >
      <ModalOverlay />
      <ModalContent w='80%' maxW='auto'>
        <ModalHeader justifyContent='center' display='flex'>
          <Text fontSize='4xl'>Delete An Item</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody justifyContent='center' display='flex'>
          <Select
            variant='filled'
            placeholder='Select Id'
            onChange={(e) => setDeleteId(e.target.value)}
          >
            {itemsObj.items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id}_{item.name}
              </option>
            ))}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Alert
            status='error'
            w='50%'
            mr='50%'
            borderRadius='2xl'
            display={deleteAlertDisplay}
          >
            <AlertIcon />
            <AlertTitle>Select Item To Delete Please</AlertTitle>
          </Alert>
          <Button
            colorScheme='red'
            mr={3}
            onClick={() => {
              if (deleteId != '') {
                fetch(
                  `https://geolab-project-backend.onrender.com/delete/${
                    itemsObj.items.find(
                      (item) => item.id === parseInt(deleteId)
                    )?.category
                  }/${
                    itemsObj.items.find(
                      (item) => item.id === parseInt(deleteId)
                    )?.id
                  }`,
                  {
                    method: 'DELETE',
                  }
                )
                  .then((response) => {
                    props.onClose();
                    console.log(response);
                    return response.text();
                  })
                  .then((data) => {
                    console.log(data);
                    props.onClose();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                // props.onClose();
              }
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
