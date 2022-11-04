import React, { useReducer, useState } from 'react';
import { VStack, Spinner, HStack, Text, Center, Heading, Button, ScrollView } from 'native-base';
import BaseScreen from './BaseScreen';
import { FlatGrid } from 'react-native-super-grid';
import Database from '../../api/Data'
import { Dimensions, Platform, View } from 'react-native';


export function NutraSelecScreen() {

    let db = new Database(Platform.OS != 'web');
    const [nutrients, setNutrients] = useState(undefined)
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    if (nutrients == undefined) {
        (async () => {
            setNutrients(await db.getNutrients(20))
        })()
    }

    function Item(props) {

        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;
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

        <BaseScreen style={{ flex: 1, flexDirection: "column" }}>

            <Center paddingLeft={5} paddingRight={5}>
                <Heading size="md">
                    What do you want to have today ?
                </Heading>
            </Center>
            <ScrollView h="80" w="100%" showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}

            >
                <HStack w="100%" space={3} justifyContent="center">

                    {
                        nutrients == undefined ?
                            (<Center space={2} height="200" justifyContent="center">
                                <Spinner accessibilityLabel="Loading" />
                                <Heading color="primary.500" fontSize="md">
                                    Loading
                                </Heading>
                            </Center>)
                            :
                            (<FlatGrid
                                maxItemsPerRow={2}
                                itemDimension={130}
                                data={nutrients}
                                renderItem={({ item }) => (<Item data={item} />)}
                            />)
                    }
                </HStack>
            </ScrollView>

            <Center width="100%" paddingLeft="5" paddingRight={5}>

                <Button height={10} size="sm" width="100%" colorScheme="secondary">
                    NEXT
                </Button>
            </Center>
        </BaseScreen >
    );
}