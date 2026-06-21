import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export type RoomType = "library" | "cafe" | "study" | "park";

export type RoomsListProps = {
  onRoomSelect?: (roomId: RoomType) => void;
};

type RoomConfig = {
  id: RoomType;
  title: string;
  peopleCount: number;
  gradient: [string, string];
  iconBg: string;
  icon: React.ReactNode;
  textColor: string;
  subtitleColor: string;
  swirlColor: string;
  swirlPath: string;
  swirlViewBox: string;
};

// Library: swooping organic swirl (top-right, like CurrentTaskCard)
const LIBRARY_SWIRL = "M237.564 117.919C234.995 114.334 233.224 111.159 230.783 108.642C228.263 106.044 224.941 104.264 222.234 101.806C218.201 98.138 213.803 94.6508 210.631 90.2862C204.017 81.2133 205.473 71.7097 214.213 64.6596C218.145 61.4891 222.61 58.919 227.064 56.4633C233.242 53.0486 236.644 47.8921 238.137 41.1355C240.84 28.8944 231.696 17.6268 219.581 20.3215C201.8 24.2716 184.653 29.4237 172.31 45.3359C160.907 60.0542 150.759 75.0675 144.549 92.6571C143.076 96.8312 140.71 100.688 139.279 104.866C138.133 108.205 137.234 111.814 137.169 115.316C137.069 121.255 133.298 124.86 127.608 122.937C124.672 121.945 121.718 119.954 119.677 117.62C111.13 107.941 110.305 96.6425 114.258 84.9124C116.246 78.9979 119.046 73.3498 121.801 67.7262C122.989 65.3003 122.575 64.0617 120.463 62.6153C113.886 58.0793 107.285 57.9592 101.61 63.6173C98.3014 66.9204 95.702 71.2451 93.7259 75.5436C88.7932 86.2114 87.9154 97.6479 88.2764 109.262C88.3635 112.086 88.1466 115.068 87.2823 117.727C85.5183 123.115 80.1023 124.77 75.6988 121.195C73.464 119.376 71.5072 116.775 70.4081 114.113C61.3397 92.3856 64.0681 71.9895 78.0663 53.1481C79.6599 51.007 79.8914 49.5135 78.6206 47.2824C76.6067 43.7808 74.7026 40.1889 73.0228 36.5176C64.2852 17.3343 49.0795 6.04207 29.212 0.39074C27.7092 -0.0437137 26.2079 -0.492459 24.7051 -0.926927C23.2167 -1.36001 21.7254 -1.76443 20.1526 -2.22013C20.8141 -9.04287 21.4534 -15.6368 22.1649 -22.9744C56.2575 -12.5942 78.4831 9.23961 88.669 43.5644C104.805 35.7298 118.448 38.8718 130.355 51.721C131.161 50.7019 131.801 49.7677 132.56 48.9318C142.347 38.0849 151.556 26.6478 162.09 16.5809C174.66 4.57455 191.187 1.05145 207.87 -0.362914C215.018 -0.969272 222.54 -0.225439 229.558 1.40785C252.049 6.64948 262.002 28.1885 256.537 49.1133C253.802 59.6044 248.014 67.7782 238.654 73.3245C235.3 75.3093 231.934 77.2641 227.891 79.6442C229.935 81.5027 231.527 83.1008 233.297 84.4997C236.877 87.3302 241.077 89.5854 244.043 92.9483C248.403 97.8612 252.787 103.123 255.569 108.98C261.262 120.996 256.939 132.084 245.198 138.366C235.878 143.353 225.788 144.223 215.509 143.616C205.089 142.981 194.68 142.073 184.267 141.367C181.685 141.188 179.085 141.355 175.907 141.365C176.4 143.131 176.703 144.474 177.156 145.759C179.715 153.169 182.528 160.487 184.806 167.97C186.24 172.686 187.54 177.591 187.817 182.483C189.44 210.116 162.167 221.578 144.91 216.396C131.358 212.324 117.992 207.072 105.355 200.707C89.0705 192.501 73.4894 182.848 57.8103 173.459C40.1257 162.865 24.4169 149.762 10.1827 134.854C7.90186 132.467 6.71412 130.273 7.42623 126.949C7.95916 124.431 7.98271 121.805 8.29614 118.573C11.0183 119.833 13.3986 120.598 15.4073 121.919C20.5238 125.288 25.5863 128.768 30.4678 132.475C45.3806 143.811 61.1172 153.797 77.884 162.093C94.4847 170.315 111.07 178.551 127.872 186.33C133.62 188.996 139.929 190.632 146.121 192.142C149.437 192.94 153.178 193.072 156.518 192.429C163.814 191.042 166.351 186.914 164.962 179.647C164.395 176.704 163.536 173.806 162.523 170.993C159.382 162.141 156.318 153.239 152.833 144.513C147.417 130.979 150.625 120.823 168.176 119.247C182.057 117.994 195.736 118.079 209.546 119.793C216.58 120.663 223.82 119.993 230.961 119.762C232.778 119.779 234.59 118.814 237.564 117.919Z";

