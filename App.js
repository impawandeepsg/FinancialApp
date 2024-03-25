import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TransactionsListScreen from './TransactionsListScreen';
import TransactionDetailScreen from './TransactionDetailScreen';
import SummaryScreen from './SummaryScreen';
import { TransactionProvider } from './TransactionContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TransactionsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Transactions List" 
      component={TransactionsListScreen} 
      options={{ headerShown: true }} 
    />
    <Stack.Screen 
      name="Transaction Detail" 
      component={TransactionDetailScreen} 
      options={{ headerShown: true }} 
    />
  </Stack.Navigator>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Transactions" 
        component={TransactionsStack} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Summary" 
        component={SummaryScreen} 
        options={{
          headerShown: true, 
          tabBarIcon: ({ color, size }) => (
            <Icon name="bar-chart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <TransactionProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Main" 
            component={TabNavigator} 
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TransactionProvider>
  );
}
