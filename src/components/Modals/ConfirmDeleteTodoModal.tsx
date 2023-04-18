import React from "react";
import {
  Box,
  Button,
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
import { Heading } from "@chakra-ui/react";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { useBoundStore } from "@/store/useStore";

type Props = {
  id: string;
  title: string;
};

function ConfirmDeleteModal({ id, title }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteTodo = useBoundStore((state) => state.removeTodo);

  return (
    <>
      <MenuItem
        icon={<MdOutlineDeleteSweep size={"1.2em"} />}
        command="D"
        onClick={onOpen}
      >
        Delete
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
          <ModalHeader fontSize={"xl"}>Confirm delete {title}?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Deleting a todo is permanent. Are you sure you want to delete this
            todo?
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              px={7}
              mr={3}
              onClick={() => deleteTodo(id)}
            >
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConfirmDeleteModal;
