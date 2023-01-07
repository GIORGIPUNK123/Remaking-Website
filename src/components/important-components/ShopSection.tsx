import {
  Box,
  Text,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { itemsState, valueState } from "../../atoms";
import { Loading } from "../Loading";
import { ShopBox } from "../ShopBox";
import { Header } from "./Header";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { ItemTypes, PriceRangeSliderTypes, CheckBoxTypes } from "../../types";
const DisplayShopBoxes = (props: {
  items: ItemTypes[];
  sliceValue: number;
}) => {
  return (
    <>
      {props.items.slice(0, props.sliceValue).map((item) => (
        <ShopBox
          key={item.id}
          itemId={item.id}
          itemName={item.name}
          itemPrice={item.price}
          itemSalePrice={item.salePrice}
          itemGelPrice={item.gelPrice}
          itemSaleGelPrice={item.saleGelPrice}
          itemImages={item.images}
          shop
        />
      ))}
    </>
  );
};

const PriceRangeSlider = ({
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

const Checkboxes = ({
  isMac,
  setIsMac,
  isIphone,
  setIsIphone,
  isAirpods,
  setIsAirpods,
  filterTypes,
  setFilterTypes,
}: CheckBoxTypes) => {
  return (
    <>
      <Checkbox
        isChecked={isIphone}
        value="isIphone"
        colorScheme={"blue"}
        onChange={() => {
          setIsIphone(!isIphone);
          const newFilterTypes = filterTypes.includes("iphone")
            ? filterTypes.filter((t: string) => t !== "iphone")
            : [...filterTypes, "iphone"];
          setFilterTypes(newFilterTypes);
        }}
        size="lg"
        mb="5px"
      >
        Iphone
      </Checkbox>
      <Checkbox
        mt="5px"
        isChecked={isMac}
        value="mac"
        colorScheme={"blue"}
        onChange={() => {
          setIsMac(!isMac);
          const newFilterTypes = filterTypes.includes("mac")
            ? filterTypes.filter((t: string) => t !== "mac")
            : [...filterTypes, "mac"];
          setFilterTypes(newFilterTypes);
        }}
        size="lg"
      >
        Mac
      </Checkbox>
      <Checkbox
        mt="5px"
        isChecked={isAirpods}
        value="airpods"
        colorScheme={"blue"}
        onChange={() => {
          setIsAirpods(!isAirpods);
          const newFilterTypes = filterTypes.includes("airpods")
            ? filterTypes.filter((t: string) => t !== "airpods")
            : [...filterTypes, "airpods"];
          setFilterTypes(newFilterTypes);
        }}
        size="lg"
      >
        Airpods
      </Checkbox>
    </>
  );
};

export const ShopSection = () => {
  const currentValue = useRecoilValue(valueState);
  const getInputText = (text: string) => {
    setInputText(text);
  };
  const [isMac, setIsMac] = useState(false);
  const [isIphone, setIsIphone] = useState(false);
  const [isAirpods, setIsAirpods] = useState(false);
  const [inputText, setInputText] = useState("");
  const items = useRecoilValue(itemsState);
  const [filterTypes, setFilterTypes] = useState<string[]>([]);
  const maxPrice =
    currentValue === "usd"
      ? Math.max(...items.map((item) => item.price))
      : Math.max(...items.map((item) => item.gelPrice));
  const [minSliderValue, setMinSliderValue] = useState(0);
  const [maxSliderValue, setMaxSliderValue] = useState(maxPrice);
  const filteredItems: ItemTypes[] = items.filter((item) => {
    console.log("item: ", item);
    const priceField = currentValue === "usd" ? "price" : "gelPrice";
    const containsInputText = item.name.toLowerCase().includes(inputText);
    return (
      (filterTypes.length === 0 || filterTypes.includes(item.type)) &&
      containsInputText &&
      item[priceField] > minSliderValue &&
      item[priceField] <= maxSliderValue
    );
  });
  const [sliceValue, setSliceValue] = useState(6);
  if (filteredItems !== undefined) {
    return (
      <>
        <Header
          getInputText={getInputText}
          login="../login"
          register="../register"
          profile="../profile"
        />
        <Box bg="whiteAlpha.800" h="75px"></Box>
        <Box
          display="flex"
          flexDir={{ base: "column", xl: "row" }}
          alignItems={{ base: "center", xl: "unset" }}
          ml="5%"
          mr="5%"
        >
          <Box
            boxShadow="dark-lg"
            display="flex"
            bg="whiteAlpha.100"
            mt="50px"
            w={{ base: "80%", xl: "30%" }}
            borderRadius="15px"
            flexDir="column"
            alignItems="center"
            minH="fit-content"
          >
            <PriceRangeSlider
              minSliderValue={minSliderValue}
              setMinSliderValue={setMinSliderValue}
              maxSliderValue={maxSliderValue}
              setMaxSliderValue={setMaxSliderValue}
              maxPrice={maxPrice}
            />
            <Box
              boxShadow="2xl"
              display="flex"
              bg="whiteAlpha.100"
              mt="30px"
              mb="30px"
              w="90%"
              borderRadius="15px"
              flexDir="column"
            >
              <Box
                mt="30px"
                mb="30px"
                ml="5%"
                mr="5%"
                display="flex"
                flexDir="column"
                justifyContent="space-evenly"
                align-items="center"
              >
                <Checkboxes
                  filterTypes={filterTypes}
                  setFilterTypes={setFilterTypes}
                  isMac={isMac}
                  setIsMac={setIsMac}
                  isIphone={isIphone}
                  setIsIphone={setIsIphone}
                  isAirpods={isAirpods}
                  setIsAirpods={setIsAirpods}
                />
              </Box>
            </Box>
          </Box>
          <Box
            mt={{ base: "40px", xl: "0" }}
            pl={{ base: "0", xl: "35px" }}
            w={{ base: "unset", xl: "70%" }}
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
          >
            <DisplayShopBoxes items={filteredItems} sliceValue={sliceValue} />
          </Box>
        </Box>
      </>
    );
  } else return <Loading />;
};
