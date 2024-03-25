import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TransactionContext } from './TransactionContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const SummaryScreen = () => {
  const { transactions } = useContext(TransactionContext);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const totalTransactions = transactions.length;

  const totalExpenses = transactions.reduce((acc, transaction) => {
    if (transaction.amount < 0) {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);

  const totalIncome = transactions.reduce((acc, transaction) => {
    if (transaction.amount > 0) {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);

  const balance = totalIncome + totalExpenses;

  const sortedTransactions = [...transactions].sort((a, b) => a.amount - b.amount);
  const lowSpending = sortedTransactions[0]; 
  const highSpending = sortedTransactions.slice(-1)[0]; 

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <LinearGradient
        colors={['#00d2ff', '#3a7bd5']}
        style={styles.gradientBackground}
        start={[0, 0.5]}
        end={[1, 0.5]}
      >
        <View style={styles.summaryContainer}>
          <TouchableOpacity style={styles.summaryItem}>
            <Icon name="list" size={24} color="#fff" />
            <Text style={styles.summaryLabel}>Total Transactions:</Text>
            <Text style={styles.summaryValue}>{totalTransactions}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.summaryItem}>
            <Icon name="balance-scale" size={24} color="#fff" />
            <Text style={styles.summaryLabel}>Balance:</Text>
            <Text style={styles.summaryValue}>${balance}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.summaryItem}>
            <Icon name="arrow-up" size={24} color="#fff" />
            <Text style={styles.summaryLabel}>Highest Spending:</Text>
            <Text style={styles.summaryValue}>{highSpending.name}: ${highSpending.amount}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.summaryItem}>
            <Icon name="arrow-down" size={24} color="#fff" />
            <Text style={styles.summaryLabel}>Lowest Spending:</Text>
            <Text style={styles.summaryValue}>{lowSpending.name}: ${lowSpending.amount}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  summaryContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    marginLeft: 10,
    marginRight: 5,
    fontWeight: 'bold',
    color: '#fff',
  },
  summaryValue: {
    color: '#fff',
  },
});

export default SummaryScreen;
