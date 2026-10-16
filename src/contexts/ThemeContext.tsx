
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useColorScheme } from "react-native";

export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "@traduca:theme-preference";

type ThemeContextValue = {
  preference: ThemePreference;
  theme: ResolvedTheme;
  ready: boolean;
  setPreference: (preference: ThemePreference) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [preference, setPreferenceState] =
    useState<ThemePreference>("system");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function carregarPreferencia() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);

        if (
          ativo &&
          (saved === "light" ||
            saved === "dark" ||
            saved === "system")
        ) {
          setPreferenceState(saved);
        }
      } catch (error) {
        console.error("Erro ao carregar o tema:", error);
      } finally {
        if (ativo) setReady(true);
      }
    }

    carregarPreferencia();

    return () => {
      ativo = false;
    };
  }, []);

  const setPreference = useCallback(
    async (next: ThemePreference) => {
      const anterior = preference;
      setPreferenceState(next);

      try {
        await AsyncStorage.setItem(STORAGE_KEY, next);
      } catch (error) {
        setPreferenceState(anterior);
        console.error("Erro ao salvar o tema:", error);
        throw error;
      }
    },
    [preference],
  );

  const theme: ResolvedTheme =
    preference === "system"
      ? systemScheme === "dark"
        ? "dark"
        : "light"
      : preference;

  const value = useMemo(
    () => ({ preference, theme, ready, setPreference }),
    [preference, theme, ready, setPreference],
  );

  if (!ready) return null;

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemePreference() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useThemePreference deve ser usado dentro de ThemeProvider.",
    );
  }

  return context;
}
