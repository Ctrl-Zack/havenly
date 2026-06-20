import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function AIProcessingPage() {
  const router = useRouter();
  const [stage, setStage] = useState(1);

  const floatAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      // Reset stage when screen focuses
      setStage(1);
      floatAnim.setValue(0);

      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      const timer1 = setTimeout(() => setStage(2), 1500);
      const timer2 = setTimeout(() => setStage(3), 2500);

      const timer3 = setTimeout(() => {
        router.replace('/task/list' as any);
      }, 3000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        floatAnim.stopAnimation();
      };
    }, [router, floatAnim])
  );

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  const scale = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.02],
  });

  let primaryText = 'Breaking it down...';
  if (stage === 1) primaryText = 'Analyzing task...';
  else if (stage === 2) primaryText = 'Structuring subtasks...';
  else if (stage === 3) primaryText = 'Finalizing output...';

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#b3dcd1', '#418b7e']}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.content}>
        <Animated.View style={[styles.iconContainer, { transform: [{ translateY }, { scale }] }]}>
          <Svg width="160" height="160" viewBox="0 0 100 100" fill="none">
            <Path d="M50 15 C 50 40, 55 45, 80 45 C 55 45, 50 50, 50 75 C 50 50, 45 45, 20 45 C 45 45, 50 40, 50 15 Z" fill="#F2EAE0" />
            <Path d="M78 12 C 78 22, 80 24, 90 24 C 80 24, 78 26, 78 36 C 78 26, 76 24, 66 24 C 76 24, 78 22, 78 12 Z" fill="#F2EAE0" />
            <Path d="M28 65 C 28 72, 29 73, 36 73 C 29 73, 28 74, 28 81 C 28 74, 27 73, 20 73 C 27 73, 28 72, 28 65 Z" fill="#F2EAE0" />
          </Svg>
        </Animated.View>

        <Text style={styles.primaryText}>
          {primaryText}
        </Text>

        <Text style={styles.secondaryText}>
          Making it easy and manageable
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    paddingHorizontal: 24,
  },
  iconContainer: {
    marginBottom: 40,
  },
  primaryText: {
    fontFamily: 'SourceSerifPro-Bold',
    fontSize: 36,
    lineHeight: 46,
    color: '#F2EAE0',
    textAlign: 'center',
    marginBottom: 8,
  },
  secondaryText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: '#F2EAE0',
    textAlign: 'center',
  }
});
