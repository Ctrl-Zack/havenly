import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    async function checkFirstLaunch() {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          // First time opening the app
          setInitialRoute('/onboarding');
        } else {
          // Temporarily route to home until login flow is fully enforced
          setInitialRoute('/home');
        }
      } catch (err) {
        setInitialRoute('/onboarding');
      }
    }
    checkFirstLaunch();
  }, []);

  if (initialRoute === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FEFDF6' }}>
        <ActivityIndicator size="large" color="#1A1A1A" />
      </View>
    );
  }

  return <Redirect href={initialRoute as any} />;
}
