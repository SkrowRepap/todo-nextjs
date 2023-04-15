"use client";

import React from "react";
import { Button, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { ButtonGroup } from "@chakra-ui/react";
import ToggleThemeMode from "../Buttons/ToggleThemeMode";
import AddTodoModal from "../Modals/AddTodoModal";
import Link from "next/link";

function Navbar() {
  return (
    <nav>
      <Flex
        minW={"full"}
        gap="2"
        p="4"
        py="2.5"
        pr={{ base: "4", md: "12" }}
        alignItems={"center"}
        background={"gray.100"}
      >
        <Link href={"/"}>
          <Flex align={"center"} p="2" gap="2">
            <Image src="/favicon.ico" alt="Ninja Todo" boxSize="30" />
            <Heading size="md" color="purple.800" fontWeight={"bold"}>
              <Text color={"blue.400"} as={"span"}>
                Ninja
              </Text>
              Todo
            </Heading>
          </Flex>
        </Link>
        <Spacer />
        <ButtonGroup gap={4}>
          <AddTodoModal />
          <ToggleThemeMode />
        </ButtonGroup>
      </Flex>
    </nav>
  );
}

export default Navbar;
