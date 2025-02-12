
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="theme-toggle group relative inline-flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      data-state={theme === "dark" ? "checked" : "unchecked"}
      aria-label="Toggle theme"
    >
      <span className="theme-toggle-thumb flex items-center justify-center">
        {theme === "light" ? (
          <Sun className="h-3 w-3 text-secondary" />
        ) : (
          <Moon className="h-3 w-3 text-secondary" />
        )}
      </span>
    </button>
  );
}
