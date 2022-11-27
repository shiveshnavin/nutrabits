import React, { useEffect, useReducer, useRef, useState } from 'react';
import { VStack, Spinner, HStack, Text, Center, Heading, Button, ScrollView, Input, Icon, useTheme } from 'native-base';
import BaseScreen from './BaseScreen';
import { FlatGrid } from 'react-native-super-grid';
import Database from '../../api/Data'
import { Dimensions, Platform, SafeAreaView, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Br } from '../common/Br';
import { Utils } from '../../utils/utils';


export function NutraSelecScreen(props) {

    const { colors } = useTheme();

    let db = new Database(Platform.OS != 'web');
    const [filterednutrients, setFilteredNutrients] = useState(undefined)
    const [selectedNutrients, setselectedNutrients] = useState([])
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
        db.getNutrients(20).then((list) => {
            setFilteredNutrients(list)
        });
    }, []);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    // width={windowWidth / 2.5}
    function Item(props) {

        const [, forceUpdate] = useReducer(x => x + 1, 0);

        let item = props.data;
        let name = item.name.length < 13 ? item.name : item.name.substr(0, 13).trim() + "...";
        let isSelected = selectedNutrients.filter(sel => {
            return sel.code == item.code;
        }).length > 0 //item.isSelected != undefined && item.isSelected == true;

        return (
            <Center>
                <Button
                    colorScheme="secondary"
                    height={9}
                    onPress={() => {
                        item.isSelected = !item.isSelected;
                        Utils.removeByAttr(selectedNutrients, 'code', item.code)
                        if (item.isSelected) {
                            selectedNutrients.push(item)
                        }
                        forceUpdate()
                    }}
                    style={{ borderRadius: 10 }}
                    width={windowWidth / 2.5}
                    size="sm"
                    variant={isSelected ? "solid" : "outline"}>
                    {name}
                </Button>
            </Center>
        )
    }


    return (

        <BaseScreen style={{ flexDirection: 'column', alignContent: 'flex-start' }}>

            <Center style={{ flex: 2, justifyContent: 'flex-end' }} paddingLeft={5} paddingRight={5}>
                <Heading size="md" >
                    What do you want to have today ?
                </Heading>
                <Br />
                <Input
                    onChangeText={setsearchTerm}
                    returnKeyType="search"
                    w="100%" InputLeftElement={<Icon as={<MaterialIcons name="search" />} size={5} ml="2" color="muted.400" />} placeholder="Search" />
            </Center>
            <HStack style={[{ flex: 4, flexDirection: 'column', }]}>

                {
                    filterednutrients == undefined ?
                        (<VStack space={2} justifyContent="center">
                            <Spinner accessibilityLabel="Loading" />
                            <Heading color="primary.500" fontSize="md">
                                Loading
                            </Heading>
                        </VStack>)
                        :
                        (
                            Platform.OS == 'web' ? (
                                <ScrollView style={{ height: '60%' }} >
                                    <FlatGrid
                                        maxItemsPerRow={2}
                                        data={filterednutrients}
                                        renderItem={({ item }) => (<Item data={item} />)}
                                    />
                                </ScrollView>
                            ) : (
                                <VStack
                                    showsHorizontalScrollIndicator={false}

                                >
                                    <FlatGrid
                                        showsHorizontalScrollIndicator={false}
                                        persistentScrollbar={false}
                                        maxItemsPerRow={2}
                                        data={filterednutrients}
                                        renderItem={({ item }) => (<Item data={item} />)}
                                    />
                                </VStack>
                            )


                        )
                }
            </HStack>

            <Button
                size="lg"
                borderRadius="10"
                colorScheme="primary"
                style={{ paddingLeft: 100, paddingRight: 100, justifyContent: 'flex-start' }}
                onPress={() => {
                    props.navigation.navigate(
                        'home',
                        {
                            nutrients: selectedNutrients
                        },
                    );
                }}>
                NEXT
            </Button>
        </BaseScreen >
    );
}