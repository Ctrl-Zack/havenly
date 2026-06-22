import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Platform } from 'react-native';
import Svg, { Path, Polyline, Circle, Line, Rect } from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';

type ManualTaskFormProps = {
  onSubmit?: () => void;
};

function FieldWrapper({ label, children, style }: { label: string, children: React.ReactNode, style?: any }) {
  return (
    <View style={[styles.fieldWrapper, style]}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={styles.inputContainer}>
        {children}
      </View>
    </View>
  );
}

function CustomSelect({ value, options, onChange, icon }: any) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TouchableOpacity 
        style={styles.customSelectTrigger} 
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
      >
        {icon && <View style={styles.selectIcon}>{icon}</View>}
        <Text style={styles.selectText}>{value}</Text>
        <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Polyline points="6 9 12 15 18 9" />
        </Svg>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setOpen(false)}>
          <View style={styles.dropdownMenu}>
            {options.map((opt: string) => (
              <TouchableOpacity key={opt} style={styles.dropdownItem} onPress={() => { onChange(opt); setOpen(false); }}>
                <Text style={styles.dropdownItemText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

function CustomDateTimePicker({ value, onChange, mode, icon }: any) {
  const [show, setShow] = useState(false);

  const displayValue = mode === 'date' 
    ? value.toISOString().split('T')[0]
    : value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleConfirm = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShow(false);
    if (selectedDate) onChange(selectedDate);
  };

  return (
    <>
      <TouchableOpacity 
        style={styles.customSelectTrigger} 
        onPress={() => setShow(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.selectText}>{displayValue}</Text>
        {icon && <View style={styles.pickerIcon}>{icon}</View>}
      </TouchableOpacity>
      
      {show && (
        Platform.OS === 'ios' ? (
          <Modal transparent visible={show} animationType="fade">
            <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShow(false)}>
              <View style={styles.iosPickerContainer}>
                <View style={styles.iosPickerHeader}>
                  <TouchableOpacity onPress={() => setShow(false)}>
                    <Text style={styles.iosPickerDone}>Done</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  value={value}
                  mode={mode}
                  display="spinner"
                  onChange={handleConfirm}
                  style={{ backgroundColor: 'white' }}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        ) : (
          <DateTimePicker
            value={value}
            mode={mode}
            display="default"
            onChange={handleConfirm}
          />
        )
      )}
    </>
  );
}

export function ManualTaskForm({ onSubmit }: ManualTaskFormProps) {
  const [taskName, setTaskName] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('Morning');
  
  const [startDate, setStartDate] = useState(new Date(2026, 5, 8)); // June 8, 2026
  const [startTime, setStartTime] = useState(new Date(2026, 5, 8, 16, 2));
  const [endDate, setEndDate] = useState(new Date(2026, 5, 8));
  const [endTime, setEndTime] = useState(new Date(2026, 5, 8, 17, 2));
  
  const [repeat, setRepeat] = useState('Never');
  
  const [subtasks, setSubtasks] = useState<{id: string, title: string, order: number}[]>([]);

  const addSubtask = () => {
    setSubtasks([...subtasks, { id: Date.now().toString(), title: '', order: subtasks.length + 1 }]);
  };

  const updateSubtask = (id: string, title: string) => {
    setSubtasks(subtasks.map(st => st.id === id ? { ...st, title } : st));
  };

  const removeSubtask = (id: string) => {
    setSubtasks(subtasks.filter(st => st.id !== id));
  };

  const calendarIcon = (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <Line x1="16" y1="2" x2="16" y2="6" />
      <Line x1="8" y1="2" x2="8" y2="6" />
      <Line x1="3" y1="10" x2="21" y2="10" />
    </Svg>
  );

  const clockIcon = (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="12" r="10" />
      <Polyline points="12 6 12 12 16 14" />
    </Svg>
  );

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Create task</Text>

      <FieldWrapper label="Task name">
        <TextInput 
          style={styles.input}
          value={taskName}
          onChangeText={setTaskName}
          placeholder="e.g., Read a book"
          placeholderTextColor="#1A1A1A66"
        />
      </FieldWrapper>

      <FieldWrapper label="Time of day">
        <CustomSelect 
          value={timeOfDay} 
          options={['Morning', 'Afternoon', 'Evening', 'Night']}
          onChange={setTimeOfDay}
          icon={
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <Circle cx="12" cy="12" r="10" />
              <Polyline points="12 6 12 12 16 14" />
            </Svg>
          }
        />
      </FieldWrapper>

      <View style={styles.row}>
        <FieldWrapper label="Starts" style={styles.flex1}>
          <CustomDateTimePicker 
            value={startDate} 
            onChange={setStartDate} 
            mode="date" 
            icon={calendarIcon}
          />
        </FieldWrapper>
        <FieldWrapper label="Start time" style={styles.flex1}>
          <CustomDateTimePicker 
            value={startTime} 
            onChange={setStartTime} 
            mode="time" 
            icon={clockIcon}
          />
        </FieldWrapper>
      </View>

      <View style={styles.row}>
        <FieldWrapper label="Ends" style={styles.flex1}>
          <CustomDateTimePicker 
            value={endDate} 
            onChange={setEndDate} 
            mode="date" 
            icon={calendarIcon}
          />
        </FieldWrapper>
        <FieldWrapper label="End time" style={styles.flex1}>
          <CustomDateTimePicker 
            value={endTime} 
            onChange={setEndTime} 
            mode="time" 
            icon={clockIcon}
          />
        </FieldWrapper>
      </View>

      <FieldWrapper label="Repeat">
        <CustomSelect 
          value={repeat} 
          options={['Never', 'Every day', 'Every weekday', 'Every weekend', 'Weekly', 'Monthly']}
          onChange={setRepeat}
          icon={
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <Polyline points="17 1 21 5 17 9" />
              <Path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <Polyline points="7 23 3 19 7 15" />
              <Path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </Svg>
          }
        />
      </FieldWrapper>

      {subtasks.length === 0 ? (
        <TouchableOpacity style={styles.addInitialSubtaskBtn} onPress={addSubtask}>
          <Text style={styles.addInitialSubtaskText}>+ Add Subtask</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.subtasksSection}>
          <Text style={styles.subtasksTitle}>Subtasks</Text>
          {subtasks.map((st, index) => (
            <View key={st.id} style={styles.subtaskRow}>
              <Text style={styles.subtaskNumber}>{index + 1}.</Text>
              <View style={styles.subtaskInputContainer}>
                <TextInput
                  style={styles.subtaskInput}
                  value={st.title}
                  onChangeText={(val) => updateSubtask(st.id, val)}
                  placeholder="Enter subtask..."
                  placeholderTextColor="#1A1A1A66"
                />
              </View>
              <TouchableOpacity onPress={() => removeSubtask(st.id)} style={styles.deleteBtn}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                </Svg>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity onPress={addSubtask} style={styles.addAnotherBtn}>
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#418B7E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
              <Line x1="12" y1="5" x2="12" y2="19" />
              <Line x1="5" y1="12" x2="19" y2="12" />
            </Svg>
            <Text style={styles.addAnotherText}>Add Another Subtask</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ height: 24 }} />

      <TouchableOpacity 
        style={styles.submitButton}
        onPress={() => {
          if (onSubmit) onSubmit();
        }}
        activeOpacity={0.8}
      >
        <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <Polyline points="14 2 14 8 20 8" />
          <Path d="M9 15l2 2 4-4" />
        </Svg>
        <Text style={styles.submitText}>Create Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  content: {
    paddingBottom: 40,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  title: {
    fontFamily: 'SourceSerifPro-Bold',
    fontSize: 24,
    color: '#1A1A1A',
    marginTop: 20,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  fieldWrapper: {
    width: '100%',
    marginTop: 16,
    position: 'relative',
  },
  labelContainer: {
    position: 'absolute',
    left: 16,
    top: -8,
    backgroundColor: '#FCFEE8',
    paddingHorizontal: 4,
    zIndex: 10,
  },
  labelText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#1A1A1A',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#1A1A1A',
    borderRadius: 24,
    height: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1A1A1A',
    paddingVertical: 0,
  },
  customSelectTrigger: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  selectIcon: {
    marginRight: 8,
  },
  pickerIcon: {
    marginLeft: 8,
  },
  selectText: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1A1A1A',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownMenu: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  dropdownItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#1A1A1A',
  },
  iosPickerContainer: {
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  iosPickerHeader: {
    width: '100%',
    padding: 16,
    backgroundColor: '#f8f8f8',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iosPickerDone: {
    color: '#418B7E',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  addInitialSubtaskBtn: {
    marginTop: 24,
    padding: 12,
    alignSelf: 'flex-start',
  },
  addInitialSubtaskText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#418B7E',
  },
  subtasksSection: {
    width: '100%',
    marginTop: 24,
  },
  subtasksTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#1A1A1A',
    marginBottom: 12,
    marginLeft: 4,
  },
  subtaskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  subtaskNumber: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1A1A1A',
    width: 16,
    textAlign: 'right',
  },
  subtaskInputContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#1A1A1A',
    borderRadius: 24,
    height: 48,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  subtaskInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1A1A1A',
    paddingVertical: 0,
  },
  deleteBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addAnotherBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingVertical: 8,
  },
  addAnotherText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#418B7E',
  },
  submitButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#418B7E',
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
  },
  submitText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'white',
  }
});
