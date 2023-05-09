import { Box } from "@chakra-ui/react";
import React from "react";

export const ColorsDisplay = (
  colors: string[],
  activeColor: string | undefined,
  setState: any
) => {
  console.log("activeColor: ", activeColor);
  return colors.map((color, index) => {
    switch (color) {
      case "silver":
        return (
          <Box
            outline={activeColor === "silver" ? "solid" : "none"}
            key={index}
            cursor="pointer"
            w="100px"
            h="55px"
            bgColor="#C0C0C0"
            borderRadius="7px"
            boxShadow="xl"
            _hover={{
              boxShadow: "dark-lg",
              transitionDuration: ".3s",
            }}
            onClick={() => {
              setState("silver");
            }}
          />
        );
      case "gold":
        return (
          <Box
            w="100px"
            h="55px"
            outline={activeColor === "gold" ? "solid" : "none"}
            key={index}
            cursor="pointer"
            bgColor="#FFD700"
            borderRadius="7px"
            boxShadow="xl"
            _hover={{
              boxShadow: "dark-lg",
              transitionDuration: ".3s",
            }}
            onClick={() => {
              setState("gold");
            }}
          />
        );
      case "space_grey":
        return (
          <Box
            w="100px"
            h="55px"
            outline={activeColor === "space_grey" ? "solid" : "none"}
            key={index}
            cursor="pointer"
            bgColor="#808080"
            borderRadius="7px"
            boxShadow="xl"
            _hover={{
              boxShadow: "dark-lg",
              transitionDuration: ".3s",
            }}
            onClick={() => {
              setState("space_grey");
            }}
          />
        );
      default:
        return null;
    }
  });
};
