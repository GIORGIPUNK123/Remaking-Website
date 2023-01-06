import React from "react";
import { Select, useSafeLayoutEffect } from "@chakra-ui/react";
import { languageState, valueState } from "../../atoms";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
export const LangAndCurrency = () => {
  const [language, setLanguage] = useRecoilState(languageState);
  const [value, setValue] = useRecoilState(valueState);
  console.log('Language" ', language);
  console.log('Value" ', value);
  return (
    <div className="langAndCurrency">
      <Select
        size="md"
        w="85px"
        value={language}
        onChange={(e) => {
          setLanguage(e.target.value);
        }}
      >
        <option value="ge">GE</option>
        <option value="en">EN</option>
      </Select>
      <Select
        size="md"
        w="85px"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        <option value="gel">GEL</option>
        <option value="usd">USD</option>
      </Select>
    </div>
  );
};