import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

function HomeIcon({ color }: { color: string }) {
  return (
    <Svg viewBox="0 0 24 24" fill={color} width={22} height={22}>
      <Path d="M12 3L4 9v12h5v-7h6v7h5V9z" />
    </Svg>
  );
}

function HourglassIcon({ color }: { color: string }) {
  return (
    <Svg viewBox="0 0 24 24" fill={color} width={22} height={22}>
      <Path d="M6 2h12v6l-4 4 4 4v6H6v-6l4-4-4-4V2z" />
    </Svg>
  );
}

function SpacesIcon({ color }: { color: string }) {
  return (
    <Svg viewBox="0 0 24 24" fill={color} width={22} height={22}>
      <Path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </Svg>
  );
}

function MeIcon({ color }: { color: string }) {
  return (
    <Svg viewBox="0 0 24 24" fill={color} width={22} height={22}>
      <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </Svg>
  );
}

function CustomTabBar({ state, descriptors, navigation }: any) {
  const navbarBg = "#292929"; // Assuming dark theme for now
  const activeIconColor = "#818CF8";
  const inactiveIconColor = "rgba(229,231,235,0.8)";

  const icons = {
    home: HomeIcon,
    timer: HourglassIcon,
    spaces: SpacesIcon,
    me: MeIcon,
  };

  const focusedRoute = state.routes[state.index];
  const focusedOptions = descriptors[focusedRoute.key].options;
  
  if (focusedOptions.tabBarStyle?.display === 'none') {
    return null;
  }

  return (
    <View style={[styles.navContainer, { backgroundColor: navbarBg }]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        
        // Skip hidden routes or task routes
        if (options.href === null || route.name.startsWith('task')) {
          return null;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const routeName = route.name.split('/')[0] as keyof typeof icons;
        const Icon = icons[routeName] || HomeIcon;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.navItem, isFocused && styles.activeNavItem]}
            activeOpacity={0.7}
          >
            <Icon color={isFocused ? activeIconColor : inactiveIconColor} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen 
        name="timer" 
        options={{
          tabBarStyle: { display: 'none' }
        }} 
      />
      <Tabs.Screen name="spaces" />
      <Tabs.Screen name="me" />
      <Tabs.Screen 
        name="task/index" 
        options={{ href: null }} 
      />
      <Tabs.Screen 
        name="task/list/index" 
        options={{ 
          href: null,
          tabBarStyle: { display: 'none' }
        }} 
      />
      <Tabs.Screen 
        name="task/ai-processing/index" 
        options={{ 
          href: null,
          tabBarStyle: { display: 'none' }
        }} 
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    zIndex: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    width: '92%',
    maxWidth: 340,
    height: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 20,
  },
  navItem: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNavItem: {
    backgroundColor: '#000',
  }
});
