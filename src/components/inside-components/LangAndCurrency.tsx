import React from 'react';
import { Select } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLang } from '../../store/slices/languageSlice';
import { changeCurrency } from '../../store/slices/currencySlice';
import { useTranslation } from 'react-i18next';

export const LangAndCurrency = (props: { size: string; width: string }) => {
  const { t, i18n } = useTranslation();
  const languageObj = useSelector(
    (state: { language: { lang: 'ge' | 'en' } }) => state.language
  );
  const currencyObj = useSelector(
    (state: { currency: { currency: 'usd' | 'gel' } }) => state.currency
  );
  const dispatch = useDispatch();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  console.log('i18n.language: ', i18n.language);
  return (
    <div className='langAndCurrency'>
      <Select
        size={props.size}
        w={props.width}
        value={languageObj.lang}
        onChange={(e) => {
          // changeLanguage(e.target.value);
          dispatch(changeLang(e.target.value));
        }}
      >
        <option value='ge'>{t('ge')}</option>
        <option value='en'>{t('en')}</option>
      </Select>
      <Select
        size={props.size}
        w={props.width}
        value={currencyObj.currency}
        onChange={(e) => {
          dispatch(changeCurrency(e.target.value));
        }}
      >
        <option value='gel'>{t('gel')}</option>
        <option value='usd'>{t('usd')}</option>
      </Select>
    </div>
  );
};
