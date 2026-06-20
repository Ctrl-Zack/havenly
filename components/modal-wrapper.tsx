import React, { useRef, useEffect } from 'react';
import { View, Modal, TouchableWithoutFeedback, StyleSheet, Dimensions, Platform, ScrollView, TouchableOpacity, PanResponder, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

type ModalWrapperProps = {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  variant?: 'center' | 'bottom-sheet';
  useGradient?: boolean;
};

export function ModalWrapper({ children, isOpen = true, onClose, variant = 'center', useGradient = false }: ModalWrapperProps) {
  
  const translateY = useRef(new Animated.Value(height)).current;

  // Animate entry
  useEffect(() => {
    if (isOpen) {
      if (variant === 'bottom-sheet') {
        translateY.setValue(height);
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 4,
          speed: 16,
        }).start();
      } else {
        translateY.setValue(0);
      }
    }
  }, [isOpen, variant]);

  const handleClose = () => {
    if (variant === 'bottom-sheet') {
      Animated.timing(translateY, {
        toValue: height,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        if (onClose) onClose();
      });
    } else {
      if (onClose) onClose();
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Intercept drag when swiping down
        return variant === 'bottom-sheet' && gestureState.dy > 10;
      },
      onPanResponderMove: (evt, gestureState) => {
        // Move the modal with the finger
        if (variant === 'bottom-sheet' && gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (variant === 'bottom-sheet') {
          // If swiped down enough or fast enough, dismiss
          if (gestureState.dy > height * 0.2 || gestureState.vy > 0.5) {
            handleClose();
          } else {
            // Snap back to original position
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
              bounciness: 4,
            }).start();
          }
        }
      },
    })
  ).current;

  return (
    
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      <View style={[styles.overlay, variant === 'bottom-sheet' ? styles.alignEnd : styles.alignCenter]}>
        {/* Backdrop */}
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={StyleSheet.absoluteFillObject} />
        </TouchableWithoutFeedback>

        {/* Modal Content container */}
        <Animated.View 
          {...panResponder.panHandlers}
          style={[
            styles.contentContainer,
            variant === 'bottom-sheet' ? styles.bottomSheetContainer : styles.centerContainer,
            useGradient && { backgroundColor: 'transparent' },
            { transform: [{ translateY }] }
          ]}
        >
          {useGradient && (
            <LinearGradient 
              colors={['#FCFEE8', '#97988B']} 
              locations={[0.76, 1]}
              style={StyleSheet.absoluteFill} 
            />
          )}
          {variant === 'bottom-sheet' && (
            <TouchableOpacity 
              style={styles.dragHandleContainer}
              onPress={onClose} // Temporary fallback to click to close since swipe is not fully implemented
              activeOpacity={0.8}
            >
              <View style={styles.dragHandle} />
            </TouchableOpacity>
          )}
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  alignEnd: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    backgroundColor: '#F2EAE0',
    overflow: 'hidden',
  },
  bottomSheetContainer: {
    maxWidth: 600,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24, // safe area approximation
  },
  centerContainer: {
    maxWidth: 390,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  dragHandleContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  dragHandle: {
    height: 5,
    width: 48,
    borderRadius: 2.5,
    backgroundColor: '#A5A5A5',
  }
});

export default ModalWrapper;
