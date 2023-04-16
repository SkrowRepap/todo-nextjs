import Head from "next/head";
import React from "react";
import { NextPageWithLayout } from "../_app";
import Navbar from "@/components/Layout/Navbar";
import { ReactElement } from "react";
import Todo from "@/components/Todo";
import { Flex } from "@chakra-ui/react";
import LeftMenu from "@/components/LeftMenu";
import TodoList from "@/components/TodoList";

type Props = {};

const Home: NextPageWithLayout = ({}: Props) => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Flex
        p={4}
        gap={"6"}
        py="6"
        flexDirection={{ base: "column", md: "row" }}
      >
        <LeftMenu />
        <TodoList />
      </Flex>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => {
  return (
    <>
      <Navbar />
      {page}
    </>
  );
};

export default Home;
