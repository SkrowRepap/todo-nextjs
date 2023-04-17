import Head from "next/head";
import React, { useEffect } from "react";
import { NextPageWithLayout } from "../_app";
import Navbar from "@/components/Layout/Navbar";
import { ReactElement, useState } from "react";
import Todo from "@/components/TodoNote";
import { Flex } from "@chakra-ui/react";
import LeftMenu from "@/components/LeftMenu";
import TodoList from "@/components/TodoList";

type Props = {};

const Home: NextPageWithLayout = ({}: Props) => {
  const [isHydrated, setIsHydrated] = useState(false);

  //Wait till NextJS rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

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
        {isHydrated ? (
          <>
            {" "}
            <LeftMenu />
            <TodoList />
          </>
        ) : (
          <>Loading...</>
        )}
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
