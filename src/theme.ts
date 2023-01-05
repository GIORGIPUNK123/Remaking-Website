import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const styles = {
  global: (props: any) => ({
    // styles for the `body`
    body: {
      color: props.colorMode === "dark" ? "white" : "gray.900",
      bg: props.colorMode === "dark" ? "default" : "#9AE6B4",
    },
    th: {
      borderColor:
        props.colorMode === "dark"
          ? "red.600 !important"
          : "red.600 !important",
    },
    td: {
      borderColor:
        props.colorMode === "dark"
          ? "red.600 !important"
          : "red.600 !important",
    },
  }),
};

const overrides = {
  components: {
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        fontWeight: "bold", // Normally, it is "semibold"
      },
      // 2. We can add a new button size or extend existing
      sizes: {
        xl: {
          h: "56px",
          fontSize: "lg",
          px: "32px",
        },
      },
      // 3. We can add a new visual variant
      variants: {
        "with-shadow": {
          bg: "red.400",
          boxShadow: "0 0 2px 2px #efdfde",
        },
        // 4. We can override existing variants
        solid: (props: any) => ({
          bg: props.colorMode === "dark" ? "red.300" : "red.500",
        }),
        // 5. We can add responsive variants
        sm: {
          bg: "teal.500",
          fontSize: "md",
        },
      },
    },
  },
};

const theme = extendTheme({
  config,
  styles,
  overrides,
});

export default theme;
