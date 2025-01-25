import { createContext, useContext, useEffect, ReactNode } from "react";
import { useLocalStorageState } from "../hooks/hooks/useLocalStorage";

interface DarkModeContextValue {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextValue | undefined>(
  undefined,
);

interface DarkModeProviderProps {
  children: ReactNode;
}

function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode",
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  const contextValue: DarkModeContextValue = {
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode(): DarkModeContextValue {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}

export { DarkModeProvider, useDarkMode };
