import Login from "./routes/Login"
import Register from "./routes/Register"
import Home from "./routes/Home"
import Pantry from "./routes/Pantry"
import Recipes from "./routes/Recipes"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/pantry' element={<Pantry />} />
          <Route path='/recipes' element={<Recipes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;