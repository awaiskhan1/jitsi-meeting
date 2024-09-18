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
  import React, { useState } from 'react'
  
  const NotAvailableModal = ({ isOpen }: any) => {
    const router = useRouter();
  
  
    // Handle form submission
    const handleSubmit = () => {
        router.push('/');
    }


  
    return (
      <Modal isCentered isOpen={isOpen} onClose={handleSubmit} closeOnOverlayClick={false} closeOnEsc={false} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Prof. Mastantuono non disponibile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="start" spacing={6}>
                <Text>
                    Il Prof. Mastantuono è al momento occupato e non disponibile per la VideoVista riprova più tardi o contattare il n. 342 1234567
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
                Chiudi
                </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
  
  export default NotAvailableModal
  