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
import { useBoundStore } from "@/store/useStore";

type Props = {
  id: string;
};

function ConfirmDeleteTagModal({ id }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteTag = useBoundStore((state) => state.removeTag);

  return (
    <>
      <MenuItem command="D" onClick={onOpen}>
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
          <ModalHeader fontSize={"xl"}>Confirm delete tag?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Deleting a tag is permanent. Are you sure you want to delete this
            tag?
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              px={7}
              mr={3}
              onClick={() => deleteTag(id)}
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

export default ConfirmDeleteTagModal;
