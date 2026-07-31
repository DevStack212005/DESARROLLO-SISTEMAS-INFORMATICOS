const API_URL = 'http://localhost:3000/tickets';

async function procesarRespuesta(respuesta) {
  let datos;

  try {
    datos = await respuesta.json();
  } catch {
    datos = null;
  }

  if (!respuesta.ok) {
    const mensaje =
      datos?.mensaje ||
      datos?.message ||
      'Ocurrió un error al comunicarse con el servidor';

    throw new Error(mensaje);
  }

  return datos;
}

export async function obtenerTickets() {
  const respuesta = await fetch(API_URL);
  return procesarRespuesta(respuesta);
}

export async function obtenerTicketPorId(id) {
  const respuesta = await fetch(`${API_URL}/${id}`);
  return procesarRespuesta(respuesta);
}

export async function crearTicket(ticket) {
  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ticket)
  });

  return procesarRespuesta(respuesta);
}

export async function actualizarTicket(id, ticket) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ticket)
  });

  return procesarRespuesta(respuesta);
}

export async function eliminarTicket(id) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  return procesarRespuesta(respuesta);
}