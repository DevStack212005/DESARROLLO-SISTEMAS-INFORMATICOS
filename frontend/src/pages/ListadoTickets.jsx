import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  actualizarTicket,
  eliminarTicket,
  obtenerTickets
} from '../services/ticketService';

import '../styles/tickets.css';

function ListadoTickets() {
  const [tickets, setTickets] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [procesandoId, setProcesandoId] = useState(null);

  const cargarTickets = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    cargarTickets();
  }, [cargarTickets]);

  const ticketsFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    if (!texto) {
      return tickets;
    }

    return tickets.filter((ticket) => {
      return (
        ticket.titulo?.toLowerCase().includes(texto) ||
        ticket.descripcion?.toLowerCase().includes(texto) ||
        ticket.categoria?.toLowerCase().includes(texto) ||
        ticket.prioridad?.toLowerCase().includes(texto) ||
        ticket.estado?.toLowerCase().includes(texto)
      );
    });
  }, [tickets, busqueda]);

  const manejarEliminar = async (id) => {
    const confirmar = window.confirm(
      '¿Está seguro de eliminar este ticket?'
    );

    if (!confirmar) {
      return;
    }

    try {
      setProcesandoId(id);
      setError('');

      await eliminarTicket(id);

      setTickets((ticketsAnteriores) =>
        ticketsAnteriores.filter((ticket) => ticket.id !== id)
      );
    } catch (errorPeticion) {
      setError(errorPeticion.message);
    } finally {
      setProcesandoId(null);
    }
  };

  const manejarCambioEstado = async (ticket, nuevoEstado) => {
    const ticketActualizado = {
      titulo: ticket.titulo,
      descripcion: ticket.descripcion,
      categoria: ticket.categoria,
      prioridad: ticket.prioridad,
      estado: nuevoEstado
    };

    try {
      setProcesandoId(ticket.id);
      setError('');

      const datos = await actualizarTicket(
        ticket.id,
        ticketActualizado
      );

      setTickets((ticketsAnteriores) =>
        ticketsAnteriores.map((elemento) =>
          elemento.id === ticket.id ? datos : elemento
        )
      );
    } catch (errorPeticion) {
      setError(errorPeticion.message);
    } finally {
      setProcesandoId(null);
    }
  };

  return (
    <section className="pagina">
      <header className="pagina__encabezado pagina__encabezado--acciones">
        <div>
          <span className="pagina__etiqueta">
            Gestión de incidentes
          </span>

          <h2>Listado de tickets</h2>

          <p>
            Consulte, actualice y elimine los incidentes registrados.
          </p>
        </div>

        <input
          className="buscador"
          type="search"
          placeholder="Buscar un ticket..."
          value={busqueda}
          onChange={(evento) => setBusqueda(evento.target.value)}
        />
      </header>

      {error && (
        <div className="mensaje mensaje--error">
          {error}
        </div>
      )}

      {cargando ? (
        <div className="estado-carga">
          Cargando tickets...
        </div>
      ) : (
        <div className="tabla-contenedor">
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Incidente</th>
                <th>Categoría</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {ticketsFiltrados.length > 0 ? (
                ticketsFiltrados.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>#{ticket.id}</td>

                    <td>
                      <div className="ticket-info">
                        <strong>{ticket.titulo}</strong>
                        <span>{ticket.descripcion}</span>
                      </div>
                    </td>

                    <td>{ticket.categoria}</td>

                    <td>
                      <span
                        className={`etiqueta prioridad-${ticket.prioridad.toLowerCase()}`}
                      >
                        {ticket.prioridad}
                      </span>
                    </td>

                    <td>
                      <select
                        className="selector-estado"
                        value={ticket.estado}
                        disabled={procesandoId === ticket.id}
                        onChange={(evento) =>
                          manejarCambioEstado(
                            ticket,
                            evento.target.value
                          )
                        }
                      >
                        <option value="Abierto">Abierto</option>
                        <option value="En Progreso">
                          En Progreso
                        </option>
                        <option value="Cerrado">Cerrado</option>
                      </select>
                    </td>

                    <td>
                      <div className="acciones-tabla">
                        <button
                          type="button"
                          className="accion eliminar"
                          disabled={procesandoId === ticket.id}
                          onClick={() => manejarEliminar(ticket.id)}
                        >
                          {procesandoId === ticket.id
                            ? 'Procesando...'
                            : 'Eliminar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="tabla__vacia">
                    No existen tickets para mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ListadoTickets;