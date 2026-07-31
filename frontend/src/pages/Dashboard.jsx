import { useEffect, useMemo, useState } from 'react';
import { obtenerTickets } from '../services/ticketService';

import '../styles/dashboard.css';

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarResumen = async () => {
      try {
        setCargando(true);
        setError('');

        const datos = await obtenerTickets();

        setTickets(Array.isArray(datos) ? datos : []);
      } catch (errorPeticion) {
        setError(errorPeticion.message);
        setTickets([]);
      } finally {
        setCargando(false);
      }
    };

    cargarResumen();
  }, []);

  const resumen = useMemo(() => {
    return {
      total: tickets.length,
      abiertos: tickets.filter(
        (ticket) => ticket.estado === 'Abierto'
      ).length,
      enProgreso: tickets.filter(
        (ticket) => ticket.estado === 'En Progreso'
      ).length,
      cerrados: tickets.filter(
        (ticket) => ticket.estado === 'Cerrado'
      ).length
    };
  }, [tickets]);

  const ticketsRecientes = useMemo(() => {
    return [...tickets]
      .sort((a, b) => Number(b.id) - Number(a.id))
      .slice(0, 5);
  }, [tickets]);

  return (
    <section className="pagina">
      <header className="pagina__encabezado">
        <div>
          <span className="pagina__etiqueta">
            Panel principal
          </span>

          <h2>Dashboard</h2>

          <p>
            Resumen general de los incidentes registrados en el
            sistema.
          </p>
        </div>
      </header>

      {error && (
        <div className="mensaje mensaje--error">
          {error}
        </div>
      )}

      <div className="resumen">
        <article className="resumen__tarjeta">
          <span>Total de tickets</span>
          <strong>{cargando ? '...' : resumen.total}</strong>
          <p>Incidentes registrados</p>
        </article>

        <article className="resumen__tarjeta">
          <span>Abiertos</span>
          <strong>{cargando ? '...' : resumen.abiertos}</strong>
          <p>Pendientes de atención</p>
        </article>

        <article className="resumen__tarjeta">
          <span>En progreso</span>
          <strong>{cargando ? '...' : resumen.enProgreso}</strong>
          <p>Actualmente atendidos</p>
        </article>

        <article className="resumen__tarjeta">
          <span>Cerrados</span>
          <strong>{cargando ? '...' : resumen.cerrados}</strong>
          <p>Incidentes solucionados</p>
        </article>
      </div>

      <div className="panel">
        <div className="panel__encabezado">
          <div>
            <h3>Actividad reciente</h3>
            <p>Últimos incidentes registrados en el sistema.</p>
          </div>
        </div>

        {cargando ? (
          <div className="panel__vacio">
            <p>Cargando información...</p>
          </div>
        ) : ticketsRecientes.length > 0 ? (
          <div className="actividad-reciente">
            {ticketsRecientes.map((ticket) => (
              <article
                key={ticket.id}
                className="actividad-reciente__item"
              >
                <div>
                  <strong>
                    #{ticket.id} - {ticket.titulo}
                  </strong>

                  <p>{ticket.descripcion}</p>
                </div>

                <span className="actividad-reciente__estado">
                  {ticket.estado}
                </span>
              </article>
            ))}
          </div>
        ) : (
          <div className="panel__vacio">
            <h4>No existen tickets para mostrar</h4>
            <p>
              Los incidentes recientes aparecerán en esta sección.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Dashboard;