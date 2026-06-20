import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

type RoomTimerProps = {
  initialSeconds?: number;
  autoStart?: boolean;
  onFinish?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function RoomTimer({
  initialSeconds = 60,
  autoStart = false,
  onFinish,
  style,
}: RoomTimerProps) {
  const totalSeconds = initialSeconds;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);

  // Update timeLeft if initialSeconds prop changes
  useEffect(() => {
    setTimeLeft(totalSeconds);
    setIsRunning(autoStart);
  }, [totalSeconds, autoStart]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);

  const percentage = totalSeconds > 0 ? (timeLeft / totalSeconds) * 100 : 0;

  // Determine colors based on percentage
  let strokeColor = '#49917a'; // Green
  let trackColor = '#dcf2ea';  // Light Green

  if (timeLeft === 0) {
    trackColor = '#8c8e91dc';
  } else if (percentage <= 20) {
    strokeColor = '#ef4444'; // Red
    trackColor = '#fee2e2';  // Light Red
  } else if (percentage <= 50) {
    strokeColor = '#ecb454'; // Yellow/Orange
    trackColor = '#fef3c7';  // Light Yellow
  }

  // Formatting time MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // SVG Circle properties
  const size = 240;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference + (percentage / 100) * circumference;

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.circleContainer, { width: size, height: size }]}>
        <View style={{ transform: [{ rotate: '-90deg' }] }}>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background Track Circle */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={trackColor}
              strokeWidth={strokeWidth}
            />
            {/* Progress Circle */}
            {timeLeft > 0 && (
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            )}
          </Svg>
        </View>
        
        {/* Time Text */}
        <View style={styles.timeTextContainer}>
          <Text style={styles.timeText}>
            {formattedTime}
          </Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        {/* Done Button */}
        <TouchableOpacity
          onPress={() => {
            setIsRunning(false);
            if (onFinish) onFinish();
          }}
          style={styles.doneButton}
          activeOpacity={0.7}
        >
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="#f4f9f8" />
          </Svg>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>

        {/* Pause / Resume Button */}
        {isRunning ? (
          <TouchableOpacity
            onPress={handlePause}
            style={styles.pauseButton}
            activeOpacity={0.7}
          >
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M8 19C8 19.5523 7.55228 20 7 20C6.44772 20 6 19.5523 6 19V5C6 4.44772 6.44772 4 7 4C7.55228 4 8 4.44772 8 5V19Z" fill="#441604" />
              <Path d="M18 19C18 19.5523 17.5523 20 17 20C16.4477 20 16 19.5523 16 19V5C16 4.44772 16.4477 4 17 4C17.5523 4 18 4.44772 18 5V19Z" fill="#441604" />
            </Svg>
            <Text style={styles.pauseText}>Pause</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStart}
            style={styles.pauseButton} // Using same style as pause button for yellow
            activeOpacity={0.7}
          >
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M8 5V19L19 12L8 5Z" fill="#441604" />
            </Svg>
            <Text style={styles.pauseText}>Resume</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 320,
    gap: 16,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  timeText: {
    fontFamily: 'Poppins-SemiBold', // Since there's no tracking-tight, we just use the font
    fontSize: 56,
    color: '#151515',
    lineHeight: 56, // matching text-[56px] leading-none
  },
  controlsContainer: {
    width: '100%',
    gap: 20, // gap-5
    marginTop: 72, // mt-18 -> 18 * 4 = 72
  },
  doneButton: {
    backgroundColor: '#418b7e',
    height: 60,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
  },
  doneText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#f4f9f8',
  },
  pauseButton: {
    backgroundColor: '#f8b027',
    height: 60,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
  },
  pauseText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#441604',
  }
});

export default RoomTimer;