// Cafe: zigzag / lightning-bolt wave pattern
const CAFE_SWIRL = "M180 10C200 10 220 30 210 50C200 70 230 70 240 50C250 30 270 20 290 30C310 40 300 70 280 80C260 90 280 110 300 100C320 90 350 80 360 100C370 120 340 140 320 130C300 120 280 140 300 160C320 180 290 190 270 170C250 150 230 170 250 190C270 210 240 230 220 210C200 190 180 210 200 230";

// Study Hall: angular Z-shaped zigzag lines
const STUDY_SWIRL = "M300 5L220 55L340 85L200 130L350 155 M280 0L200 45L320 75L180 120L330 145 M260 -5L180 40L300 70L160 115L310 140";

// Park: organic leaf / branch shape
const PARK_SWIRL = "M280 20C260 30 250 50 260 70C270 90 250 100 240 90C230 80 210 90 220 110C230 130 210 140 200 130C190 120 170 130 180 150C190 170 170 170 160 160C150 150 130 160 140 180 M300 40C290 55 280 65 290 85C300 105 280 110 270 100C260 90 245 95 255 115C265 135 245 140 235 130";

export function RoomsList({ onRoomSelect }: RoomsListProps) {
  const rooms: RoomConfig[] = [
    {
      id: "library",
      title: "Quiet Library",
      peopleCount: 42,
      gradient: ['#C8A882', '#A07850'],
      iconBg: '#E8D5BF',
      textColor: '#3D2010',
      subtitleColor: '#6B4C3E',
      icon: <Ionicons name="book" size={22} color="#3D2010" />,
      swirlColor: '#B89870',
      swirlPath: LIBRARY_SWIRL,
      swirlViewBox: "0 0 249 190",
    },
    {
      id: "cafe",
      title: "Busy Cafe",
      peopleCount: 100,
      gradient: ['#C0C6F5', '#9BA3E8'],
      iconBg: '#DCDFF8',
      textColor: '#1E2A6E',
      subtitleColor: '#4050A0',
      icon: <Ionicons name="cafe" size={22} color="#1E2A6E" />,
      swirlColor: '#6870C8',
      swirlPath: CAFE_SWIRL,
      swirlViewBox: "0 0 370 240",
    },
    {
      id: "study",
      title: "Study Hall",
      peopleCount: 20,
      gradient: ['#F5DFA0', '#ECC850'],
      iconBg: '#FFF3D0',
      textColor: '#6B4A00',
      subtitleColor: '#9A7520',
      icon: <Ionicons name="school" size={22} color="#6B4A00" />,
      swirlColor: '#C8A030',
      swirlPath: STUDY_SWIRL,
      swirlViewBox: "0 0 370 160",
    },
    {
      id: "park",
      title: "Relaxing Park",
      peopleCount: 67,
      gradient: ['#A8CCBF', '#78B0A0'],
      iconBg: '#D0E8E0',
      textColor: '#1A3D30',
      subtitleColor: '#3A6858',
      icon: <MaterialCommunityIcons name="tree" size={22} color="#1A3D30" />,
      swirlColor: '#4E8E78',
      swirlPath: PARK_SWIRL,
      swirlViewBox: "0 0 370 200",
    }
  ];

  return (
    <View style={styles.list}>
      {rooms.map((room) => {
        const isLibrary = room.id === 'library';
        return (
          <TouchableOpacity
            key={room.id}
            style={styles.card}
            onPress={() => onRoomSelect?.(room.id)}
            activeOpacity={0.9}
          >
            <LinearGradient 
              colors={room.gradient} 
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
            
            {/* Decorative vector */}
            <View style={isLibrary ? styles.swirlContainerLibrary : styles.swirlContainer} pointerEvents="none">
              <Svg
                width="100%"
                height="100%"
                viewBox={room.swirlViewBox}
                fill="none"
              >
                <Path
                  d={room.swirlPath}
                  fill="none"
                  stroke={room.swirlColor}
                  strokeWidth={isLibrary ? 1 : 16}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.5}
                />
                {/* Filled version for library (uses the organic fill style) */}
                {isLibrary && (
                  <Path
                    d={room.swirlPath}
                    fill={room.swirlColor}
                    opacity={0.3}
                  />
                )}
              </Svg>
            </View>

            <View style={[styles.iconContainer, { backgroundColor: room.iconBg }]}>
              {room.icon}
            </View>

            <View style={styles.textContainer}>
              <Text style={[styles.title, { color: room.textColor }]}>
                {room.title}
              </Text>
              <Text style={[styles.subtitle, { color: room.subtitleColor }]}>
                {room.peopleCount} people
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { 
    gap: 20,
    marginTop: 8,
  },
  card: {
    height: 148,
    borderRadius: 24,
    padding: 20,
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  swirlContainer: {
    position: 'absolute',
    right: -30,
    top: -30,
    width: 300,
    height: 200,
  },
  swirlContainerLibrary: {
    position: 'absolute',
    right: -20,
    top: -20,
    width: 249,
    height: 190,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
    zIndex: 2,
  },
  textContainer: {
    zIndex: 2,
  },
  title: { 
    fontFamily: 'SourceSerifPro-Bold', 
    fontSize: 22, 
    lineHeight: 28,
  },
  subtitle: { 
    fontFamily: 'Poppins-Regular', 
    fontSize: 14, 
    marginTop: 2,
  },
});

export default RoomsList;
