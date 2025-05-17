import { useEffect } from 'react';
import { MessagesContainer } from './components/MessagesContainer';
import MainRouter from './routes/MainRouter';
import { migrarTemposEApagarOrfaos } from './migracoes/migrarTempos';

function App() {
  useEffect(() => {
    migrarTemposEApagarOrfaos();
  }, []);
  return (
    <MessagesContainer>
      <MainRouter />
    </MessagesContainer>
  );
}

export default App;
