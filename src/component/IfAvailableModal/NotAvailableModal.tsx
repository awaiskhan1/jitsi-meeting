import { 
    Button, 
    Box, 
    Checkbox, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    Text, 
    SlideFade, 
    useDisclosure,
    VStack,
    Flex
  } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
  import React, { useEffect, useState } from 'react'
  
  const IfAvailableModal = ({ isOpen, onSubmit }: any) => {
    const router = useRouter();
  
  
    // Handle form submission
    const handleSubmit = () => {
      onSubmit()
    }


    useEffect(() => {
      setTimeout(() => {
        handleSubmit();
      }, 6000)
    }, [])


  
    return (
      <Modal isCentered isOpen={isOpen} onClose={handleSubmit} closeOnOverlayClick={false} closeOnEsc={false} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Informazione
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="start" spacing={6}>
                <Text>
                Se il Prof. Mastantuono è disponibile si attiverà la videoconferenza entro 180 secondi.
                Attendi l’inizio della Videovisita
                </Text>
            </VStack>
          </ModalBody>
  
          <ModalFooter>
            <Flex width="100%" justify="center">
                <Button 
                colorScheme="green" 
                onClick={handleSubmit} 
                width="100%"
                size="lg"
                >
                Ok
                </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
  
  export default IfAvailableModal
  