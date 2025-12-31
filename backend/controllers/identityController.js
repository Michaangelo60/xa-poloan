const fs = require('fs');
const path = require('path');
const User = require('../models/User');

exports.upload = async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const { type, data } = req.body;
    if (!type || !data) return res.status(400).json({ success: false, message: 'type and data are required' });

    const uploadsDir = path.join(__dirname, '..', 'uploads');
    fs.mkdirSync(uploadsDir, { recursive: true });

    // data may be a data URL like 'data:image/jpeg;base64,...' or raw base64
    let matches = String(data).match(/^data:(image\/\w+);base64,(.+)$/);
    let base64 = data;
    let ext = 'jpg';
    if (matches) {
      ext = matches[1].split('/')[1] || 'jpg';
      base64 = matches[2];
    } else {
      // try to guess from prefix
      const maybe = String(data).slice(0,20);
      if (maybe.indexOf('/9j/') === 0) ext = 'jpg';
    }

    const filename = `${type}_${req.user.id}_${Date.now()}.${ext}`;
    const filepath = path.join(uploadsDir, filename);
    fs.writeFileSync(filepath, Buffer.from(base64, 'base64'));

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const publicPath = `/uploads/${filename}`;
    if (type === 'passport') user.passportPath = publicPath;
    else if (type === 'live') user.livePhotoPath = publicPath;
    user.idUploadedAt = new Date();
    await user.save();

    return res.json({ success: true, path: publicPath });
  } catch (err) {
    console.error('identity.upload error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
