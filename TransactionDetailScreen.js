import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';

const TransactionDetailScreen = ({ route }) => {
  const { transaction } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 10,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePress = () => {
    console.log('Transaction pressed');
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.View style={[styles.transactionDetails, { backgroundColor: transaction.color, transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.header}>Transaction Details</Text>
        <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Name:</Text>
            <Text style={styles.detailValue}>{transaction.name}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Amount:</Text>
          <Text style={styles.detailValue}>${transaction.amount}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>{transaction.date}</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  transactionDetails: {
    borderRadius: 10,
    padding: 20,
    margin: 20,
    elevation: 5,
    borderWidth: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  detailValue: {
    flex: 2,
    fontSize: 18,
    color: 'white',
  },
});

export default TransactionDetailScreen;
