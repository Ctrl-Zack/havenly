import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  Modal, 
  Animated, 
  PanResponder, 
  TouchableWithoutFeedback,
} from 'react-native';
import { TaskTabs } from './task-tabs';
import { AITaskForm } from './ai-task-form';
import { ManualTaskForm } from './manual-task-form';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export type ManualTaskModalProps = {
  onDismiss?: () => void;
};

export interface BottomSheetRef {
  present: () => void;
  dismiss: () => void;
}

export const ManualTaskModal = forwardRef<BottomSheetRef, ManualTaskModalProps>(
  ({ onDismiss }, ref) => {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const [selectedTab, setSelectedTab] = useState<'ai' | 'manual'>('manual');
    
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    
    const present = () => {
      setVisible(true);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 4,
      }).start();
    };

    const dismiss = () => {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
        if (onDismiss) onDismiss();
      });
    };

    useImperativeHandle(ref, () => ({
      present,
      dismiss,
    }));

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return gestureState.dy > 10;
        },
        onPanResponderMove: (_, gestureState) => {
          if (gestureState.dy > 0) {
            translateY.setValue(gestureState.dy);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dy > SCREEN_HEIGHT * 0.2 || gestureState.vy > 0.5) {
            dismiss();
          } else {
            // snap back
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        },
      })
    ).current;

    const handleAITaskSubmit = (text: string) => {
      dismiss();
      router.push('/task/ai-processing' as any);
    };

    const handleManualSubmit = () => {
      dismiss();
    };

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={dismiss}
      >
        <View style={styles.overlay}>
          {/* Background overlay to dismiss */}
          <TouchableWithoutFeedback onPress={dismiss}>
            <View style={StyleSheet.absoluteFill} />
          </TouchableWithoutFeedback>

          <Animated.View 
            style={[styles.sheetContainer, { transform: [{ translateY }] }]}
          >
            <LinearGradient
              colors={['#FCFEE8', '#97988B']}
              locations={[0.7661, 1]}
              style={styles.gradientBackground}
            />
            {/* Drag Indicator */}
            <View {...panResponder.panHandlers} style={styles.dragHandleArea}>
              <View style={styles.indicator} />
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.tabsWrapper}>
                <TaskTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
              </View>

              <View style={styles.formContainer}>
                {selectedTab === 'ai' ? (
                  <AITaskForm onSubmit={handleAITaskSubmit} />
                ) : (
                  <ManualTaskForm onSubmit={handleManualSubmit} />
                )}
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  dragHandleArea: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    backgroundColor: '#1A1A1A',
    width: 40,
    height: 5,
    borderRadius: 3,
    marginTop: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  tabsWrapper: {
    width: '100%',
    marginBottom: 16,
  },
  formContainer: {
    flex: 1,
    width: '100%',
  }
});
