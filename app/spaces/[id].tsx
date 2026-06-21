import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { RoomTimer } from '@/components/room-timer';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RoomType } from '@/components/rooms';

type RoomInfo = {
  title: string;
  peopleCount: number;
  gradient: [string, string];
  iconBg: string;
  icon: React.ReactNode;
  textColor: string;
  subtitleColor: string;
  participants: string;
};

export default function RoomDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: RoomType }>();

  const roomData = useMemo<RoomInfo>(() => {
    const config: Record<RoomType, RoomInfo> = {
      library: {
        title: "Quiet Library",
        peopleCount: 42,
        gradient: ['#FAF0E6', '#C2A38D'],
        iconBg: '#FAF5F0',
        textColor: '#4E2B1E',
        subtitleColor: '#6B4C3E',
        icon: <Ionicons name="book" size={28} color="#4E2B1E" />,
        participants: "Work silently alongside Jane, Alice, Bob, and 39 others."
      },
      cafe: {
        title: "Busy Cafe",
        peopleCount: 100,
        gradient: ['#C9CFFC', '#9EA9FA'],
        iconBg: '#EAEBFE',
        textColor: '#2A3B8F',
        subtitleColor: '#4F5CA8',
        icon: <Ionicons name="cafe" size={28} color="#2A3B8F" />,
        participants: "Work silently alongside John, Mary, David, and 97 others."
      },
      study: {
        title: "Study Hall",
        peopleCount: 20,
        gradient: ['#FDEFC8', '#FACE68'],
        iconBg: '#FFF8E7',
        textColor: '#8A600F',
        subtitleColor: '#A37822',
        icon: <Ionicons name="school" size={28} color="#8A600F" />,
        participants: "Work silently alongside Emma, Liam, Olivia, and 17 others."
      },
      park: {
        title: "Relaxing Park",
        peopleCount: 67,
        gradient: ['#D1ECE4', '#84C3B1'],
        iconBg: '#EDF7F5',
        textColor: '#1E4E3F',
        subtitleColor: '#3F7A6A',
        icon: <MaterialCommunityIcons name="tree" size={28} color="#1E4E3F" />,
        participants: "Work silently alongside Sarah, Michael, James, and 64 others."
      }
    };

    // Fallback to library if no match or invalid id
    return config[id || 'library'] || config.library;
  }, [id]);

  const handleFinish = (completedEarly?: boolean) => {
    // Navigate back to the Spaces tab on finish
    router.replace('/(tabs)/spaces' as any);
  };

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={roomData.gradient} 
        style={StyleSheet.absoluteFillObject} 
      />

      <View style={styles.content}>
        {/* Header Icon */}
        <View style={[styles.iconContainer, { backgroundColor: roomData.iconBg }]}>
          {roomData.icon}
        </View>

        {/* Room Title */}
        <Text style={[styles.title, { color: roomData.textColor }]}>
          {roomData.title}
        </Text>

        {/* Room Active Participants */}
        <Text style={[styles.subtitle, { color: roomData.subtitleColor }]}>
          {roomData.participants}
        </Text>

        {/* Timer Container (25 minutes Pomodoro by default) */}
        <View style={styles.timerWrapper}>
          <RoomTimer 
            initialSeconds={1500} // 25 mins
            autoStart={false} 
            onFinish={handleFinish}
          />
        </View>

        {/* Leave Room Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.leaveButton}
          activeOpacity={0.8}
        >
          <Text style={styles.leaveButtonText}>Leave Room</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontFamily: 'SourceSerifPro-Bold',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
    maxWidth: 260,
  },
  timerWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  leaveButton: {
    backgroundColor: '#151515',
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
    marginTop: 10,
  },
  leaveButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#FFFFFF',
  },
});
