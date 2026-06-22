export type AppearanceType = 'light' | 'dark';
export type ContrastType = 'normal' | 'high';
export type TextSizeType = 'small' | 'regular' | 'large';
export type NotificationType = 'gentle' | 'none';
export type AnimationType = 'full' | 'reduced';

export type SettingsConfig = {
  appearance: AppearanceType;
  contrast: ContrastType;
  textSize: TextSizeType;
  notification: NotificationType;
  animation: AnimationType;
  username: string;
  isGuest: boolean;
};

export const generateRandomUsername = () => {
  const prefixes = ['Shadow', 'Cyber', 'Night', 'Iron', 'Mystic', 'Ghost', 'Pixel', 'Storm', 'Star', 'Frost'];
  const suffixes = ['Ninja', 'Slayer', 'Owl', 'Clad', 'Knight', 'Rider', 'Wizard', 'Bringer', 'Walker', 'Wolf'];
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const randomNumber = Math.floor(Math.random() * 999) + 1;
  return `${randomPrefix}${randomSuffix}${randomNumber}`;
};

const DEFAULT_SETTINGS: SettingsConfig = {
  appearance: 'light',
  contrast: 'normal',
  textSize: 'regular',
  notification: 'gentle',
  animation: 'full',
  username: 'John Doe',
  isGuest: false,
};

type Listener = () => void;

class SettingsStore {
  private settings: SettingsConfig = { ...DEFAULT_SETTINGS };
  private listeners: Set<Listener> = new Set();

  getSettings(): SettingsConfig {
    return { ...this.settings };
  }

  updateSettings(updates: Partial<SettingsConfig>) {
    this.settings = { ...this.settings, ...updates };

    // Enforce logic: If appearance is dark, contrast must be normal
    if (this.settings.appearance === 'dark' && this.settings.contrast === 'high') {
      this.settings.contrast = 'normal';
    }

    this.notify();
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }
}

export const settingsStore = new SettingsStore();
