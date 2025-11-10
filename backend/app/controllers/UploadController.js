const XLSX = require('xlsx');
const csv = require('csv-parser');
const fs = require('fs');
const Sale = require('../models/SalesModel');

exports.uploadFile = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ status:400, message: 'No file uploaded' });

  const filePath = file.path;
  const ext = file.originalname.split('.').pop().toLowerCase();

  try {
    let salesData = [];

    if (ext === 'xlsx' || ext === 'xls') {
      const workbook = XLSX.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      salesData = XLSX.utils.sheet_to_json(sheet);
      await Sale.insertMany(salesData);
      fs.unlinkSync(filePath);
      return res.status(201).json({ status:201, count: salesData.length, message: 'Excel data imported successfully' });
    }

    if (ext === 'csv') {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          await Sale.insertMany(results);
          fs.unlinkSync(filePath);
          return res.status(201).json({ status:201, count: results.length, message: 'CSV data imported successfully' });
        });
      return;
    }

    fs.unlinkSync(filePath);
    return res.status(400).json({ status:400, message: 'Unsupported file type' });

  } catch (error) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    console.error(error);
    res.status(500).json({ status:500, error: error.message, message: 'Failed to import sales data'});
  }
};
