import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Cart from "./pages/Cart";
import PaymentSuccessPage from "./pages/Success";
import PaymentCancelPage from "./pages/Cancel";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import { CartContextCountProvider } from "./context/CartContextCount";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <CartContextCountProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/auth/signin" element={<Signin />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/success" element={<PaymentSuccessPage />} />
              <Route path="/cancel" element={<PaymentCancelPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartContextCountProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
