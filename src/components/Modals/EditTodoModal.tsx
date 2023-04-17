"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import { useBoundStore } from "@/store/useStore";
import SelectTags from "./SelectTags";
import { MdOutlineEditCalendar } from "react-icons/md";
import { Todo } from "@/types/TodoTypes";

function EditTodoModal(props: Todo) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const editTodo = useBoundStore((state) => state.editTodo);

  const [tags, setTags] = React.useState<string[]>([]);
  const [dateTime, setDateTime] = React.useState<string>("");
  console.log(
    "🚀 ~ file: EditTodoModal.tsx:35 ~ EditTodoModal ~ dateTime:",
    dateTime
  );

  useEffect(() => {
    setTags(props.tags);
    setDateTime(() => {
      let date = new Date(props.dateTime.replace("at ", ""));
      const offset = date.getTimezoneOffset();
      date = new Date(date.getTime() - offset * 60 * 1000);
      return date.toISOString().slice(0, 16);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      editTodo(props.id, {
        ...props,
        tags: tags,
        dateTime: new Date(dateTime).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      setTags([]);
      setDateTime("");

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "dateTime":
        console.log(value, typeof value);

        setDateTime(value);
        break;
      case "tags":
        setTags([value]);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <MenuItem
        onClick={onOpen}
        icon={<MdOutlineEditCalendar size={"1em"} />}
        command="E"
      >
        Edit...
      </MenuItem>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={false}
        size={{ base: "xs", md: "md", lg: "lg" }}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <Heading size={"md"}>Editing {props.title}...</Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex direction="column" gap="4">
                <FormControl>
                  <FormLabel>Tags</FormLabel>
                  <SelectTags setTags={setTags} selectedTags={tags} />
                </FormControl>

                <FormControl>
                  <FormLabel>Target</FormLabel>
                  <InputGroup>
                    {/* eslint-disable-next-line react/no-children-prop */}
                    <InputLeftAddon children="Date & Time" />
                    <Input
                      type="datetime-local"
                      placeholder="dd/mm/yyyy hh:mm"
                      name="dateTime"
                      value={dateTime}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </FormControl>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="green" px={7} mr={3} type="submit">
                Edit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditTodoModal;
