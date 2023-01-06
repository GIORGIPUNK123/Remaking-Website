import { Box, Button, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useFormik, yupToFormErrors, FieldArray, Formik } from "formik";
import { AdminPanelInput } from "../adminPanel/AdminPanelInput";
import * as Yup from "yup";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../atoms";
export const Register = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  console.log("Token ", cookies.accessToken);
  const navigate = useNavigate();
  const currentUser = useRecoilValue(currentUserState);
  useEffect(() => {
    if (Object.keys(currentUser).length !== 0) {
      navigate("../");
    }
  }, []);

  const [emailExists, setEmailExists] = useState(false);
  const toast = useToast();
  const initialValues = {
    email: "",
    password: "",
    repeatPassword: "",
  };
  const [isLoading, setIsLoading] = useState(false);
  const registerSchema = Yup.object().shape({
    email: Yup.string()
      .required()
      .email()
      .min(2, "Email has to contain more than 2 letters")
      .test("test-name", "Email already exists", (value) => {
        fetch("https://geolab-project-backend.onrender.com/userexists", {
          method: "POST",
          body: JSON.stringify({ email: value }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((values) => {
            if (values.emailExists === true) {
              setEmailExists(false);
            } else {
              setEmailExists(true);
            }
            console.log("fetch values: ", values);
          })
          .catch((err) => {
            console.log("Error: ", JSON.stringify(err));
          });
        return emailExists;
      })
      .max(50, "Email has to contain less than 50 letters"),

    password: Yup.string()
      .required()
      .min(6, "Password has to contain more than 6 letters")
      .max(15, "Password has to contain less than 15 letters"),
    repeatPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  });
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
          <Text fontSize="6xl">Sign Up</Text>
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
              validationSchema={registerSchema}
              initialValues={initialValues}
              onSubmit={(values) => {
                axios({
                  url: "https://geolab-project-backend.onrender.com/register",
                  method: "POST",
                  data: JSON.stringify({
                    email: values.email,
                    password: values.password,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then((res) => {
                    console.log("fetch res: ", res);
                  })
                  .catch((err) => {
                    console.log("Error: ", JSON.stringify(err));
                    toast({
                      title: "Error.",
                      description: err.message,
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                      position: "top",
                    });
                  });
                useEffect(() => {
                  const timer = setTimeout(() => {
                    setIsLoading(false);
                  }, 1500);
                  return () => clearTimeout(timer);
                }, []);

                // alert(JSON.stringify(values, null, 2));
              }}
            >
              {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
                console.log("errors ", errors);
                console.log("values ", values);
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
                      h="300px"
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
                      <AdminPanelInput
                        label="Repeat Password"
                        error={errors.repeatPassword}
                        errorMessage={errors.repeatPassword}
                        helperText="Nice Job"
                        min={0}
                        id="repeatPassword"
                        inputValue={values.repeatPassword}
                        handleChange={handleChange}
                        onBlur={handleBlur}
                        autocomplete="off"
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
