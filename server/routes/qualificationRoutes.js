import express from 'express';
import {
  getAll,
  getById,
  create,
  update,
  remove,
  removeAll
} from '../controllers/qualificationController.js';
import requireSignin, { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getAll)  // Public or only signed-in users (your choice)
  .post(requireSignin, requireAdmin, create)
  .delete(requireSignin, requireAdmin, removeAll);

router.route('/:id')
  .get(getById)
  .put(requireSignin, requireAdmin, update)
  .delete(requireSignin, requireAdmin, remove);

export default router;
