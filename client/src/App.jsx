import { BrowserRouter, Routes, Route } from "react-router-dom"; 

import Navigation from "./components/Navigation";
import Home from "./pages/Home"; 
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

function App() { 
  return ( 
    <BrowserRouter>
    <Navigation />
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes> 
      <Footer />
    </BrowserRouter>
  ); 
} 


export default App;
