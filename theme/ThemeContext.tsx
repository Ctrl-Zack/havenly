import React, { createContext, useContext, useState, useEffect } from 'react';
import { settingsStore, SettingsConfig } from '@/utils/settingsStore';
import { getThemeColors, getTextScale, AppColors } from './theme';

type ThemeContextType = {
  settings: SettingsConfig;
  colors: AppColors;
  scale: number;
};

const defaultSettings = settingsStore.getSettings();
const defaultColors = getThemeColors(defaultSettings.appearance, defaultSettings.contrast);
const defaultScale = getTextScale(defaultSettings.textSize);

const ThemeContext = createContext<ThemeContextType>({
  settings: defaultSettings,
  colors: defaultColors,
  scale: defaultScale,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsConfig>(settingsStore.getSettings());

  useEffect(() => {
    const unsubscribe = settingsStore.subscribe(() => {
      setSettings(settingsStore.getSettings());
    });
    return unsubscribe;
  }, []);

  const colors = getThemeColors(settings.appearance, settings.contrast);
  const scale = getTextScale(settings.textSize);

  return (
    <ThemeContext.Provider value={{ settings, colors, scale }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
