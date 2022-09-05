import express from 'express';

import { getCampgroundsBySearch, getCampground, getCampgrounds, createCampground, updateCampground, deleteCampground, likeCampground, commentCampground } from '../controllers/campgrounds.js';

import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/search', getCampgroundsBySearch);
router.get('/', getCampgrounds);
router.get('/:id', getCampground);

router.post('/', auth, createCampground);
router.patch('/:id', auth, updateCampground);
router.delete('/:id', auth, deleteCampground);
router.patch('/:id/likeCampground', auth, likeCampground);
router.post('/:id/commentCampground', auth, commentCampground);

export default router;