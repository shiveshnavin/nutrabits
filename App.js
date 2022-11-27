import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/screens/HomeScreen'
import { NutraSelecScreen } from './components/screens/NutraSelecScreen';
import { AppContext, AppContextProvider } from "./components/AppContext";
import { extendTheme, NativeBaseProvider } from 'native-base';
import FindRecepiesScreen from './components/screens/FindRecepiesScreen';

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
  const context = useContext(AppContext);

  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#3959e0',
        100: '#3959e0',
        200: '#3959e0',
        300: '#3959e0',
        400: '#3959e0',
        500: '#2F51DE',
        600: '#0066ff',
        700: '#0047b3',
        800: '#003380',
        900: '#001f4d',
      },
      secondary: {
        50: '#fff',
        100: '#fff',
        200: '#fff',
        300: '#fff',
        400: '#fff',
        500: '#2d83b8',
        600: '#2D82B7',
        700: '#0047b3',
        800: '#23668f',
        900: '#001f4d',
      },
      text: {
        100: '#bfbfbf',
        500: '#595959',
        700: '#262626',
      }
    },
    config: {
      initialColorMode: 'light',
    },
    components: {
      Button: {
        variants: {
          rounded: ({
            colorScheme
          }) => {
            return {
              borderColor: "#fff",
              bg: `${colorScheme}.500`,
              _hover: {
                bg: `${colorScheme}.600`
              },
              _pressed: {
                bg: `${colorScheme}.700`
              },
              _text: {
                color: `${colorScheme}.50`
              },
              rounded: "full"
            };
          }
        }
      },
      Heading: {
        baseStyle: ({ colorMode, colorScheme }) => {
          return {
            color: colorMode === 'dark' ? `${colorScheme}.50` : `${colorScheme}.700`,
            fontWeight: 'normal',
          };
        },
      },
    }
  });


  return (
    <AppContextProvider value="test">
      <NativeBaseProvider theme={theme} >
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="nutraselec" component={NutraSelecScreen} />
            <Stack.Screen name="foods" component={FindRecepiesScreen} />
            <Stack.Screen name="home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </AppContextProvider >
  );
}

export default App;