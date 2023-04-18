import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Circle,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Textarea,
  Wrap,
  WrapItem,
  useBoolean,
  useOutsideClick,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { Todo } from "@/types/TodoTypes";
import { useBoundStore } from "@/store/useStore";
import ConfirmDeleteModal from "./Modals/ConfirmDeleteTodoModal";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import EditTodoModal from "./Modals/EditTodoModal";

type TodoMenuProps = {
  id: string;
  title: string;
  todo: Todo;
};

type TagsProps = {
  tags: string[] | undefined;
};

type EditableProps = {
  type: "title" | "description";
  isEditting: boolean;
  setIsEditting: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
  size: "sm" | "md" | "lg";
  ref: React.RefObject<HTMLDivElement>;
  currText: string;
  setCurrText: React.Dispatch<React.SetStateAction<string>>;
  editTodo: () => void;
};

const TodoMenu = ({ id, title, todo }: TodoMenuProps) => {
  return (
    <>
      <Menu placement="bottom-end">
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<BsThreeDots size={"1.4em"} />}
          variant="none"
          height={"fit-content"}
          alignSelf={"start"}
        ></MenuButton>

        <MenuList>
          <EditTodoModal {...todo} />
          <ConfirmDeleteModal id={id} title={title} />
        </MenuList>
      </Menu>
    </>
  );
};

const Tags = (props: TagsProps) => {
  const todoTags = useBoundStore((state) => state.tags);
  const size = "25px";
  return (
    <>
      <Wrap spacing={"2"} align={"center"} maxW={"50%"}>
        {props.tags?.map((tag) => {
          const tagColor = todoTags.find((t) => t.name === tag)?.color;
          return (
            <WrapItem key={tag}>
              <Circle bg={tagColor} size={size}></Circle>
            </WrapItem>
          );
        })}
      </Wrap>
    </>
  );
};

const Editable = (props: EditableProps) => {
  return (
    <Flex direction="column" gap="2" ref={props.ref}>
      {props.type === "title" ? (
        <Input
          value={props.currText}
          focusBorderColor="teal.500"
          size={`${props.size}`}
          onChange={(e) => props.setCurrText(e.target.value)}
          readOnly={false}
          autoFocus={true}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              props.editTodo();
              props.setIsEditting.off();
            }
          }}
        />
      ) : (
        <Textarea
          value={props.currText}
          focusBorderColor="teal.500"
          size={`${props.size}`}
          onChange={(e) => props.setCurrText(e.target.value)}
          readOnly={false}
          autoFocus={true}
        />
      )}
      <ButtonGroup justifyContent={"end"} size={"sm"}>
        <IconButton
          colorScheme="green"
          icon={<CheckIcon />}
          aria-label={""}
          onClick={() => {
            props.editTodo();
            props.setIsEditting.off();
          }}
        />
        <IconButton
          icon={<CloseIcon />}
          aria-label={""}
          onClick={() => props.setIsEditting.off()}
        />
      </ButtonGroup>
    </Flex>
  );
};

function TodoNote(props: Todo) {
  const checked = props.completed;
  const [onDscEdit, setOnDscEdit] = useBoolean(false);
  const [onTitleEdit, setOnTitleEdit] = useBoolean(false);
  const textareaRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);
  const [description, setDescription] = React.useState(props.description);
  const [title, setTitle] = React.useState(props.title);
  const toggleTodo = useBoundStore((state) => state.toggleTodo);

  const editTodo = useBoundStore((state) => state.editTodo);

  useOutsideClick({
    ref: textareaRef,
    handler: () => setOnDscEdit.off(),
  });

  return (
    <>
      <Container
        background="yellow.100"
        p="6"
        shadow={"md"}
        w={{ base: "xs", md: "sm" }}
        h="fit-content"
      >
        <Flex direction={"column"} gap="4">
          <Flex align={"center"}>
            <Flex direction={"column"} gap="2">
              {!onTitleEdit ? (
                <>
                  <Heading
                    size="md"
                    textDecoration={`${checked && "line-through"}`}
                    onDoubleClick={() => setOnTitleEdit.on()}
                  >
                    {props.title}
                  </Heading>
                </>
              ) : (
                <Editable
                  type="title"
                  isEditting={onTitleEdit}
                  setIsEditting={setOnTitleEdit}
                  ref={titleRef}
                  currText={title}
                  setCurrText={setTitle}
                  size="lg"
                  editTodo={() =>
                    editTodo(props.id, { ...props, title: title })
                  }
                />
              )}
              <Text
                fontSize={"md"}
                mt={"1"}
                color={"blackAlpha.600"}
                fontWeight={"normal"}
                textDecoration={`${checked && "line-through"}`}
              >{`(${props.dateTime})`}</Text>
            </Flex>
            <Spacer />
            <TodoMenu id={props.id} title={props.title} todo={props} />
          </Flex>
          {!onDscEdit ? (
            <>
              <Text
                textDecoration={`${checked && "line-through"}`}
                onDoubleClick={() => setOnDscEdit.on()}
              >
                {props.description}
              </Text>
            </>
          ) : (
            <Editable
              type="description"
              isEditting={onDscEdit}
              setIsEditting={setOnDscEdit}
              ref={textareaRef}
              currText={description}
              setCurrText={setDescription}
              size="md"
              editTodo={() =>
                editTodo(props.id, { ...props, description: description })
              }
            />
          )}
          <Flex align={"center"} mt="2">
            <Tags tags={props.tags} />
            <Spacer />
            <Checkbox
              color="black"
              colorScheme="blackAlpha"
              spacing={"2"}
              variant={"rounded"}
              onChange={() => toggleTodo(props.id)}
              defaultChecked={props.completed}
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

export default TodoNote;
