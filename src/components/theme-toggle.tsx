import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <FontAwesomeIcon icon={faSun} className="h-5 w-5 text-white" />
      ) : (
        <FontAwesomeIcon icon={faMoon} className="h-5 w-5 text-white" />
      )}
    </button>
  );
}
