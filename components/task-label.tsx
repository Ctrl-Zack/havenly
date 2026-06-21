import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Svg, { Path, Circle as SvgCircle } from 'react-native-svg';

type TextLabelProps = {
  style?: StyleProp<ViewStyle>;
  label?: string;
  task?: string;
};

export function TextLabel({
  style,
  label = "Current Task",
  task = "Open the Document",
}: TextLabelProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.borderBox}>
        <Text 
          style={styles.taskText} 
          numberOfLines={2} 
          adjustsFontSizeToFit 
          minimumFontScale={0.6}
        >
          {task}
        </Text>
      </View>
      <View style={styles.labelBadge}>
        <Text style={styles.labelText}>
          {label}
        </Text>
      </View>
    </View>
  );
}

// EditLabel
type EditLabelProps = {
  style?: StyleProp<ViewStyle>;
  task?: string;
  label?: string;
  isEditing?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onChange?: (val: string) => void;
  onSave?: () => void;
};

export function EditLabel({
  style,
  task = "Open the Document",
  label,
  isEditing,
  onEdit,
  onDelete,
  onChange,
  onSave,
  onMoveUp,
  onMoveDown,
}: EditLabelProps & { onMoveUp?: () => void; onMoveDown?: () => void }) {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.borderBox, styles.editBox]}>
        {/* Reorder Icons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={onMoveUp} activeOpacity={0.7} style={{ padding: 2 }}>
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <Path d="M18 15L12 9L6 15" stroke="#151515" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity onPress={onMoveDown} activeOpacity={0.7} style={{ padding: 2, marginTop: 4 }}>
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <Path d="M6 9L12 15L18 9" stroke="#151515" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* Task Text */}
        <View style={styles.textContainer}>
          {isEditing ? (
            <TextInput 
              autoFocus
              style={styles.input}
              value={task}
              onChangeText={onChange}
              onSubmitEditing={onSave}
              onBlur={onSave}
              placeholderTextColor="#151515"
              multiline={true}
            />
          ) : (
            <Text style={styles.normalText}>{task}</Text>
          )}
        </View>

        {/* Edit Icon */}
        <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
          <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <Path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke={isEditing ? "#418b7e" : "#151515"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke={isEditing ? "#418b7e" : "#151515"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>

        {/* Delete Icon */}
        <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
          <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <Path d="M3 6H5H21" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M10 11V17" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M14 11V17" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Label */}
      {label && (
        <View style={styles.labelBadge}>
          <Text style={styles.labelText}>
            {label}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderBox: {
    borderWidth: 2,
    borderColor: '#151515',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '100%',
    minWidth: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBox: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'transparent',
  },
  taskText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#151515',
    textAlign: 'center',
  },
  labelBadge: {
    position: 'absolute',
    top: -12,
    left: 20,
    backgroundColor: '#fcfee8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 18,
    paddingTop: 2,
    color: '#151515',
    includeFontPadding: false,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#151515',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(21, 21, 21, 0.2)',
    padding: 0,
  },
  normalText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#151515',
  }
});