import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle as SvgCircle, Polyline } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { ModalWrapper } from './modal-wrapper';

type TimerModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onStart?: (hours: number, minutes: number, seconds: number) => void;
};

export function TimerModal({ isOpen = true, onClose, onStart }: TimerModalProps) {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(25);
  const [second, setSecond] = useState(0);

  const adjustTime = (type: 'hour' | 'minute' | 'second', amount: number) => {
    if (type === 'hour') {
      setHour(prev => Math.max(0, Math.min(23, prev + amount)));
    } else if (type === 'minute') {
      setMinute(prev => {
        const newMin = prev + amount;
        if (newMin >= 60) {
          setHour(h => Math.min(23, h + 1));
          return newMin - 60;
        }
        if (newMin < 0) {
          if (hour > 0) {
            setHour(h => h - 1);
            return newMin + 60;
          }
          return 0;
        }
        return newMin;
      });
    } else {
      setSecond(prev => {
        const newSec = prev + amount;
        if (newSec >= 60) {
          setMinute(m => Math.min(59, m + 1));
          return newSec - 60;
        }
        if (newSec < 0) {
          if (minute > 0 || hour > 0) {
            setMinute(m => m > 0 ? m - 1 : 59);
            return newSec + 60;
          }
          return 0;
        }
        return newSec;
      });
    }
  };

  const parts = [];
  if (hour > 0) parts.push(`${hour} hr`);
  if (minute > 0) parts.push(`${minute} min`);
  if (second > 0) parts.push(`${second} sec`);
  if (parts.length === 0) parts.push('0 sec');
  
  const displayTitle = parts.join(' ');

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} variant="bottom-sheet" useGradient={true}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M12 2v4" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <Path d="M12 18v4" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <Path d="M4.93 4.93l2.83 2.83" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <Path d="M16.24 16.24l2.83 2.83" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <Path d="M2 12h4" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <Path d="M18 12h4" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <Path d="M4.93 19.07l2.83-2.83" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <Path d="M16.24 7.76l2.83-2.83" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <SvgCircle cx="12" cy="12" r="10" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <Path d="M12 8v4l3 3" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </View>
          <Text style={styles.titleText}>{displayTitle}</Text>
        </View>

        {/* Time Selector */}
        <View style={styles.selectorBox}>
          
          {/* Hours */}
          <View style={styles.pickerColumn}>
            <TouchableOpacity onPress={() => adjustTime('hour', 1)} activeOpacity={0.7} style={styles.arrowButton}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Polyline points="18 15 12 9 6 15" stroke="#FBDE8C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </TouchableOpacity>
            <Text style={styles.pickerText}>{hour.toString().padStart(2, '0')}</Text>
            <TouchableOpacity onPress={() => adjustTime('hour', -1)} activeOpacity={0.7} style={styles.arrowButton}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Polyline points="6 9 12 15 18 9" stroke="#FBDE8C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </TouchableOpacity>
          </View>

          <Text style={styles.colon}>:</Text>

          {/* Minutes */}
          <View style={styles.pickerColumn}>
            <TouchableOpacity onPress={() => adjustTime('minute', 5)} activeOpacity={0.7} style={styles.arrowButton}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Polyline points="18 15 12 9 6 15" stroke="#FBDE8C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </TouchableOpacity>
            <Text style={styles.pickerText}>{minute.toString().padStart(2, '0')}</Text>
            <TouchableOpacity onPress={() => adjustTime('minute', -5)} activeOpacity={0.7} style={styles.arrowButton}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Polyline points="6 9 12 15 18 9" stroke="#FBDE8C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </TouchableOpacity>
          </View>

          <Text style={styles.colon}>:</Text>

          {/* Seconds */}
          <View style={styles.pickerColumn}>
            <TouchableOpacity onPress={() => adjustTime('second', 5)} activeOpacity={0.7} style={styles.arrowButton}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Polyline points="18 15 12 9 6 15" stroke="#FBDE8C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </TouchableOpacity>
            <Text style={styles.pickerText}>{second.toString().padStart(2, '0')}</Text>
            <TouchableOpacity onPress={() => adjustTime('second', -5)} activeOpacity={0.7} style={styles.arrowButton}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Polyline points="6 9 12 15 18 9" stroke="#FBDE8C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </TouchableOpacity>
          </View>

        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity onPress={onClose} style={styles.cancelBtn} activeOpacity={0.7}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
              if (onStart) onStart(hour, minute, second);
              if (onClose) onClose();
            }} 
            style={styles.startBtn} 
            activeOpacity={0.8}
          >
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <Path d="M5 3L19 12L5 21V3Z" fill="#fff" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
            <Text style={styles.startText}>Let's Go</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
    overflow: 'hidden', // to ensure gradient doesn't bleed out if needed
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    position: 'relative',
    zIndex: 10,
  },
  iconContainer: {
    position: 'absolute',
    left: 0,
  },
  titleText: {
    fontFamily: 'SourceSerifPro-Bold',
    fontSize: 28,
    color: '#1A1A1A',
  },
  selectorBox: {
    width: '100%',
    height: 120,
    backgroundColor: '#FDEFC8',
    borderRadius: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FBDE8C',
    marginBottom: 32,
    zIndex: 10,
  },
  pickerColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  arrowButton: {
    padding: 4,
  },
  pickerText: {
    fontFamily: 'SourceSerifPro-Bold',
    fontSize: 32,
    color: '#1A1A1A',
    width: 50,
    textAlign: 'center',
  },
  colon: {
    fontFamily: 'SourceSerif4-Bold',
    fontSize: 32,
    color: '#1A1A1A',
    marginHorizontal: 12,
    marginBottom: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 16,
    zIndex: 10,
  },
  cancelBtn: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#1A1A1A',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1A1A1A',
  },
  startBtn: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1A1A1A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  startText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#fff',
  }
});

export default TimerModal;
