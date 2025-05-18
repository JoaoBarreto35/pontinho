import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NovoProjeto from '../pages/NovoProjeto';
import EditarProjeto from '../pages/EditarProjeto';
import Configuração from '../pages/Configurações';
import ListaDeProjetos from '../pages/ListaDeProjetos';

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/novo' element={<NovoProjeto />} />
        <Route path='/projeto/:id' element={<EditarProjeto />} />
        <Route path='/configuracoes' element={<Configuração />} />
        <Route path='/projetos' element={<ListaDeProjetos />} />
      </Routes>
    </BrowserRouter>
  );
}
