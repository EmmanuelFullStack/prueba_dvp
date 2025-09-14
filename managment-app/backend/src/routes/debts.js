const express = require('express');
const router = express.Router();
const debtController = require('../controllers/debtController');
const authMiddleware = require('../middleware/auth');
const { validateDebt } = require('../middleware/validate');

router.use(authMiddleware);
router.get('/summary', debtController.getSummary);
router.get('/export', debtController.exportDebts);
router.post('/', validateDebt, debtController.create);
router.get('/', debtController.getAll);
router.get('/:id', debtController.getById);
router.put('/:id', validateDebt, debtController.update);
router.delete('/:id', debtController.delete);
router.patch('/:id/paid', debtController.markAsPaid);


module.exports = router;