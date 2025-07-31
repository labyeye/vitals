const express = require('express');
const { protect, isAdmin } = require('../../middleware/auth');
const { getAllLoyaltyAccounts } = require('../../controllers/loyaltyController');

const router = express.Router();

// Apply admin protection to all routes
router.use(protect, isAdmin);

// @desc    Get all loyalty accounts
// @route   GET /api/admin/loyalty
// @access  Admin only
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const result = await getAllLoyaltyAccounts(page, limit);
    
    if (!result) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching loyalty accounts'
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Get loyalty accounts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching loyalty accounts'
    });
  }
});

module.exports = router;