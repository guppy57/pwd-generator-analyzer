import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import {
    Box,
    Center,
    Text,
    Heading,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Progress
} from "@chakra-ui/react";

function PasswordAnalyzer() {

    const [password, setPassword] = useState("");
    const [barColor, setBarColor] = useState("grey");
    const [barValue, setBarValue] = useState(0);

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
        const score = zxcvbn(password).score;

        if (score === 0) {
            setBarValue(20);
            setBarColor("red");
        }
        else if (score === 1) {
            setBarValue(40);
            setBarColor("red");
        }
        else if (score === 2) {
            setBarValue(60);
            setBarColor("yellow");
        }
        else if (score === 3) {
            setBarValue(80);
            setBarColor("yellow");
        }
        else if (score === 4) {
            setBarValue(100);
            setBarColor("green");
        }
    }

    return (
        <Box>
            <Center>
                <Heading size="lg" pb="10px">Does your password hold up?</Heading>
            </Center>
            <Center>
                <Text color={"grey"} align={"center"} pb={"25px"}>
                    We'll check your password for how guessable it is based on password crackers.
                    Get the progress bar to green for a sweet, secure password.
                </Text>
            </Center>
            <FormControl>
                <FormLabel>Enter your password:</FormLabel>
                <Input
                    type='text'
                    value={password}
                    onChange={handlePasswordInput}
                />
                <FormHelperText>We will not store or share your password.</FormHelperText>
            </FormControl>
            <Text fontSize={"sm"} pt={"25px"} pb={"10px"}>
                Strength Bar:
            </Text>
            <Progress hasStripe value={barValue} colorScheme={barColor} size={"lg"} />
        </Box>
    );
}

export default PasswordAnalyzer;