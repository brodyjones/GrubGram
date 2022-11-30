import Login from "./routes/Login"
import Register from "./routes/Register"
import Home from "./routes/Home"
import Pantry from "./routes/Pantry"
import Recipe from "./routes/Recipe"

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
          <Route path='/recipe' element={<Recipe />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;