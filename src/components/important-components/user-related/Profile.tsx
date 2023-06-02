import { Box, useToast, Text, Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserType } from "../../../types";
import { logout } from "../../../store/slices/currentUserSlice";
export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const dispatch = useDispatch();
  const toast = useToast();
  const currentUserObj = useSelector(
    (state: {
      currentUser: { currentUser: UserType; error: boolean; loading: boolean };
    }) => state.currentUser
  );
  useEffect(() => {
    if (Object.keys(currentUserObj.currentUser).length === 0) {
      navigate("../");
    }
  }, []);
  return (
    <Box>
      <Text>{`ID: ${currentUserObj.currentUser.id}`}</Text>
      <Text>{`NAME: ${currentUserObj.currentUser.name}`}</Text>
      <Text>{`SURNAME: ${currentUserObj.currentUser.surname}`}</Text>
      <Button
        onClick={() => {
          dispatch(logout());
          navigate("../");
        }}
        colorScheme="blue"
      >
        Log Out
      </Button>
    </Box>
  );
};
