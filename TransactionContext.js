import React, { createContext, useState, useEffect } from 'react';

export const TransactionContext = createContext();

const transactionNames = ['Starbucks', 'Nike', 'Amazon', 'Apple', 'Google', 'Walmart', 'Microsoft', 'Tesla', 'Disney', 'McDonalds'];
const usedColors = {};
const excludedColors = ['#f0f0f0', '#d3d3d3', '#c0c0c0'];
const luminanceThreshold = 0.6; 

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    generateMockTransactions();
  }, []);

  const generateMockTransactions = () => {
    const newTransactions = [];
    for (let i = 1; i <= 30; i++) {
      const randomIndex = Math.floor(Math.random() * transactionNames.length);
      const randomName = transactionNames[randomIndex];
      const color = getColorForName(randomName);
      newTransactions.push({
        id: i,
        name: randomName,
        amount: Math.floor(Math.random() * 1000) + 1, 
        date: getRandomDate(new Date(2024, 0, 1), new Date()),
        color: color,
      });
    }
    setTransactions(newTransactions);
  };

  const getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
  };

  const getColorForName = (name) => {
    if (!usedColors[name]) {
      let color;
      do {
        color = getRandomColor();
      } while (Object.values(usedColors).includes(color) || excludedColors.includes(color) || getLuminance(color) > luminanceThreshold);
      usedColors[name] = color;
    }
    return usedColors[name];
  };

  const getRandomColor = () => {
    const luminance = luminanceThreshold * 255; 
    const r = Math.floor(Math.random() * luminance);
    const g = Math.floor(Math.random() * luminance);
    const b = Math.floor(Math.random() * luminance);
    return '#' + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
  };

  const getLuminance = (color) => {
    const rgb = parseInt(color.substring(1), 16); 
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff; 
    const b = (rgb >>  0) & 0xff; 
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255; 
  };

  return (
    <TransactionContext.Provider value={{ transactions }}>
      {children}
    </TransactionContext.Provider>
  );
};
