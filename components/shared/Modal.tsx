import React, { Children } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalContent,
  ModalBody,
  ModalProps,
  Button,
} from '@chakra-ui/react';

type Props = {
  mainAction?: () => void;
  actionButton?: string;
  children: string | HTMLElement | React.ReactElement;
  title: string;
};

export const ModalComponent = ({
  isOpen,
  onClose,
  children,
  title,
  mainAction,
  actionButton,
}: ModalProps & Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {title ? <ModalHeader>{title}</ModalHeader> : null}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          {mainAction ? (
            <Button variant="ghost" onClick={mainAction}>
              {actionButton}
            </Button>
          ) : null}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
