import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type ButtonProps = {
  className?: string; // Kept for compatibility but we will primarily use style
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text?: string;
  ariaLabel?: string;
  state?: "Active" | "Default" | "Disabled";
  variant?: "Danger" | "Warning" | "Dark Neutral" | "Neutral" | "Green";
  size?: "default" | "compact" | "icon";
  iconPosition?: "left" | "right";
  hasIcon?: boolean;
  onClick?: () => void;
};

const variantStyles = {
  Danger: {
    Active: { backgroundColor: "#db2727", text: "#ffffff", border: "transparent", icon: "#ffffff" },
    Default: { backgroundColor: "#ef4b4b", text: "#ffffff", border: "transparent", icon: "#ffffff" },
    Disabled: { backgroundColor: "#fee2e2", text: "#7f1d1d", border: "transparent", icon: "#7f1d1d" },
  },
  Warning: {
    Active: { backgroundColor: "#f28e0e", text: "#ffffff", border: "transparent", icon: "#ffffff" },
    Default: { backgroundColor: "#f8b027", text: "#441604", border: "transparent", icon: "#441604" },
    Disabled: { backgroundColor: "#fbde8c", text: "#441604", border: "transparent", icon: "#441604" },
  },
  "Dark Neutral": {
    Active: { backgroundColor: "#000000", text: "#ffffff", border: "transparent", icon: "#ffffff" },
    Default: { backgroundColor: "#1a1a1a", text: "#ffffff", border: "transparent", icon: "#ffffff" },
    Disabled: { backgroundColor: "#767676", text: "#ffffff", border: "transparent", icon: "#ffffff" },
  },
  Neutral: {
    Active: { backgroundColor: "transparent", text: "#1a1a1a", border: "#000000", icon: "#000000" },
    Default: { backgroundColor: "transparent", text: "#1a1a1a", border: "#1a1a1a", icon: "#1a1a1a" },
    Disabled: { backgroundColor: "transparent", text: "#a5a5a5", border: "#a5a5a5", icon: "#a5a5a5" },
  },
  Green: {
    Active: { backgroundColor: "#2f685f", text: "#f4f9f8", border: "transparent", icon: "#f4f9f8" },
    Default: { backgroundColor: "#418b7e", text: "#f4f9f8", border: "transparent", icon: "#f4f9f8" },
    Disabled: { backgroundColor: "#b3dcd1", text: "#ffffff", border: "transparent", icon: "#ffffff" },
  },
};

const IconSvg = ({ fill }: { fill: string }) => (
  <Svg viewBox="0 0 24 24" fill="none" style={styles.icon}>
    <Path d="M6.5 11.5L10 4.5H14L17.5 11.5H14V18H10V11.5H6.5Z" fill={fill} />
    <Path d="M12 2L8 11H16L12 2Z" fill={fill} opacity={0.2} />
  </Svg>
);

export default function Button({
  className,
  style: customStyle,
  textStyle: customTextStyle,
  text = "Crisis Help",
  ariaLabel,
  state = "Default",
  variant = "Danger",
  size = "default",
  iconPosition = "left",
  hasIcon = true,
  onClick,
}: ButtonProps) {
  const isDisabled = state === "Disabled";
  const baseStyle = variantStyles[variant][isDisabled ? "Disabled" : "Default"];

  return (
    <TouchableOpacity
      disabled={isDisabled}
      accessibilityLabel={size === "icon" ? ariaLabel ?? text : undefined}
      onPress={onClick}
      activeOpacity={0.8}
      style={[
        styles.base,
        styles[size],
        {
          backgroundColor: baseStyle.backgroundColor,
          borderColor: baseStyle.border === "transparent" ? "transparent" : baseStyle.border,
          borderWidth: baseStyle.border === "transparent" ? 0 : 1,
          opacity: isDisabled ? 0.7 : 1,
        },
        customStyle,
      ]}
    >
      <View style={styles.contentContainer}>
        {size === "icon" ? (
          <IconSvg fill={baseStyle.icon} />
        ) : !hasIcon ? (
          <Text style={[styles.text, styles[`text_${size}`], { color: baseStyle.text }, customTextStyle]}>{text}</Text>
        ) : iconPosition === "left" ? (
          <>
            <IconSvg fill={baseStyle.icon} />
            <Text style={[styles.text, styles[`text_${size}`], { color: baseStyle.text, marginLeft: 8 }, customTextStyle]}>{text}</Text>
          </>
        ) : (
          <>
            <Text style={[styles.text, styles[`text_${size}`], { color: baseStyle.text, marginRight: 8 }, customTextStyle]}>{text}</Text>
            <IconSvg fill={baseStyle.icon} />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    minHeight: 60,
    width: '100%',
    maxWidth: 360,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
  },
  compact: {
    minHeight: 48,
    width: '100%',
    maxWidth: 240,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 26,
  },
  icon: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  text_default: {
    fontSize: 16,
    lineHeight: 22,
  },
  text_compact: {
    fontSize: 14,
    lineHeight: 20,
  },
  text_icon: {
    fontSize: 16,
  }
});
