import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type TaskTabsProps = {
  selectedTab: 'ai' | 'manual';
  onTabChange: (tab: 'ai' | 'manual') => void;
};

export function TaskTabs({ selectedTab, onTabChange }: TaskTabsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onTabChange('ai')}
        activeOpacity={0.8}
        style={[
          styles.tabButton,
          selectedTab === 'ai' ? styles.tabButtonActive : styles.tabButtonInactive
        ]}
      >
        <Svg width="18" height="18" viewBox="0 0 24 24" fill={selectedTab === 'ai' ? 'white' : '#1A1A1A'}>
          <Path d="M19 8l-1.12-2.38L15.5 4.5l2.38-1.12L19 1l1.12 2.38L22.5 4.5l-2.38 1.12L19 8zm-8 14l-2.25-4.75L4 15l4.75-2.25L11 8l2.25 4.75L18 15l-4.75 2.25L11 22z" />
        </Svg>
        <Text style={[styles.tabText, { color: selectedTab === 'ai' ? 'white' : '#1A1A1A' }]} numberOfLines={1}>
          AI Decomposition
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => onTabChange('manual')}
        activeOpacity={0.8}
        style={[
          styles.tabButton,
          selectedTab === 'manual' ? styles.tabButtonActive : styles.tabButtonInactive
        ]}
      >
        <Svg width="18" height="18" viewBox="0 0 24 24" fill={selectedTab === 'manual' ? 'white' : '#1A1A1A'}>
          <Path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z" />
        </Svg>
        <Text style={[styles.tabText, { color: selectedTab === 'manual' ? 'white' : '#1A1A1A' }]} numberOfLines={1}>
          Manual
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
    paddingVertical: 4,
    marginBottom: 8,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#1A1A1A',
  },
  tabButtonActive: {
    backgroundColor: '#1A1A1A',
  },
  tabButtonInactive: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  }
});
