'use client';
import React, { useEffect, useState } from 'react';
import ErrorBoundary from './ErrorBoundry';
import { useRouter } from 'next/navigation';
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import StarterConfig from '@/component/StarterConfig/StarterConfig';
import UserNameModal from '@/component/UserNameModal/UserNameModal';
import { checkStarterConfigInCookie, getStarterConfigFromCookie, savePrivacyPolicyInCookie, saveStarterConfigInCookie } from './serverActions/cookiesActions';
import PrivacyModal from '@/component/PrivacyModal/PrivacyModal';
import bg from '../bg.jpg'
import IfAvailableModal from '@/component/IfAvailableModal/NotAvailableModal';

const App = () => {
    const preRoomName = "consulto-medico-";
    const router = useRouter();

     // State to control the modal visibility
     const [isStarterModalOpen, setIsStarterModalOpen] = useState(false);
     const [isHaveIntialSetup, setIsHaveIntialSetup] = useState(false);
     const [isHavePrivacyPolicy, setIsHavePrivacyPolicy] = useState(false);
     const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
     const [isIfAvailableModalOpen, setIsIfAvailableModalOpen] = useState(false);
     const [userName, setUserName] = useState("");
     



     const init = async () => {
        const privayPolicy = await getStarterConfigFromCookie('privacyPolicy');
        const startConfig = await getStarterConfigFromCookie('starterConfig');
    
        setIsHavePrivacyPolicy(!!privayPolicy);
        if (!privayPolicy) {
            setIsPrivacyModalOpen(true);
            setIsStarterModalOpen(false);
        } else {
            setIsHaveIntialSetup(!!startConfig);
            if (startConfig) {
                setIsPrivacyModalOpen(false);
                setIsStarterModalOpen(false);
                setIsIfAvailableModalOpen(true);
            } else {
                setIsStarterModalOpen(true);
                setIsPrivacyModalOpen(false);
                setIsIfAvailableModalOpen(false);
            }
        }
     }

    

     const starterConfigModalSubmit = async (data: { instituteName: string, location:string }) => {
        const res = await saveStarterConfigInCookie(JSON.stringify(data));
        setIsHavePrivacyPolicy(true);
        setIsStarterModalOpen(false);
        setIsIfAvailableModalOpen(true);
     }

     const handleSubmitFromPrivacyModal = async (data: {isPrivacyAccepted : boolean,
        isPrivacy2Accepted: boolean}) => {
         const res = await savePrivacyPolicyInCookie(JSON.stringify(data));
         init();
     }


    const handleSubmit = async () => { 
        const res = await getStarterConfigFromCookie('starterConfig');
        if (res) {
            const _data = res.instituteName.split(" ").join("-")
            const roomName = preRoomName + _data + '-' + (Math.floor(Math.random() * 1000) + 1);
            const name = "richesta-privata" + _data + '-' + (Math.floor(Math.random() * 1000) + 1);
            
            const url = `/meeting/${roomName}?q=${name}`;
            router.push(url);
            
        } else {
            setIsStarterModalOpen(true);
        }
    };

    const openInfoModal = ({userName}: { userName: string}) => {
        setUserName(userName);
        setIsIfAvailableModalOpen(true);
    }

    const handleOnStart = () => {
        setIsPrivacyModalOpen(true)
        init();
    }

    return (
        <ErrorBoundary>
            <div style={{ position: "relative", zIndex: 1}}>
                <Flex 
                    height="100vh"
                    alignItems="center"
                    justifyContent="center"
                    backgroundImage ={`url(${bg.src})`}
                    // backgroundColor={"#f5f5f5"}
                >   
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 1,
                        }}
                        />

                    <Box
                        padding={6}
                        boxShadow={"lg"}
                        maxW="500px" 
                        width="100%"
                        bg={"white"}
                        borderRadius={"md"}
                        textAlign={"center"}
                        position={"relative"}
                        zIndex={2}
                    >
                        <Text fontSize="2xl" mb="4">Benvenuto</Text>
                        <Text mb="4">Se vuoi attivare o partecipare a  video consulto medico tocca il riquadro</Text>
                        <Button colorScheme='green' onClick={handleOnStart}>Invia</Button>
                    </Box>
                </Flex>


                {!isHavePrivacyPolicy && (
                    <PrivacyModal  isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} onSubmit={handleSubmitFromPrivacyModal} />
                )}
                { isHavePrivacyPolicy && (
                    <StarterConfig isOpen={isStarterModalOpen} closeModal={() => setIsStarterModalOpen(false)} onSubmit={starterConfigModalSubmit}  />
                )}
                {isIfAvailableModalOpen &&  <IfAvailableModal isOpen={isIfAvailableModalOpen} onSubmit={handleSubmit} />}
            </div>
        </ErrorBoundary>
    );
}

export default App;
