import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, G, Rect, Circle } from 'react-native-svg';
import { CrisisButton } from '@/components/crisis-button';
import { useRouter } from 'expo-router';
import { settingsStore } from '@/utils/settingsStore';
import { useTheme } from '@/theme/ThemeContext';

const { width, height } = Dimensions.get('window');

export default function ProfilePage() {
  const router = useRouter();
  const { colors, scale, settings } = useTheme();
  const nameInputRef = useRef<TextInput>(null);

  const handleUpdate = (updates: Partial<typeof settings>) => {
    settingsStore.updateSettings(updates);
  };

  const handleCrisisClick = () => {
    router.push('/crisis-mode' as any);
  };

  const generateRandomName = () => {
    const prefixes = ['Shadow', 'Cyber', 'Night', 'Iron', 'Mystic', 'Ghost', 'Pixel', 'Storm', 'Star', 'Frost'];
    const suffixes = ['Ninja', 'Slayer', 'Owl', 'Clad', 'Knight', 'Rider', 'Wizard', 'Bringer', 'Walker', 'Wolf'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const randomNumber = Math.floor(Math.random() * 999) + 1; // 1 to 999
    
    const randomName = `${randomPrefix}${randomSuffix}${randomNumber}`;
    handleUpdate({ username: randomName });
  };

  const renderOption = (label: string, value: string, currentValue: string, onSelect: () => void, disabled = false) => {
    const isSelected = value === currentValue;
    return (
      <TouchableOpacity
        style={[
          styles.optionButton,
          { backgroundColor: isSelected ? colors.primary : colors.surface, borderColor: colors.border },
          disabled && { opacity: 0.5 }
        ]}
        onPress={onSelect}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.optionText,
          { color: isSelected ? (settings.appearance === 'dark' || settings.contrast === 'high' ? '#FFF' : '#FCFEE8') : colors.text },
          { fontSize: 14 * scale }
        ]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <LinearGradient
        colors={['#b3dcd1', '#418b7e']}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Background blob */}
        <View style={styles.blobContainer} pointerEvents="none">
          <Svg width="100%" height="100%" viewBox="0 0 345 319" fill="none">
            <G id="Group 77">
              <Path id="Vector" d="M216.317 137.566C219.494 139.907 222.654 141.915 225.459 144.344C239.227 156.297 242.865 174.143 234.454 188.071C229.739 195.864 222.56 200.357 214.019 202.833C202.683 206.127 191.123 206.34 179.464 205.108C178.361 204.996 177.264 204.917 175.576 204.779C176.084 206.676 176.528 208.125 176.847 209.603C178.802 218.846 181.649 228.024 182.487 237.364C185.739 273.74 159.259 299.228 122.946 295.267C106.782 293.506 92.584 287.173 80.1239 276.809C67.5864 266.373 57.8037 253.756 50.4998 239.222C40.679 219.675 33.319 199.162 27.1087 178.216C25.3052 172.13 26.5416 167.737 30.3927 165.024C33.9511 162.521 39.8465 162.803 44.2153 165.679C48.1657 168.299 48.5254 172.309 44.7657 175.214C43.017 176.557 42.3732 177.618 43.0655 179.783C55.7741 219.983 78.6862 251.43 118.695 268.263C121.199 269.318 123.823 270.08 126.42 270.932C149.952 278.615 166.728 258.47 165.812 241.167C165.478 234.958 164.206 228.635 162.288 222.714C160.042 215.789 157.022 209.03 153.529 202.642C151.128 198.241 147.352 194.586 144.122 190.647C143.132 189.431 141.796 188.492 140.826 187.265C136.611 181.98 136.786 175.164 141.183 170.835C145.424 166.64 152.232 166.286 157.244 170.604C170.593 182.138 186.45 184.318 203.166 183.326C206.387 183.128 209.736 182.276 212.69 180.978C220.337 177.628 222.685 168.985 217.009 162.905C213.547 159.194 208.688 156.304 203.912 154.411C196.752 151.564 189.066 150.044 181.692 147.693C176.409 146.012 173.316 141.719 173.329 136.897C173.348 131.945 176.354 127.747 181.441 125.812C183.039 125.199 184.737 124.862 186.407 124.451C189.618 123.673 193.037 123.419 195.996 122.105C203.415 118.803 211.174 115.799 217.806 111.259C228.298 104.091 230.246 93.3531 224.504 82.049C212.268 57.9821 188.589 45.1823 161.77 48.2521C116.79 53.4162 87.9689 84.0241 80.1167 121.407C75.9976 140.972 83.902 156.87 98.1087 169.844C104.29 175.497 109.953 175.117 116.662 169.875C116.896 169.697 117.089 169.491 117.333 169.333C119.987 167.55 122.551 164.455 126.07 167.03C129.303 169.405 128.956 173.074 128.072 176.501C126.279 183.497 121.835 188.043 114.877 189.901C104.983 192.552 95.5545 191.075 87.5623 184.753C71.9525 172.401 60.3733 157.176 57.1345 136.929C55.3892 126.036 57.676 115.431 61.5979 105.311C74.9954 70.7246 99.5182 48.1156 135.337 38.2429C152.842 33.4176 170.739 30.2729 188.904 33.6147C217.236 38.8334 234.838 56.799 243.579 83.3217C249.399 100.974 243.291 116.079 229.468 128.04C225.497 131.491 220.938 134.258 216.317 137.566Z" fill="#BCE2D7"/>
              <Path id="Vector_2" d="M314.903 112.298C309.808 128.988 300.1 141.346 284.074 148.125C278.049 150.671 271.72 151.908 265.147 150.8C259.012 149.772 254.709 145.894 253.668 140.628C252.643 135.416 255.184 130.124 260.409 126.831C262.107 125.769 263.877 124.745 265.753 124.083C287.439 116.379 297.414 100.065 299.342 78.055C299.787 72.9986 298.948 67.8254 298.771 62.6999C298.722 61.2526 298.958 59.7906 299.059 58.3382C300.511 58.7191 302.176 58.7681 303.397 59.5415C310.166 63.8209 313.957 70.3139 316.187 77.7937C319.705 89.5423 317.714 101.091 314.903 112.298Z" fill="#BCE2D7"/>
              <Path id="Vector_3" d="M337.189 162.318C328.7 187.291 309.938 198.299 284.877 195.384C279.544 194.759 275.029 192.267 272.272 187.399C270.184 183.716 270.099 179.837 272.638 176.439C275.034 173.246 278.12 171.723 282.652 172.16C286.622 172.546 290.764 170.908 294.848 170.356C313.659 167.795 324.057 156.054 329.433 138.805C329.776 137.704 329.961 136.524 330.498 135.546C331.059 134.543 331.976 133.728 332.735 132.833C333.588 133.679 334.796 134.383 335.235 135.402C339.131 144.43 339.358 153.721 337.189 162.318Z" fill="#BCE2D7"/>
              <Path id="Vector_4" d="M115.017 134.595C112.633 132.793 108.716 130.716 105.979 127.6C101.414 122.418 103.466 116.41 109.484 113.039C121.854 106.115 128.636 113.497 134.188 123.209C136.109 126.578 135.132 130.226 131.747 132.263C127.084 135.061 121.868 135.824 115.017 134.595Z" fill="#BCE2D7"/>
            </G>
          </Svg>
        </View>

        {/* Top Header Section */}
        <View style={styles.topSection}>
          <View style={styles.crisisWrapper}>
            <CrisisButton onClick={handleCrisisClick} />
          </View>
          <View style={styles.titleWrapper}>
            <Text style={[styles.title, { color: '#000', fontSize: 32 * scale }]}>Settings</Text>
          </View>
        </View>

        {/* Bottom Card Container */}
        <View style={[styles.bottomCardContainer, { backgroundColor: colors.background }]}>
          <View style={styles.bottomCardContent}>
            
            {/* Account Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <Circle cx="12" cy="7" r="4" />
                </Svg>
                <Text style={[styles.sectionTitleWithIcon, { color: colors.text, fontSize: 18 * scale }]}>Account</Text>
              </View>

              <View style={styles.accountProfileRow}>
                <View style={styles.avatarContainer}>
                  <View style={[styles.avatarCircle, { backgroundColor: settings.appearance === 'dark' ? '#2A2A3E' : '#E8E8FA' }]}>
                    <Svg width="56" height="56" viewBox="0 0 24 24" fill={settings.appearance === 'dark' ? '#FFF' : '#818CF8'}>
                      <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </Svg>
                  </View>
                  <View style={[styles.cameraBadge, { backgroundColor: '#818CF8', borderColor: colors.background }]}>
                    <Svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                      <Path d="M19 4h-3.17L14 2H10L8.17 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-7 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
                      <Circle cx="12" cy="12" r="3.2" fill="white" />
                    </Svg>
                  </View>
                </View>

                <TouchableOpacity style={[styles.uploadNewBtn, { borderColor: colors.border }]} activeOpacity={0.7}>
                  <Text style={[styles.uploadNewText, { color: colors.text, fontSize: 14 * scale }]}>Upload New</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.nameSectionHeader}>
                <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <Rect x="3" y="5" width="18" height="14" rx="2" />
                  <Circle cx="8.5" cy="10.5" r="1.5" />
                  <Path d="M6 14h5M14 10h4M14 14h4" />
                </Svg>
                <Text style={[styles.sectionTitleWithIcon, { color: colors.text, fontSize: 16 * scale }]}>Name</Text>
              </View>

              <View style={[styles.nameInputContainer, { backgroundColor: colors.surface, borderColor: colors.border }, settings.isGuest && { opacity: 0.8 }]}>
                <TextInput
                  ref={nameInputRef}
                  style={[styles.nameInput, { color: colors.text, fontSize: 16 * scale }]}
                  value={settings.username}
                  onChangeText={(text) => handleUpdate({ username: text })}
                  placeholderTextColor={colors.textSecondary}
                  editable={!settings.isGuest}
                />
                
                <View style={styles.nameActions}>
                  <TouchableOpacity activeOpacity={0.7} style={styles.nameActionBtn} onPress={generateRandomName}>
                    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
                    </Svg>
                  </TouchableOpacity>
                  {!settings.isGuest && (
                    <TouchableOpacity activeOpacity={0.7} style={styles.nameActionBtn} onPress={() => nameInputRef.current?.focus()}>
                      <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <Path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </Svg>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>

            {/* Divider */}
            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            {/* Live Preview Section */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: 14 * scale }]}>LIVE PREVIEW</Text>
              
              <View style={[styles.previewCard, { backgroundColor: '#FDEFC8', borderColor: '#FBDE8C' }]}>
                {/* Top Left Corner Cutout */}
                <View style={styles.previewCornerCutout}>
                  <Svg width="82" height="79" viewBox="0 0 81.876 78.5791" fill="none">
                    <Path d="M81.876 0C71.0153 4.69171 63 12.9522 63 27.5C63 55 51.5 65.5 18.5 65.5C10.4173 65.5 4.05816 69.7291 0 78.5791V40C0 17.9086 17.9086 1.53012e-07 40 0H81.876Z" fill="#FBDE8C" />
                  </Svg>
                </View>

                {/* Eye Icon inside Cutout */}
                <View style={[styles.previewEyeContainer, { backgroundColor: '#FDEFC8' }]}>
                  <Svg width="24" height="18" viewBox="0 0 23.901 17.6" fill="none">
                    <Path d="M11.9505 1.1C5.96185 1.1 2.63472 5.75768 1.45161 7.82803C1.20889 8.25277 1.08753 8.46514 1.10089 8.78196C1.11426 9.09877 1.25694 9.30579 1.54231 9.71981C2.95053 11.7629 6.7738 16.5 11.9505 16.5C17.1272 16.5 20.9505 11.7629 22.3587 9.71981C22.6441 9.30579 22.7868 9.09877 22.8001 8.78196C22.8135 8.46514 22.6921 8.25277 22.4494 7.82803C21.2663 5.75768 17.9392 1.1 11.9505 1.1Z" stroke="#000" strokeWidth="2.2" />
                    <G transform="translate(7.55, 4.4)">
                      <Path d="M4.4 8.8C6.83005 8.8 8.8 6.83005 8.8 4.4C8.8 1.96995 6.83005 0 4.4 0C1.96995 0 0 1.96995 0 4.4C0 6.83005 1.96995 8.8 4.4 8.8Z" fill="#000" />
                    </G>
                  </Svg>
                </View>

                {/* Top Right Pill Button */}
                <View style={[styles.previewPillBtn, { backgroundColor: '#FBDE8C' }]}>
                  <Text style={[styles.previewPillText, { color: '#000', fontSize: 18 * scale }]}>Button</Text>
                  <Svg width="22" height="27" viewBox="0 0 21.333 26.667" fill="none">
                    <Path d="M10.667 6.66699C10.667 7.25771 10.664 7.83513 10.7275 8.30762C10.7962 8.81836 10.9633 9.40162 11.4473 9.88574C11.9315 10.3699 12.5155 10.5378 13.0264 10.6064C13.4989 10.6699 14.0763 10.667 14.667 10.667H21.333V18.667C21.333 22.4378 21.3335 24.3236 20.1621 25.4951C18.9905 26.6667 17.1042 26.667 13.333 26.667H8C4.22894 26.667 2.34346 26.6665 1.17188 25.4951C0.000335773 24.3236 9.66566e-10 22.438 0 18.667V8C0 4.22876 0.000302146 2.34345 1.17188 1.17188C2.34345 0.000302146 4.22876 0 8 0H10.667V6.66699ZM6.66699 18.667C5.93061 18.667 5.33398 19.2636 5.33398 20C5.33398 20.7364 5.93061 21.333 6.66699 21.333H12C12.7362 21.3328 13.334 20.7363 13.334 20C13.334 19.2637 12.7362 18.6672 12 18.667H6.66699ZM6.66699 13.334C5.93061 13.334 5.33398 13.9306 5.33398 14.667C5.33416 15.4032 5.93072 16 6.66699 16H14.667C15.4031 15.9998 15.9998 15.4031 16 14.667C16 13.9307 15.4032 13.3342 14.667 13.334H6.66699ZM13.333 0.00683594C13.882 0.0204173 14.2458 0.0634294 14.583 0.203125C15.0729 0.406158 15.458 0.791966 16.2285 1.5625L19.7715 5.10449C20.5422 5.87518 20.9269 6.26094 21.1299 6.75098C21.2695 7.08815 21.3126 7.45117 21.3262 8H14.667C14.0008 8 13.6344 7.99796 13.3809 7.96387C13.3775 7.96342 13.3743 7.96237 13.3711 7.96191C13.3707 7.95892 13.3705 7.95528 13.3701 7.95215C13.3361 7.69861 13.333 7.33282 13.333 6.66699V0.00683594Z" fill="#000" />
                  </Svg>
                </View>

                {/* Text Content */}
                <View style={styles.previewTextContainer}>
                  <Text style={[styles.previewTitle, { color: '#000', fontSize: 28 * scale }]}>Lorem Ipsum</Text>
                  <Text style={[styles.previewSub, { color: '#A5A5A5', fontSize: 13 * scale }]}>The quick brown fox jumps over the lazy dog</Text>
                </View>
              </View>
            </View>

            {/* Appearance */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: 14 * scale }]}>APPEARANCE</Text>
              <View style={styles.optionsRow}>
                {renderOption('Light', 'light', settings.appearance, () => handleUpdate({ appearance: 'light' }))}
                {renderOption('Dark', 'dark', settings.appearance, () => handleUpdate({ appearance: 'dark' }))}
              </View>
            </View>

            {/* Contrast */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: 14 * scale }]}>CONTRAST</Text>
              <View style={styles.optionsRow}>
                {renderOption('Normal', 'normal', settings.contrast, () => handleUpdate({ contrast: 'normal' }))}
                {renderOption('High', 'high', settings.contrast, () => handleUpdate({ contrast: 'high' }), settings.appearance === 'dark')}
              </View>
              {settings.appearance === 'dark' && (
                <Text style={[styles.helpText, { color: colors.textSecondary, fontSize: 12 * scale }]}>
                  High contrast is only available in Light Mode.
                </Text>
              )}
            </View>

            {/* Text Size */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: 14 * scale }]}>TEXT SIZE</Text>
              <View style={styles.optionsRow}>
                {renderOption('Small', 'small', settings.textSize, () => handleUpdate({ textSize: 'small' }))}
                {renderOption('Regular', 'regular', settings.textSize, () => handleUpdate({ textSize: 'regular' }))}
                {renderOption('Large', 'large', settings.textSize, () => handleUpdate({ textSize: 'large' }))}
              </View>
            </View>

            {/* Notification */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: 14 * scale }]}>NOTIFICATIONS</Text>
              <View style={styles.optionsRow}>
                {renderOption('Gentle', 'gentle', settings.notification, () => handleUpdate({ notification: 'gentle' }))}
                {renderOption('None', 'none', settings.notification, () => handleUpdate({ notification: 'none' }))}
              </View>
            </View>

            {/* Animation */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: 14 * scale }]}>ANIMATION</Text>
              <View style={styles.optionsRow}>
                {renderOption('Full', 'full', settings.animation, () => handleUpdate({ animation: 'full' }))}
                {renderOption('Reduced', 'reduced', settings.animation, () => handleUpdate({ animation: 'reduced' }))}
              </View>
            </View>

            {/* Logout Button */}
            {!settings.isGuest && (
              <View style={[styles.section, { marginTop: 32 }]}>
                <TouchableOpacity 
                  style={[styles.logoutButton, { borderColor: '#EF4444' }]} 
                  activeOpacity={0.7}
                  onPress={() => router.replace('/onboarding')}
                >
                  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                  </Svg>
                  <Text style={[styles.logoutText, { color: '#EF4444', fontSize: 16 * scale }]}>Logout</Text>
                </TouchableOpacity>
              </View>
            )}

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 0,
  },
  blobContainer: {
    position: 'absolute',
    height: 319,
    width: 345,
    left: -20,
    top: -15,
  },
  topSection: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    paddingTop: 20,
    zIndex: 20,
  },
  crisisWrapper: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 30,
  },
  titleWrapper: {
    width: '100%',
    marginTop: 60,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'SourceSerifPro-SemiBold',
  },
  bottomCardContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 400,
    marginTop: 40,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 10,
    minHeight: 600,
  },
  bottomCardContent: {
    width: '100%',
    padding: 24,
    paddingTop: 40,
    paddingBottom: 180,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    marginBottom: 12,
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    width: '100%',
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitleWithIcon: {
    fontFamily: 'Poppins-SemiBold',
  },
  accountProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: -4,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadNewBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
  },
  uploadNewText: {
    fontFamily: 'Poppins-Medium',
  },
  nameSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  nameInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 16,
  },
  nameInput: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    height: '100%',
  },
  nameActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nameActionBtn: {
    padding: 8,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  optionText: {
    fontFamily: 'Poppins-Regular',
  },
  helpText: {
    fontFamily: 'Poppins-Regular',
    marginTop: 8,
    fontStyle: 'italic',
  },
  logoutButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 24,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  logoutText: {
    fontFamily: 'Poppins-SemiBold',
  },
  previewBox: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  previewItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  previewText: {
    fontFamily: 'SourceSerifPro-SemiBold',
    marginBottom: 4,
  },
  previewSubtext: {
    fontFamily: 'Poppins-Regular',
  },
  previewCard: {
    borderRadius: 40,
    borderWidth: 4,
    minHeight: 180,
    position: 'relative',
    paddingHorizontal: 16,
    paddingTop: 90,
    paddingBottom: 32,
    justifyContent: 'flex-end',
  },
  previewCornerCutout: {
    position: 'absolute',
    left: -4,
    top: -4,
    width: 82,
    height: 79,
  },
  previewEyeContainer: {
    position: 'absolute',
    left: 6,
    top: 6,
    width: 48,
    height: 48,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewPillBtn: {
    position: 'absolute',
    right: 8,
    top: 8,
    height: 60,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
  },
  previewPillText: {
    fontFamily: 'Poppins-SemiBold',
  },
  previewTextContainer: {
    marginTop: 'auto',
  },
  previewTitle: {
    fontFamily: 'SourceSerifPro-SemiBold',
  },
  previewSub: {
    fontFamily: 'Poppins-Regular',
    marginTop: 4,
  }
});
