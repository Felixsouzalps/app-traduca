
import { Colors } from "@/constants/theme";
import { useThemePreference } from "@/contexts/ThemeContext";

export function useTheme() {
  const { theme } = useThemePreference();
  return Colors[theme];
}
