import NavHeader from "@/components/NavHeader";

const Index = () => {
  return (
    <>
      <NavHeader />
      <div className="animate-fade-in relative items-center justify-center h-[calc(100vh-72px)] classn">
        <div className="bg-accent h-1/2"></div>
        <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 font-pattya -translate-y-1/2 text-8xl font-extrabold text-center text-balance">
          <span className="text-background">Timeless</span>
          <br />
          <span className="text-accent">Elegance</span>
        </h2>
      </div>

      <div className="h-screen bg-background"></div>
    </>
  );
};

export default Index;
