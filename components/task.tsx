import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export type TaskVariant = 'normal' | 'high-contrast';

export type TaskProps = {
  index?: number;
  title?: string;
  subtitle?: string;
  variant?: TaskVariant;
  onSeeSubtask?: () => void;
};

export function Task({
  index = 1,
  title = 'Final Project HCI',
  subtitle = 'Finish the UI design.',
  variant = 'normal',
  onSeeSubtask,
}: TaskProps) {
  const isNormal = variant === 'normal';

  // Normal Variant Colors
  const cardBg = isNormal ? '#FDEFC8' : '#ffffff';
  const borderColor = isNormal ? '#FBDE8C' : '#1A1A1A';
  const textColor = '#1A1A1A';
  const subtitleColor = isNormal ? 'rgba(26,26,26,0.5)' : 'rgba(26,26,26,0.4)';
  const cornerBg = isNormal ? '#FDF6E5' : '#1A1A1A';
  const numberColor = isNormal ? '#1A1A1A' : '#ffffff';
  const numberCircleBg = isNormal ? 'transparent' : '#ffffff';
  const numberInnerColor = isNormal ? '#1A1A1A' : '#1A1A1A'; // If not normal, white circle with black text
  const buttonBg = isNormal ? '#FACE68' : '#1A1A1A';
  const buttonText = isNormal ? '#1A1A1A' : '#ffffff';

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
      </View>

      {/* Bottom Row: Text */}
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: textColor }]} numberOfLines={2}>
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
