"use client";

import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Image,
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
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Heading } from "@chakra-ui/react";
import TodoIcon from "public/favicon.ico";

function AddTodoModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      >
        <ModalOverlay />
        <ModalContent>
          <form>
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
                  <Input placeholder="Take a shower" type="text" />
                </FormControl>

                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea placeholder="Take a shower at 6:00 p.m." />
                </FormControl>

                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Select placeholder="Select a tag" />
                </FormControl>

                <FormControl>
                  <FormLabel>Duration</FormLabel>
                  <InputGroup>
                    {/* eslint-disable-next-line react/no-children-prop */}
                    <InputLeftAddon children="Start" />
                    <Input type="datetime-local" />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <InputGroup>
                    {/* eslint-disable-next-line react/no-children-prop */}
                    <InputLeftAddon children="End" />
                    <Input type="datetime-local" />
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
