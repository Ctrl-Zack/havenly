import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, PanResponder } from 'react-native';
import Svg, { Circle, Path, Line, Polygon } from 'react-native-svg';

type Emotion = 'Anxious' | 'Tired' | 'Calm' | 'Ready';

const FaceAnxious = ({ stroke }: { stroke: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Path d="M8 9.5L10 10.5M16 9.5L14 10.5" />
    <Path d="M9 15 Q12 13.5 15 15" />
  </Svg>
);

const FaceTired = ({ stroke }: { stroke: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Path d="M8 10h2M14 10h2" />
    <Path d="M9 15h6" />
  </Svg>
);

const FaceCalm = ({ stroke }: { stroke: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Path d="M8 10 Q9 9 10 10 M14 10 Q15 9 16 10" />
    <Path d="M9 14 Q12 16.5 15 14" />
  </Svg>
);

const FaceReady = ({ stroke }: { stroke: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Path d="M7.5 9l2 1.5-2 1.5 M16.5 9l-2 1.5 2 1.5" />
    <Path d="M9 14h6c0 2-6 2-6 0z" fill={stroke} />
  </Svg>
);

const LowEnergyIcon = ({ stroke }: { stroke: string }) => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10"/>
    <Path d="M8 9.5h2M14 9.5h2M9 15 Q12 13 15 15"/>
  </Svg>
);

const HighEnergyIcon = ({ stroke }: { stroke: string }) => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10"/>
    <Path d="M8 10 Q9 9 10 10 M14 10 Q15 9 16 10 M9 14 Q12 17 15 14"/>
  </Svg>
);

const emotions = [
  { id: 'Anxious', label: 'Anxious', icon: FaceAnxious },
  { id: 'Tired', label: 'Tired', icon: FaceTired },
  { id: 'Calm', label: 'Calm', icon: FaceCalm },
  { id: 'Ready', label: 'Ready', icon: FaceReady },
] as const;

// Custom Slider Component
const CustomSlider = ({ value, onValueChange }: { value: number, onValueChange: (val: number) => void }) => {
  const widthRef = useRef(1);
  const valueRef = useRef(value);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {
        valueRef.current = value;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (widthRef.current > 1) {
          let newVal = valueRef.current + (gestureState.dx / widthRef.current) * 100;
          newVal = Math.max(0, Math.min(100, newVal));
          onValueChange(newVal);
        }
      }
    })
  ).current;

  return (
    <View 
      style={[styles.sliderContainer, { backgroundColor: 'transparent' }]}
      onLayout={(e) => {
        widthRef.current = e.nativeEvent.layout.width;
      }}
    >
      <View style={styles.sliderTrack} pointerEvents="none" />
      <View style={[styles.sliderFill, { width: `${value}%` }]} pointerEvents="none" />
      
      {/* Draggable Thumb Area (larger for easy touch) */}
      <View 
        style={[styles.sliderThumb, { left: `${value}%`, width: 44, height: 44, marginLeft: -22, borderRadius: 22, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }]}
        {...panResponder.panHandlers}
      >
        <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#151515', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.15, shadowRadius: 2, elevation: 2 }} />
      </View>
    </View>
  );
};

type AITaskFormProps = {
  onSubmit?: (text: string) => void;
};

export function AITaskForm({ onSubmit }: AITaskFormProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [energy, setEnergy] = useState<number>(50);
  const [taskText, setTaskText] = useState('');

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* 1. Emotion Check-in Section */}
      <View style={styles.section}>
        <Text style={styles.title}>How are you feeling?</Text>
        <Text style={styles.subtitle}>Checking in helps us support you.</Text>

        <View style={styles.emotionsRow}>
          {emotions.map((emo) => {
            const isSelected = selectedEmotion === emo.id;
            return (
              <TouchableOpacity
                key={emo.id}
                onPress={() => setSelectedEmotion(emo.id)}
                activeOpacity={0.7}
                style={[
                  styles.emotionButton,
                  isSelected && styles.emotionButtonSelected
                ]}
              >
                <emo.icon stroke={isSelected ? 'white' : '#1A1A1A'} />
                <Text style={[styles.emotionText, isSelected && styles.emotionTextSelected]}>
                  {emo.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.energyLabels}>
          <View style={styles.energyLabelRow}>
            <LowEnergyIcon stroke="#DB2727" />
            <Text style={[styles.energyText, { color: '#DB2727' }]}>Low energy</Text>
          </View>
          <View style={styles.energyLabelRow}>
            <HighEnergyIcon stroke="#418B7E" />
            <Text style={[styles.energyText, { color: '#418B7E' }]}>High energy</Text>
          </View>
        </View>

        <CustomSlider value={energy} onValueChange={setEnergy} />
      </View>

      <View style={styles.divider} />

      {/* 2. Task Input (Chat) Section */}
      <View style={styles.section}>
        <Text style={styles.title}>What's The One Thing?</Text>
        <Text style={styles.subtitle}>Describe your task, and we'll break it down into manageable subtasks for you.</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={taskText}
            onChangeText={setTaskText}
            placeholder="e.g. Write a 5 page essay about history..."
            placeholderTextColor="#1A1A1A66"
            multiline
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity 
          style={[styles.submitButton, taskText.trim().length === 0 && styles.submitButtonDisabled]}
          onPress={() => {
            if (taskText.trim().length > 0 && onSubmit) {
              onSubmit(taskText);
            }
          }}
          activeOpacity={0.8}
          disabled={taskText.trim().length === 0}
        >
          <Text style={styles.submitText}>Generate Plan</Text>
          <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Line x1="22" y1="2" x2="11" y2="13" />
            <Polygon points="22 2 15 22 11 13 2 9 22 2" />
          </Svg>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingTop: 12,
    paddingBottom: 40,
    alignItems: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(26, 26, 26, 0.1)',
    marginVertical: 24,
  },
  title: {
    fontFamily: 'SourceSerifPro-Bold',
    fontSize: 24,
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  emotionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  emotionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 72,
    borderRadius: 24,
    gap: 6,
    backgroundColor: 'transparent',
  },
  emotionButtonSelected: {
    backgroundColor: '#1A1A1A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  emotionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#1A1A1A',
  },
  emotionTextSelected: {
    color: 'white',
  },
  energyLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  energyLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  energyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
  sliderContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    marginBottom: 10,
  },
  sliderTrack: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: '#c4c4c4',
    borderRadius: 3,
  },
  sliderFill: {
    position: 'absolute',
    left: 0,
    height: 6,
    backgroundColor: '#151515',
    borderRadius: 3,
  },
  sliderThumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#151515',
    borderRadius: 10,
    marginLeft: -10, // Center the thumb exactly on the percentage
  },
  inputWrapper: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#1A1A1A',
    borderRadius: 24,
    minHeight: 120,
    padding: 16,
    backgroundColor: 'transparent',
    marginBottom: 32,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#1A1A1A',
    minHeight: 100,
  },
  submitButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#1A1A1A',
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'white',
  }
});
