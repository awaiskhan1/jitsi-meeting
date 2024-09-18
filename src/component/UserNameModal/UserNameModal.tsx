import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'

const UserNameModal = ({ 
    isOpen,
    closeModal: onClose,
    onSubmit,
}: any) => {
    
    // State to hold input values
    const [userName, setuserName] = useState('')
    const [isError, setIsError] = useState(false);

    // Handle form submission
    const handleSubmit = (event: any) => {
        event.preventDefault(); // Prevent the default form submission
        if (!userName) {
            setIsError(true)
            return
        } 

        console.log('nome di Paziente:', userName)
        onSubmit({ userName })
    };

    const hanldeClose = () => {
        if (!!userName) {
            onClose()
        } else {
            setIsError(true)
        }
    }

    return (
        <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen} onClose={hanldeClose} closeOnEsc={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Informazione di Paziente</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Nome</FormLabel>
                        <Input
                            placeholder="Nome Di Paziente"
                            value={userName}
                            onChange={(e) => setuserName(e.target.value)}
                        />
                        {isError && !userName && (
                            <FormLabel color='red.500'>Questo Campo e Obbligatorio</FormLabel>
                        )}
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Flex width="100%" justify="center">
                        <Button colorScheme="green" onClick={handleSubmit}>
                        Iniza Chiamata
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default UserNameModal
