import { Flex, Wrap } from "@chakra-ui/react";
import React from "react";
import Todo from "./Todo";

type Props = {};

function TodoList({}: Props) {
  return (
    <>
      <Flex flex={"8"}>
        <Wrap spacing="30px" p={"3"} justify={{ base: "center", md: "start" }}>
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
        </Wrap>
      </Flex>
    </>
  );
}

export default TodoList;
