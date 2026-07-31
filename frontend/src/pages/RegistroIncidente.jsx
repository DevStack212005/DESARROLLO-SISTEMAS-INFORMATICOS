import { useState } from 'react';
import { crearTicket } from '../services/ticketService';

import '../styles/formulario.css';

const estadoInicial = {
  titulo: '',
  descripcion: '',
  categoria: '',
  prioridad: '',
  estado: 'Abierto'
};

function RegistroIncidente() {
  const [formulario, setFormulario] = useState(estadoInicial);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;

    setFormulario((datosAnteriores) => ({
      ...datosAnteriores,
      [name]: value
    }));
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    try {
      setEnviando(true);
      setMensaje('');
      setTipoMensaje('');

      const ticketCreado = await crearTicket(formulario);

      setMensaje(
        `El incidente #${ticketCreado.id} fue registrado correctamente.`
      );

      setTipoMensaje('exito');
      setFormulario(estadoInicial);
    } catch (errorPeticion) {
      setMensaje(errorPeticion.message);
      setTipoMensaje('error');
    } finally {
      setEnviando(false);
    }
  };

  const limpiarFormulario = () => {
    setFormulario(estadoInicial);
    setMensaje('');
    setTipoMensaje('');
  };

  return (
    <section className="pagina">
      <header className="pagina__encabezado">
        <div>
          <span className="pagina__etiqueta">Nuevo registro</span>

          <h2>Registrar incidente</h2>

          <p>
            Complete los datos necesarios para reportar un problema
            técnico.
          </p>
        </div>
      </header>

      <form className="formulario" onSubmit={manejarEnvio}>
        <div className="formulario__seccion">
          <div className="formulario__titulo">
            <h3>Información del incidente</h3>
            <p>Describa claramente el problema presentado.</p>
          </div>

          <div className="campo campo--completo">
            <label htmlFor="titulo">Título del incidente</label>

            <input
              id="titulo"
              name="titulo"
              type="text"
              placeholder="Ejemplo: Falla en la conexión a Internet"
              value={formulario.titulo}
              onChange={manejarCambio}
              maxLength="100"
              disabled={enviando}
              required
            />
          </div>

          <div className="campo campo--completo">
            <label htmlFor="descripcion">Descripción</label>

            <textarea
              id="descripcion"
              name="descripcion"
              placeholder="Explique detalladamente el problema..."
              value={formulario.descripcion}
              onChange={manejarCambio}
              rows="6"
              disabled={enviando}
              required
            />
          </div>

          <div className="formulario__fila">
            <div className="campo">
              <label htmlFor="categoria">Categoría</label>

              <select
                id="categoria"
                name="categoria"
                value={formulario.categoria}
                onChange={manejarCambio}
                disabled={enviando}
                required
              >
                <option value="">Seleccione una categoría</option>
                <option value="Red">Red</option>
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
              </select>
            </div>

            <div className="campo">
              <label htmlFor="prioridad">Prioridad</label>

              <select
                id="prioridad"
                name="prioridad"
                value={formulario.prioridad}
                onChange={manejarCambio}
                disabled={enviando}
                required
              >
                <option value="">Seleccione una prioridad</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
          </div>

          <div className="campo campo--mitad">
            <label htmlFor="estado">Estado inicial</label>

            <select
              id="estado"
              name="estado"
              value={formulario.estado}
              onChange={manejarCambio}
              disabled={enviando}
            >
              <option value="Abierto">Abierto</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Cerrado">Cerrado</option>
            </select>
          </div>

          {mensaje && (
            <div
              className={`formulario__mensaje formulario__mensaje--${tipoMensaje}`}
            >
              {mensaje}
            </div>
          )}

          <div className="formulario__acciones">
            <button
              type="button"
              className="boton boton--secundario"
              onClick={limpiarFormulario}
              disabled={enviando}
            >
              Limpiar
            </button>

            <button
              type="submit"
              className="boton boton--principal"
              disabled={enviando}
            >
              {enviando ? 'Registrando...' : 'Registrar incidente'}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default RegistroIncidente;