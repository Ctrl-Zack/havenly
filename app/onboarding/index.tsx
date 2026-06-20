import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import Button from '@/components/button';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/register');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#b3dcd1', '#418b7e']}
        locations={[0, 0.62145]}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Background Vector */}
      <View style={styles.vectorContainer} pointerEvents="none">
        {/* We use a fallback logic since the exact SVG vector might need adjustments, using local static images if any */}
      </View>

      {/* Logo and App Title */}
      <SafeAreaView style={styles.topContainer}>
        <View style={styles.logoContainer}>
          <Svg width="100%" height="100%" viewBox="0 0 68 60" fill="none">
            <Path fillRule="evenodd" clipRule="evenodd" d="M34.7205 15.9319L44.2 0L68 40H47.3586C47.5177 38.9113 47.6 37.7983 47.6 36.6667C47.6 27.6452 42.3691 19.8142 34.7205 15.9319ZM34.7205 15.9319C31.4492 14.2715 27.7357 13.3333 23.8 13.3333C10.6624 13.3333 0 23.7867 0 36.6667C0 49.5467 10.6624 60 23.8 60C35.7833 60 45.7073 51.3029 47.3586 40H20.4L34.7205 15.9319Z" fill="#151515"/>
          </Svg>
        </View>
        <Text style={styles.appTitle}>Havenly</Text>
      </SafeAreaView>

      {/* Content Container Bottom */}
      <View style={styles.bottomCardContainer}>
        <LinearGradient
          colors={['rgb(252, 254, 232)', 'rgb(151, 152, 139)']}
          locations={[0.766, 1.36]}
          style={styles.bottomCardGradient}
        >
          <View style={styles.cardContent}>
            <View style={styles.textContent}>
              <Text style={styles.title}>
                A Quiet Place for Busy Mind
              </Text>
              <Text style={styles.description}>
                Havenly is designed for ADHD minds—helping you stay focused, organized, and motivated with distraction-free learning that works with your brain, not against it.
              </Text>
            </View>
            
            <Button 
              text="Get Started" 
              variant="Dark Neutral"
              size="default" 
              hasIcon={false} 
              textStyle={styles.buttonText}
              onClick={handleGetStarted}
            />
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  vectorContainer: {
    position: 'absolute',
    height: 1100,
    left: -70,
    top: -39,
    width: 589,
  },
  vectorImage: {
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  topContainer: {
    position: 'absolute',
    top: 56,
    alignSelf: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 200,
    height: 200,
    overflow: 'hidden',
    marginTop: -50,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  appTitle: {
    fontFamily: 'SourceSerifPro-Bold', 
    fontSize: 36,
    lineHeight: 46,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  bottomCardContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 440,
    height: 486,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.04,
    shadowRadius: 30,
    elevation: 10,
  },
  bottomCardGradient: {
    flex: 1,
    paddingTop: 99,
    alignItems: 'center',
  },
  cardContent: {
    width: 320,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 48,
  },
  textContent: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  title: {
    fontFamily: 'SourceSerifPro-Bold', 
    fontSize: 36,
    lineHeight: 46,
    color: '#1a1a1a',
    textAlign: 'center',
    width: 297,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: '#a5a5a5',
    textAlign: 'center',
    width: '100%',
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 22,
  }
});
