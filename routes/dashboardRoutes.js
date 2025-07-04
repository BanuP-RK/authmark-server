import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';

const router = express.Router(); // ✅ Declare router first

router.get('/stats', getDashboardStats); // ✅ THEN use it

export default router;
