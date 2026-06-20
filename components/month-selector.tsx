import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type MonthSelectorProps = {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

const getMonthName = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'long' });
};

export function MonthSelector({ currentDate, onPrevMonth, onNextMonth }: MonthSelectorProps) {
  const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrevMonth} style={styles.arrowButton} activeOpacity={0.7}>
        <Svg width="12" height="12" viewBox="0 0 24 24" fill="#1A1A1A">
          <Path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </Svg>
      </TouchableOpacity>
      
      <View style={styles.monthsContainer}>
        <TouchableOpacity onPress={onPrevMonth} activeOpacity={0.7}>
          <Text style={styles.sideMonthText}>
            {getMonthName(prevMonthDate)}
          </Text>
        </TouchableOpacity>
        <Text style={styles.centerMonthText}>
          {getMonthName(currentDate)}
        </Text>
        <TouchableOpacity onPress={onNextMonth} activeOpacity={0.7}>
          <Text style={styles.sideMonthText}>
            {getMonthName(nextMonthDate)}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onNextMonth} style={styles.arrowButton} activeOpacity={0.7}>
        <Svg width="12" height="12" viewBox="0 0 24 24" fill="#1A1A1A">
          <Path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </Svg>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16, // approximate React web 'gap-4' translates to 16
    paddingVertical: 8,
    marginBottom: 32,
    width: '100%',
  },
  arrowButton: {
    padding: 8,
  },
  monthsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  sideMonthText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FBDE8C',
  },
  centerMonthText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1A1A1A',
  }
});
