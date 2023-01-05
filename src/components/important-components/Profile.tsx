import { Box, useToast, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useCookies } from "react-cookie";
export const Profile: React.FC = () => {
  interface User {
    id: number;
    email: string;
    locked: boolean;
    name: string;
    surname: string;
    password: string;
    rank: string;
    verified: boolean;
  }
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [user, setUser] = useState<User>();
  const toast = useToast();
  useEffect(() => {
    axios({
      url: "http://localhost:3006/profile",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    })
      .then((res: any) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
        console.log("Error Status: ", err.response.status);
        toast({
          title: `Error. `,
          description:
            err.response.status === 401
              ? "Email or Password is incorrect"
              : err.response.status,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  }, []);
  if (user === undefined) {
    return null;
  } else {
    return (
      <Box>
        <Text>{user.name}</Text>
        <Text>{user.surname}</Text>
      </Box>
    );
  }
};
