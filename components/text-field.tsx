import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

type TextFieldProps = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  type?: 'text' | 'password' | 'email';
  label?: string;
  hideSubmitButton?: boolean;
};

export function TextField({ 
  value, 
  onChange, 
  placeholder = 'Type your task here...', 
  onSubmit,
  type = 'text',
  label,
  hideSubmitButton = false,
}: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password' && !showPassword;

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
      )}
      
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="#a5a5a5"
          secureTextEntry={isPassword}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
          onSubmitEditing={onSubmit}
          style={styles.input}
        />
        
        {type === 'password' && (
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconButton}
          >
            {showPassword ? (
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a5a5a5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />
              </Svg>
            ) : (
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a5a5a5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <Circle cx="12" cy="12" r="3" />
              </Svg>
            )}
          </TouchableOpacity>
        )}

        {!hideSubmitButton && (
          <TouchableOpacity
            onPress={onSubmit}
            style={styles.submitButton}
          >
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <Path d="M5 12h14" />
              <Path d="M12 5l7 7-7 7" />
            </Svg>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    paddingTop: 8, // Make room for floating label
  },
  labelContainer: {
    position: 'absolute',
    left: 20,
    top: 0,
    backgroundColor: '#fcfee8',
    paddingHorizontal: 4,
    zIndex: 10,
  },
  labelText: {
    fontFamily: 'Poppins-Regular',
    color: '#151515',
    fontSize: 12,
    lineHeight: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 52,
    borderWidth: 2,
    borderColor: '#1A1A1A',
    borderRadius: 26,
    paddingLeft: 20,
    paddingRight: 8,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#1A1A1A',
  },
  iconButton: {
    padding: 8,
    marginRight: 4,
  },
  submitButton: {
    width: 40,
    height: 40,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  }
});

export default TextField;
