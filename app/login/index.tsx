import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/button';
import TextField from '@/components/text-field';
import Checkbox from '@/components/checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    router.push('/home');
  };

  const handleGoogleLogin = () => {
    router.push('/home');
  };

  const handleSignUp = () => {
    router.push('/register');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <LinearGradient
        colors={['rgb(252, 254, 232)', 'rgb(151, 152, 139)']}
        locations={[0.766, 1.36]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Background Blob */}
      <View style={styles.blobContainer} pointerEvents="none">
        {/* Fallback to png instead of svg if possible, or omit if not critically needed */}
        {/* <Image source={require('@/public/assets/login-bg-blob.svg')} style={styles.blobImage} resizeMode="contain" /> */}
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Main Content Container */}
          <View style={styles.mainContainer}>

            {/* Header and Inputs */}
            <View style={styles.formSection}>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerTitle}>Continue your Haven</Text>
                <Text style={styles.headerSubtitle}>Sign in to save your settings, or explore as a guest.</Text>
              </View>

              <View style={styles.inputGroup}>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@example.com"
                  hideSubmitButton={true}
                />

                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  placeholder="•••••••••••••"
                  hideSubmitButton={true}
                />

                <View style={styles.optionsRow}>
                  <Checkbox
                    label="Remember Me"
                    checked={rememberMe}
                    onChange={setRememberMe}
                  />
                  <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionSection}>
              <View style={styles.buttonGroup}>
                <Button
                  text="Login"
                  variant="Dark Neutral"
                  size="default"
                  hasIcon={false}
                  onClick={handleLogin}
                />

                <TouchableOpacity 
                  style={styles.googleButton}
                  onPress={handleGoogleLogin}
                  activeOpacity={0.7}
                >
                  <Image
                    source={require('@/public/assets/google-logo.png')}
                    style={styles.googleIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.googleText}>Continue with Google</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.bottomGroup}>
                <Button
                  text="Sign Up"
                  variant="Neutral"
                  size="default"
                  hasIcon={false}
                  onClick={handleSignUp}
                />
                <TouchableOpacity onPress={() => router.push('/home')}>
                  <Text style={styles.guestText}>Continue as guest</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfee8',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  blobContainer: {
    position: 'absolute',
    height: 318,
    left: -81,
    top: -72,
    width: 345,
    opacity: 0.2, // fallback representation
  },
  mainContainer: {
    width: '100%',
    maxWidth: 326,
    alignItems: 'center',
    gap: 64,
  },
  formSection: {
    width: '100%',
    gap: 32,
  },
  headerTextContainer: {
    gap: 4,
  },
  headerTitle: {
    fontFamily: 'SourceSerifPro-SemiBold',
    fontSize: 32,
    lineHeight: 42,
    color: '#1a1a1a',
  },
  headerSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: '#a5a5a5',
  },
  inputGroup: {
    width: '100%',
    gap: 24,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -8,
    paddingHorizontal: 4,
  },
  forgotText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#1a1a1a',
  },
  actionSection: {
    width: '100%',
    gap: 24,
    alignItems: 'center',
  },
  buttonGroup: {
    width: '100%',
    gap: 16,
  },
  googleButton: {
    width: '100%',
    height: 52,
    borderWidth: 2,
    borderColor: '#1a1a1a',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'transparent',
  },
  googleIcon: {
    width: 21,
    height: 21,
  },
  googleText: {
    fontFamily: 'Poppins-Regular',
    color: '#1a1a1a',
    fontSize: 14,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    opacity: 0.6,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#767676',
    maxWidth: 120,
  },
  dividerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#767676',
    paddingHorizontal: 8,
  },
  bottomGroup: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  guestText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#767676',
    textDecorationLine: 'underline',
  }
});
