import NavHeader from "@/components/NavHeader";
import { ThemeToggle } from "../components/theme-toggle";

const Index = () => {
  return (
    <>
      <NavHeader />
      <div className="flex bg-accent items-center justify-center">
        <div className="animate-fade-in rounded-lg p-8 text-center"></div>
      </div>
    </>
  );
};

export default Index;
