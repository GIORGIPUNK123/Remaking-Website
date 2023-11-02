import { Box, Button, Center, Input, Text } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { useFormik, yupToFormErrors, FieldArray, Formik } from 'formik';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { UserType } from '../../../types';
import { getTokenByLogin } from '../../../store/slices/currentTokenSlice';
import { AppDispatch } from '../../../store/store';
import { getCurrentUser } from '../../../store/slices/currentUserSlice';
import { authentication } from '../../../firebase';
import {
  FacebookAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
// import { loginSchema } from '../../../schemas/LoginSchema';
import { StringInput } from '../../../atoms/StringInput';
import { PasswordInput } from '../../../atoms/PasswordInput';

export const Login = () => {
  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(authentication, provider)
      .then((res) => {
        console.log('auth response: ', res);
      })
      .catch((err) => console.log('auth error: ', err));
  };
  const signInWithGithub = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(authentication, provider)
      .then((res) => {
        console.log('auth response: ', res);
      })
      .catch((err) => console.log('auth error: ', err));
  };

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const initialValues = {
    email: '',
    password: '',
  };
  const [isLoading, setIsLoading] = useState(false);

  const [cookies, setCookie] = useCookies(['accessToken']);
  const currentUserObj = useSelector(
    (state: {
      currentUser: { currentUser: UserType; error: boolean; loading: boolean };
    }) => state.currentUser
  );
  const loggedIn = !!currentUserObj.currentUser;
  // console.log('CurrentUserObj: ', currentUserObj);
  useEffect(() => {
    loggedIn && navigate('../');
  }, []);
  const currentTokenObj = useSelector(
    (state: {
      currentToken: { token: string; error: boolean; loading: boolean };
    }) => state.currentToken
  );
  // console.log('currentTokenObj: ', currentTokenObj);
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
          h='600px'
          w='50%'
          display='flex'
          alignItems='center'
          flexDirection='column'
          borderRadius='15'
        >
          <Text fontSize='6xl'>Log In</Text>
          <Box
            className='inputs'
            mt='55'
            // h='200px'
            display='flex'
            flexDirection='column'
            w='80%'
            justifyContent='space-between'
          >
            <Formik
              // validationSchema={loginSchema}
              initialValues={initialValues}
              onSubmit={async ({ email, password }) => {
                try {
                  // setIsLoading(true);
                  // setIsLoading(false);
                } catch (err: any) {
                  let errorMessage = 'An error occurred during login.';
                  if (err.response) {
                    if (err.response.status === 401) {
                      errorMessage = 'Email or Password is incorrect';
                    } else {
                      errorMessage = `Error ${err.response.status}`;
                    }
                  }
                  console.log('Error:', err);
                  toast({
                    title: 'Error',
                    description: errorMessage,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                  });
                  setIsLoading(false);
                }
              }}
            >
              {({ values, handleChange, handleBlur, handleSubmit }) => {
                // console.log('errors ', errors);
                // console.log('values ', values);
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
                      h='220px'
                      display='flex'
                      flexDir='column'
                      justifyContent='space-between'
                    >
                      <StringInput
                        label='Email'
                        min={0}
                        id='email'
                        inputValue={values.email}
                        handleChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <PasswordInput
                        label='Password'
                        min={0}
                        id='password'
                        inputValue={values.password}
                        handleChange={handleChange}
                        onBlur={handleBlur}
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
                      onClick={() => {}}
                    >
                      Log In
                    </Button>
                  </form>
                );
              }}
            </Formik>
            <Box mt='5' w='full' display='flex' justifyContent='space-between'>
              <Button
                isLoading={isLoading}
                // w={'full'}
                colorScheme='blue'
                leftIcon={<FaFacebook />}
                fontSize='2xl'
                h='60px'
                onClick={signInWithFacebook}
              >
                <Center>
                  <Text>Facebook</Text>
                </Center>
              </Button>
              <Button
                isLoading={isLoading}
                // w={'full'}
                colorScheme='blue'
                leftIcon={<BsGithub />}
                fontSize='2xl'
                h='60px'
                onClick={signInWithGithub}
              >
                <Center>
                  <Text>Github</Text>
                </Center>
              </Button>
              <Button
                isLoading={isLoading}
                // w={'full'}
                colorScheme='blue'
                leftIcon={<FaFacebook />}
                fontSize='2xl'
                h='60px'
                onClick={signInWithFacebook}
              >
                <Center>
                  <Text>Facebook</Text>
                </Center>
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};
