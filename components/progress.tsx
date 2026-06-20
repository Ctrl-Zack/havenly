import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

export type ProgressProps = {
  value?: number;
  max?: number;
  variant?: 'default' | 'warning';
  style?: StyleProp<ViewStyle>;
};

export function Progress({ value = 0, max = 6, variant = 'default', style }: ProgressProps) {
  const activeColor = variant === 'warning' ? '#FACE68' : '#418B7E';
  const inactiveColor = variant === 'warning' ? '#FDEFC8' : '#C7DED9';

  const boundedValue = Math.max(0, Math.min(value, max));

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: max }).map((_, index) => {
        const isActive = index < boundedValue;
        return (
          <View
            key={index}
            style={[
              styles.segment,
              { backgroundColor: isActive ? activeColor : inactiveColor }
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 7,
    width: '100%',
    maxWidth: 368,
  },
  segment: {
    flex: 1,
    height: '100%',
    borderRadius: 3.5,
  }
});

export default Progress;
