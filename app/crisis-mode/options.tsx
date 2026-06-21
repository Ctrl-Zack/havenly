import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle, Line } from 'react-native-svg';
import { CrisisBackground } from '@/components/CrisisBackground';

export default function CrisisOptionsPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <CrisisBackground />

      {/* Main Content Card Container */}
      <View style={styles.content}>

        {/* Heart Pulse Header Icon */}
        <View style={styles.headerIconContainer}>
          <Svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><Path d="M 19 14 c 1.49-1.46 3-3.21 3-5.5 A 5.5 5.5 0 0 0 16.5 3 c -1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2 A 5.5 5.5 0 0 0 2 8.5 c 0 2.3 1.5 4.05 3 5.5 l 7 7 Z" /><Path d="M 3.22 12 H 9.5 l .5-1 2 4.5 2-7 1.5 3.5 h 5.27" /></Svg>
        </View>

        {/* Header Title */}
        <Text style={styles.title}>Crisis Help</Text>

        {/* Buttons List */}
        <View style={styles.buttonsContainer}>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => router.replace('/timer' as any)}
          >
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.buttonIcon}><Path d="M 4 15 s 1-1 4-1 5 2 8 2 4-1 4-1 V 3 s -1 1-4 1-5-2-8-2-4 1-4 1 z" /><Line x1="4" y1="22" x2="4" y2="15" /></Svg>
            <Text style={styles.buttonText}>Try again gently</Text>
          </TouchableOpacity>

          {/* 5-4-3-2-1 Grounding */}
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => router.push('/crisis-mode/grounding' as any)}
          >
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.buttonIcon}><Path d="M 1 12 s 4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8 z" /><Circle cx="12" cy="12" r="3" /></Svg>
            <Text style={styles.buttonText}>5-4-3-2-1 Grounding</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button} 
            activeOpacity={0.8}
            onPress={() => router.replace('/home' as any)}
          >
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.buttonIcon}><Path d="M 2 4 v 16 M 22 20 v -8 a 2 2 0 0 0-2-2 H 8 V 6 a 2 2 0 0 0-2-2 H 2 v 16 h 20 Z M 6 10 H 2 v 4 h 4 v -4 Z" /></Svg>
            <Text style={styles.buttonText}>Take a break</Text>
          </TouchableOpacity>

        </View>
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
    width: '100%',
    maxWidth: 280,
  },
  headerIconContainer: {
    marginBottom: 12,
  },
  title: {
    fontFamily: 'SourceSerifPro-Bold',
    fontSize: 24,
    color: '#1A1A1A',
    marginBottom: 44,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 76,
  },
  button: {
    backgroundColor: '#151515',
    height: 60,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonIcon: {
    marginRight: 2,
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#FFFFFF',
  },
  homeButton: {
    backgroundColor: 'transparent',
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: 200,
  },
  homeButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#FFFFFF',
  },
});
