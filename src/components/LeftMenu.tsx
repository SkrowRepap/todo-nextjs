import {
  Button,
  Checkbox,
  Circle,
  Container,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useBoolean,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import style from "../styles/Custom.module.css";
import { Tag } from "@/types/TodoTypes";
import { useBoundStore } from "@/store/useStore";
import { ToggleShowTodoContext } from "@/context/ToggleShowTodo";
import AddTagModal from "./Modals/AddTagModal";
import { AddIcon } from "@chakra-ui/icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import ConfirmDeleteTagModal from "./Modals/ConfirmDeleteTagModal";

type Props = {};

const Tag = (props: Tag) => {
  const [hover, setHover] = useBoolean(false);
  return (
    <>
      <Flex
        gap="3.5"
        align={"center"}
        scrollSnapAlign={"start"}
        onMouseOver={() => setHover.on()}
        onMouseLeave={() => setHover.off()}
        w="full"
        grow={0}
      >
        <Circle size="30px" bg={props.color} />
        <Heading fontSize="md" fontWeight={"medium"}>
          {props.name}
        </Heading>
        <Spacer />
        {hover && <TagMenu id={props.id} />}
        {/* <TagMenu /> */}
      </Flex>
    </>
  );
};

const TagMenu = ({ id }: { id: string }) => {
  return (
    <>
      <Menu placement="bottom-end">
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<BsThreeDotsVertical size={"1em"} />}
          variant="none"
          h="fit-content"
          minW="fit-content"
        ></MenuButton>

        <MenuList>
          <ConfirmDeleteTagModal id={id} />
        </MenuList>
      </Menu>
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
      <Flex flex={"1.2"} grow={0} justify={"center"} ml="2">
        <Flex direction={"column"} gap="6" grow={0} py={"4"} w={"full"}>
          <TagList />
          <AddTagModal />
          <Checkbox
            colorScheme="blackAlpha"
            mt={"4"}
            onChange={(e) => toggleHideDoneTasks.toggleShowHidden()}
          >
            Hide Done Tasks
          </Checkbox>
        </Flex>
      </Flex>
    </>
  );
}

export default LeftMenu;
