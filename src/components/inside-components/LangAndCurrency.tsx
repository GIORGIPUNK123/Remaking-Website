import React from 'react';
import { Select, useSafeLayoutEffect } from '@chakra-ui/react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { useDispatch, useSelector } from 'react-redux';
import { changeLang } from '../../store/slices/languageSlice';
import { changeCurrency } from '../../store/slices/currencySlice';
export const LangAndCurrency = (props: { size: string; width: string }) => {
  const languageObj = useSelector(
    (state: { language: { lang: 'en' | 'en' } }) => state.language
  );
  const currencyObj = useSelector(
    (state: { currency: { currency: 'usd' | 'gel' } }) => state.currency
  );
  const dispatch = useDispatch();
  return (
    <div className='langAndCurrency'>
      <Select
        size={props.size}
        w={props.width}
        value={languageObj.lang}
        onChange={(e) => {
          dispatch(changeLang(e.target.value));
        }}
      >
        <option value='ge'>GE</option>
        <option value='en'>EN</option>
      </Select>
      <Select
        size={props.size}
        w={props.width}
        value={currencyObj.currency}
        onChange={(e) => {
          dispatch(changeCurrency(e.target.value));
        }}
      >
        <option value='gel'>GEL</option>
        <option value='usd'>USD</option>
      </Select>
    </div>
  );
};
