import React, { useEffect, useState } from 'react';
import { LangAndCurrency } from '../inside-components/LangAndCurrency';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Heading, Image, Input, Text } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { useCookies } from 'react-cookie';
import profile from '../../images/profile.svg';
import burgerBar from '../../images/burger-bar.svg';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSlice } from '../../store/slices/currentUserSlice';
import { UserType } from '../../types';
import { Loading } from '../Loading';
export const Header: React.FC<{
  getInputText?: (text: string) => void;
  login?: string;
  register?: string;
  profile?: string;
}> = (props) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  console.log('Token ', cookies.accessToken);
  const currentUserObj = useSelector(
    (state: {
      currentUser: { currentUser: UserType; error: boolean; loading: boolean };
    }) => state.currentUser
  );
  const languageObj = useSelector(
    (state: { language: { lang: 'en' | 'us' } }) => state.language
  );
  const [burgerBarOpen, setBurgerBarOpen] = useState(false);
  const dispatch = useDispatch();
  console.log('currentUserOBJ: ', currentUserObj);
  if (currentUserObj.loading) {
    return <Loading />;
  }
  if (burgerBarOpen) {
    return (
      <>
        <Box
          overflowY='auto'
          top='0'
          left='0'
          position='fixed'
          zIndex='2'
          display='flex'
          flexDirection='column'
          h='100vh'
          w='100%'
          bgColor='rgb(18 18 18)'
        >
          <Box
            h='64px'
            display='flex'
            justifyContent='space-between'
            ml='50px'
            mr='50px'
          >
            <Image
              filter='invert(100%)'
              className='burger-bar'
              cursor='pointer'
              onClick={() => {
                setBurgerBarOpen(!burgerBarOpen);
              }}
              src={burgerBar}
              w='30px'
            />
          </Box>
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='space-evenly'
            fontSize='24px'
            h='250px'
          >
            <Link className='header-li' to='/'>
              {languageObj.lang === 'en' ? 'HOME' : 'სახლი'}
            </Link>
            <Link className='header-li' to='/shop'>
              {languageObj.lang === 'en' ? 'SHOP' : 'მაღაზია'}
            </Link>
            <Link className='header-li' to='/about'>
              {languageObj.lang === 'en' ? 'ABOUT US' : 'ჩვენს შესახებ'}
            </Link>
          </Box>
          <Box display='flex' alignItems='center' flexDir='column'>
            {Object.keys(currentUserObj.currentUser).length === 0 ? (
              <>
                <Link to={props.login!} style={{ fontSize: '24px' }}>
                  Sign In
                </Link>
                <Link to={props.register!} style={{ fontSize: '24px' }}>
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Box
                  display='flex'
                  mr='45px'
                  alignItems='center'
                  onClick={() => {
                    navigate(props.profile!);
                  }}
                  cursor='pointer'
                >
                  <Text fontSize='24px' ml='55px' pb='5px'>
                    {currentUserObj.currentUser.name}
                  </Text>
                  <Image h='30px' ml='4' src={profile} alt='profile' />
                </Box>
              </>
            )}
          </Box>
        </Box>
      </>
    );
  }
  return (
    <header className='header'>
      <Box fontSize='24px' zIndex={1}>
        <Text fontWeight='600'>
          {languageObj.lang === 'en' ? 'Apple Kingdom' : 'ეფლის სამეფო'}
        </Text>
      </Box>
      <Box
        display={{ base: 'none', xl: 'flex' }}
        justifyContent='space-between'
        w={{ xl: '350px', '2xl': '500px' }}
        position={{ '2xl': 'absolute' }}
        left={{ '2xl': '50%' }}
        transform={{ '2xl': 'translate(-50%)' }}
        fontSize='18px'
        fontWeight='600'
      >
        <Link className='header-li' to='/'>
          {languageObj.lang === 'en' ? 'HOME' : 'სახლი'}
        </Link>
        <Link className='header-li' to='/shop'>
          {languageObj.lang === 'en' ? 'SHOP' : 'მაღაზია'}
        </Link>
        <Link className='header-li' to='/about'>
          {languageObj.lang === 'en' ? 'ABOUT US' : 'ჩვენს შესახებ'}
        </Link>
      </Box>
      <Box
        bg='inherit'
        display={{ base: 'none', xl: 'flex' }}
        alignItems='center'
      >
        {props.getInputText ? (
          <>
            <Box>
              <Input
                h='35px'
                w={{ '2xl': '240px' }}
                placeholder='Search'
                onChange={(e) => {
                  props.getInputText!(e.target.value);
                }}
              />
            </Box>
          </>
        ) : null}

        {currentUserObj.currentUser !== undefined ? (
          <>
            <Button
              variant='ghost'
              size='sm'
              fontSize='18px'
              onClick={() => {
                navigate(props.profile!);
              }}
              ml='25px'
            >
              <Text fontSize='18px' pb='5px'>
                {currentUserObj.currentUser.name}
              </Text>
              <Image
                borderRadius='full'
                h='30px'
                ml='4'
                src={profile}
                alt='profile'
              />
            </Button>
          </>
        ) : (
          <>
            <Box
              ml='50px'
              display='flex'
              w='255px'
              justifyContent='space-between'
              alignItems='center'
            >
              <Button
                variant='ghost'
                size='sm'
                fontSize='18px'
                onClick={() => {
                  navigate(props.login!);
                }}
              >
                {languageObj.lang === 'en' ? 'Sign In' : 'შესვლა'}
              </Button>
              <Button
                variant='ghost'
                size='sm'
                fontSize='18px'
                onClick={() => {
                  navigate(props.register!);
                }}
              >
                {languageObj.lang === 'en' ? 'Sign Up' : 'რეგისტრაცია'}
              </Button>
            </Box>
          </>
        )}
      </Box>
      <Image
        display={{ base: 'block', xl: 'none' }}
        w='30px'
        filter='invert(100%)'
        className='burger-bar'
        cursor='pointer'
        onClick={() => {
          setBurgerBarOpen(!burgerBarOpen);
        }}
        src={burgerBar}
      />
      <Box
        pos='absolute'
        left='0'
        top='64px'
        w='300px'
        h='50px'
        clipPath='polygon(0% 0%, 100% 0%, 82% 100%, 0% 100%)'
        display='flex'
        bg='gray.900'
        // alignItems="center"
        // justifyContent="center"
      >
        <Box ml='50px'>
          <LangAndCurrency size='sm' width='72px' />
        </Box>
      </Box>
    </header>
  );
};
