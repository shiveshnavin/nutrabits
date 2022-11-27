import React from "react";
import {
    Text,
    Link,
    HStack,
    Heading,
    Switch,
    useColorMode,
    extendTheme,
    VStack,
    Box,
    Button,
} from "native-base";
import BaseScreen from "./BaseScreen";
import { AppContext } from "../AppContext";

export default function HomeScreen(props) {
    let selectedNutrients = props.route.params.nutrients;
    console.log(selectedNutrients)
    return (
        <BaseScreen>
            <VStack space={5} alignItems="center">
                <Heading size="lg">Welcome to NativeBase</Heading>
                <HStack space={2} alignItems="center">
                    <Text>Edit</Text>
                    <Box
                        _web={{
                            _text: {
                                fontFamily: "monospace",
                                fontSize: "sm",
                            },
                        }}
                        px={2}
                        py={1}
                        _dark={{ bg: "blueGray.800" }}
                        _light={{ bg: "blueGray.200" }}
                    >
                        App.js
                    </Box>
                    <Text>and save to reload.</Text>
                </HStack>
                <Link href="nutraselec">
                    <Button size="sm" variant="outline">
                        LETS GO
                    </Button>
                </Link>


                <ToggleDarkMode />
            </VStack>
        </BaseScreen>
    );
}

// Color Switch Component
function ToggleDarkMode() {
    const [appConfig, setAppConfig] = React.useContext(AppContext);

    const { colorMode, toggleColorMode } = useColorMode(appConfig.theme);
    return (
        <HStack space={2} alignItems="center">
            <Text>Dark</Text>
            <Switch
                isChecked={colorMode === "light"}
                onToggle={toggleColorMode}
                aria-label={
                    colorMode === "light" ? "switch to dark mode" : "switch to light mode"
                }
            />
            <Text>Light</Text>
        </HStack>
    );
}
