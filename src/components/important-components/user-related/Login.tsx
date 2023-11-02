import { Box, Button, Center, Input, Text } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { useFormik, yupToFormErrors, FieldArray, Formik } from 'formik';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { authentication } from '../../../firebase-config';
import {
  FacebookAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { StringInput } from '../../../atoms/StringInput';
import { PasswordInput } from '../../../atoms/PasswordInput';

const returnToastError = (message: string, toast: any) => {
  return toast({
    title: 'Error',
    description: message,
    status: 'error',
    duration: 5000,
    isClosable: true,
    position: 'top',
  });
};

export const Login = () => {
  const toast = useToast();
  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(authentication, provider);
      navigate('/');
    } catch (err) {
      throw new Error(err.message);
    }
  };
  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(authentication, provider);
      navigate('/');
    } catch (err) {
      throw new Error(err.message);
    }
  };
  const basicSignIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(authentication, email, password);
      navigate('/');
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const [tempUser, setTempUser] = useState<any>();
  console.log('tempUser: ', tempUser);
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
  };
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    authentication.onAuthStateChanged((user) => {
      if (user) {
        navigate('../');
      }
    });
  }, []);
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
          w='800px'
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
              // Add validationSchema if needed
              initialValues={initialValues}
              onSubmit={async ({ email, password }) => {
                try {
                  setIsLoading(true);
                  await basicSignIn(email, password);
                  setIsLoading(false);
                } catch (err: any) {
                  setIsLoading(false);
                  returnToastError(err.message, toast);
                }
              }}
            >
              {({ values, handleChange, handleBlur, handleSubmit }) => {
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
                    >
                      Log In
                    </Button>
                  </form>
                );
              }}
            </Formik>
            <Box mt='5' w='full' display='flex' justifyContent='space-between'>
              <Button
                // isLoading={isLoading}
                marginX='4'
                w={'full'}
                colorScheme='blue'
                leftIcon={<FaFacebook />}
                fontSize='2xl'
                h='60px'
                onClick={async () => {
                  try {
                    await signInWithFacebook();
                  } catch (err) {
                    returnToastError(err.message, toast);
                  }
                }}
              >
                <Center>
                  <Text>Facebook</Text>
                </Center>
              </Button>
              <Button
                // isLoading={isLoading}
                w={'full'}
                marginX='4'
                colorScheme='blue'
                leftIcon={<BsGithub />}
                fontSize='2xl'
                h='60px'
                onClick={async () => {
                  try {
                    await signInWithGithub();
                  } catch (err) {
                    returnToastError(err.message, toast);
                  }
                }}
              >
                <Center>
                  <Text>Github</Text>
                </Center>
              </Button>
              <Button
                // isLoading={isLoading}
                w={'full'}
                colorScheme='blue'
                marginX='4'
                leftIcon={<FcGoogle />}
                fontSize='2xl'
                h='60px'
                onClick={async () => {
                  try {
                    await signInWithFacebook();
                  } catch (err) {
                    returnToastError(err.message, toast);
                  }
                }}
              >
                <Center>Google</Center>
              </Button>
            </Box>
          </Box>
        </Box>
        <Text></Text>
      </div>
    </>
  );
};
