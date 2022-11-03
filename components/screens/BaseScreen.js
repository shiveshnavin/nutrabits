import React, { useContext } from "react";
import {
    Center,
    NativeBaseProvider,
    extendTheme,
    VStack,
} from "native-base";
import { AppContext } from "../AppContext";

export default function BaseScreen(props) {

    const [appConfig, setAppConfig] = useContext(AppContext);
    const theme = extendTheme({
        useSystemColorMode: false,
        initialColorMode: appConfig.theme,
    });

    return (
        <NativeBaseProvider theme={theme}>
            <Center
                _dark={{ bg: "blueGray.900" }}
                _light={{ bg: "blueGray.50" }}
                px={4}
                flex={1}
            >
                <VStack space={5} alignItems="center">
                    {props.children}
                </VStack>
            </Center>
        </NativeBaseProvider>
    );
}
