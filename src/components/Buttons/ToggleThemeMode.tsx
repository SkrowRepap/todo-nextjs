import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";

type Props = {};

function ToggleThemeMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="DarkMode"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={() => toggleColorMode()}
    />
  );
}

export default ToggleThemeMode;
