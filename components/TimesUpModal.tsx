import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ModalWrapper } from './modal-wrapper';

type TimesUpModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onTakeBreak?: () => void;
  onContinue?: () => void;
  focusDuration?: string;
  isCompletedEarly?: boolean;
};

export function TimesUpModal({
  isOpen = true,
  onClose,
  onTakeBreak,
  onContinue,
  focusDuration = '25 minutes',
  isCompletedEarly = false,
}: TimesUpModalProps) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} variant="center">
      <View style={styles.container}>
        
        {/* Title */}
        <Text style={styles.title}>
          {isCompletedEarly ? 'Subtask Done!' : "Time's Up!"}
        </Text>

        {/* Description */}
        <Text style={styles.description}>
          {isCompletedEarly
            ? "You finished this subtask early! Let's take a quick break before starting the next one."
            : `You've been focusing for ${focusDuration}. Let's take a quick break to stretch and drink some water.`}
        </Text>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.breakButton}
            activeOpacity={0.7}
            onPress={() => {
              if (onTakeBreak) onTakeBreak();
              if (onClose) onClose();
            }}
          >
            <Text style={styles.breakButtonText}>Take a Break</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.8}
            onPress={() => {
              if (onContinue) onContinue();
              if (onClose) onClose();
            }}
          >
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <Path d="M5 3L19 12L5 21V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'SourceSerifPro-Bold',
    fontSize: 36,
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: 'rgba(26, 26, 26, 0.7)',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
    marginBottom: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  breakButton: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#1A1A1A',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  breakButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#1A1A1A',
  },
  continueButton: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#1A1A1A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  continueButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#fff',
  },
});

export default TimesUpModal;
