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

const TagArray: TagProps[] = [
  {
    name: "work",
    color: "yellow.500",
  },
  {
    name: "school",
    color: "red.500",
  },
  {
    name: "home",
    color: "teal.500",
  },
  {
    name: "workout",
    color: "orange.500",
  },
];

type TagProps = {
  name: string;
  color: string;
};

const Tag = (props: TagProps) => {
  return (
    <>
      <Flex gap="3.5" align={"center"} scrollSnapAlign={"start"}>
        <Circle size="30px" bg={props.color} />
        <Heading fontSize="md" fontWeight={"medium"}>
          {props.name}
        </Heading>
      </Flex>
    </>
  );
};

const TagList = ({ props }: { props: TagProps[] }) => {
  return (
    <>
      <Flex
        direction={{ base: "row", md: "column" }}
        gap="7"
        justify={"start"}
        minW={"0"}
        overflow={"auto"}
        scrollSnapType={"x"}
      >
        {props.map((tag) => (
          <Tag color={tag.color} name={tag.name} key={tag.color} />
        ))}
      </Flex>
    </>
  );
};

const Head = () => {
  return (
    <>
      <Flex align={"center"} mb={"2"}>
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
            <TagList props={TagArray} />
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
