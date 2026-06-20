import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Svg, { Defs, ClipPath, Path, G, Rect } from 'react-native-svg';

export function Plan({ onAddClick }: { onAddClick?: () => void }) {
  const containerWidth = Math.min(Dimensions.get('window').width - 32, 400); // 32 is roughly horizontal padding
  const containerHeight = containerWidth * (190 / 368);

  return (
    <View style={[styles.container, { width: containerWidth, height: containerHeight }]}>
      {/* SVG Background with Cutout */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <Svg width="100%" height="100%" viewBox="0 0 368 190" preserveAspectRatio="none">
          <Defs>
            <ClipPath id="plan-card-clip">
              <Path d="M40 0 H328 A40 40 0 0 1 368 40 V111.36 A 56 56 0 0 0 289.36 190 H40 A40 40 0 0 1 0 150 V40 A40 40 0 0 1 40 0 Z" />
            </ClipPath>
          </Defs>
          
          {/* Base Yellow Background */}
          <Path d="M40 0 H328 A40 40 0 0 1 368 40 V111.36 A 56 56 0 0 0 289.36 190 H40 A40 40 0 0 1 0 150 V40 A40 40 0 0 1 40 0 Z" fill="#fbd776" />
          
          {/* Decorative Wavy Lines */}
          <G clipPath="url(#plan-card-clip)">
            <Path d="M -20 80 C 60 120 100 0 160 30 C 220 60 200 160 260 120 C 320 80 360 20 400 40" stroke="#f6c95a" strokeWidth="24" strokeLinecap="round" fill="none" />
            <Path d="M 40 220 C 100 150 160 180 220 140 C 280 100 320 200 380 160" stroke="#f6c95a" strokeWidth="24" strokeLinecap="round" fill="none" />
          </G>
        </Svg>
      </View>

      {/* Top Left Icon Blob */}
      <View style={[styles.iconBlob, { width: containerWidth * 0.152, height: containerWidth * 0.152 }]}>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Rect x="5" y="5" width="14" height="16" rx="2" fill="#151515" />
          <Rect x="9" y="3" width="6" height="4" rx="1" fill="#151515" />
          <Rect x="8" y="11" width="5" height="2" rx="1" fill="#fbd776" />
          <Rect x="8" y="15" width="8" height="2" rx="1" fill="#fbd776" />
        </Svg>
      </View>

      {/* Text Content */}
      <View style={styles.textContent}>
        <Text style={styles.title}>What's your plan?</Text>
        <Text style={styles.subtitle}>Let's make today structured and stress-free.</Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onAddClick}
        style={[
          styles.actionButton,
          { width: containerWidth * 0.217, height: containerWidth * 0.217 }
        ]}
      >
        <Svg width="40%" height="40%" viewBox="0 0 24 24" fill="none">
          <Path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    maxWidth: 400,
  },
  iconBlob: {
    position: 'absolute',
    top: '8.4%',
    left: '4.3%',
    zIndex: 10,
    borderRadius: 999,
    backgroundColor: '#f6c95a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContent: {
    position: 'absolute',
    top: '42%',
    left: '6.5%',
    flexDirection: 'column',
    zIndex: 10,
  },
  title: {
    fontFamily: 'SourceSerifPro-Bold',
    fontSize: 24, // Using fixed size since clamp isn't directly supported without dimensions calculation, which we could do but 24 is safe
    color: '#151515',
    lineHeight: 28,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(21, 21, 21, 0.8)',
    marginTop: 8,
    maxWidth: 220,
    lineHeight: 18,
  },
  actionButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: '#151515',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  }
});

export default Plan;
