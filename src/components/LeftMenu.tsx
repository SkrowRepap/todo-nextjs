import {
  Button,
  Checkbox,
  Circle,
  Container,
  Flex,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import style from "../styles/Custom.module.css";
import { Tag } from "@/types/TodoTypes";
import { useBoundStore } from "@/store/useStore";
import { ToggleShowTodoContext } from "@/context/ToggleShowTodo";
import { AiOutlineTags } from "react-icons/ai";

type Props = {};

const Tag = (props: Tag) => {
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

const TagList = () => {
  const taglist = useBoundStore((state) => state.tags);
  const hasHydrated = useBoundStore((state) => state.hasHydrated);
  return (
    <>
      <Flex
        direction={{ base: "row", md: "column" }}
        gap="7"
        justify={"start"}
        minW={"0"}
        overflow={"hidden"}
        _hover={{ overflowX: "auto" }}
        scrollSnapType={"x"}
        className={style.scrollGutter}
        p="2"
      >
        {hasHydrated === false ? (
          <>Loading...</>
        ) : (
          <>
            {taglist.map((tag) => (
              <Tag color={tag.color} name={tag.name} key={tag.id} id={tag.id} />
            ))}
          </>
        )}
      </Flex>
    </>
  );
};

function LeftMenu({}: Props) {
  const toggleHideDoneTasks = useContext(ToggleShowTodoContext);
  return (
    <>
      <Flex flex={"1"}>
        <Container py="4">
          <Flex direction={"column"} gap="6">
            <TagList />
            <Button
              aria-label="Add Tag"
              colorScheme="twitter"
              rightIcon={<AiOutlineTags />}
            >
              Add Tag
            </Button>
            <Checkbox
              colorScheme="blackAlpha"
              mt={"4"}
              onChange={(e) => toggleHideDoneTasks.toggleShowHidden()}
            >
              Hide Done Tasks
            </Checkbox>
          </Flex>
        </Container>
      </Flex>
    </>
  );
}

export default LeftMenu;
