import React, { useState, useEffect } from 'react';
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
  Input,
} from '@chakra-ui/react';
import { useFormik, yupToFormErrors, FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { AdminPanelInput } from '../AdminPanelInput';
import { useSelector } from 'react-redux';
import { ItemType } from '../../../types';
export const AdminPanelAddModal = (props: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  // const [addRow, setAddRow] = useState([0, '']);
  // const [booleans, setBooleans] = useState([false]);
  // console.log('addRow ', addRow);
  // console.log('booleans ', booleans);
  const itemsObj = useSelector(
    (state: {
      items: { items: ItemType[]; error: boolean; loading: boolean };
    }) => state.items
  );
  console.log('items ', itemsObj.items);
  const initialValues = {
    id: 0,
    type: '',
    price: 0,
    salePrice: 0,
    gelPrice: 0,
    saleGelPrice: 0,
    images: [''],
    inStock: 0,
    name: '',
  };

  const addItemSchema = Yup.object().shape({
    id: Yup.number()
      .required('ID is requiered')
      .positive('ID has to be positive')
      .integer('ID has to be integer')
      .notOneOf(
        itemsObj.items.map((item) => {
          return item.id;
        }),
        'ID has been already used'
      ),

    type: Yup.string()
      .required('Type is requiered')
      .oneOf(['mac', 'iphone', 'airpods']),
    price: Yup.number()
      .positive('Price has to be positive')
      .required('Price is required'),
    salePrice: Yup.number().moreThan(-1),
    gelPrice: Yup.number().positive('Gel price has to be positive'),
    images: Yup.array()
      .min(1, 'At least 1 image is required')
      .max(7)
      .of(
        Yup.string()
          .required('Image is required')
          .url('Image has to be a valid link')
      ),
    inStock: Yup.number().moreThan(-1),
    name: Yup.string()
      .required()
      .min(2, 'Name has to contain more than 2 letters')
      .max(50, 'Name has to contain less than 50 letters'),
  });

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent w='80%' maxW='auto'>
        <Formik
          validationSchema={addItemSchema}
          initialValues={initialValues}
          onSubmit={(values) => {
            fetch('https://geolab-project-backend.onrender.com/add', {
              method: 'POST',
              body: JSON.stringify(values),
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((values) => console.log(values))
              .catch((err) => console.log('fetch errors ', err));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
            console.log('errors ', errors);
            console.log('values ', values);
            return (
              <form onSubmit={handleSubmit}>
                <ModalHeader justifyContent='center' display='flex'>
                  <Text fontSize='4xl'>Add Item</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <AdminPanelInput
                    label='ID'
                    error={errors.id}
                    errorMessage={errors.id}
                    helperText='Nice Job'
                    min={0}
                    id='id'
                    inputValue={values.id}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                    number
                  />
                  <AdminPanelInput
                    label='Type'
                    errorMessage={errors.type}
                    helperText='Nice Job'
                    id='type'
                    inputValue={values.type}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                    text
                  />
                  <AdminPanelInput
                    label='Price'
                    error={errors.price}
                    errorMessage={errors.price}
                    helperText='Nice Job'
                    min={0}
                    id='price'
                    inputValue={values.price}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                    number
                  />
                  <AdminPanelInput
                    label='Sale Price'
                    error={errors.salePrice}
                    errorMessage={errors.salePrice}
                    helperText='Nice Job'
                    min={0}
                    id='salePrice'
                    inputValue={values.salePrice}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                    number
                    items={itemsObj.items}
                  />
                  <AdminPanelInput
                    label='Gel Price'
                    error={errors.gelPrice}
                    errorMessage={errors.gelPrice}
                    helperText='Nice Job'
                    min={0}
                    id='gelPrice'
                    inputValue={values.gelPrice}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                    number
                    items={itemsObj.items}
                  />
                  <AdminPanelInput
                    label='Sale Gel Price'
                    error={errors.saleGelPrice}
                    errorMessage={errors.saleGelPrice}
                    helperText='Nice Job'
                    min={0}
                    id='saleGelPrice'
                    inputValue={values.saleGelPrice}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                    number
                    items={itemsObj.items}
                  />
                  <FieldArray name='images'>
                    {({ insert, remove, push }) => (
                      <div>
                        {values.images.length > 0 &&
                          values.images.map((image, index) => {
                            console.log(errors.images);
                            if (errors.images !== undefined) {
                              return (
                                <AdminPanelInput
                                  itemKey={index}
                                  label={`Image ` + (index + 1)}
                                  error={errors.images[index]}
                                  errorMessage={errors.images[index]}
                                  helperText='Nice Job'
                                  min={0}
                                  name={`images[0]`}
                                  id={`images[${index}]`}
                                  inputValue={values.images[index]}
                                  handleChange={handleChange}
                                  onBlur={handleBlur}
                                  removeFunc={() => remove(index)}
                                  images
                                  imagesValues={values.images}
                                />
                              );
                            } else {
                              return (
                                <AdminPanelInput
                                  itemKey={index}
                                  label={`Image ` + (index + 1)}
                                  // error={errors.images[index]}
                                  // errorMessage={errors.images[index]}
                                  helperText='Nice Job'
                                  min={0}
                                  name={`images[0]`}
                                  id={`images[${index}]`}
                                  inputValue={values.images[index]}
                                  handleChange={handleChange}
                                  onBlur={handleBlur}
                                  removeFunc={() => remove(index)}
                                  imagesValues={values.images}
                                  images
                                />
                              );
                            }
                          })}

                        <Button mt={'2'} type='button' onClick={() => push('')}>
                          Add Image
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                  <AdminPanelInput
                    label='In Stock'
                    error={errors.inStock}
                    errorMessage={errors.inStock}
                    helperText='Nice Job'
                    inputValue={values.inStock}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                    number
                    id='inStock'
                  />
                  <AdminPanelInput
                    label='Name'
                    error={errors.name}
                    errorMessage={errors.name}
                    helperText='Nice Job'
                    inputValue={values.name}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                    id='name'
                  />
                </ModalBody>
                <ModalFooter>
                  <Button type='submit' colorScheme='green' mr={3}>
                    Add Item
                  </Button>
                </ModalFooter>
              </form>
            );
          }}
        </Formik>
      </ModalContent>
    </Modal>
  );
};
