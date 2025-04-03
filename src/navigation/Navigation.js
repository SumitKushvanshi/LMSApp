import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import WelcomeScreen from '../screen/WelcomeScreen'
import HomeScreen from '../screen/HomeScreen'

import Ionicons from 'react-native-vector-icons/Ionicons'
import StateScreen from '../screen/StateScreen'
import AccountScreen from '../screen/AccountScreen'
import Profile from '../screen/Profile'
import ExpenseScreen from '../screen/ExpenseScreen'



const Navigation = () => {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const BottomTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={() => ({
          tabBarShowLabel: false,
          tabBarStyle: { height: 80 }
        })}
      >
        <Tab.Screen name='Home' component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => focused ? <Ionicons style={{ paddingTop: 3 }} name='shuffle-outline' size={30} color='#E97451' />
              : <Ionicons style={{ paddingTop: 3 }} name='shuffle-outline' size={30} color='#A0A0A0' />
          }}
        />


        <Tab.Screen name='States' component={StateScreen} options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => focused ? (<Ionicons style={{ paddingTop: 3 }} name='bar-chart-outline' size={30} color='#E97451' />)
            : (<Ionicons style={{ paddingTop: 3 }} name='bar-chart-outline' size={30} color='#A0A0A0' />)
        }} />


        <Tab.Screen name='Account' component={AccountScreen} options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => focused ? (<Ionicons style={{ paddingTop: 3 }} name='card-outline' size={30} color='#E97451' />)
            : (<Ionicons style={{ paddingTop: 3 }} name='card-outline' size={30} color='#A0A0A0' />)
        }} />

        <Tab.Screen name='Profile' component={Profile} options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => focused ? (<Ionicons style={{ paddingTop: 3 }} name='person-circle-outline' size={30} color='#E97451' />)
            : (<Ionicons style={{ paddingTop: 3 }} name='person-circle-outline' size={30} color='#A0A0A0' />)
        }} />
      </Tab.Navigator>



    )
  }


  const MainStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Main' component={BottomTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen name='create' component={ExpenseScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    )
  }
  return (

    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  )
}

export default Navigation

