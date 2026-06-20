import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RoomsList } from '@/components/rooms';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoomsPage() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Discover Rooms</Text>
          <Text style={styles.subtitle}>Join a space and connect with others</Text>
        </View>

        <RoomsList
          onRoomSelect={(roomId) => {
            setSelectedRoom(roomId);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scroll: {
    padding: 24,
    paddingBottom: 100, // navbar space
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#CBD5E1',
  },
});
