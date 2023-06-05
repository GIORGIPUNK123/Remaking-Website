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
import { NumberInput } from '../../../atoms/NumberInput';
import { StringInput } from '../../../atoms/StringInput';
import { SelectInput } from '../../../atoms/SelectInput';
import { ImagesInput } from '../../../atoms/ImagesInput';
import { addItemSchema } from '../../../schemas/AddItemSchema';

export const MacInputsRenderer = (props: {
  values: any;
  handleChange: any;
  handleBlur: any;
}) => {
  const { values, handleBlur, handleChange } = props;
  return (
    <>
      <SelectInput
        label='Ssd'
        id='ssd'
        inputValue={values.ssd}
        optionsArr={[256, 512]}
        handleChange={handleChange}
        onBlur={handleBlur}
      />
      <SelectInput
        label='Ram'
        id='ram'
        inputValue={values.ram}
        optionsArr={[8, 16]}
        handleChange={handleChange}
        onBlur={handleBlur}
      />
      <SelectInput
        label='Screen Size'
        id='screenSize'
        inputValue={values.screenSize}
        optionsArr={[13, 15]}
        handleChange={handleChange}
        onBlur={handleBlur}
      />
    </>
  );
};
export const AdminPanelAddModal = (props: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [category, setCategory] = useState('mac');
  const itemsObj = useSelector(
    (state: {
      items: { items: ItemType[]; error: boolean; loading: boolean };
    }) => state.items
  );
  console.log('items ', itemsObj.items);
  const initialValues = {
    id: 0,
    type: 'air_13_m1',
    price: 0,
    salePrice: 0,
    gelPrice: 0,
    saleGelPrice: 0,
    images: [''],
    inStock: 0,
    name: '',
    ssd: 256,
    ram: 8,
    color: 'silver',
    screenSize: 13,
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent w='80%' maxW='auto'>
        <Formik
          validationSchema={addItemSchema(itemsObj.items)}
          initialValues={initialValues}
          onSubmit={(values) => {
            fetch(
              `https://geolab-project-backend.onrender.com/add/${category}`,
              {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
              .then((values) => {
                props.onClose();
              })
              .catch((err) => console.log('fetch errors ', err));
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
                  <SelectInput
                    label='Category'
                    id='category'
                    inputValue={category}
                    optionsArr={['mac', 'iphone', 'airpods']}
                    handleChange={(e: any) => {
                      setCategory(e.target.value);
                    }}
                    onBlur={handleBlur}
                  />
                  <SelectInput
                    label='Type'
                    id='type'
                    inputValue={values.type}
                    optionsArr={
                      category === 'mac'
                        ? ['air_13_m1', 'air_15_m1', 'air_17_m1']
                        : category === 'iphone'
                        ? ['13', '13_pro', '13_pro_max']
                        : ['other']
                    }
                    handleChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <SelectInput
                    label='Color'
                    id='color'
                    inputValue={values.color}
                    optionsArr={
                      category === 'mac'
                        ? ['silver', 'space_grey', 'gold']
                        : category === 'iphone'
                        ? ['red', 'blue', 'green']
                        : ['other']
                    }
                    handleChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {category === 'mac' ? (
                    <MacInputsRenderer
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                    />
                  ) : null}
                  <NumberInput
                    label='ID'
                    errorMessage={errors.id}
                    helperText='Nice Job'
                    min={0}
                    id='id'
                    inputValue={values.id}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <NumberInput
                    label='Price'
                    errorMessage={errors.price}
                    helperText='Nice Job'
                    min={0}
                    id='price'
                    inputValue={values.price}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <NumberInput
                    label='Sale Price'
                    errorMessage={errors.salePrice}
                    helperText='Nice Job'
                    min={0}
                    id='salePrice'
                    inputValue={values.salePrice}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <NumberInput
                    label='Gel Price'
                    errorMessage={errors.gelPrice}
                    helperText='Nice Job'
                    min={0}
                    id='gelPrice'
                    inputValue={values.gelPrice}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <NumberInput
                    label='Sale Gel Price'
                    errorMessage={errors.saleGelPrice}
                    helperText='Nice Job'
                    min={0}
                    id='saleGelPrice'
                    inputValue={values.saleGelPrice}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FieldArray name='images'>
                    {({ insert, remove, push }) => (
                      <div>
                        {values.images.length > 0 &&
                          values.images.map((image, index) => {
                            console.log(errors.images);
                            if (errors.images !== undefined) {
                              return (
                                <ImagesInput
                                  key={index}
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
                                <ImagesInput
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
                  <NumberInput
                    id='inStock'
                    label='In Stock'
                    errorMessage={errors.inStock}
                    helperText='Nice Job'
                    inputValue={values.inStock}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                    min={1}
                  />
                  <StringInput
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
