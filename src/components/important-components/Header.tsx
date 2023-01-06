import React, { useEffect, useState } from "react";
import { LangAndCurrency } from "../inside-components/LangAndCurrency";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Text } from "@chakra-ui/react";
import { currentUserState, languageState } from "../../atoms";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { useCookies } from "react-cookie";
import profile from "../../images/profile.svg";
export const Header: React.FC<{
  getInputText?: (text: string) => void;
  login?: string;
  register?: string;
}> = (props) => {
  const navigate = useNavigate();
  const language = useRecoilValue(languageState);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  console.log("Token ", cookies.accessToken);
  const currentUser = useRecoilValue(currentUserState);
  useEffect(() => {
    if (Object.keys(currentUser).length !== 0) {
      setLoggedIn(true);
    }
  }, []);
  return (
    <header className="header">
      <div className="header-introduction">
        {language === "en" ? (
          <Text fontSize="4xl">Apple Kingdom</Text>
        ) : (
          <Text fontSize="4xl">ეფლის სამეფო</Text>
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
          <div className="header-top-right">
            <Input
              placeholder="Search"
              onChange={(e) => {
                props.getInputText!(e.target.value);
              }}
            />
            {loggedIn === false ? (
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
              <Link to="./profile" style={{ marginLeft: "15px" }}>
                <img src={profile} alt="profile" />
              </Link>
            )}
          </div>
        ) : null}
      </div>
    </header>
  );
};
