import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const AuthStack = createStackNavigator();
export default AuthStackScreen = ({ setUser }) => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name='SignIn' options={{ headerShown: false }}>
        {props => <SignIn {...props} setUser={setUser} />}
      </AuthStack.Screen>
      <AuthStack.Screen name='Cadastro'>
        {props => <SignUp {...props} setUser={setUser} />}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  )
}
