import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export type RoomType = "library" | "cafe" | "study" | "park";

export type RoomsListProps = {
  onRoomSelect?: (roomId: string) => void;
};

export function RoomsList({ onRoomSelect }: RoomsListProps) {
  const rooms: Array<{ id: RoomType; title: string; peopleCount: number }> = [
    { id: "library", title: "Quiet Library", peopleCount: 42 },
    { id: "cafe", title: "Busy Cafe", peopleCount: 100 },
    { id: "study", title: "Study Hall", peopleCount: 20 },
    { id: "park", title: "Relaxing Park", peopleCount: 67 },
  ];

  return (
    <View style={styles.list}>
      {rooms.map((room) => (
        <TouchableOpacity
          key={room.id}
          style={styles.card}
          onPress={() => onRoomSelect?.(room.id)}
        >
          <Text style={styles.title}>{room.title}</Text>
          <Text style={styles.subtitle}>{room.peopleCount} people</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 16 },
  card: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 16,
  },
  title: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  subtitle: { color: '#CCC', fontSize: 14, marginTop: 8 },
});

export default RoomsList;
