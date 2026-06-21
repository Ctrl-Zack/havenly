import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type CrisisButtonProps = {
  onClick?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function CrisisButton({ onClick, style }: CrisisButtonProps) {
  return (
    <TouchableOpacity 
      onPress={onClick}
      style={[styles.button, style]}
      activeOpacity={0.7}
    >
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M12.5 3C12.5 2.72386 12.2761 2.5 12 2.5C11.7239 2.5 11.5 2.72386 11.5 3V4C11.5 4.27614 11.7239 4.5 12 4.5C12.2761 4.5 12.5 4.27614 12.5 4V3ZM7.04944 5.63539C7.24471 5.44013 7.24471 5.12354 7.04944 4.92828C6.85418 4.73302 6.5376 4.73302 6.34234 4.92828L5.63523 5.63539C5.43997 5.83065 5.43997 6.14723 5.63523 6.3425C5.83049 6.53776 6.14708 6.53776 6.34234 6.3425L7.04944 5.63539ZM18.3648 6.3425C18.56 6.14723 18.56 5.83065 18.3648 5.63539L17.6577 4.92828C17.4624 4.73302 17.1458 4.73302 16.9506 4.92828C16.7553 5.12354 16.7553 5.44013 16.9506 5.63539L17.6577 6.3425C17.8529 6.53776 18.1695 6.53776 18.3648 6.3425ZM12 6C8.68629 6 6 8.68629 6 12V14.5L5 15.5V16.5H19V15.5L18 14.5V12C18 8.68629 15.3137 6 12 6ZM10.5 17.5V18.5C10.5 19.3284 11.1716 20 12 20C12.8284 20 13.5 19.3284 13.5 18.5V17.5H10.5Z" fill="#1A1A1A"/>
      </Svg>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    backgroundColor: '#EF4B4B',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  }
});
