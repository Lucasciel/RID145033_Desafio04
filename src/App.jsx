import './App.css'; 
import Header from './Components/Header'; // Importa o Header correto
import Tarefas from './Components/Tarefas';

function App() {
  return (
    <>
      <div>
        <Header /> {/* Renderiza o Header */}
        <Tarefas/>
      </div>
    </>
  );
}

export default App;
