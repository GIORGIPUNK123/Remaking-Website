import { Box, Button, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useFormik, yupToFormErrors, FieldArray, Formik } from 'formik';
import { AdminPanelInput } from '../../adminPanel/AdminPanelInput';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AppDispatch } from '../../../store/store';
import { authentication } from '../../../firebase-config';
export const Register = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   authentication.onAuthStateChanged((user) => {
  //     if (user) {
  //       navigate('../');
  //     }
  //   });
  // }, []);

  const [emailExists, setEmailExists] = useState(false);
  const toast = useToast();
  const initialValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
    repeatPassword: '',
  };
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div
        className='wrapper'
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <Box
          className='main-login-div'
          mt='105'
          bgColor='blackAlpha.100'
          h='800px'
          w='50%'
          display='flex'
          alignItems='center'
          flexDirection='column'
          borderRadius='15'
        >
          <Text fontSize='6xl'>Sign Up</Text>
          <Box
            className='inputs'
            mt='55'
            h='200px'
            display='flex'
            flexDirection='column'
            w='80%'
            justifyContent='space-between'
          >
            <Formik
              // validationSchema={registerSchema}
              initialValues={initialValues}
              onSubmit={(values: {
                name: string;
                surname: string;
                email: string;
                password: string;
                repeatPassword: string;
              }) => {}}
            >
              {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
                console.log('errors ', errors);
                console.log('values ', values);
                return (
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      w='100%'
                      h='500px'
                      display='flex'
                      flexDir='column'
                      justifyContent='space-between'
                    >
                      <AdminPanelInput
                        label='name'
                        error={errors.name}
                        errorMessage={errors.name}
                        helperText='Nice Job'
                        min={0}
                        id='name'
                        inputValue={values.name}
                        handleChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <AdminPanelInput
                        label='surname'
                        error={errors.surname}
                        errorMessage={errors.surname}
                        helperText='Nice Job'
                        min={0}
                        id='surname'
                        inputValue={values.surname}
                        handleChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <AdminPanelInput
                        label='Email'
                        error={errors.email}
                        errorMessage={errors.email}
                        helperText='Nice Job'
                        min={0}
                        id='email'
                        inputValue={values.email}
                        handleChange={handleChange}
                        onBlur={handleBlur}
                        text
                      />
                      <AdminPanelInput
                        label='Password'
                        error={errors.password}
                        errorMessage={errors.password}
                        helperText='Nice Job'
                        min={0}
                        id='password'
                        inputValue={values.password}
                        handleChange={handleChange}
                        onBlur={handleBlur}
                        password
                      />
                      <AdminPanelInput
                        label='Repeat Password'
                        error={errors.repeatPassword}
                        errorMessage={errors.repeatPassword}
                        helperText='Nice Job'
                        min={0}
                        id='repeatPassword'
                        inputValue={values.repeatPassword}
                        handleChange={handleChange}
                        onBlur={handleBlur}
                        autocomplete='off'
                        password
                      />
                    </Box>
                    <Button
                      isLoading={isLoading}
                      type='submit'
                      colorScheme='blue'
                      mt='55'
                      w='70%'
                      h='60px'
                      fontSize='2xl'
                      disabled={Object.keys(errors).length !== 0}
                    >
                      Sign Up
                    </Button>
                  </form>
                );
              }}
            </Formik>
          </Box>
        </Box>
      </div>
    </>
  );
};
