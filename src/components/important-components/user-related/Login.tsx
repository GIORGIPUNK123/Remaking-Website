import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useFormik, yupToFormErrors, FieldArray, Formik } from "formik";
import { AdminPanelInput } from "../../adminPanel/AdminPanelInput";
import * as Yup from "yup";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UserType } from "../../../types";
import { getTokenByLogin } from "../../../store/slices/currentTokenSlice";
import { AppDispatch } from "../../../store/store";
import { getCurrentUser } from "../../../store/slices/currentUserSlice";
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const initialValues = {
    email: "",
    password: "",
  };
  const [isLoading, setIsLoading] = useState(false);

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .required()
      .email()
      .min(2, "Email has to contain more than 2 letters")
      .max(50, "Email has to contain less than 50 letters"),
    password: Yup.string()
      .required()
      .min(6, "Password has to contain more than 6 letters")
      .max(15, "Password has to contain less than 15 letters"),
  });
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const currentUserObj = useSelector(
    (state: {
      currentUser: { currentUser: UserType; error: boolean; loading: boolean };
    }) => state.currentUser
  );
  // console.log('CurrentUserObj: ', currentUserObj);
  useEffect(() => {
    if (Object.keys(currentUserObj.currentUser).length !== 0) {
      navigate("../");
    }
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
        className="wrapper"
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Box
          className="main-login-div"
          mt="105"
          bgColor="blackAlpha.100"
          h="600px"
          w="50%"
          display="flex"
          alignItems="center"
          flexDirection="column"
          borderRadius="15"
        >
          <Text fontSize="6xl">Log In</Text>
          <Box
            className="inputs"
            mt="55"
            h="200px"
            display="flex"
            flexDirection="column"
            w="80%"
            justifyContent="space-between"
          >
            <Formik
              validationSchema={loginSchema}
              initialValues={initialValues}
              onSubmit={async ({ email, password }) => {
                try {
                  setIsLoading(true);
                  const tokenRes = await dispatch(
                    getTokenByLogin({ email, password })
                  );
                  const accessToken = tokenRes.payload;
                  console.log("TOKEN FROM LOGIN:", accessToken);
                  setIsLoading(false);
                  try {
                    const res = await dispatch(
                      getCurrentUser(accessToken)
                    ).unwrap();
                    console.log("test: ", res);
                    navigate("../");
                  } catch (currentUserErr: any) {
                    let errorMessage =
                      "An error occurred while fetching the current user.";
                    if (currentUserErr.response) {
                      if (currentUserErr.response.status === 403) {
                        errorMessage = "Invalid Token";
                      } else {
                        errorMessage = `Error ${currentUserErr.response.status}`;
                      }
                    }
                    toast({
                      title: "Error",
                      description: errorMessage,
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                      position: "top",
                    });
                  }
                } catch (err: any) {
                  let errorMessage = "An error occurred during login.";
                  if (err.response) {
                    if (err.response.status === 401) {
                      errorMessage = "Email or Password is incorrect";
                    } else {
                      errorMessage = `Error ${err.response.status}`;
                    }
                  }
                  console.log("Error:", err);
                  toast({
                    title: "Error",
                    description: errorMessage,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                  });
                  setIsLoading(false);
                }
              }}
            >
              {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
                // console.log('errors ', errors);
                // console.log('values ', values);
                return (
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      w="100%"
                      h="220px"
                      display="flex"
                      flexDir="column"
                      justifyContent="space-between"
                    >
                      <AdminPanelInput
                        label="Email"
                        error={errors.email}
                        errorMessage={errors.email}
                        helperText="Nice Job"
                        min={0}
                        id="email"
                        inputValue={values.email}
                        handleChange={handleChange}
                        onBlur={handleBlur}
                        text
                      />
                      <AdminPanelInput
                        label="Password"
                        error={errors.password}
                        errorMessage={errors.password}
                        helperText="Nice Job"
                        min={0}
                        id="password"
                        inputValue={values.password}
                        handleChange={handleChange}
                        onBlur={handleBlur}
                        password
                      />
                    </Box>
                    <Button
                      isLoading={isLoading}
                      type="submit"
                      colorScheme="blue"
                      mt="55"
                      w="70%"
                      h="60px"
                      fontSize="2xl"
                      onClick={() => {}}
                    >
                      Log In
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
