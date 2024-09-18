import { 
    Button, 
    Box, 

    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    Text, 
    SlideFade, 
    VStack,
    Flex
  } from '@chakra-ui/react'
  import React, { useState } from 'react'
  
  const PrivacyModal = ({ isOpen, onClose, onSubmit }: any) => {
    const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(true)
    const [isPrivacy2Accepted, setIsPrivacy2Accepted] = useState(false)
    
  
    // Handle acceptance of first privacy policy
    const handleFirstPrivacyAccept = () => {
      setIsPrivacyAccepted(true)
    }
  
    // Handle acceptance of second privacy policy
    const handleSecondPrivacyAccept = () => {
      setIsPrivacy2Accepted(true)
    }
  
    // Handle form submission
    const handleSubmit = () => {
        onSubmit({
            isPrivacyAccepted: true,
            isPrivacy2Accepted: true
        })

    }

    const handleClose = () => {
        if (isPrivacyAccepted && isPrivacy2Accepted) {
            onClose()
        }
    }
  
    return (
      <Modal isCentered isOpen={isOpen} onClose={handleClose} closeOnOverlayClick={false} closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Accordo di Privacy</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="start" spacing={6}>
              {/* First Privacy Policy */}
              {/* <Box>
                <Text>
                  Accetto il trattamento dei dati in conformità alla normativa sulla privacy GDPR.
                </Text>
                <Checkbox 
                  mt={4}
                  isChecked={isPrivacyAccepted} 
                  onChange={handleFirstPrivacyAccept}
                  isDisabled={isPrivacyAccepted}
                >
                  Accetto
                </Checkbox>
              </Box> */}
  
              {/* Second Privacy Policy - Slide in */}
              <SlideFade in={isPrivacyAccepted} offsetY="20px">
                <Box mb={4}>
                  <Text>
                    Per partecipare inserisci la spunta nel riquadro accettando il trattamento dei dati in conformità alla vigente normativa sulla privacy GDPR
                  </Text>
                </Box>
                <Box>
                  <Text>
                    {"Confermo  di avere   letto l’informativa della privacy e accetto il trattamento dei miei dati ai sensi del paragrafo 9 del GDPR. dell’accettazione condizioni di utilizzo"}
                  </Text>
                </Box>
              </SlideFade>
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
                Accetto
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
  
  export default PrivacyModal
  