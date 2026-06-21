import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/button';
import TextField from '@/components/text-field';
import Progress from '@/components/progress';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    router.push('/login');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleGoogleLogin = () => {
    router.push('/home');
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
        {/* <Image source={require('@/public/assets/login-bg-blob.svg')} style={styles.blobImage} resizeMode="contain" /> */}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Progress value={1} max={6} />
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
                <Text style={styles.headerTitle}>Begin your Haven</Text>
                <Text style={styles.headerSubtitle}>Sign in to save your settings, or explore as a guest.</Text>
              </View>

              <View style={styles.inputGroup}>
                <TextField
                  label="Name"
                  type="text"
                  value={name}
                  onChange={setName}
                  placeholder="John Doe"
                  hideSubmitButton={true}
                />

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
              </View>
            </View>

            <View style={styles.actionSection}>
              <View style={styles.buttonGroup}>
                <Button
                  text="Sign Up"
                  variant="Dark Neutral"
                  size="default"
                  hasIcon={false}
                  onClick={handleSignUp}
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
                  text="Login"
                  variant="Neutral"
                  size="default"
                  hasIcon={false}
                  onClick={handleLogin}
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
  progressContainer: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 368,
    paddingHorizontal: 16,
    zIndex: 10,
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
  },
  blobContainer: {
    position: 'absolute',
    height: 318,
    left: -81,
    top: -72,
    width: 345,
    opacity: 0.2,
  },
  mainContainer: {
    width: '100%',
    maxWidth: 326,
    alignItems: 'center',
    gap: 48,
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
  actionSection: {
    width: '100%',
    gap: 12,
    alignItems: 'center',
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
  buttonGroup: {
    width: '100%',
    marginTop: -12,
    gap: 16,
  },
  bottomGroup: {
    width: '100%',
    alignItems: 'center',
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
  guestText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#767676',
    textDecorationLine: 'underline',
  }
});
