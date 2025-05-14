import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NovoProjeto from '../pages/NovoProjeto';
import EditarProjeto from '../pages/EditarProjeto';
import Historico from '../pages/Historico';
import ListaDeProjetos from '../pages/ListaDeProjetos';

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/novo' element={<NovoProjeto />} />
        <Route path='/projeto/:id' element={<EditarProjeto />} />
        <Route path='/historico' element={<Historico />} />
        <Route path='/projetos' element={<ListaDeProjetos />} />
      </Routes>
    </BrowserRouter>
  );
}
