import { useEffect } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Formular from './Components/Formular';
import Dosar from './Components/Dosar';
import Cerere from './Components/Cerere';
import VerificareDosar from './Components/VerficareDosar';

function App() {

  return (
   <BrowserRouter>
    <Routes>
        <Route path="/formular" element={<Formular />} />
        <Route path='/dosar' element={<Dosar />} />
        <Route path="/cerere" element={<Cerere />} />
        <Route path="/verificareDosar" element={<VerificareDosar />} />
    </Routes>
   </BrowserRouter>
  )
}

export default App;
