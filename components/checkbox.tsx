import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

type CheckboxProps = {
  id?: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={() => onChange(!checked)}
      style={styles.container}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <View style={[
        styles.box,
        checked ? styles.boxChecked : styles.boxUnchecked
      ]}>
        {checked && (
          <Svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <Polyline points="20 6 9 17 4 12" />
          </Svg>
        )}
      </View>
      <Text style={styles.label}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },
  boxUnchecked: {
    backgroundColor: 'transparent',
    borderColor: '#a5a5a5',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#a5a5a5',
  }
});

export default Checkbox;
