import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { taskStore } from '@/utils/taskStore';

type MiniRoomTimerProps = {
  style?: any;
  onFinish?: () => void;
};

export function MiniRoomTimer({ style, onFinish }: MiniRoomTimerProps) {
  const router = useRouter();

  // We read the last focus state
  const [focusState, setFocusState] = useState(taskStore.getLastFocusState());

  const [timeLeft, setTimeLeft] = useState(focusState.duration || 1500);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const unsubscribe = taskStore.subscribe(() => {
      const newState = taskStore.getLastFocusState();
      setFocusState(newState);
      // Only sync if not running, to avoid jumpy timer
      if (!isRunning) {
        setTimeLeft(newState.duration || 1500);
      }
    });
    return unsubscribe;
  }, [isRunning]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            if (onFinish) {
              setTimeout(onFinish, 0);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, onFinish]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const currentTaskText = taskStore.getTasks(focusState.taskId)[0]?.text || 'No tasks left';

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleBodyClick = () => {
    // Navigate back to focus mode and sync remaining time
    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;
    taskStore.setLastFocusState(timeLeft, focusState.taskId); // Sync state before leaving
    router.replace({
      pathname: '/(tabs)/timer',
      params: {
        hours: h.toString(),
        minutes: m.toString(),
        seconds: s.toString(),
        taskId: focusState.taskId,
        autoStart: isRunning ? 'true' : 'false'
      }
    });
  };

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={['#AFB6FA', '#6D73B1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
    
      {/* Decorative Vector */}
      <View style={styles.vectorContainer} pointerEvents="none">
        <Svg width="100%" height="100%" viewBox="0 0 227 249" fill="none">
          <Path d="M107.486 228.257C110.805 225.354 113.794 223.284 116.065 220.612C118.407 217.852 119.859 214.375 122.043 211.443C125.305 207.074 128.352 202.361 132.39 198.782C140.782 191.324 150.382 191.856 158.242 199.875C161.778 203.482 164.766 207.678 167.641 211.874C171.636 217.694 177.096 220.583 183.965 221.416C196.41 222.925 206.743 212.736 202.891 200.938C197.244 183.621 190.461 167.052 173.432 156.303C157.682 146.372 141.759 137.721 123.652 133.238C119.356 132.174 115.289 130.191 110.992 129.171C107.558 128.352 103.879 127.805 100.387 128.079C94.466 128.553 90.5141 125.147 91.8793 119.298C92.5834 116.28 94.2792 113.147 96.406 110.891C105.215 101.45 116.381 99.5383 128.438 102.341C134.516 103.749 140.408 105.991 146.272 108.189C148.801 109.138 149.994 108.606 151.23 106.364C155.11 99.3802 154.592 92.7984 148.413 87.6968C144.806 84.7221 140.25 82.5521 135.781 81.0001C124.687 77.12 113.219 77.3499 101.694 78.8301C98.892 79.1894 95.903 79.2612 93.1726 78.6577C87.64 77.4218 85.47 72.1908 88.6027 67.4629C90.1979 65.063 92.5978 62.8643 95.1414 61.5134C115.892 50.3905 136.457 51.1378 156.561 63.2523C158.846 64.6319 160.355 64.7181 162.453 63.2379C165.744 60.8955 169.135 58.6536 172.627 56.6274C190.878 46.0793 200.65 29.8547 204.357 9.53456C204.645 7.9969 204.946 6.45923 205.234 4.92156C205.521 3.39827 205.78 1.87497 206.082 0.265454C212.936 0.265454 219.561 0.265454 226.933 0.265454C219.892 35.2006 200.305 59.4297 167.123 72.8806C176.478 88.1854 174.668 102.068 163.028 115.159C164.12 115.863 165.111 116.41 166.017 117.085C177.757 125.779 190.03 133.841 201.066 143.355C214.23 154.707 219.331 170.817 222.349 187.286C223.643 194.342 223.628 201.901 222.68 209.043C219.633 231.936 199.155 243.921 177.801 240.501C167.095 238.79 158.4 233.818 151.977 225.038C149.677 221.891 147.407 218.729 144.648 214.935C142.995 217.148 141.558 218.887 140.337 220.784C137.865 224.621 136.025 229.018 132.965 232.295C128.495 237.109 123.681 241.981 118.12 245.315C106.71 252.141 95.2563 248.907 87.8698 237.828C82.0067 229.033 80.1672 219.074 79.7792 208.784C79.4056 198.351 79.3051 187.904 79.0033 177.471C78.9315 174.884 78.5147 172.312 78.1985 169.15C76.4884 169.811 75.1808 170.242 73.9449 170.817C66.8171 174.079 59.8043 177.586 52.576 180.575C48.0205 182.457 43.2639 184.225 38.421 184.972C11.0739 189.255 -2.96613 163.215 0.525906 145.539C3.27067 131.657 7.20823 117.847 12.3241 104.654C18.9202 87.6537 27.0251 71.2136 34.857 54.7017C43.6949 36.0773 55.2201 19.1773 68.6852 3.57072C70.8408 1.07021 72.9102 -0.323745 76.2873 0.0642641C78.8452 0.351678 81.4607 0.121747 84.7084 0.121747C83.7168 2.95278 83.1852 5.3958 82.0643 7.52266C79.2045 12.9404 76.2298 18.3151 73.0108 23.5316C63.167 39.4687 54.7459 56.0957 48.1067 73.5848C41.525 90.9015 34.9289 108.204 28.8071 125.679C26.709 131.657 25.6886 138.095 24.7833 144.404C24.309 147.781 24.539 151.517 25.5018 154.779C27.5855 161.907 31.9398 164.034 39.0389 161.95C41.913 161.102 44.7152 159.967 47.4168 158.688C55.9242 154.707 64.4891 150.799 72.8383 146.487C85.7862 139.791 96.2048 142.004 99.4669 159.32C102.054 173.016 103.29 186.639 102.916 200.55C102.729 207.635 104.094 214.777 105.014 221.862C105.172 223.672 106.307 225.383 107.486 228.257Z" fill="url(#paint0_linear_548_5670)"/>
          <Defs>
            <SvgLinearGradient id="paint0_linear_548_5670" x1="226.933" y1="124.44" x2="0" y2="124.44" gradientUnits="userSpaceOnUse">
              <Stop stopColor="#C9CFFC"/>
              <Stop offset="1" stopColor="#C9CFFC" stopOpacity="0.2"/>
            </SvgLinearGradient>
          </Defs>
        </Svg>
      </View>

      <TouchableOpacity
        style={styles.content}
        onPress={handleBodyClick}
        activeOpacity={0.9}
      >
        <View style={styles.leftSection}>
          <Text style={styles.timeText}>{formattedTime}</Text>
          <View style={styles.subtaskPill}>
            <Text style={styles.subtaskText} numberOfLines={1}>
              {currentTaskText}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.playButton}
          onPress={handlePlayPause}
          activeOpacity={0.8}
        >
          {isRunning ? (
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M8 19C8 19.5523 7.55228 20 7 20C6.44772 20 6 19.5523 6 19V5C6 4.44772 6.44772 4 7 4C7.55228 4 8 4.44772 8 5V19Z" fill="#fff" />
              <Path d="M18 19C18 19.5523 17.5523 20 17 20C16.4477 20 16 19.5523 16 19V5C16 4.44772 16.4477 4 17 4C17.5523 4 18 4.44772 18 5V19Z" fill="#fff" />
            </Svg>
          ) : (
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M5 3L19 12L5 21V3Z" fill="#fff" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 368,
    borderRadius: 40,
    overflow: 'hidden',
  },
  vectorContainer: {
    position: 'absolute',
    right: -40,
    top: -60,
    width: 227,
    height: 249,
    transform: [{ rotate: '24.6deg' }]
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  leftSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    marginRight: 16,
  },
  timeText: {
    fontFamily: 'SourceSerifPro-SemiBold',
    fontSize: 32,
    lineHeight: 42,
    color: '#151515',
    marginBottom: 4,
  },
  subtaskPill: {
    backgroundColor: '#C9CFFC',
    borderRadius: 24,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    maxWidth: 224,
  },
  subtaskText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: '#151515',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
