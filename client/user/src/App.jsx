import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Catch all unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster richColors />;
    </>
  );
}

export default App;
