import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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

import { Loading } from '../Loading';
import { useRecoilValue } from 'recoil';
import { itemsState } from '../../atoms';

const boxStyle = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '60%',
  bgcolor: 'rgb(40, 40, 40)',
  boxShadow: 24,
  p: 4,
};
import { useFormik, yupToFormErrors, FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { AdminPanelInput } from './AdminPanelInput';
import { AdminPanel } from './AdminPanel';
import { AdminPanelDeleteModal } from './modals/AdminPanelDeleteModal';
export const AdminPanelEdit = () => {
  let { id } = useParams();
  const items = useRecoilValue(itemsState);
  console.log(
    'this item ',
    items.find((x) => x.id == id)
  );
  const initialValues = {
    id: items.find((x) => x.id == id).id,
    type: items.find((x) => x.id == id).type,
    price: items.find((x) => x.id == id).price,
    salePrice: items.find((x) => x.id == id).salePrice,
    gelPrice: items.find((x) => x.id == id).gelPrice,
    saleGelPrice: items.find((x) => x.id == id).saleGelPrice,
    images: items.find((x) => x.id == id).images,
    inStock: items.find((x) => x.id == id).inStock,
    name: items.find((x) => x.id == id).name,
  };

  const editItemSchema = Yup.object().shape({
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
    <div className="edit-item-panel">
      <Button
        position="absolute"
        top="20px"
        left="2.5%"
        type="submit"
        colorScheme="blue"
        size="sm"
      >
        <Link to="/adminpanel">Go Back</Link>
      </Button>
      <h1 style={{ fontSize: '34px', marginBottom: '75px' }}>
        Editing id: {id}
      </h1>
      <Formik
        validationSchema={editItemSchema}
        initialValues={initialValues}
        onSubmit={(values) => {
          // fetch('http://localhost:3006/edit', {
          //   method: 'POST',
          //   body: JSON.stringify(values),
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          // })
          //   .then((values) => console.log(values))
          //   .catch((err) => console.log('fetch errors ', err));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
          // console.log('errors ', errors);
          console.log('values ', values);
          console.log('initial values ', initialValues);
          return (
            <form
              onSubmit={handleSubmit}
              style={{
                width: '95%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <AdminPanelInput
                label="Type"
                errorMessage={errors.type}
                helperText="Nice Job"
                id="type"
                inputValue={values.type}
                handleChange={handleChange}
                onBlur={handleBlur}
                text
              />
              <AdminPanelInput
                label="Price"
                error={errors.price}
                errorMessage={errors.price}
                helperText="Nice Job"
                min={0}
                id="price"
                inputValue={values.price}
                handleChange={handleChange}
                onBlur={handleBlur}
                number
              />
              <AdminPanelInput
                label="Sale Price"
                error={errors.salePrice}
                errorMessage={errors.salePrice}
                helperText="Nice Job"
                min={0}
                id="salePrice"
                inputValue={values.salePrice}
                handleChange={handleChange}
                onBlur={handleBlur}
                number
              />
              <AdminPanelInput
                label="Gel Price"
                error={errors.gelPrice}
                errorMessage={errors.gelPrice}
                helperText="Nice Job"
                min={0}
                id="gelPrice"
                inputValue={values.gelPrice}
                handleChange={handleChange}
                onBlur={handleBlur}
                number
              />
              <AdminPanelInput
                label="Sale Gel Price"
                error={errors.saleGelPrice}
                errorMessage={errors.saleGelPrice}
                helperText="Nice Job"
                min={0}
                id="saleGelPrice"
                inputValue={values.saleGelPrice}
                handleChange={handleChange}
                onBlur={handleBlur}
                number
              />
              <FieldArray name="images">
                {({ insert, remove, push }) => (
                  <div style={{ width: '100%' }}>
                    {values.images.map((image, index) => {
                      console.log(errors.images);
                      if (errors.images !== undefined) {
                        return (
                          <AdminPanelInput
                            itemKey={index}
                            label={`Image ` + (index + 1)}
                            error={errors.images[index]}
                            errorMessage={errors.images[index]}
                            helperText="Nice Job"
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
                      } else {
                        return (
                          <AdminPanelInput
                            itemKey={index}
                            label={`Image ` + (index + 1)}
                            // error={errors.images[index]}
                            // errorMessage={errors.images[index]}
                            helperText="Nice Job"
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
                    <Button mt={'2'} type="button" onClick={() => push('')}>
                      Add Image
                    </Button>
                  </div>
                )}
              </FieldArray>
              <AdminPanelInput
                label="In Stock"
                error={errors.inStock}
                errorMessage={errors.inStock}
                helperText="Nice Job"
                inputValue={values.inStock}
                handleChange={handleChange}
                onBlur={handleBlur}
                number
                id="inStock"
              />
              <AdminPanelInput
                label="Name"
                error={errors.name}
                errorMessage={errors.name}
                helperText="Nice Job"
                inputValue={values.name}
                handleChange={handleChange}
                onBlur={handleBlur}
                id="name"
              />
              {initialValues == values ? (
                <Button
                  type="submit"
                  colorScheme="green"
                  mt={5}
                  mr={3}
                  size="lg"
                  w="200px"
                  h="65px"
                  fontSize="2xl"
                  disabled
                >
                  Confirm Edit
                </Button>
              ) : (
                <Button
                  type="submit"
                  colorScheme="green"
                  mt={5}
                  mr={3}
                  size="lg"
                  w="200px"
                  h="65px"
                  fontSize="2xl"
                >
                  Confirm Edit
                </Button>
              )}
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
