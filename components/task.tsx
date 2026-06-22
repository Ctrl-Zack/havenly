import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, Polyline } from 'react-native-svg';
import { useTheme } from '@/theme/ThemeContext';

export type TaskVariant = 'normal' | 'high-contrast';

export type TaskProps = {
  index?: number;
  title?: string;
  subtitle?: string;
  variant?: TaskVariant;
  onSeeSubtask?: () => void;
  isCompleted?: boolean;
};

export function Task({
  index = 1,
  title = 'Final Project HCI',
  subtitle = 'Finish the UI design.',
  variant = 'normal',
  onSeeSubtask,
  isCompleted = false,
}: TaskProps) {
  const { colors, settings } = useTheme();
  const isDark = settings.appearance === 'dark';
  const isNormal = variant === 'normal';

  // Variant Colors
  const cardBg = isCompleted ? (isDark ? colors.surface : '#F5F5F5') : (isDark ? colors.surface : (isNormal ? '#FDEFC8' : '#ffffff'));
  const borderColor = isCompleted ? colors.border : (isDark ? colors.border : (isNormal ? '#FBDE8C' : '#1A1A1A'));
  const textColor = isCompleted ? colors.textSecondary : colors.text;
  const subtitleColor = isCompleted ? colors.textSecondary : colors.textSecondary;
  const cornerBg = isCompleted ? (isDark ? colors.background : '#EAEAEA') : (isDark ? colors.background : (isNormal ? '#FDF6E5' : '#1A1A1A'));
  const numberColor = isCompleted ? colors.textSecondary : (isDark ? colors.text : (isNormal ? '#1A1A1A' : '#ffffff'));
  const numberCircleBg = isNormal ? 'transparent' : (isDark ? colors.text : '#ffffff');
  const numberInnerColor = isNormal ? colors.text : (isDark ? colors.background : '#1A1A1A');
  const buttonBg = isCompleted ? (isDark ? colors.background : '#333333') : (isDark ? colors.primary : (isNormal ? '#FACE68' : '#1A1A1A'));
  const buttonText = isCompleted ? (isDark ? colors.textSecondary : '#ffffff') : (isDark ? '#fff' : (isNormal ? '#1A1A1A' : '#ffffff'));

  return (
    <View style={[
      styles.card, 
      { backgroundColor: cardBg, borderColor, borderWidth: 5 },
      !isNormal && styles.highContrastShadow
    ]}>
      
      {/* Top-Left Corner Shape */}
      <View style={[styles.corner, { backgroundColor: cornerBg }]}>
        {/* Simulating the inverse rounded corners using SVG or simple views might be complex in RN.
            For now, we just have the colored square with a rounded bottom-right. */}
        
        {/* Index Circle */}
        <View style={[styles.indexCircle, { backgroundColor: numberCircleBg }]}>
          <Text style={[styles.indexText, { color: isNormal ? numberColor : numberInnerColor }]}>
            {index}
          </Text>
        </View>
      </View>

      {/* Top Row: Button */}
      <View style={styles.topRow}>
        {isCompleted ? (
          <View style={[styles.button, { backgroundColor: buttonBg, opacity: 0.9 }]}>
            <Text style={[styles.buttonText, { color: 'white' }]}>Completed</Text>
            <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" style={{ marginLeft: 6 }}>
              <Polyline points="20 6 9 17 4 12" />
            </Svg>
          </View>
        ) : (
          <TouchableOpacity
            onPress={onSeeSubtask}
            activeOpacity={0.8}
            style={[styles.button, { backgroundColor: buttonBg }]}
          >
            <Text style={[styles.buttonText, { color: buttonText }]}>See Subtask</Text>
            <Svg width="12" height="12" viewBox="0 0 24 24" fill={buttonText} style={{ marginLeft: 6 }}>
              <Path d="M5 3L19 12L5 21V3Z" />
            </Svg>
          </TouchableOpacity>
        )}
      </View>

      {/* Bottom Row: Text */}
      <View style={styles.textContainer}>
        <Text 
          style={[
            styles.title, 
            { color: textColor }
          ]} 
          numberOfLines={2}
        >
          {title}
        </Text>
        <Text style={[styles.subtitle, { color: subtitleColor }]} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 368,
    minHeight: 168,
    borderRadius: 32,
    padding: 24,
    justifyContent: 'space-between',
    flexDirection: 'column',
    position: 'relative',
    alignSelf: 'center',
    marginBottom: 16,
  },
  highContrastShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    elevation: 4,
  },
  corner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 64,
    height: 64,
    borderTopLeftRadius: 27,
    borderBottomRightRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  indexCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: {
    fontFamily: 'SourceSerifPro-Bold',
    fontSize: 24,
    fontWeight: 'bold',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    zIndex: 10,
  },
  button: {
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },
  textContainer: {
    marginTop: 20,
    zIndex: 10,
  },
  title: {
    fontFamily: 'SourceSerifPro-Bold',
    fontSize: 24,
    lineHeight: 28,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginTop: 4,
  }
});

export default Task;
