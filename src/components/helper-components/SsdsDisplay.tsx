import { Box, Text } from "@chakra-ui/react";
import React from "react";
export const SsdsDisplay = (
  ssds: number[],
  activeSsd: number | undefined,
  setState: any,
  language: string
) => {
  return ssds.map((ssd, index) => (
    <Box
      margin="0px 15px 0px 15px"
      key={index}
      bgColor="whiteAlpha.200"
      outline={ssd === activeSsd ? "solid" : "none"}
      w="220px"
      h="75px"
      mt="12"
      borderRadius="15px"
      boxShadow="2xl"
      cursor="pointer"
      _hover={{
        boxShadow: "dark-lg",
        bgColor: "whiteAlpha.300",
        transitionDuration: ".3s",
      }}
      textAlign="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={() => {
        setState(ssd);
      }}
    >
      <Text fontSize="2xl">
        {ssd} {language === "ge" ? "გბ" : "Gb"}
      </Text>
    </Box>
  ));
};
