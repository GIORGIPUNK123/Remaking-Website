import React from 'react';
import { Checkbox } from '@chakra-ui/react';
import { CheckBoxTypes } from '../../types';
export const CheckBoxes = ({
  isMac,
  setIsMac,
  isIphone,
  setIsIphone,
  isAirpods,
  setIsAirpods,
}: CheckBoxTypes) => (
  <>
    <Checkbox
      isChecked={isIphone}
      value='isIphone'
      colorScheme={'orange'}
      onChange={() => {
        setIsIphone(!isIphone);
      }}
      size='lg'
      mb='5px'
    >
      Iphone
    </Checkbox>
    <Checkbox
      mt='5px'
      isChecked={isMac}
      value='mac'
      colorScheme={'orange'}
      onChange={() => {
        setIsMac(!isMac);
      }}
      size='lg'
    >
      Mac
    </Checkbox>
    <Checkbox
      mt='5px'
      isChecked={isAirpods}
      value='airpods'
      colorScheme={'orange'}
      onChange={() => {
        setIsAirpods(!isAirpods);
      }}
      size='lg'
    >
      Airpods
    </Checkbox>
  </>
);
