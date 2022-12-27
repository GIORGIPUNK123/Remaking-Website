import { useState } from "react";
import { LangAndCurrency } from "../inside-components/LangAndCurrency";
import { HomeSection } from "./HomeSection";
import { Link } from "react-router-dom";
import { Input, Text } from "@chakra-ui/react";
import { languageState } from "../../atoms";
import { useRecoilValue } from "recoil";

export const Header = (props) => {
  const language = useRecoilValue(languageState);
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
        <div className="header-top-right">
          <Input
            placeholder="Search"
            allowClear={true}
            onChange={(e) => {
              props.getInputText(e.target.value);
            }}
          />
        </div>
      </div>
    </header>
  );
};
