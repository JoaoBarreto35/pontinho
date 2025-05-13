import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NovoProjeto from '../pages/NovoProjeto';
import ProjetoDetalhe from '../pages/ProjetoDetalhe';
import Historico from '../pages/Historico';
import ListaDeProjetos from '../pages/ListaDeProjetos';

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/novo' element={<NovoProjeto />} />
        <Route path='/projeto/:id' element={<ProjetoDetalhe />} />
        <Route path='/historico' element={<Historico />} />
        <Route path='/historico' element={<ListaDeProjetos />} />
      </Routes>
    </BrowserRouter>
  );
}
