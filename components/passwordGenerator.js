import React, { useState } from "react";
import { useDisclosure, useToast } from '@chakra-ui/react'
import {
    Box,
    Center,
    Heading,
    Text,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Checkbox,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react';

function PasswordGenerator() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();

    const [newPassword, setNewPassword] = useState("");
    const [pwdLength, setPwdLength] = useState(8);
    const [caps, setCaps] = useState(true);
    const [specials, setSpecials] = useState(true);
    const [numbers, setNumbers] = useState(true);

    const handleCapsChange = () => setCaps(current => !current);
    const handleSpecialsChange = () => setSpecials(current => !current);
    const handleNumbersChange = () => setNumbers(current => !current);

    const getRandomCharacter = (characters) => {
        const randomNumber = Math.floor(Math.random() * characters.length);
        return characters.charAt(randomNumber);
    }

    const shuffle = (array) => {
        let currentIndex = array.length,  randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    const generatePassword = () => {
        const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
        const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const specialCharacters = "!@#$%^&*?";
        const numericalDigits = "0123456789";

        let password = "";
        let passwordElements = [];
        let lengthSubtractor = 1;
        let characters = lowerCaseLetters;
        passwordElements.push(getRandomCharacter(lowerCaseLetters));

        if (caps) {
            characters += upperCaseLetters;
            passwordElements.push(getRandomCharacter(upperCaseLetters));
            lengthSubtractor++;
        }
        if (specials) {
            characters += specialCharacters;
            passwordElements.push(getRandomCharacter(specialCharacters));
            lengthSubtractor++;
        }
        if (numbers) {
            characters += numericalDigits;
            passwordElements.push(getRandomCharacter(numericalDigits));
            lengthSubtractor++;
        }

        for (let i = 0; i < pwdLength - lengthSubtractor; i++) {
            passwordElements.push(getRandomCharacter(characters));
        }

        const shuffledElements = shuffle(passwordElements);

        for (let x = 0; x < shuffledElements.length; x++) {
            password += shuffledElements[x];
        }

        setNewPassword(password);
        onOpen();
    };

    return (
        <Box>
            <Center>
                <Heading size="lg" pb="25px">Create your new password</Heading>
            </Center>
            <Center>
                <Text pr="50px">How many characters does your password need to be?</Text>
                <NumberInput
                    defaultValue={8}
                    onChange={(value) => setPwdLength(parseInt(value))}
                    value={pwdLength}
                >
                    <NumberInputField id="passwordLength" />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Center>
            <Heading size="sm" pt="25px" pb="15px">Password requirements:</Heading>
            <Box>
                <Checkbox
                    defaultChecked
                    pt="10px"
                    onChange={handleCapsChange}
                >
                    I require capital letters
                </Checkbox>
            </Box>
            <Box>
                <Checkbox
                    defaultChecked
                    pt="10px"
                    onChange={handleSpecialsChange}
                >
                    I require special characters
                </Checkbox>
            </Box>
            <Box pb="25px">
                <Checkbox
                    defaultChecked
                    pt="10px"
                    onChange={handleNumbersChange}
                >
                    I require numerical characters
                </Checkbox>
            </Box>
            <Button
                colorScheme="purple"
                width={"100%"}
                borderRadius={"0px"}
                onClick={generatePassword}
            >
                Generate password
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Heading size={"sm"}>Your new password</Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{newPassword}</ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='purple'
                            mr={3}
                            borderRadius={"0px"}
                            onClick={() => {
                                navigator.clipboard.writeText(newPassword);
                                toast({
                                    title: 'Copied to clipboard!',
                                    status: 'success',
                                    duration: 1000,
                                    isClosable: true
                                });
                            }}
                        >
                            Copy to clipboard
                        </Button>
                        <Button variant='ghost' borderRadius={"0px"} onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );

}

export default PasswordGenerator;