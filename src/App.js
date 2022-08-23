import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Association from "./pages/Association";
import ContactForm from "./pages/ContactForm";
import Admin from "./pages/Admin";
import "./App.css";

function App(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:slug" element={<Association />} />
                <Route path="/:slug/contact" element={<ContactForm />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
