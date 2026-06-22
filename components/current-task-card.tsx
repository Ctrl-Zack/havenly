import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { taskStore, ALL_TASKS_INFO } from '@/utils/taskStore';
import { useTheme } from '@/theme/ThemeContext';

type CurrentTaskCardProps = {
  onPlayClick?: (taskId: string) => void;
  onViewAllClick?: () => void;
};

export function CurrentTaskCard({ onPlayClick, onViewAllClick }: CurrentTaskCardProps) {
  const [storeVersion, setStoreVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = taskStore.subscribe(() => {
      setStoreVersion(v => v + 1);
    });
    return unsubscribe;
  }, []);

  // Get the first task that has pending subtasks, fallback to the first defined task
  const activeTask =
    ALL_TASKS_INFO.find(t => taskStore.getTasks(t.id).length > 0) ||
    ALL_TASKS_INFO[0];
  const subtasks = taskStore.getTasks(activeTask.id);
  const currentSubtaskText = subtasks[0]?.text || 'No tasks left';

  const { colors, settings } = useTheme();
  const isDark = settings.appearance === 'dark';

  return (
    <View style={styles.container}>
      {/* View All Tasks Button Container (Below Card) */}
      <View style={styles.viewAllWrapper}>
        <View style={styles.viewAllTab}>
          <TouchableOpacity onPress={onViewAllClick} activeOpacity={0.7}>
            <Text style={styles.viewAllText}>View All Tasks</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Card */}
      <View style={styles.card}>
        {/* Decorative Background Swirls (Abstract Shapes) */}
        <View style={styles.swirlContainer} pointerEvents="none">
          <Svg width="100%" height="100%" viewBox="0 0 249 190" fill="none">
            <Path d="M237.564 117.919C234.995 114.334 233.224 111.159 230.783 108.642C228.263 106.044 224.941 104.264 222.234 101.806C218.201 98.138 213.803 94.6508 210.631 90.2862C204.017 81.2133 205.473 71.7097 214.213 64.6596C218.145 61.4891 222.61 58.919 227.064 56.4633C233.242 53.0486 236.644 47.8921 238.137 41.1355C240.84 28.8944 231.696 17.6268 219.581 20.3215C201.8 24.2716 184.653 29.4237 172.31 45.3359C160.907 60.0542 150.759 75.0675 144.549 92.6571C143.076 96.8312 140.71 100.688 139.279 104.866C138.133 108.205 137.234 111.814 137.169 115.316C137.069 121.255 133.298 124.86 127.608 122.937C124.672 121.945 121.718 119.954 119.677 117.62C111.13 107.941 110.305 96.6425 114.258 84.9124C116.246 78.9979 119.046 73.3498 121.801 67.7262C122.989 65.3003 122.575 64.0617 120.463 62.6153C113.886 58.0793 107.285 57.9592 101.61 63.6173C98.3014 66.9204 95.702 71.2451 93.7259 75.5436C88.7932 86.2114 87.9154 97.6479 88.2764 109.262C88.3635 112.086 88.1466 115.068 87.2823 117.727C85.5183 123.115 80.1023 124.77 75.6988 121.195C73.464 119.376 71.5072 116.775 70.4081 114.113C61.3397 92.3856 64.0681 71.9895 78.0663 53.1481C79.6599 51.007 79.8914 49.5135 78.6206 47.2824C76.6067 43.7808 74.7026 40.1889 73.0228 36.5176C64.2852 17.3343 49.0795 6.04207 29.212 0.39074C27.7092 -0.0437137 26.2079 -0.492459 24.7051 -0.926927C23.2167 -1.36001 21.7254 -1.76443 20.1526 -2.22013C20.8141 -9.04287 21.4534 -15.6368 22.1649 -22.9744C56.2575 -12.5942 78.4831 9.23961 88.669 43.5644C104.805 35.7298 118.448 38.8718 130.355 51.721C131.161 50.7019 131.801 49.7677 132.56 48.9318C142.347 38.0849 151.556 26.6478 162.09 16.5809C174.66 4.57455 191.187 1.05145 207.87 -0.362914C215.018 -0.969272 222.54 -0.225439 229.558 1.40785C252.049 6.64948 262.002 28.1885 256.537 49.1133C253.802 59.6044 248.014 67.7782 238.654 73.3245C235.3 75.3093 231.934 77.2641 227.891 79.6442C229.935 81.5027 231.527 83.1008 233.297 84.4997C236.877 87.3302 241.077 89.5854 244.043 92.9483C248.403 97.8612 252.787 103.123 255.569 108.98C261.262 120.996 256.939 132.084 245.198 138.366C235.878 143.353 225.788 144.223 215.509 143.616C205.089 142.981 194.68 142.073 184.267 141.367C181.685 141.188 179.085 141.355 175.907 141.365C176.4 143.131 176.703 144.474 177.156 145.759C179.715 153.169 182.528 160.487 184.806 167.97C186.24 172.686 187.54 177.591 187.817 182.483C189.44 210.116 162.167 221.578 144.91 216.396C131.358 212.324 117.992 207.072 105.355 200.707C89.0705 192.501 73.4894 182.848 57.8103 173.459C40.1257 162.865 24.4169 149.762 10.1827 134.854C7.90186 132.467 6.71412 130.273 7.42623 126.949C7.95916 124.431 7.98271 121.805 8.29614 118.573C11.0183 119.833 13.3986 120.598 15.4073 121.919C20.5238 125.288 25.5863 128.768 30.4678 132.475C45.3806 143.811 61.1172 153.797 77.884 162.093C94.4847 170.315 111.07 178.551 127.872 186.33C133.62 188.996 139.929 190.632 146.121 192.142C149.437 192.94 153.178 193.072 156.518 192.429C163.814 191.042 166.351 186.914 164.962 179.647C164.395 176.704 163.536 173.806 162.523 170.993C159.382 162.141 156.318 153.239 152.833 144.513C147.417 130.979 150.625 120.823 168.176 119.247C182.057 117.994 195.736 118.079 209.546 119.793C216.58 120.663 223.82 119.993 230.961 119.762C232.778 119.779 234.59 118.814 237.564 117.919Z" fill="url(#paint0_linear_240_2099)"/>
            <Defs>
              <LinearGradient id="paint0_linear_240_2099" x1="145.76" y1="-10.9907" x2="123.859" y2="214.883" gradientUnits="userSpaceOnUse">
                <Stop stopColor="#C9CFFC"/>
                <Stop offset="1" stopColor="#C9CFFC" stopOpacity="0.2"/>
              </LinearGradient>
            </Defs>
          </Svg>
        </View>
        
        <View style={styles.cardContent}>
          {/* Flag Icon */}
          <View style={styles.iconCircle}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="black">
              <Path d="M4 4C4 3.44772 4.44772 3 5 3H11.5858C11.851 3 12.1054 3.10536 12.2929 3.29289L14.7071 5.70711C14.8946 5.89464 15.149 6 15.4142 6H19C19.5523 6 20 6.44772 20 7V15C20 15.5523 19.5523 16 19 16H13.4142C13.149 16 12.8946 15.8946 12.7071 15.7071L10.2929 13.2929C10.1054 13.1054 9.851 13 9.58579 13H6V21C6 21.5523 5.55228 22 5 22C4.44772 22 4 21.5523 4 21V4Z" />
            </Svg>
          </View>

          <View style={{ gap: 6 }}>
            <View style={styles.mainContentRow}>
              <View style={styles.textContent}>
                <Text style={styles.titleText}>Currently In Progress</Text>

                <View style={styles.taskNameBadge}>
                  <Text style={styles.taskNameText}>{currentSubtaskText}</Text>
                </View>
              </View>

              {onPlayClick && (
                <TouchableOpacity
                  style={[styles.playButton, { backgroundColor: isDark ? colors.text : '#1a1a1a' }]}
                  onPress={() => onPlayClick(activeTask.id)}
                  activeOpacity={0.8}
                >
                  <Svg width="20" height="20" viewBox="0 0 24 24" fill={isDark ? colors.background : "white"} style={styles.playIcon}>
                    <Path d="M6.5 4.86V19.14C6.5 20.35 7.82 21.09 8.85 20.46L20.53 13.32C21.49 12.73 21.49 11.27 20.53 10.68L8.85 3.54C7.82 2.91 6.5 3.65 6.5 4.86Z" />
                  </Svg>
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.estimationText}>
              <Text style={styles.estimationLabel}>Task: </Text>
              {activeTask.title}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 48,
    position: 'relative',
    zIndex: 1,
  },
  card: {
    width: '100%',
    borderRadius: 40,
    backgroundColor: '#b4c3fb',
    padding: 28,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    position: 'relative',
  },
  swirlContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 249,
    height: 190,
  },
  cardContent: {
    position: 'relative',
    zIndex: 10,
    gap: 20,
  },
  iconCircle: {
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: '#a5b5f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  textContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  titleText: {
    fontFamily: 'SourceSerifPro-Bold',
    fontSize: 20,
    color: '#000',
  },
  taskNameBadge: {
    backgroundColor: '#ced8fa',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  taskNameText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#000',
  },
  estimationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'rgba(0,0,0,0.9)',
    marginTop: 4,
  },
  estimationLabel: {
    fontFamily: 'Poppins-ExtraBold',
  },
  playButton: {
    height: 72,
    width: 72,
    borderRadius: 36,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    marginLeft: 2,
  },
  viewAllWrapper: {
    position: 'absolute',
    bottom: -45,
    right: 40,
    zIndex: 0,
  },
  viewAllTab: {
    backgroundColor: '#4b9682',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingHorizontal: 24,
    paddingBottom: 10,
    paddingTop: 48,
  },
  viewAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#ffffff',
    textDecorationLine: 'underline',
  }
});
