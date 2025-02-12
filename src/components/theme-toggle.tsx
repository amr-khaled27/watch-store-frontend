import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="inline-flex h-10 w-10 items-center justify-center hover:bg-black/30 text-text"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <FontAwesomeIcon icon={faSun} className="h-5 w-5" />
      ) : (
        <FontAwesomeIcon icon={faMoon} className="h-5 w-5" />
      )}
    </Button>
  );
}
