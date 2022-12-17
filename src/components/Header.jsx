import { useState } from "react";
import { LangAndCurrency } from "./inside-components/LangAndCurrency";
import { HomeSection } from "./HomeSection";
const { Search } = Input;
import { Link } from "react-router-dom";
import { Input, Text } from "@chakra-ui/react";

export const Header = (props) => {
  const [text, setText] = useState("");
  const onSearch = (value) => console.log(value);
  return (
    <header className="header">
      <div className="header-introduction">
        <Text fontSize="4xl">Apple Kingdom</Text>
      </div>
      <div className="header-bottom-bar">
        <ul className="header-ul">
          <Link className="header-li" to={HomeSection}>
            HOME
          </Link>
          <Link className="header-li" to={HomeSection}>
            SHOP
          </Link>
          <Link className="header-li" to={HomeSection}>
            ABOUT US
          </Link>
        </ul>
        <div className="header-top-left">
          <LangAndCurrency />
        </div>
        <div className="header-top-right">
          <Input
            placeholder="Search"
            allowClear={true}
            onChange={(e) => {
              if (e.target.value == undefined) {
                props.getInputText(e.target.validationMessage);
              } else {
                props.getInputText(e.target.value);
                setText(e.target.value);
              }
            }}
          />
        </div>
      </div>
    </header>
  );
};
