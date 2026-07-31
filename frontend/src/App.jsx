import { Routes, Route } from 'react-router-dom';

import Navegacion from './components/Navegacion';
import Dashboard from './pages/Dashboard';
import RegistroIncidente from './pages/RegistroIncidente';
import ListadoTickets from './pages/ListadoTickets';

import './App.css';

function App() {
  return (
    <div className="aplicacion">
      <Navegacion />

      <main className="contenido">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/registrar" element={<RegistroIncidente />} />
          <Route path="/tickets" element={<ListadoTickets />} />

          <Route
            path="*"
            element={
              <section className="pagina">
                <h2>Página no encontrada</h2>
                <p>La dirección solicitada no existe.</p>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;