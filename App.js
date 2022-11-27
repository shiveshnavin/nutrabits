import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/screens/HomeScreen'
import { NutraSelecScreen } from './components/screens/NutraSelecScreen';
import { AppContextProvider } from "./components/AppContext";

const Stack = createNativeStackNavigator();

const config = {
  screens: {
    home: 'home',
    nutraselec: 'nutraselec',
  },
};

const linking = {
  prefixes: ['https://nutrabits.in', 'nutrabits://'],
  config,
};

const appConfig = {
  theme: "dark"
};

function App() {
  return (
    <AppContextProvider value="test">
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="nutraselec" component={NutraSelecScreen} />
          <Stack.Screen name="home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider >
  );
}

export default App;