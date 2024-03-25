import React, { useContext, useEffect, useRef } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { TransactionContext } from './TransactionContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const TransactionsListScreen = ({ navigation }) => {
  const { transactions } = useContext(TransactionContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateTransactions();
  }, []);

  const animateTransactions = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const navigateToDetail = (transaction) => {
    navigation.navigate('Transaction Detail', { transaction });
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView contentContainerStyle={styles.transactionList}>
        {transactions.map(transaction => (
          <TouchableOpacity key={transaction.id} onPress={() => navigateToDetail(transaction)}>
            <Animated.View style={[styles.transactionItem, { backgroundColor: transaction.color }]}>
              <Text style={styles.transactionName}>{transaction.name}</Text>
              <Text style={styles.transactionAmount}>${transaction.amount}</Text>
              <Icon name="chevron-right" size={20} color="#fff" style={styles.arrowIcon} />
            </Animated.View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  transactionList: {
    alignItems: 'stretch',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  transactionName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  transactionAmount: {
    fontSize: 16,
    color: '#fff',
  },
  arrowIcon: {
    marginLeft: 10,
  },
});

export default TransactionsListScreen;