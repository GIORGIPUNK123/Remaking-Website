import { Box, useToast, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useCookies } from "react-cookie";
import { currentUserState } from "../../../atoms";
import { useNavigate } from "react-router-dom";
export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const toast = useToast();
  const currentUser = useRecoilValue(currentUserState);
  useEffect(() => {
    if (Object.keys(currentUser).length === 0) {
      navigate("../");
    }
  }, []);
  return (
    <Box>
      <Text>{`ID: ${currentUser.id}`}</Text>
      <Text>{`NAME: ${currentUser.name}`}</Text>
      <Text>{`SURNAME: ${currentUser.surname}`}</Text>
    </Box>
  );
};
