const ActivityLog = require('../models/ActivityLog');

async function logActivity(data) {
  try {
    await ActivityLog.create({
      user: data.user || 'System',
      userId: data.userId || null,
      action: data.action,
      resource: data.resource || '',
      resourceId: data.resourceId || '',
      details: data.details || '',
      metadata: data.metadata || {},
      ip: data.ip || ''
    });
  } catch (err) {
    console.error('Activity log error:', err.message);
  }
}

module.exports = { logActivity };
