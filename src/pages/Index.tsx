
import { ThemeToggle } from "../components/theme-toggle";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="animate-fade-in rounded-lg p-8 text-center">
        <h1 className="mb-8 text-4xl font-bold text-text">Theme Switcher</h1>
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Index;
