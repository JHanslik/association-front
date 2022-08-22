import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Association from "./pages/Association";

function App(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:slug" element={<Association />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
