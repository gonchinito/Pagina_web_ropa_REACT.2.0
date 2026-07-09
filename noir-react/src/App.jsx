import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductsProvider } from "./context/ProductsContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import CartPanel from "./components/CartPanel";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <CartPanel />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </ProductsProvider>
  );
}
