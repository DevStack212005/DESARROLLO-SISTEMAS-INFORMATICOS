const express = require('express');

const {
  obtenerTickets,
  obtenerTicketPorId,
  crearTicket,
  actualizarTicket,
  eliminarTicket
} = require('../controllers/ticket.controller');

const {
  validarTicket,
  comprobarValidaciones
} = require('../middlewares/ticketValidator');

const router = express.Router();

router.get('/', obtenerTickets);

router.get('/:id', obtenerTicketPorId);

router.post(
  '/',
  validarTicket,
  comprobarValidaciones,
  crearTicket
);

router.put(
  '/:id',
  validarTicket,
  comprobarValidaciones,
  actualizarTicket
);

router.delete('/:id', eliminarTicket);

module.exports = router;