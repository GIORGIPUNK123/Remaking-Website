import {
  Box,
  Button,
  Input,
  useNumberInput,
  useStatStyles,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import cartImage from "../../images/add-to-cart.svg";
import { useRecoilValue } from "recoil";
import { languageState } from "../../atoms";
import { handleAddToCartClick } from "../../functions/BuildPageFunctions";
export const BuildBuyingPart = (props: {
  realProduct?: { price: number; gelPrice: number; inStock: number };
}) => {
  const language = useRecoilValue(languageState);
  const [itemAmount, setItemAmount] = useState(1);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      defaultValue: 1,
      min: 1,
      max: props.realProduct ? props.realProduct.inStock : 1,
      value: itemAmount,
      onChange: (e) => {
        setItemAmount(parseInt(e));
      },
    });
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  console.log("!!!props.realProduct: ", !!!props.realProduct);
  return (
    <Box
      mt="20"
      mb="20"
      w="80%"
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
      flexDir="column"
    >
      <Box
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent={{ base: "center", "2xl": "space-between" }}
        flexDir={{ base: "column", "2xl": "row" }}
      >
        <Box className="amount-buttons" maxW={{ base: "100%", "2xl": "35%" }}>
          <Button h="55px" {...dec}>
            -
          </Button>
          <Input
            h="55px"
            // maxW={"60px"}
            mx={"2px"}
            {...input}
            textAlign="center"
          />
          <Button h="55px" {...inc}>
            +
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" flexWrap="wrap">
          <Button
            colorScheme={"green"}
            size="lg"
            h="55px"
            w="230px"
            m="5px 7px"
            isDisabled={!props.realProduct}
          >
            {language === "en"
              ? `Buy now ${
                  props.realProduct ? props.realProduct.gelPrice + "₾" : ""
                }`
              : `იყიდე ახლავე ${
                  props.realProduct ? props.realProduct.gelPrice + "₾" : ""
                }`}
          </Button>
          <Button
            colorScheme={"blue"}
            size="lg"
            h="55px"
            // w="240px"
            m="5px 7px"
            isDisabled={!props.realProduct}
            onClick={() => {
              handleAddToCartClick();
            }}
          >
            <img
              src={cartImage}
              alt="cartImage"
              width="35px"
              style={{ marginRight: "5px" }}
            />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
