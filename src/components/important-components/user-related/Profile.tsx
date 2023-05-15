import { Box, useToast, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';
import { currentUserState } from '../../../atoms';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserType } from '../../../types';
export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['accessToken']);

  const toast = useToast();
  const currentUserObj = useSelector(
    (state: {
      currentUser: { currentUser: UserType; error: boolean; loading: boolean };
    }) => state.currentUser
  );
  useEffect(() => {
    if (Object.keys(currentUserObj.currentUser).length === 0) {
      navigate('../');
    }
  }, []);
  return (
    <Box>
      <Text>{`ID: ${currentUserObj.currentUser.id}`}</Text>
      <Text>{`NAME: ${currentUserObj.currentUser.name}`}</Text>
      <Text>{`SURNAME: ${currentUserObj.currentUser.surname}`}</Text>
    </Box>
  );
};
