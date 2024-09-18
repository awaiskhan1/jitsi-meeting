import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'

const StarterConfig = ({ 
    isOpen,
    closeModal: onClose,
    onSubmit,
}: any) => {
    
    // State to hold input values
    const [instituteName, setInstituteName] = useState('')
    const [location, setLocation] = useState('');
    const [isError, setIsError] = useState(false);

    // Handle form submission
    const handleSubmit = async (event: any) => {
        event.preventDefault(); // Prevent the default form submission
        if (!instituteName) {
            setIsError(true)
            return
        } 
        onSubmit?.({ instituteName, location })
    };

    const hanldeClose = () => {
        if (!!instituteName) {
            onClose()
        } else {
            setIsError(true)
        }
    }

    return (
        <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen} onClose={hanldeClose} closeOnEsc={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Configurazione iniziale</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Codice studio medico</FormLabel>
                        <Input
                            placeholder="Codice studio medico"
                            value={instituteName}
                            onChange={(e) => setInstituteName(e.target.value)}
                        />
                        {/* Error Msg */}
                        {isError && !instituteName && (
                            <FormLabel color='red.500'>Questo campo è obbligatorio</FormLabel>
                        )}
                    </FormControl>

                </ModalBody>

                <ModalFooter>
                    <Flex width="100%" justify="center">
                        <Button colorScheme="green" onClick={handleSubmit}>
                            Salva
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default StarterConfig
