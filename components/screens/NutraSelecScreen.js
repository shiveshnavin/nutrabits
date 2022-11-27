import React, { useEffect, useReducer, useState } from 'react';
import { VStack, Spinner, HStack, Text, Center, Heading, Button, ScrollView, Input, Icon } from 'native-base';
import BaseScreen from './BaseScreen';
import { FlatGrid } from 'react-native-super-grid';
import Database from '../../api/Data'
import { Dimensions, Platform, SafeAreaView, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Br } from '../common/Br';


export function NutraSelecScreen(props) {

    let db = new Database(Platform.OS != 'web');
    const [filterednutrients, setFilteredNutrients] = useState(undefined)
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [timeout, setCurTimeout] = useState(0)
    const setsearchTerm = function (term) {
        if (timeout) clearTimeout(timeout);
        setCurTimeout(setTimeout(async () => {
            setFilteredNutrients(undefined)
            let list = await db.getNutrients(20, term);
            setFilteredNutrients(list)
        }, 300))

    }

    React.useEffect(() => {
        db.getNutrients(100).then((list) => {
            setFilteredNutrients(list)
        });
    }, []);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    function Item(props) {

        const [, forceUpdate] = useReducer(x => x + 1, 0);

        let item = props.data;
        let name = item.name.length < 13 ? item.name : item.name.substr(0, 13).trim() + "...";
        let isSelected = item.isSelected != undefined && item.isSelected == true;

        return (
            <Center>
                <Button
                    height={9}
                    onPress={() => {
                        item.isSelected = !item.isSelected;
                        forceUpdate()
                    }}
                    style={{ borderRadius: 10 }} width={windowWidth / 2.5} size="sm" variant={isSelected ? "solid" : "outline"}>
                    {name}
                </Button>
            </Center>
        )
    }


    return (

        <BaseScreen style={{ flex: 1, flexDirection: 'row', flexDirection: "column" }}>

            <Center style={{ flex: 2 }} paddingLeft={5} paddingRight={5}>
                <Heading size="md">
                    What do you want to have today ?
                </Heading>
                <Br />
                <Input
                    onChangeText={setsearchTerm}
                    returnKeyType="search"
                    w="100%" InputLeftElement={<Icon as={<MaterialIcons name="search" />} size={5} ml="2" color="muted.400" />} placeholder="Search" />
            </Center>
            <HStack style={{ flex: 5 }} space={3} justifyContent="center">

                {
                    filterednutrients == undefined ?
                        (<VStack space={2} height="100%" justifyContent="center">
                            <Spinner accessibilityLabel="Loading" />
                            <Heading color="primary.500" fontSize="md">
                                Loading
                            </Heading>
                        </VStack>)
                        :
                        (<VStack justifyContent="center">
                            <FlatGrid
                                maxItemsPerRow={2}
                                itemDimension={130}
                                data={filterednutrients}
                                renderItem={({ item }) => (<Item data={item} />)}
                            />
                        </VStack>)
                }
            </HStack>

            <Center width="100%" paddingLeft="5" paddingRight={5}>

                <Button height={10} size="sm" width="100%" colorScheme="secondary"

                    onPress={() => {
                        props.navigation.navigate(
                            'home',
                            {
                                nutrients: filterednutrients.filter((item) => {
                                    let isSelected = item.isSelected != undefined && item.isSelected == true;
                                    return isSelected;
                                })
                            },
                        );
                    }}>
                    NEXT
                </Button>
            </Center>
        </BaseScreen >
    );
}