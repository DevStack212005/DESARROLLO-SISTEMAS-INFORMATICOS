import { NavLink } from 'react-router-dom';
import '../styles/navegacion.css';

function Navegacion() {
  return (
    <aside className="sidebar">
      <div className="sidebar__encabezado">
        <div className="sidebar__logo">HD</div>

        <div>
          <h1>Help Desk</h1>
          <p>Gestión de incidentes</p>
        </div>
      </div>

      <nav className="sidebar__menu">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'sidebar__enlace activo' : 'sidebar__enlace'
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/registrar"
          className={({ isActive }) =>
            isActive ? 'sidebar__enlace activo' : 'sidebar__enlace'
          }
        >
          Registrar incidente
        </NavLink>

        <NavLink
          to="/tickets"
          className={({ isActive }) =>
            isActive ? 'sidebar__enlace activo' : 'sidebar__enlace'
          }
        >
          Listado de tickets
        </NavLink>
      </nav>

      <div className="sidebar__pie">
        <p>Sistema de soporte técnico</p>
        <span>Versión 1.0</span>
      </div>
    </aside>
  );
}

export default Navegacion;