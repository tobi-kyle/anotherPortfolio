import express from 'express';
import * as userCtrl from '../controllers/user.controller.js';
import * as authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

console.log('userCtrl.list:', typeof userCtrl.list);
console.log('authCtrl.signin:', typeof authCtrl.signin);
console.log('authCtrl.signout:', typeof authCtrl.signout);

router.post('/auth/signin', authCtrl.signin);
router.get('/auth/signout', authCtrl.signout);

router.route('/users')
  .get(userCtrl.list)
  .post(userCtrl.create);

router.route('/users/:userId')
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove);

router.param('userId', userCtrl.userByID);

export default router;