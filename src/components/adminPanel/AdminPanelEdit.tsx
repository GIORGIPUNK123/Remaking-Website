import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import { Loading } from '../Loading';
import { useFormik, yupToFormErrors, FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { AdminPanelInput } from './AdminPanelInput';
import { AdminPanel } from './AdminPanel';
import { AdminPanelDeleteModal } from './modals/AdminPanelDeleteModal';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { GeneralItemType, ItemType, UserType } from '../../types';
import { SelectInput } from '../../atoms/SelectInput';
import { NumberInput } from '../../atoms/NumberInput';
import { MacInputsRenderer } from './modals/AdminPanelAddModal';
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

export const AdminPanelEdit = () => {
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
  if (isLoading === true) {
    return <Loading />;
  }
  const [category, setCategory] = useState('');
  useEffect(() => {
    // setCategory(currentItem.category);

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
              url: 'https://geolab-project-backend.onrender.com/edit',
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
                console.log('fetch errors ', err);
              });

            setIsDisabled(true);
            // alert(JSON.stringify(values, null, 2));
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
                    <Box w='100%'>
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
                    </Box>
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
                {initialValues == values ? (
                  <Button
                    type='submit'
                    colorScheme='green'
                    mt={5}
                    mr={3}
                    size='lg'
                    w='200px'
                    h='65px'
                    fontSize='2xl'
                    disabled
                  >
                    Confirm Edit
                  </Button>
                ) : (
                  <Button
                    type='submit'
                    colorScheme='green'
                    mt={5}
                    mr={3}
                    size='lg'
                    w='200px'
                    h='65px'
                    fontSize='2xl'
                    disabled={isDisabled}
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
  } else {
    return <Loading />;
  }
};
