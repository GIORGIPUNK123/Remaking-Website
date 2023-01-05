import React, { useEffect, useState } from "react";
import { LangAndCurrency } from "../inside-components/LangAndCurrency";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Text } from "@chakra-ui/react";
import { languageState } from "../../atoms";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { useCookies } from "react-cookie";
import profile from "../../images/profile.svg";
export const Header: React.FC<{ getInputText?: (text: string) => void }> = (
  props
) => {
  const navigate = useNavigate();
  const language = useRecoilValue(languageState);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  console.log("cookies ", cookies);
  console.log("Token ", cookies.accessToken);

  if (cookies.accessToken == undefined) {
    console.log(`cookie doesn't exits `);
  }
  useEffect(() => {
    axios({
      url: "http://localhost:3006/adminpanel",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    })
      .then((res: any) => {
        console.log("loggedIn: ", loggedIn);
        console.log("res.status ", res.status);
        console.log("values ", res.data);
        console.log("cookies ", cookies);
        setLoggedIn(true);
      })
      .catch((err: any) => {
        console.log("loggedIn: ", loggedIn);
        console.log("Error: ", err);
        setLoggedIn(false);
      });
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
                    navigate("./login");
                  }}
                >
                  Sign In
                </Button>
                <Button colorScheme="blue" ml="20px" w="120px" fontSize="17px">
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
