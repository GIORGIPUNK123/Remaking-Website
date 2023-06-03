import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import { Loading } from '../Loading';
import { useFormik, yupToFormErrors, FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { GeneralItemType, ItemType, UserType } from '../../types';
import { SelectInput } from '../../atoms/SelectInput';
import { NumberInput } from '../../atoms/NumberInput';
import { StringInput } from '../../atoms/StringInput';
import { ImagesInput } from '../../atoms/ImagesInput';

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

export const AdminPanelEdit = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const itemsObj = useSelector(
    (state: {
      items: { items: ItemType[]; error: boolean; loading: boolean };
    }) => state.items
  );

  const currentUserObj = useSelector(
    (state: {
      currentUser: { currentUser: UserType; error: boolean; loading: boolean };
    }) => state.currentUser
  );
  const languageObj = useSelector(
    (state: { language: { lang: 'en' | 'ge' } }) => state.language
  );
  const generalItemsObj = useSelector(
    (state: {
      generalItems: { generalItems: GeneralItemType[] };
      error: boolean;
      loading: boolean;
    }) => state.generalItems
  );
  useEffect(() => {
    if (Object.keys(currentUserObj.currentUser).length === 0) {
      navigate('../login');
    }
  }, []);
  useEffect(() => {
    if (currentUserObj.currentUser.rank !== 'admin') {
      navigate('../');
    }
  }, []);
  const [activeImage, setActiveImage] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const toast = useToast();
  const { id: currentId } = useParams();
  const currentItem = itemsObj.items.find(
    (x) => x.id === parseInt(currentId!)
  )!;

  const initialValues = { ...currentItem };

  const editItemSchema = Yup.object().shape({
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
  if (isLoading === true) {
    return <Loading />;
  }
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  useEffect(() => {
    !!currentItem ?? setCategory(currentItem.category);
    // !!currentItem ? (initialValues.type = currentItem.type) : null;

    console.log('CURRENT_ITEM: ', currentItem);
  }, [currentItem]);
  if (!!currentItem) {
    return (
      <div className='edit-item-panel'>
        <Button
          position='absolute'
          top='20px'
          left='2.5%'
          type='submit'
          colorScheme='blue'
          size='sm'
          onClick={() => {
            navigate('/adminpanel');
          }}
        >
          Go Back
        </Button>
        <h1 style={{ fontSize: '34px', marginBottom: '75px' }}>
          Editing id: {currentId}
        </h1>
        <Formik
          validationSchema={editItemSchema}
          initialValues={initialValues}
          onSubmit={(values) => {
            axios({
              url: `https://geolab-project-backend.onrender.com/edit/${category}`,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              data: values,
            })
              .then((res) => {
                toast({
                  title: 'Item Replaced',
                  // description: "test",
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                  position: 'top',
                });
                console.log('fetch response ', res);
              })
              .catch((err) => {
                toast({
                  title: err?.message,
                  description: `Error code: ${err?.status}`,
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                  position: 'top',
                });
                console.log('fetch errors ', err);
              });

            setIsDisabled(true);
            // alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
            // console.log('errors ', errors);
            console.log('errors: ', errors);
            // console.log('initial values ', initialValues);
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
                {
                  <Box w='80%'>
                    {Object.keys(currentItem).map((key, index) => {
                      if (values.category === 'mac') {
                        // Render all inputs when the category is 'mac'
                        if (
                          key === 'type' ||
                          key === 'category' ||
                          key === 'color' ||
                          key === 'ram_amount' ||
                          key === 'ssd_amount' ||
                          key === 'screen_size_size'
                        ) {
                          return (
                            <SelectInput
                              key={key}
                              label={key}
                              id={key}
                              inputValue={values[key]}
                              optionsArr={
                                key === 'type'
                                  ? ['air_13_m1', 'air_15_m1', 'air_17_m1']
                                  : key === 'category'
                                  ? ['mac', 'iphone', 'airpods']
                                  : key === 'ram_amount'
                                  ? [8, 16]
                                  : key === 'ssd_amount'
                                  ? [256, 512]
                                  : key === 'screen_size_size'
                                  ? ['small', 'medium', 'large']
                                  : ['silver', 'gold', 'space-grey']
                              }
                              handleChange={handleChange}
                              onBlur={handleBlur}
                            />
                          );
                        } else if (typeof currentItem[key] === 'number') {
                          return (
                            <NumberInput
                              key={key}
                              label={key}
                              errorMessage={errors[key]}
                              helperText='Nice Job'
                              min={0}
                              id={key}
                              inputValue={values[key]}
                              handleChange={handleChange}
                              onBlur={handleBlur}
                            />
                          );
                        } else if (key === 'images') {
                          return (
                            <FieldArray name='images' key={key}>
                              {({ insert, remove, push }) => (
                                <Box w='100%'>
                                  {values.images.length > 0 &&
                                    values.images.map((image, index) => {
                                      console.log(errors.images);
                                      const hasImageErrors =
                                        errors.images !== undefined;
                                      return (
                                        <Box key={index}>
                                          <ImagesInput
                                            label={`Image ${index + 1}`}
                                            error={
                                              hasImageErrors
                                                ? errors.images?.[index]
                                                : undefined
                                            }
                                            errorMessage={
                                              hasImageErrors
                                                ? errors.images?.[index]
                                                : ''
                                            }
                                            helperText='Nice Job'
                                            min={0}
                                            name={`images[${index}]`}
                                            id={`images[${index}]`}
                                            inputValue={values.images[index]}
                                            handleChange={handleChange}
                                            onBlur={handleBlur}
                                            removeFunc={() => remove(index)}
                                            images
                                            imagesValues={values.images}
                                          />
                                        </Box>
                                      );
                                    })}
                                  <Button
                                    mt={2}
                                    type='button'
                                    onClick={() => push('')}
                                  >
                                    Add Image
                                  </Button>
                                </Box>
                              )}
                            </FieldArray>
                          );
                        } else {
                          return (
                            <StringInput
                              key={key}
                              label={key}
                              error={errors[key]}
                              errorMessage={errors[key]}
                              helperText='Nice Job'
                              inputValue={values[key]}
                              handleChange={handleChange}
                              onBlur={handleBlur}
                              id={key}
                            />
                          );
                        }
                      } else {
                        // Render only the category input when the category is not 'mac'
                        if (key === 'category') {
                          return (
                            <SelectInput
                              key={key}
                              label={key}
                              id={key}
                              inputValue={values[key]}
                              optionsArr={['mac', 'iphone', 'airpods']}
                              handleChange={handleChange}
                              onBlur={handleBlur}
                            />
                          );
                        }
                      }
                    })}
                  </Box>
                }
                <Button
                  mt='14'
                  mb='24'
                  w='64'
                  h='16'
                  type={values.category === 'mac' ? 'submit' : 'button'}
                  onClick={() => {
                    values.category === 'mac' ??
                      toast({
                        title: 'Editing category is not supported yet',
                        // description: "test",
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                        position: 'top',
                      });
                  }}
                  colorScheme='green'
                  size='lg'
                >
                  Edit
                </Button>
              </form>
            );
          }}
        </Formik>
      </div>
    );
  } else {
    return <Loading />;
  }
};
