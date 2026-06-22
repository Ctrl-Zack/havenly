import { AppearanceType, ContrastType, TextSizeType } from '@/utils/settingsStore';

export type AppColors = {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
};

export const LightColors: AppColors = {
  background: '#FCFEE8', // Light yellow
  surface: '#FFFFFF',
  primary: '#418b7e', // Green
  secondary: '#b3dcd1', // Light green
  text: '#151515',
  textSecondary: '#767676',
  border: '#EAEBFE',
};

export const LightHighContrastColors: AppColors = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  primary: '#2A5A52', // Darker green
  secondary: '#82A59A', // Darker light green
  text: '#000000', // Pure black
  textSecondary: '#333333', // Darker grey
  border: '#000000', // Strong black borders
};

export const DarkColors: AppColors = {
  background: '#121212', // standard dark mode bg
  surface: '#1E1E1E', // standard dark mode surface, slightly lighter than background
  primary: '#54B3A2', // brightened green for dark mode contrast
  secondary: '#2C5C54', // darker green for secondary elements
  text: '#F5F5F5', // almost white text
  textSecondary: '#AAAAAA', // muted gray text
  border: '#333333', // dark gray border to distinguish elevated elements
};

export const getThemeColors = (appearance: AppearanceType, contrast: ContrastType): AppColors => {
  if (appearance === 'dark') {
    return DarkColors;
  }
  if (contrast === 'high') {
    return LightHighContrastColors;
  }
  return LightColors;
};

export const getTextScale = (size: TextSizeType): number => {
  switch (size) {
    case 'small':
      return 0.85;
    case 'large':
      return 1.15;
    case 'regular':
    default:
      return 1;
  }
};
