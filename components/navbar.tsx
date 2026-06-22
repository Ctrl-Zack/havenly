import React from 'react';
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
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

type NavbarProps = {
  style?: StyleProp<ViewStyle>;
  menu?: "Home" | "Focus" | "Spaces" | "Me";
  theme?: "Dark" | "Light";
};

export default function Navbar({ style, menu = "Home", theme = "Dark" }: NavbarProps) {
  const router = useRouter();
  
  const navbarBg = theme === "Dark" ? "#292929" : "#1A1A1A";
  const activeIconColor = "#818CF8";
  const inactiveIconColor = "rgba(229,231,235,0.8)";

  const navItems = [
    { id: "Home", href: "/home", icon: HomeIcon },
    { id: "Focus", href: "/timer", icon: HourglassIcon },
    { id: "Spaces", href: "/spaces", icon: SpacesIcon },
    { id: "Me", href: "/me", icon: MeIcon },
  ];

  return (
    <View style={[styles.navContainer, { backgroundColor: navbarBg }, style]}>
      {navItems.map((item) => {
        const isActive = menu === item.id;
        const Icon = item.icon;

        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => router.push(item.href as any)}
            style={[
              styles.navItem,
              isActive && styles.activeNavItem
            ]}
            activeOpacity={0.7}
          >
            <Icon color={isActive ? activeIconColor : inactiveIconColor} />
          </TouchableOpacity>
        );
      })}
    </View>
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
