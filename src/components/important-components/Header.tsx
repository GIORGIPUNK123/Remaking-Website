import React, { useEffect, useState } from "react";
import { LangAndCurrency } from "../inside-components/LangAndCurrency";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Image, Input, Text } from "@chakra-ui/react";
import { currentUserState, languageState } from "../../atoms";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { useCookies } from "react-cookie";
import profile from "../../images/profile.svg";
import burgerBar from "../../images/burger-bar.svg";
export const Header: React.FC<{
  getInputText?: (text: string) => void;
  login?: string;
  register?: string;
  profile?: string;
}> = (props) => {
  const navigate = useNavigate();
  const language = useRecoilValue(languageState);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  console.log("Token ", cookies.accessToken);
  const currentUser = useRecoilValue(currentUserState);
  const [burgerBarOpen, setBurgerBarOpen] = useState(false);
  if (burgerBarOpen) {
    return (
      <>
        <Box display="flex" flexDirection="column" h="100vh" w="100%">
          <Box ml="15px" mt="15px">
            <LangAndCurrency />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            h="500px"
            mt="50px"
            justifyContent="space-evenly"
          >
            {language === "en" ? (
              <Link className="header-li" to="/">
                HOME
              </Link>
            ) : (
              <Link className="header-li" to="/">
                სახლი
              </Link>
            )}
            {language === "en" ? (
              <Link className="header-li" to="/shop">
                SHOP
              </Link>
            ) : (
              <Link className="header-li" to="/shop">
                მაღაზია
              </Link>
            )}
            {language === "en" ? (
              <Link className="header-li" to="/about">
                ABOUT US
              </Link>
            ) : (
              <Link className="header-li" to="/about">
                ჩვენს შესახებ
              </Link>
            )}
          </Box>
          <Box display="flex" alignItems="center" flexDir="column">
            {Object.keys(currentUser).length === 0 ? (
              <>
                <Button
                  colorScheme="blue"
                  w="220px"
                  h="50px"
                  fontSize="17px"
                  onClick={() => {
                    navigate(props.login!);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  mt="70px"
                  colorScheme="blue"
                  w="220px"
                  h="50px"
                  fontSize="17px"
                  onClick={() => {
                    navigate(props.register!);
                  }}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Box
                  display="flex"
                  mr="45px"
                  alignItems="center"
                  onClick={() => {
                    navigate(props.profile!);
                  }}
                  cursor="pointer"
                >
                  <Text fontSize="5xl" ml="55px" pb="5px">
                    {currentUser.name}
                  </Text>
                  <Image
                    h="100%"
                    // borderRadius="full"
                    ml="4"
                    src={profile}
                    alt="profile"
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>
        <Image
          className="burger-bar"
          position="absolute"
          top="25px"
          right="20px"
          cursor="pointer"
          onClick={() => {
            setBurgerBarOpen(!burgerBarOpen);
          }}
          src={burgerBar}
        />
      </>
    );
  }
  return (
    <header className="header">
      <div className="header-introduction">
        {language === "en" ? (
          <Text>Apple Kingdom</Text>
        ) : (
          <Text>ეფლის სამეფო</Text>
        )}
      </div>
      <div className="header-bottom-bar">
        <ul className="header-ul">
          {language === "en" ? (
            <Link className="header-li" to="/">
              HOME
            </Link>
          ) : (
            <Link className="header-li" to="/">
              სახლი
            </Link>
          )}
          {language === "en" ? (
            <Link className="header-li" to="/shop">
              SHOP
            </Link>
          ) : (
            <Link className="header-li" to="/shop">
              მაღაზია
            </Link>
          )}
          {language === "en" ? (
            <Link className="header-li" to="/about">
              ABOUT US
            </Link>
          ) : (
            <Link className="header-li" to="/about">
              ჩვენს შესახებ
            </Link>
          )}
        </ul>
        <div className="header-top-left">
          <LangAndCurrency />
        </div>
        {props.getInputText ? (
          <>
            <Input
              className="search"
              placeholder="Search"
              onChange={(e) => {
                props.getInputText!(e.target.value);
              }}
            />
            <Image
              className="burger-bar"
              position="absolute"
              top="25px"
              right="20px"
              cursor="pointer"
              onClick={() => {
                setBurgerBarOpen(!burgerBarOpen);
              }}
              src={burgerBar}
            />
          </>
        ) : null}
        {props.getInputText ? (
          <Box className="header-top-right">
            <Input
              placeholder="Search"
              onChange={(e) => {
                props.getInputText!(e.target.value);
              }}
            />
            {Object.keys(currentUser).length === 0 ? (
              <>
                <Button
                  colorScheme="blue"
                  ml="20px"
                  mr="20px"
                  w="120px"
                  fontSize="17px"
                  onClick={() => {
                    navigate(props.login!);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  colorScheme="blue"
                  ml="20px"
                  w="120px"
                  fontSize="17px"
                  onClick={() => {
                    navigate(props.register!);
                  }}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Box
                  display="flex"
                  mr="45px"
                  alignItems="center"
                  onClick={() => {
                    navigate(props.profile!);
                  }}
                  cursor="pointer"
                >
                  <Text fontSize="2xl" ml="55px" pb="5px">
                    {currentUser.name}
                  </Text>
                  <Image
                    // borderRadius="full"
                    ml="4"
                    src={profile}
                    alt="profile"
                  />
                </Box>
              </>
            )}
          </Box>
        ) : null}
      </div>
    </header>
  );
};
