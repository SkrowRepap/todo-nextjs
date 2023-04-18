"use client";

import {
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
import React from "react";
import { Heading } from "@chakra-ui/react";
import { useBoundStore } from "@/store/useStore";
import { Todo } from "@/types/TodoTypes";
import { AiOutlineTags } from "react-icons/ai";
import Select from "react-select";
import generateRandomLightColor from "@/utils/generateRandomLightColor";
import { v4 as uuidv4 } from "uuid";

function AddTagModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const editTodo = useBoundStore((state) => state.editTodo);
  const tags = useBoundStore((state) => state.tags);
  const addTag = useBoundStore((state) => state.addTag);
  const existingColors = tags.map((tag) => tag.color);

  const [colorName, setColorName] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const color = generateRandomLightColor(existingColors);
      addTag({ name: colorName, color, id: uuidv4() });
      setColorName("");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        aria-label="Add Tag"
        colorScheme="twitter"
        rightIcon={<AiOutlineTags />}
        onClick={onOpen}
      >
        Add Tag
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
              <Heading size={"lg"}>Add a tag</Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex direction="column" gap="4">
                <FormControl>
                  <FormLabel>Tag Name</FormLabel>
                  <InputGroup>
                    {/* eslint-disable-next-line react/no-children-prop */}
                    <Input
                      placeholder="e.g. school, work, etc."
                      value={colorName}
                      onChange={(e) => setColorName(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Tag Color</FormLabel>
                  <Select
                    isDisabled
                    placeholder="Tag colors are automatically generated for you"
                  />
                </FormControl>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" px={7} mr={3} type="submit">
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

export default AddTagModal;
