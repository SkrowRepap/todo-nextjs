"use client";

import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Heading } from "@chakra-ui/react";
import { useBoundStore } from "@/store/useStore";
import { Todo } from "@/types/TodoTypes";
import SelectTags from "./SelectTags";

function AddTodoModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addTodo = useBoundStore((state) => state.addTodo);
  const [tags, setTags] = React.useState<string[]>([]);
  console.log("🚀 ~ file: AddTodoModal.tsx:33 ~ AddTodoModal ~ tags:", tags);
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [dateTime, setDateTime] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const todo: Todo = {
        id: "",
        title,
        description,
        tags,
        completed: false,
        dateTime: new Date(dateTime).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      addTodo(todo);
      setTags([]);
      setTitle("");
      setDescription("");
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
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "dateTime":
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
      <Button colorScheme="yellow" onClick={onOpen} leftIcon={<AddIcon />}>
        Add Todo
      </Button>
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
              <Box p="2">
                <Heading>Add Todo</Heading>
              </Box>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex direction="column" gap="4">
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder="Take a shower"
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                    required
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    placeholder="Take a shower at 6:00 p.m."
                    name="description"
                    value={description}
                    onChange={handleChange}
                    required
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Tags</FormLabel>
                  <SelectTags setTags={setTags} />
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
              <Button colorScheme="yellow" px={7} mr={3} type="submit">
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddTodoModal;
