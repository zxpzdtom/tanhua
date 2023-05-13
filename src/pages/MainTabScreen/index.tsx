import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import FriendsScreen from '../FriendsScreen';
import CircleScreen from '../CircleScreen';
import MyScreen from '../MyScreen';

const Tab = createBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.statusBar} />
      <Tab.Navigator
        initialRouteName="Friends"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#007AFF',
        }}
      >
        <Tab.Screen
          name="Friends"
          component={FriendsScreen}
          options={{
            tabBarLabel: '交友',
            tabBarIcon: ({ color, size }) => (
              <Icon name="users" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Circle"
          component={CircleScreen}
          options={{
            tabBarLabel: '圈子',
            tabBarIcon: ({ color, size }) => (
              <Icon name="circle-o" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="My"
          component={MyScreen}
          options={{
            tabBarLabel: '我的',
            tabBarIcon: ({ color, size }) => (
              <Icon name="user" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
  },
});

export default MainTabScreen;
