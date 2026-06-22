import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

export type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  variant?: 'light' | 'dark' | 'accent' | 'warning';
  style?: StyleProp<ViewStyle>;
};

export function StatCard({ title, value, subtitle, variant = 'light', style }: StatCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'dark':
        return {
          container: { backgroundColor: '#1a1a1a' },
          text: { color: '#ffffff' },
          subtext: { color: 'rgba(255,255,255,0.6)' }
        };
      case 'accent':
        return {
          container: { backgroundColor: '#418B7E' },
          text: { color: '#ffffff' },
          subtext: { color: 'rgba(255,255,255,0.6)' }
        };
      case 'warning':
        return {
          container: { backgroundColor: '#FACE68' },
          text: { color: '#1a1a1a' },
          subtext: { color: 'rgba(26,26,26,0.6)' }
        };
      case 'light':
      default:
        return {
          container: { backgroundColor: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1 },
          text: { color: '#1a1a1a' },
          subtext: { color: 'rgba(26,26,26,0.6)' }
        };
    }
  };

  const themeStyles = getVariantStyles();

  return (
    <View style={[styles.container, themeStyles.container, style]}>
      <Text style={[styles.title, themeStyles.text]} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      <Text style={[styles.value, themeStyles.text]}>
        {value}
      </Text>
      {subtitle && (
        <Text style={[styles.subtitle, themeStyles.subtext]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 24,
    justifyContent: 'center',
    gap: 4,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    opacity: 0.8,
  },
  value: {
    fontFamily: 'SourceSerifPro-Bold',
    fontSize: 28,
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
  }
});

export default StatCard;
