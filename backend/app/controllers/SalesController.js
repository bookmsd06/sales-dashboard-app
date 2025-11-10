const Sale = require('../models/SalesModel');

// get total sale and revenue for give period
exports.getSaleAndRevenue = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ status:400, message: 'start and end dates are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const summary = await Sale.aggregate([
      {
        $match: {
          date: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$quantity" },
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } }
        }
      }
    ]);
    res.status(200).json({ status:200, data: summary[0] || { totalSales: 0, totalRevenue: 0 }, message: 'Summary fetched successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status:500, error: error.message, message: 'Error fetching summary', });
  }
};

// filter by product, category and region
exports.filterSales = async (req, res) => {
  try {
    const { product, category, region } = req.query;
    const filter = {};

    if (product) filter.product = product;
    if (category) filter.category = category;
    if (region) filter.region = region;

    const sales = await Sale.find(filter);
    res.status(200).json({ status:200, data: sales, count: sales.length, message: 'Sales filtered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status:500, error: error.message, message: 'Error filtering sales' });
  }
};

// sale trend data
exports.getSalesTrend = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ status:400, message: 'start and end dates are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const aggregateTrend = async (format) => {
      return await Sale.aggregate([
        {
            $match: {
                date: { $gte: start, $lte: end }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: format, date: "$date" } },
                totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
                totalSales: { $sum: "$quantity" }
            }
        },
        { $sort: { "_id": 1 } }
      ]);
    };

    const dailyTrend = await aggregateTrend("%Y-%m-%d");
    const weeklyTrend = await aggregateTrend("%G-%V");
    const monthlyTrend = await aggregateTrend("%Y-%m");

    res.status(200).json({
      status:200,
      dailyCount: dailyTrend.length,
      weeklyCount: weeklyTrend.length,
      monthlyCount: monthlyTrend.length,
      daily: dailyTrend,
      weekly: weeklyTrend,
      monthly: monthlyTrend,
      message: 'Sales trend fetched successfully'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status:500, error: error.message, message: 'Error fetching sales trend', });
  }
};

