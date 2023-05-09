import React from "react";
import { PriceRangeSliderTypes } from "../../types";
import {
  Box,
  NumberInput,
  NumberInputField,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
export const PriceRangeSlider = ({
  maxPrice,
  minSliderValue,
  setMinSliderValue,
  maxSliderValue,
  setMaxSliderValue,
}: PriceRangeSliderTypes) => {
  return (
    <Box
      boxShadow="2xl"
      mt="30px"
      pt="25px"
      pb="25px"
      pl="25px"
      pr="25px"
      display="flex"
      flexDir="column"
      w="90%"
      borderRadius="15px"
      alignSelf="center"
      textAlign="center"
      bg="whiteAlpha.100"
    >
      <Box display="flex" justifyContent="space-evenly">
        <NumberInput
          w="110px"
          allowMouseWheel
          value={minSliderValue}
          min={0}
          onChange={(value) => setMinSliderValue(parseInt(value))}
        >
          <NumberInputField />
        </NumberInput>
        <NumberInput
          w="110px"
          allowMouseWheel
          value={maxSliderValue}
          max={maxPrice}
          onChange={(value) => setMaxSliderValue(parseInt(value))}
        >
          <NumberInputField />
        </NumberInput>
      </Box>
      <Box
        mt="25px"
        bg="whiteAlpha.50"
        borderRadius="15px"
        h="50px"
        display="flex"
        pl="35px"
        pr="35px"
      >
        <RangeSlider
          aria-label={["min", "max"]}
          defaultValue={[0, maxPrice]}
          max={maxPrice}
          onChange={(values) => {
            setMinSliderValue(values[0]);
            setMaxSliderValue(values[1]);
          }}
        >
          <RangeSliderTrack bg="red.100">
            <RangeSliderFilledTrack bg="tomato" />
          </RangeSliderTrack>
          <RangeSliderThumb boxSize={6} index={0} />
          <RangeSliderThumb boxSize={6} index={1} />
        </RangeSlider>
      </Box>
    </Box>
  );
};
