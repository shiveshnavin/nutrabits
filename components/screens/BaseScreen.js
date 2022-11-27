import React, { useContext } from "react";
import {
    Center,
    NativeBaseProvider,
    extendTheme,
    VStack,
    HStack,
    Pressable,
    Icon,
    Box,
    Text,
    useTheme
} from "native-base";
import { AppContext } from "../AppContext";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function BottomBar(props) {
    const [selected, setSelected] = React.useState(props.routeName);
    return (
        <Box bg={props.theme.colors.backgroundColor} safeAreaTop width="100%" alignSelf="center">

            <HStack bg={props.theme.colors.primary[700]} alignItems="center" safeAreaBottom shadow={6}>
                <Pressable cursor="pointer" opacity={selected === 'home' ? 1 : 0.5} py="3" flex={1} onPress={() => setSelected('home')}>
                    <Center>
                        <Icon mb="1" as={<MaterialCommunityIcons name={selected === 0 ? 'home' : 'home-outline'} />} color="white" size="sm" />
                        <Text color="white" fontSize="12">
                            Home
                        </Text>
                    </Center>
                </Pressable>
                <Pressable cursor="pointer" opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(1)}>
                    <Center>
                        <Icon mb="1" as={<MaterialIcons name="search" />} color="white" size="sm" />
                        <Text color="white" fontSize="12">
                            Search
                        </Text>
                    </Center>
                </Pressable>
                <Pressable cursor="pointer" opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} onPress={() => setSelected(2)}>
                    <Center>
                        <Icon mb="1" as={<MaterialCommunityIcons name={selected === 2 ? 'cart' : 'cart-outline'} />} color="white" size="sm" />
                        <Text color="white" fontSize="12">
                            Cart
                        </Text>
                    </Center>
                </Pressable>
                <Pressable cursor="pointer" opacity={selected === 3 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(3)}>
                    <Center>
                        <Icon mb="1" as={<MaterialCommunityIcons name={selected === 3 ? 'account' : 'account-outline'} />} color="white" size="sm" />
                        <Text color="white" fontSize="12">
                            Account
                        </Text>
                    </Center>
                </Pressable>
            </HStack>
        </Box>
    )
}
export default function BaseScreen(props) {
    const appConfig = useContext(AppContext);
    const theme = useTheme()
    let routeName = props.route ? props.route.name : 'home';

    return (

        <SafeAreaView w="100%" style={{ flex: 1, backgroundColor: appConfig.theme == 'dark' ? '#18181b' : 'white', }} >
            <VStack height="100%" width="100%" >
                <Center
                    px={4}
                    flex={9}
                >
                    <VStack space={5} alignItems="center">
                        {props.children}
                    </VStack>

                </Center>
                <BottomBar flex={1} theme={theme} routeName={routeName} />
            </VStack>
        </SafeAreaView>

    );
}
