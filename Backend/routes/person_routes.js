const express = require('express');
const router = express.Router();


const personController = require('../controllers/person_controller');
const tokenMiddleware  = require('../middlewares/jwt_auth');

router.post('/create',personController.createPerson);
router.delete('/delete', tokenMiddleware, personController.deletePerson);
router.post('/login', personController.login);
router.get('/info',tokenMiddleware, personController.infoPerson);

module.exports = router;