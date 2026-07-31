const { body, validationResult, param } = require('express-validator');

const validarTicket = [
  body('titulo')
    .trim()
    .notEmpty()
    .withMessage('El título es obligatorio')
    .isLength({ min: 3, max: 100 })
    .withMessage('El título debe tener entre 3 y 100 caracteres')
    .escape(),

  body('descripcion')
    .trim()
    .notEmpty()
    .withMessage('La descripción es obligatoria')
    .isLength({ min: 5, max: 1000 })
    .withMessage('La descripción debe tener entre 5 y 1000 caracteres')
    .escape(),

  body('categoria')
    .trim()
    .notEmpty()
    .withMessage('La categoría es obligatoria')
    .isIn(['Red', 'Hardware', 'Software'])
    .withMessage('La categoría no es válida')
    .escape(),

  body('prioridad')
    .trim()
    .notEmpty()
    .withMessage('La prioridad es obligatoria')
    .isIn(['Alta', 'Media', 'Baja'])
    .withMessage('La prioridad no es válida')
    .escape(),

  body('estado')
    .trim()
    .notEmpty()
    .withMessage('El estado es obligatorio')
    .isIn(['Abierto', 'En Progreso', 'Cerrado'])
    .withMessage('El estado no es válido')
    .escape()
];

const validarId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El identificador debe ser un número entero positivo')
    .toInt()
];

const comprobarValidaciones = (req, res, next) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      mensaje: 'Los datos enviados no son válidos',
      errores: errores.array()
    });
  }

  next();
};

module.exports = {
  validarTicket,
  comprobarValidaciones,
  validarId
};