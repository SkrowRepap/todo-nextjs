import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  Circle,
  Container,
  Flex,
  Heading,
  IconButton,
  ResponsiveValue,
  Spacer,
} from "@chakra-ui/react";
import React from "react";

type Props = {};

type TagProps = {
  name: string;
  color: string;
};

const Tag = (props: TagProps) => {
  return (
    <>
      <Flex gap="3.5" align={"center"}>
        <Circle size="30px" bg={props.color} />
        <Heading fontSize="md" fontWeight={"medium"}>
          {props.name}
        </Heading>
      </Flex>
    </>
  );
};

const Head = () => {
  return (
    <>
      <Flex align={"center"} mb={"2"}>
        {/* <Spacer /> */}
        <Button
          aria-label="Add Tag"
          leftIcon={<AddIcon />}
          variant={"solid"}
          colorScheme="teal"
          w="full"
        >
          Add Tag
        </Button>
      </Flex>
    </>
  );
};

function LeftMenu({}: Props) {
  return (
    <>
      <Flex flex={"1"}>
        <Container>
          <Flex direction={"column"} gap="6">
            <Head />
            <Tag color="yellow.500" name="work" />
            <Tag color="red.500" name="school" />
            <Tag color="teal.500" name="home" />
            <Checkbox colorScheme="blackAlpha" mt={"4"}>
              Hide Done Tasks
            </Checkbox>
          </Flex>
        </Container>
      </Flex>
    </>
  );
}

export default LeftMenu;
