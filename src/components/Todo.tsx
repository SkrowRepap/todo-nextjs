import {
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
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineEditCalendar, MdOutlineDeleteSweep } from "react-icons/md";
import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const rounded = definePartsStyle({
  control: defineStyle({
    rounded: "full",
  }),
});

export const checkboxTheme = defineMultiStyleConfig({
  variants: { rounded },
});

type Props = {};

const TodoMenu = () => {
  return (
    <>
      <Menu placement="bottom-end">
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<BsThreeDots size={"1.4em"} />}
          variant="none"
        ></MenuButton>

        <MenuList>
          <MenuItem icon={<MdOutlineEditCalendar size={"1em"} />} command="E">
            Edit...
          </MenuItem>
          <MenuItem icon={<MdOutlineDeleteSweep size={"1.2em"} />} command="D">
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

const Tags = () => {
  const size = "25px";
  return (
    <>
      <Wrap spacing={"2"} align={"center"} maxW={"50%"}>
        <WrapItem>
          <Circle bg={"green.200"} size={size}></Circle>
        </WrapItem>
        <WrapItem>
          <Circle bg={"purple.200"} size={size}></Circle>
        </WrapItem>
        <WrapItem>
          <Circle bg={"red.300"} size={size}></Circle>
        </WrapItem>
      </Wrap>
    </>
  );
};

function Todo({}: Props) {
  return (
    <>
      <Container background="yellow.100" p="6" shadow={"md"}>
        <Flex direction={"column"} gap="4">
          <Flex align={"center"}>
            <Heading size="md">Todo Title</Heading>
            <Spacer />
            <TodoMenu />
          </Flex>
          <Text>
            Ex qui velit ex qui ullamco aute. Officia exercitation magna ullamco
            dolore labore cillum incididunt aliqua dolore ullamco. Aliqua
            laboris laborum commodo deserunt elit enim consectetur.
          </Text>
          <Flex align={"center"} mt="2">
            <Tags />
            <Spacer />
            <Checkbox
              color="black"
              colorScheme="blackAlpha"
              spacing={"2"}
              variant={"rounded"}
            >
              <Text fontSize={"sm"} fontWeight={"normal"}>
                Mark as done
              </Text>
            </Checkbox>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}

export default Todo;
