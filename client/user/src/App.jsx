import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SearchResults from "./pages/SearchResults";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/products/:sku" element={<ProductDetails />} />
        {/* Catch all unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster richColors />;
    </>
  );
}

export default App;
