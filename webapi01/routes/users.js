const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')
const validadeMiddleware = require('../middlewares/validationMiddleware')

/* GET users listing. */
router.get('/', userController.getUsers);

router.get('/:id', userController.getUser);


router.post('/', validadeMiddleware, userController.postUsers);


router.put('/:id', validadeMiddleware, userController.putUser );

router.patch('/:id',validadeMiddleware, userController.patchUser);

router.delete('/:id',userController.deleteUser );

module.exports = router;
