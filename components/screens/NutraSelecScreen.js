import React, { useState } from 'react';
import { VStack, Box, HStack, Text, Center, Heading, Button, ScrollView } from 'native-base';
import BaseScreen from './BaseScreen';
import { FlatGrid } from 'react-native-super-grid';
import Data from '../../api/Data'
import { Dimensions } from 'react-native';


export function NutraSelecScreen() {

    const [nutrients] = useState(Data.getNutrients())
    return (
        <BaseScreen>

            <Center paddingLeft={5} paddingRight={5}>
                <Heading size="md">
                    What do you want to have today ?
                </Heading>
            </Center>
            <ScrollView h="80">


                <HStack w="100%" space={3} justifyContent="center">

                    <FlatGrid
                        itemDimension={130}
                        data={nutrients}
                        renderItem={({ item }) => (<Item>{item.name}</Item>)}
                    />
                </HStack>;
            </ScrollView>

            <Center width="100%" paddingLeft="5" paddingRight={5}>

                <Button height={10} size="sm" width="100%" colorScheme="secondary">
                    NEXT
                </Button>
            </Center>
        </BaseScreen >
    );
}

function Item(props) {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <Center>
            <Button style={{ borderRadius: 10 }} width={windowWidth / 2.5} size="sm" variant="outline">
                {props.children}
            </Button>
        </Center>
    )
}