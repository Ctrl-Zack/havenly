import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';

const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type CalendarDay = {
  label: string;
  date: number;
  isToday: boolean;
  dateString: string;
  fullDate: Date;
};

function buildCurrentWeek(): { title: string; monthYear: string; days: CalendarDay[] } {
  const today = new Date();
  const weekday = today.toLocaleDateString('en-US', { weekday: 'long' });
  const monthYear = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const days = dayLabels.map((label, index) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + index);
    return {
      label,
      date: day.getDate(),
      isToday: day.toDateString() === today.toDateString(),
      dateString: day.toDateString(),
      fullDate: day,
    };
  });

  return {
    title: weekday,
    monthYear,
    days,
  };
}

export default function DateWidget({ variant = 'card' }: { variant?: 'card' | 'transparent' }) {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toDateString());
  const calendar = buildCurrentWeek();
  
  const selectedDayObj = calendar.days.find(d => d.dateString === selectedDate);
  const displayTitle = selectedDayObj ? selectedDayObj.fullDate.toLocaleDateString('en-US', { weekday: 'long' }) : calendar.title;

  const isCard = variant === 'card';
  const { colors, settings, scale } = useTheme();
  const isDark = settings.appearance === 'dark';

  return (
    <View style={[styles.container, isCard ? styles.cardContainer : styles.transparentContainer]}>
      <View style={styles.contentWrapper}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: isCard ? '#1a1a1a' : colors.text, fontSize: 36 * scale }]}>{displayTitle}</Text>
          <Text style={[styles.monthYear, { color: isCard ? '#151515' : colors.textSecondary, fontSize: 13 * scale }]}>{calendar.monthYear}</Text>
        </View>

        <View style={styles.daysRow}>
          {calendar.days.map((day) => {
            const isSelected = day.dateString === selectedDate;
            return (
              <TouchableOpacity 
                key={day.label} 
                onPress={() => setSelectedDate(day.dateString)}
                activeOpacity={0.7}
                style={styles.dayColumn}
              >
                <Text style={[
                  styles.dayLabel, 
                  { fontSize: 12 * scale },
                  isSelected 
                    ? { color: isCard ? '#2f685f' : colors.text }
                    : { color: isCard ? 'rgba(47, 104, 95, 0.7)' : colors.textSecondary }
                ]}>
                  {day.label}
                </Text>
                <View style={[
                  styles.dateCircle, 
                  isSelected ? [styles.dateCircleSelected, { backgroundColor: isCard ? '#1a1a1a' : colors.text }] : styles.dateCircleUnselected
                ]}>
                  <Text style={[
                    styles.dateText, 
                    { fontSize: 13 * scale },
                    isSelected 
                      ? { color: isCard ? '#ffffff' : colors.background }
                      : { color: isCard ? '#2f685f' : colors.textSecondary }
                  ]}>
                    {day.date}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 340,
  },
  cardContainer: {
    borderRadius: 32,
    backgroundColor: '#ffffff',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.12,
    shadowRadius: 60,
    elevation: 10,
  },
  transparentContainer: {
    paddingTop: 32,
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  contentWrapper: {
    flexDirection: 'column',
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 8,
  },
  title: {
    fontFamily: 'SourceSerifPro-Bold',
    fontSize: 36,
    lineHeight: 40,
    color: '#1a1a1a',
    letterSpacing: -0.02 * 36,
  },
  monthYear: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    color: '#151515',
    paddingBottom: 4,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dayColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  dayLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
  dayLabelSelected: {
    color: '#2f685f',
  },
  dayLabelUnselected: {
    color: 'rgba(47, 104, 95, 0.7)',
  },
  dateCircle: {
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  dateCircleSelected: {
    backgroundColor: '#1a1a1a',
    borderRadius: 999,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  dateCircleUnselected: {
    backgroundColor: 'transparent',
  },
  dateText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
  },
  dateTextSelected: {
    color: '#ffffff',
  },
  dateTextUnselected: {
    color: '#2f685f',
  }
});
