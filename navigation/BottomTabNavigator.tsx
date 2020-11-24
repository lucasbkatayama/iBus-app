import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TransactionsHistory from '../screens/TransactionsHistory';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator({ user, setUser }) {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Início"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />}}
      >
        {props => <TabOneNavigator {...props} user={user} />}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="Perfil"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-person" color={color} />,
      }}
      >
        {props => <TabTwoNavigator {...props} user={user} setUser={setUser} />}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator({ user }) {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: `Bem vindo, ${user.name}` }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator({ user, setUser }) {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        options={{ headerTitle: 'Perfil' }}
      >
        {props => <TabTwoScreen {...props} user={user} setUser={setUser} />}
      </TabTwoStack.Screen>
      <TabTwoStack.Screen
        name="Transactions"
        options={{ headerTitle: 'Histórico de transações' }}
      >
        {props => <TransactionsHistory {...props} user={user} setUser={setUser} />}
      </TabTwoStack.Screen>
    </TabTwoStack.Navigator>
  );
}
