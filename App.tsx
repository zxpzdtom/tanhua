import React from 'react';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainTabScreen from './src/pages/MainTabScreen';
import LoginScreen from './src/pages/LoginScreen';
import ProfileScreen from './src/pages/ProfileScreen';
import DynamicDetailScreen from './src/pages/DynamicDetailScreen';
import EditProfileScreen from './src/pages/EditProfileScreen';
import PersonalCircleScreen from './src/pages/PersonalCircleScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <AlertNotificationRoot>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName="Login"
        >
          <Stack.Screen name="Main" component={MainTabScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="DynamicDetail" component={DynamicDetailScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="PersonalCircle" component={PersonalCircleScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AlertNotificationRoot>
  );
}

export default App;
