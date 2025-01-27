const express = require("express");
const authMiddleware = require('../../middleware/auth');
const router = express.Router();
const publicationController = require("../controllers/publicationController");
authMiddleware

router.get('/', publicationController.getAllPublications);
router.get('/:id', publicationController.getPublication); 
router.post('/', authMiddleware, publicationController.createPublication);
router.put('/:id',  authMiddleware, publicationController.updatePublication); 
router.delete('/:id',  authMiddleware, publicationController.deletePublication); 

module.exports = router;
