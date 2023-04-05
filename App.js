import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import * as React from 'react';
import {useState, useRef, useEffect} from 'react';
import {AppState} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './components/Login';
import VehicleRegistration from './components/VehicleRegistration';
import WorkList from './components/WorkList';
import SideBar from './components/side-bar';
import Grid from './components/grid';
import Splash from './components/splash';
// import VehicleRegistration from './components/VehicleRegistration';
// import WorkList from './components/WorkList';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
import {useNavigation} from '@react-navigation/native';

function LoginStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
function VehicleStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="VehicleRegistration"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="VehicleRegistration"
        component={VehicleRegistration}
      />
    </Stack.Navigator>
  );
}
function WorkListStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Worklist"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Worklist" component={WorkList} />
    </Stack.Navigator>
  );
}
function SideBarNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <SideBar {...props} />}
      initialRouteName="Login">
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="splash" component={Splash} />
      <Drawer.Screen name="Home" component={VehicleRegistration} />
      <Drawer.Screen name="Worklist" component={WorkList} />
    </Drawer.Navigator>
  );
}
const App = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const navigation = useNavigation();

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       console.log('App has come to the foreground!');

  //       navigation.navigate('splash');
  //       // navigation.navigate();
  //     }

  //     appState.current = nextAppState;
  //     setAppStateVisible(appState.current);
  //     console.log('AppState', appState.current);
  //     if (appState.current === 'background') {
  //     }
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);
  return (
    // <NavigationContainer>
    //   <Stack.Navigator
    //     initialRouteName="LoginStack"
    //     screenOptions={{headerShown: false}}>
    //     <Stack.Screen name="LoginStack" component={LoginStackNavigator} />
    //     <Stack.Screen
    //       options={{gestureEnabled: false}}
    //       name="Home"
    //       component={VehicleStackNavigator}
    //     />
    //     <Stack.Screen
    //       options={{gestureEnabled: false}}
    //       name="sidebar"
    //       component={SideBarNavigator}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>

    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Sidebar" component={SideBarNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
    // <Grid />
  );
};

export default App;
