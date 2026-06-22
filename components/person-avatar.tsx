import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type AvatarState = 'focus' | 'idle' | 'not focus';

type PersonAvatarProps = {
  state?: AvatarState;
  style?: any;
};

export function PersonAvatar({ state = 'focus', style }: PersonAvatarProps) {
  // Determine border/status color based on state
  let bgColor = '#FDEFC8'; // focus
  let statusColor = '#418b7e'; // green dot for focus

  if (state === 'idle') {
    bgColor = '#EAEBFE';
    statusColor = '#f8b027'; // yellow dot
  } else if (state === 'not focus') {
    bgColor = '#F5F5F5';
    statusColor = '#767676'; // gray dot
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor }, style]}>
      <Ionicons name="person" size={32} color="#151515" />
      
      {/* Status Dot Overlay */}
      <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  statusDot: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
  }
});
