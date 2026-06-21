import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle, Path, Line } from 'react-native-svg';
import { ModalWrapper } from './modal-wrapper';

type FinishedTaskModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onSelectOption?: (option: string) => void;
  nextTaskTitle?: string;
};

const SmileIcon = ({ stroke }: { stroke: string }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={stroke} strokeWidth="2" />
    <Path d="M8 14s1.5 2 4 2 4-2 4-2" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    <Line x1="9" y1="9" x2="9.01" y2="9" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    <Line x1="15" y1="9" x2="15.01" y2="9" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const BreakIcon = ({ stroke }: { stroke: string }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M4 15V9" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    <Path d="M2 15h20" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    <Path d="M20 15V9a2 2 0 0 0-2-2h-3l-2.5 4.5H8" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 11h-4" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    <Path d="M4 19v-4" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    <Path d="M20 19v-4" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const FlagIcon = ({ stroke }: { stroke: string }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Line x1="4" y1="22" x2="4" y2="15" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export function FinishedTaskModal({ isOpen = true, onClose, onSelectOption, nextTaskTitle }: FinishedTaskModalProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const dynamicOptions = [
    { id: 'start_new', label: nextTaskTitle ? 'Start Next Task' : 'Start New Task', icon: SmileIcon },
    { id: 'take_break', label: 'Take a Break', icon: BreakIcon },
    { id: 'done_today', label: 'Done for Today', icon: FlagIcon },
  ];

  const handleSelect = (id: string) => {
    setSelected(id);
    if (onSelectOption) {
      onSelectOption(id);
    }
    // Auto close after a short delay for better UX
    if (onClose) {
      setTimeout(() => {
        onClose();
        setSelected(null); // Reset selection
      }, 400);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} variant="center">
      <View style={styles.container}>
        
        {/* Title */}
        <Text style={styles.title}>Congratulations!</Text>

        {/* Inner Content Box */}
        <View style={styles.innerBox}>
          
          <Text style={styles.innerTitle}>How are you feeling?</Text>
          <Text style={styles.innerDescription}>
            {nextTaskTitle 
              ? `You finished this task! Up next: "${nextTaskTitle}".`
              : 'Share your feelings about completing this task.'}
          </Text>

          <View style={styles.optionsList}>
            {dynamicOptions.map((opt) => {
              const isSelected = selected === opt.id;
              return (
                <TouchableOpacity
                  key={opt.id}
                  activeOpacity={0.8}
                  onPress={() => handleSelect(opt.id)}
                  style={[
                    styles.button,
                    isSelected ? styles.selectedButton : styles.unselectedButton
                  ]}
                >
                  <opt.icon stroke={isSelected ? 'white' : '#1A1A1A'} />
                  <Text style={[
                    styles.buttonText,
                    { color: isSelected ? '#FFFFFF' : '#1A1A1A' }
                  ]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

        </View>

      </View>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'SourceSerifPro-Bold',
    fontSize: 32,
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 32,
  },
  innerBox: {
    width: '100%',
    backgroundColor: '#FDEFC8',
    borderRadius: 32,
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#FBDE8C',
    alignItems: 'center',
  },
  innerTitle: {
    fontFamily: 'SourceSerifPro-Bold',
    fontSize: 20,
    color: '#1A1A1A',
    marginBottom: 4,
    textAlign: 'center',
  },
  innerDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: 'rgba(26, 26, 26, 0.6)',
    marginBottom: 24,
    textAlign: 'center',
  },
  optionsList: {
    width: '100%',
    gap: 12,
  },
  button: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
  },
  selectedButton: {
    backgroundColor: '#1A1A1A',
    borderColor: '#1A1A1A',
  },
  unselectedButton: {
    backgroundColor: 'transparent',
    borderColor: '#1A1A1A',
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },
});

export default FinishedTaskModal;
