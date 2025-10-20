import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Toaster richColors />;
    </>
  );
}

export default App;
