const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/RefreshToken');

if (!process.env.JWT_SECRET) { throw new Error('JWT_SECRET environment variable is required'); }
if (!process.env.JWT_REFRESH_SECRET) { throw new Error('JWT_REFRESH_SECRET environment variable is required'); }

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

function generateTokens(user) {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    JWT_REFRESH_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRES_IN }
  );

  return { accessToken, refreshToken };
}

function parseDuration(duration) {
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) return 7 * 24 * 60 * 60 * 1000;
  const val = parseInt(match[1]);
  const unit = match[2];
  switch (unit) {
    case 's': return val * 1000;
    case 'm': return val * 60 * 1000;
    case 'h': return val * 60 * 60 * 1000;
    case 'd': return val * 24 * 60 * 60 * 1000;
    default: return 7 * 24 * 60 * 60 * 1000;
  }
}

async function saveRefreshToken(userId, token, req) {
  const expiresAt = new Date(Date.now() + parseDuration(JWT_REFRESH_EXPIRES_IN));
  await RefreshToken.create({
    user: userId,
    token,
    expiresAt,
    userAgent: req.headers['user-agent'] || '',
    ip: req.ip || ''
  });
}

async function verifyRefreshToken(token) {
  const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
  const stored = await RefreshToken.findOne({ token, user: decoded.id });
  if (!stored) return null;
  return decoded;
}

async function removeRefreshToken(token) {
  await RefreshToken.findOneAndDelete({ token });
}

async function removeAllRefreshTokens(userId) {
  await RefreshToken.deleteMany({ user: userId });
}

module.exports = {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  generateTokens,
  saveRefreshToken,
  verifyRefreshToken,
  removeRefreshToken,
  removeAllRefreshTokens
};
