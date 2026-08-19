const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const http = require('http');

let mongod;
let server;
let BASE;
let adminToken;
let results = [];
let passCount = 0;
let failCount = 0;

function log(grade, name, detail) {
  const icon = grade === 'PASS' ? '✅' : grade === 'FAIL' ? '❌' : '⚠️';
  if (grade === 'PASS') passCount++;
  else failCount++;
  results.push({ grade, name, detail });
  console.log(`  ${icon} ${name}${detail ? ': ' + detail : ''}`);
}

function req(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE + path);
    const opts = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: { 'Content-Type': 'application/json' }
    };
    if (token) opts.headers['Authorization'] = 'Bearer ' + token;
    const r = http.request(opts, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    r.on('error', reject);
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
}

async function test(name, fn) {
  try {
    await fn();
    log('PASS', name);
  } catch (err) {
    log('FAIL', name, err.message);
  }
}

async function run() {
  console.log('\n========================================');
  console.log('  VELAROCARS ADMIN - COMPLETE TEST SUITE');
  console.log('========================================\n');

  // TEST 1: MongoDB
  console.log('--- TEST 1: MongoDB Connection ---');
  try {
    mongod = await MongoMemoryServer.create({ instance: { port: 27017 } });
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    log('PASS', 'MongoDB Memory Server started', uri);
  } catch (err) {
    log('FAIL', 'MongoDB Memory Server', err.message);
    process.exit(1);
  }

  // Load all models so mongoose registers them
  require('./models/AdminUser');
  require('./models/Car');
  require('./models/Motorcycle');
  require('./models/Villa');
  require('./models/Excursion');
  require('./models/Transfer');
  require('./models/Pack');
  require('./models/Booking');
  require('./models/Client');
  require('./models/Message');
  require('./models/Review');
  require('./models/GalleryImage');
  require('./models/Settings');
  require('./models/Content');
  require('./models/Language');
  require('./models/ActivityLog');
  require('./models/EmailLog');
  require('./models/RefreshToken');

  // TEST 2: Server startup
  console.log('\n--- TEST 2: Server Startup ---');
  try {
    process.env.MONGODB_URI = mongod.getUri();
    process.env.JWT_SECRET = 'test_jwt_secret_for_testing_only';
    process.env.JWT_REFRESH_SECRET = 'test_refresh_secret_for_testing_only';
    process.env.JWT_EXPIRES_IN = '1h';
    process.env.JWT_REFRESH_EXPIRES_IN = '7d';
    process.env.PORT = '3099';
    process.env.ADMIN_EMAIL = 'admin@velarocars.com';
    process.env.ADMIN_PASSWORD = 'Admin@2024!';
    process.env.ADMIN_NAME = 'VelaroCar Admin';
    process.env.NODE_ENV = 'test';
    
    const express = require('express');
    const cors = require('cors');
    const helmet = require('helmet');
    const compression = require('compression');
    const path = require('path');
    const app = express();
    
    app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
    app.use(compression());
    app.use(cors());
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/admin', require('./routes/admin'));
    app.use('/api/bookings', require('./routes/bookings'));
    app.use('/api/cars', require('./routes/cars'));
    app.use('/api/motorcycles', require('./routes/motorcycles'));
    app.use('/api/villas', require('./routes/villas'));
    app.use('/api/excursions', require('./routes/excursions'));
    app.use('/api/transfers', require('./routes/transfers'));
    app.use('/api/packs', require('./routes/packs'));
    app.use('/api/clients', require('./routes/clients'));
    app.use('/api/messages', require('./routes/messages'));
    app.use('/api/reviews', require('./routes/reviews'));
    app.use('/api/gallery', require('./routes/gallery'));
    app.use('/api/finance', require('./routes/finance'));
    app.use('/api/analytics', require('./routes/analytics'));
    app.use('/api/settings', require('./routes/settings'));
    app.use('/api/activity-logs', require('./routes/activityLogs'));
    app.use('/api/emails', require('./routes/emailLogs'));
    app.use('/api/content', require('./routes/content'));
    app.use('/api/languages', require('./routes/languages'));
    app.use('/admin', express.static(path.join(__dirname, '..', 'admin')));
    app.use('/', express.static(path.join(__dirname, '..'), { index: 'index.html', extensions: ['html'] }));
    app.get('/admin/*', (req, res) => res.sendFile(path.join(__dirname, '..', 'admin', 'index.html')));
    app.use((err, req, res, next) => { console.error(err.stack); res.status(500).json({ error: 'Erreur interne.' }); });
    
    await new Promise((resolve) => { server = app.listen(3099, resolve); });
    BASE = 'http://127.0.0.1:3099';
    log('PASS', 'Server started on port 3099');
  } catch (err) {
    log('FAIL', 'Server startup', err.message);
    process.exit(1);
  }

  // TEST 3: Seed
  console.log('\n--- TEST 3: Seed Database ---');
  await test('Seed database', async () => {
    const AdminUser = require('./models/AdminUser');
    const Car = require('./models/Car');
    const Motorcycle = require('./models/Motorcycle');
    const Villa = require('./models/Villa');
    const Excursion = require('./models/Excursion');
    const Transfer = require('./models/Transfer');
    const Review = require('./models/Review');
    const Settings = require('./models/Settings');
    const Language = require('./models/Language');
    const Message = require('./models/Message');
    const Booking = require('./models/Booking');
    const Client = require('./models/Client');

    const admin = await AdminUser.create({ name: 'VelaroCar Admin', email: 'admin@velarocars.com', password: 'Admin@2024!', role: 'super_admin' });
    log('PASS', 'Admin user created', admin.email);

    await Car.insertMany([
      { name: 'Dacia Logan', brand: 'Dacia', year: 2025, fuel: 'Diesel', transmission: 'Manuelle', seats: 5, pricePerDay: 300, category: 'Economique', image: 'images/cars/dacia-logan/main.webp', available: true },
      { name: 'Volkswagen Golf 7', brand: 'Volkswagen', year: 2024, fuel: 'Essence', transmission: 'Automatique', seats: 5, pricePerDay: 1200, category: 'Compacte', image: 'images/cars/volkswagen-golf/main.webp', available: true },
      { name: 'Mercedes Classe C', brand: 'Mercedes', year: 2025, fuel: 'Diesel', transmission: 'Automatique', seats: 5, pricePerDay: 1200, category: 'Premium', image: 'images/cars/mercedes-classe-c/main.webp', available: true }
    ]);
    log('PASS', '3 cars seeded');

    await Motorcycle.insertMany([
      { name: 'Honda CB500F', brand: 'Honda', year: 2024, engine: '500cc', type: 'Naked', pricePerDay: 400, image: 'images/motos/honda-cb500f/main.webp', available: true },
      { name: 'Yamaha MT-07', brand: 'Yamaha', year: 2024, engine: '700cc', type: 'Naked', pricePerDay: 500, image: 'images/motos/yamaha-mt07/main.webp', available: true }
    ]);
    log('PASS', '2 motorcycles seeded');

    await Villa.insertMany([
      { name: 'Villa Prestigia Topaze', location: 'Marrakech', pricePerNight: 1800, bedrooms: 3, bathrooms: 2, maxGuests: 6, image: 'images/houses/prestigia/5.jpg', available: true },
      { name: 'Villa Route d\'Amezmiz', location: 'Marrakech', pricePerNight: 9000, bedrooms: 5, bathrooms: 4, maxGuests: 10, image: 'images/houses/amezmiz/main.jpg', available: true }
    ]);
    log('PASS', '2 villas seeded');

    await Excursion.insertMany([
      { name: 'Desert d\'Agafay', city: 'Marrakech', duration: 'Demi-journee', durationHours: 4, price: 350, image: 'images/excursions/desert-agafay/main.webp', available: true },
      { name: 'Atlas & Cascades d\'Ouzoud', city: 'Marrakech', duration: 'Journee complete', durationHours: 10, price: 550, image: 'images/excursions/atlas-ouzoud/main.jpg', available: true }
    ]);
    log('PASS', '2 excursions seeded');

    await Transfer.insertMany([
      { name: 'Aeroport Menara - Hotel', city: 'Marrakech', duration: '30 min', durationHours: 1, price: 500, vehicle: 'Mercedes Vito', image: 'images/transfers/airport-arrival/main.webp', available: true },
      { name: 'Marrakech - Casablanca', city: 'Casablanca', duration: '3h', durationHours: 3, price: 2500, vehicle: 'Mercedes Vito', image: 'images/transfers/casablanca/main.webp', available: true }
    ]);
    log('PASS', '2 transfers seeded');

    await Review.insertMany([
      { name: 'Sophie M.', location: 'Paris, France', rating: 5, text: 'Service exceptionnel!', service: 'Location Voiture', status: 'approved' },
      { name: 'Jean-Pierre L.', location: 'Lyon, France', rating: 4, text: 'Tres bon service', service: 'Location Moto', status: 'approved' },
      { name: 'Ahmed B.', location: 'Casablanca, Maroc', rating: 5, text: 'La villa etait magnifique', service: 'Location Villa', status: 'pending' }
    ]);
    log('PASS', '3 reviews seeded');

    for (const [k, v] of [['site_name', 'VelaroCars'], ['phone', '+212 681 11 71 95'], ['email', 'velarocars26@gmail.com']]) {
      await Settings.findOneAndUpdate({ key: k }, { key: k, value: v, category: 'general' }, { upsert: true });
    }
    log('PASS', 'Settings seeded');

    for (const l of [{ code: 'fr', name: 'French', nativeName: 'Francais', currency: 'EUR', active: true, direction: 'ltr', order: 1 }, { code: 'en', name: 'English', nativeName: 'English', currency: 'USD', active: true, direction: 'ltr', order: 2 }]) {
      await Language.findOneAndUpdate({ code: l.code }, l, { upsert: true });
    }
    log('PASS', 'Languages seeded');

    await Message.insertMany([
      { name: 'Test User', email: 'test@example.com', subject: 'Test contact', message: 'Bonjour, je voudrais un devis.', type: 'contact', read: false },
      { name: 'Autre User', email: 'autre@example.com', subject: 'Autre message', message: 'Question sur les prix.', type: 'contact', read: true }
    ]);
    log('PASS', '2 messages seeded');

    const cars = await Car.find();
    const villas = await Villa.find();
    await Booking.insertMany([
      { reference: 'VC-TEST-001', clientName: 'Test Client', clientEmail: 'testclient@example.com', clientPhone: '+33612345678', productType: 'car', productModel: 'Car', productId: cars[0]._id, productName: cars[0].name, productImage: cars[0].image, startDate: new Date(), endDate: new Date(Date.now() + 3*86400000), totalPrice: 900, status: 'pending', currency: 'MAD' },
      { reference: 'VC-TEST-002', clientName: 'Confirm Client', clientEmail: 'confirm@example.com', clientPhone: '+33698765432', productType: 'villa', productModel: 'Villa', productId: villas[0]._id, productName: villas[0].name, productImage: villas[0].image, startDate: new Date(Date.now() + 7*86400000), endDate: new Date(Date.now() + 10*86400000), totalPrice: 5400, status: 'confirmed', currency: 'MAD' }
    ]);
    log('PASS', '2 bookings seeded');

    await Client.create({ name: 'Test Client', email: 'testclient@example.com', phone: '+33612345678', totalBookings: 1, totalRevenue: 900, firstBooking: new Date(), lastBooking: new Date(), status: 'active' });
    await Client.create({ name: 'Confirm Client', email: 'confirm@example.com', phone: '+33698765432', totalBookings: 1, totalRevenue: 5400, firstBooking: new Date(), lastBooking: new Date(), status: 'active' });
    log('PASS', '2 clients seeded');
  });

  // TEST 4: Admin Login
  console.log('\n--- TEST 4: Admin Login ---');
  await test('Login with valid credentials', async () => {
    const r = await req('POST', '/api/auth/login', { email: 'admin@velarocars.com', password: 'Admin@2024!' });
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (!r.body.accessToken) throw new Error('No accessToken in response');
    if (!r.body.refreshToken) throw new Error('No refreshToken in response');
    if (!r.body.user || r.body.user.email !== 'admin@velarocars.com') throw new Error('User data missing');
    if (r.body.user.password) throw new Error('Password leaked in response!');
    adminToken = r.body.accessToken;
    log('PASS', 'Login successful', 'Token received, user data correct, no password leak');
  });

  await test('Login with wrong password', async () => {
    const r = await req('POST', '/api/auth/login', { email: 'admin@velarocars.com', password: 'wrong' });
    if (r.status !== 401) throw new Error('Expected 401, got ' + r.status);
  });

  await test('Login with missing fields', async () => {
    const r = await req('POST', '/api/auth/login', { email: '' });
    if (r.status !== 400) throw new Error('Expected 400, got ' + r.status);
  });

  await test('Get current user /me', async () => {
    const r = await req('GET', '/api/auth/me', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (!r.body.user || r.body.user.role !== 'super_admin') throw new Error('User role missing');
  });

  await test('Logout', async () => {
    const r = await req('POST', '/api/auth/logout', {}, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
  });

  // Re-login for remaining tests
  const loginR = await req('POST', '/api/auth/login', { email: 'admin@velarocars.com', password: 'Admin@2024!' });
  adminToken = loginR.body.accessToken;

  // TEST 5: Authentication
  console.log('\n--- TEST 5: Authentication ---');
  await test('Unauthenticated request rejected', async () => {
    const r = await req('GET', '/api/cars');
    if (r.status !== 401) throw new Error('Expected 401, got ' + r.status);
  });

  await test('Invalid token rejected', async () => {
    const r = await req('GET', '/api/cars', null, 'invalid_token');
    if (r.status !== 401) throw new Error('Expected 401, got ' + r.status);
  });

  // TEST 6: Authorization
  console.log('\n--- TEST 6: Authorization ---');
  await test('Create manager user', async () => {
    const r = await req('POST', '/api/admin/users', { name: 'Manager', email: 'manager@test.com', password: 'Password123!', role: 'manager' }, adminToken);
    if (r.status !== 201) throw new Error('Expected 201, got ' + r.status);
  });

  await test('Manager cannot access user management', async () => {
    const loginR = await req('POST', '/api/auth/login', { email: 'manager@test.com', password: 'Password123!' });
    const managerToken = loginR.body.accessToken;
    const r = await req('GET', '/api/admin/users', null, managerToken);
    if (r.status !== 403) throw new Error('Expected 403, got ' + r.status);
  });

  await test('Manager can access cars', async () => {
    const loginR = await req('POST', '/api/auth/login', { email: 'manager@test.com', password: 'Password123!' });
    const managerToken = loginR.body.accessToken;
    const r = await req('GET', '/api/cars', null, managerToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
  });

  // TEST 7: Dashboard
  console.log('\n--- TEST 7: Dashboard ---');
  await test('Booking stats', async () => {
    const r = await req('GET', '/api/bookings/stats', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (typeof r.body.todayCount !== 'number') throw new Error('todayCount not a number');
    if (typeof r.body.pendingCount !== 'number') throw new Error('pendingCount not a number');
    if (r.body.pendingCount < 1) throw new Error('Expected at least 1 pending booking');
  });

  await test('Booking chart', async () => {
    const r = await req('GET', '/api/bookings/chart?period=30d', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (!Array.isArray(r.body)) throw new Error('Expected array');
  });

  await test('Booking by type', async () => {
    const r = await req('GET', '/api/bookings/by-type', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (!Array.isArray(r.body)) throw new Error('Expected array');
  });

  await test('Recent bookings', async () => {
    const r = await req('GET', '/api/bookings/recent', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (!Array.isArray(r.body)) throw new Error('Expected array');
    if (r.body.length < 1) throw new Error('Expected at least 1 recent booking');
  });

  // TEST 8: Cars CRUD
  console.log('\n--- TEST 8: Cars CRUD ---');
  let carId;
  await test('List cars', async () => {
    const r = await req('GET', '/api/cars?page=1&limit=20', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (!r.body.data || !Array.isArray(r.body.data)) throw new Error('data not array');
    if (r.body.data.length < 3) throw new Error('Expected at least 3 cars');
    carId = r.body.data[0]._id;
  });

  await test('Get single car', async () => {
    const r = await req('GET', '/api/cars/' + carId, null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (!r.body.name) throw new Error('Missing car name');
  });

  await test('Create car', async () => {
    const r = await req('POST', '/api/cars', { name: 'Test Car', brand: 'TestBrand', year: 2025, fuel: 'Essence', transmission: 'Automatique', seats: 5, pricePerDay: 500, category: 'Test', image: 'test.jpg', available: true }, adminToken);
    if (r.status !== 201) throw new Error('Expected 201, got ' + r.status);
    carId = r.body._id;
  });

  await test('Update car', async () => {
    const r = await req('PUT', '/api/cars/' + carId, { pricePerDay: 600, name: 'Test Car Updated' }, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (r.body.pricePerDay !== 600) throw new Error('Price not updated');
    if (r.body.name !== 'Test Car Updated') throw new Error('Name not updated');
  });

  await test('Search cars', async () => {
    const r = await req('GET', '/api/cars?search=Dacia', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (r.body.data.length < 1) throw new Error('No results for Dacia search');
  });

  await test('Delete car', async () => {
    const r = await req('DELETE', '/api/cars/' + carId, null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
  });

  // TEST 9-13: Other CRUD (abbreviated, same pattern)
  console.log('\n--- TEST 9-13: Other CRUD Entities ---');
  for (const [entity, endpoint, data] of [
    ['Motorcycles', '/api/motorcycles', { name: 'Test Moto', brand: 'TestBrand', year: 2024, engine: '500cc', pricePerDay: 400, image: 'test.jpg', available: true }],
    ['Villas', '/api/villas', { name: 'Test Villa', location: 'Marrakech', pricePerNight: 1000, bedrooms: 2, bathrooms: 1, maxGuests: 4, image: 'test.jpg', available: true }],
    ['Excursions', '/api/excursions', { name: 'Test Excursion', city: 'Marrakech', duration: '1 day', durationHours: 8, price: 300, image: 'test.jpg', available: true }],
    ['Transfers', '/api/transfers', { name: 'Test Transfer', city: 'Marrakech', duration: '1h', durationHours: 1, price: 200, vehicle: 'Mercedes Vito', image: 'test.jpg', available: true }],
    ['Packs', '/api/packs', { name: 'Test Pack', price: 2000, discount: 10, description: 'Test', available: true }]
  ]) {
    let itemId;
    await test(`${entity} - Create`, async () => {
      const r = await req('POST', endpoint, data, adminToken);
      if (r.status !== 201) throw new Error('Expected 201, got ' + r.status + ' ' + JSON.stringify(r.body));
      itemId = r.body._id;
    });
    await test(`${entity} - Read`, async () => {
      const r = await req('GET', endpoint + '/' + itemId, null, adminToken);
      if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    });
    await test(`${entity} - Update`, async () => {
      const r = await req('PUT', endpoint + '/' + itemId, { name: 'Updated ' + entity }, adminToken);
      if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
      if (!r.body.name.startsWith('Updated')) throw new Error('Update did not persist');
    });
    await test(`${entity} - Delete`, async () => {
      const r = await req('DELETE', endpoint + '/' + itemId, null, adminToken);
      if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    });
  }

  // TEST 14: Bookings
  console.log('\n--- TEST 14: Bookings ---');
  let bookingId;
  await test('List bookings', async () => {
    const r = await req('GET', '/api/bookings?page=1&limit=20', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (r.body.data.length < 1) throw new Error('No bookings found');
    var pending = r.body.data.find(function(b){return b.status==='pending';});
    bookingId = pending ? pending._id : r.body.data[0]._id;
  });

  await test('Filter bookings by status', async () => {
    const r = await req('GET', '/api/bookings?status=pending', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (r.body.data.length < 1) throw new Error('No pending bookings');
    for (const b of r.body.data) {
      if (b.status !== 'pending') throw new Error('Wrong status in results');
    }
  });

  await test('Confirm pending booking', async () => {
    const r = await req('PUT', '/api/bookings/' + bookingId + '/status', { status: 'confirmed' }, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (r.body.status !== 'confirmed') throw new Error('Status not updated to confirmed');
  });

  await test('Complete confirmed booking', async () => {
    const r = await req('PUT', '/api/bookings/' + bookingId + '/status', { status: 'completed' }, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (r.body.status !== 'completed') throw new Error('Status not updated to completed');
  });

  await test('Reject invalid transition (completed → pending)', async () => {
    const r = await req('PUT', '/api/bookings/' + bookingId + '/status', { status: 'pending' }, adminToken);
    if (r.status !== 400) throw new Error('Expected 400, got ' + r.status);
  });

  // Cancel second booking
  await test('Cancel booking', async () => {
    const bookings = await req('GET', '/api/bookings?status=confirmed', null, adminToken);
    if (bookings.body.data.length > 0) {
      const id = bookings.body.data[0]._id;
      const r = await req('PUT', '/api/bookings/' + id + '/status', { status: 'cancelled', cancellationReason: 'Client request' }, adminToken);
      if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
      if (r.body.status !== 'cancelled') throw new Error('Status not updated to cancelled');
      if (r.body.cancellationReason !== 'Client request') throw new Error('Cancellation reason not saved');
    }
  });

  // TEST 15: Clients
  console.log('\n--- TEST 15: Clients ---');
  await test('List clients', async () => {
    const r = await req('GET', '/api/clients', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (r.body.data.length < 1) throw new Error('No clients');
  });

  await test('Client stats', async () => {
    const r = await req('GET', '/api/clients/stats', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (typeof r.body.total !== 'number') throw new Error('total not number');
  });

  await test('Search clients', async () => {
    const r = await req('GET', '/api/clients?search=Test', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (r.body.data.length < 1) throw new Error('No results for Test search');
  });

  // TEST 16: Messages
  console.log('\n--- TEST 16: Messages ---');
  let msgId;
  await test('List messages', async () => {
    const r = await req('GET', '/api/messages', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (r.body.data.length < 1) throw new Error('No messages');
    if (typeof r.body.unreadCount !== 'number') throw new Error('unreadCount missing');
    if (r.body.unreadCount < 1) throw new Error('Expected at least 1 unread');
    msgId = r.body.data.find(m => !m.read)?._id || r.body.data[0]._id;
  });

  await test('Mark message read', async () => {
    const r = await req('PUT', '/api/messages/' + msgId + '/read', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (!r.body.read) throw new Error('Message not marked as read');
  });

  await test('Mark message unread', async () => {
    const r = await req('PUT', '/api/messages/' + msgId + '/unread', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (r.body.read) throw new Error('Message not marked as unread');
  });

  // TEST 17: Reviews
  console.log('\n--- TEST 17: Reviews ---');
  let reviewId;
  await test('List reviews', async () => {
    const r = await req('GET', '/api/reviews', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (r.body.data.length < 1) throw new Error('No reviews');
    reviewId = r.body.data[0]._id;
  });

  await test('Update review status', async () => {
    const r = await req('PUT', '/api/reviews/' + reviewId + '/status', { status: 'hidden' }, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (r.body.status !== 'hidden') throw new Error('Status not updated');
  });

  // TEST 18: Gallery
  console.log('\n--- TEST 18: Gallery ---');
  let galleryId;
  await test('List gallery', async () => {
    const r = await req('GET', '/api/gallery', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
  });

  await test('Add gallery image', async () => {
    const r = await req('POST', '/api/gallery', { title: 'Test Image', url: 'https://example.com/test.jpg', category: 'general' }, adminToken);
    if (r.status !== 201) throw new Error('Expected 201, got ' + r.status);
    galleryId = r.body._id;
  });

  await test('Delete gallery image', async () => {
    const r = await req('DELETE', '/api/gallery/' + galleryId, null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
  });

  // TEST 19: Emails (logs only)
  console.log('\n--- TEST 19: Email Logs ---');
  await test('List email logs', async () => {
    const r = await req('GET', '/api/emails', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
  });

  // TEST 20: Finance
  console.log('\n--- TEST 20: Finance ---');
  await test('Finance overview', async () => {
    const r = await req('GET', '/api/finance/overview', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (typeof r.body.totalRevenue !== 'number') throw new Error('totalRevenue not number');
    if (!Array.isArray(r.body.byProduct)) throw new Error('byProduct not array');
    if (!Array.isArray(r.body.byMonth)) throw new Error('byMonth not array');
  });

  await test('Finance monthly', async () => {
    const r = await req('GET', '/api/finance/monthly', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (!Array.isArray(r.body)) throw new Error('Expected array');
  });

  // TEST 21: Analytics
  console.log('\n--- TEST 21: Analytics ---');
  await test('Analytics overview', async () => {
    const r = await req('GET', '/api/analytics/overview', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (typeof r.body.totalBookings !== 'number') throw new Error('totalBookings not number');
    if (!Array.isArray(r.body.bookingsByType)) throw new Error('bookingsByType not array');
    if (!Array.isArray(r.body.topProducts)) throw new Error('topProducts not array');
    if (!Array.isArray(r.body.statusDistribution)) throw new Error('statusDistribution not array');
    if (typeof r.body.cancellationRate !== 'number') throw new Error('cancellationRate not number');
  });

  // TEST 22: Settings
  console.log('\n--- TEST 22: Settings ---');
  await test('Get settings', async () => {
    const r = await req('GET', '/api/settings', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (!Array.isArray(r.body)) throw new Error('Expected array');
    if (r.body.length < 1) throw new Error('No settings');
  });

  await test('Update settings', async () => {
    const r = await req('PUT', '/api/settings', { settings: [{ key: 'site_name', value: 'VelaroCars Updated', category: 'website' }] }, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    const check = await req('GET', '/api/settings?key=site_name', null, adminToken);
    const found = check.body.find(s => s.key === 'site_name');
    if (!found || found.value !== 'VelaroCars Updated') throw new Error('Setting not persisted');
  });

  // TEST 23: Admin Users / Permissions
  console.log('\n--- TEST 23: Admin Users ---');
  let newUserId;
  await test('List users (super_admin)', async () => {
    const r = await req('GET', '/api/admin/users', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (r.body.length < 2) throw new Error('Expected at least 2 users');
  });

  await test('Create user', async () => {
    const r = await req('POST', '/api/admin/users', { name: 'Content Manager', email: 'content@test.com', password: 'Password123!', role: 'content_manager' }, adminToken);
    if (r.status !== 201) throw new Error('Expected 201, got ' + r.status);
    newUserId = r.body._id;
  });

  await test('Update user role', async () => {
    const r = await req('PUT', '/api/admin/users/' + newUserId, { role: 'reservations_manager' }, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (r.body.role !== 'reservations_manager') throw new Error('Role not updated');
  });

  await test('Cannot delete self', async () => {
    const me = await req('GET', '/api/auth/me', null, adminToken);
    const r = await req('DELETE', '/api/admin/users/' + me.body.user._id, null, adminToken);
    if (r.status !== 400) throw new Error('Expected 400, got ' + r.status);
  });

  await test('Delete user', async () => {
    const r = await req('DELETE', '/api/admin/users/' + newUserId, null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
  });

  // TEST 24: Activity Logs
  console.log('\n--- TEST 24: Activity Logs ---');
  await test('Activity logs', async () => {
    const r = await req('GET', '/api/activity-logs', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (r.body.data.length < 1) throw new Error('No activity logs found');
  });

  // TEST 25: Content & Languages
  console.log('\n--- TEST 25: Content & Languages ---');
  await test('Get content', async () => {
    const r = await req('GET', '/api/content', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
  });

  await test('Languages', async () => {
    const r = await req('GET', '/api/languages', null, adminToken);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
    if (!Array.isArray(r.body)) throw new Error('Expected array');
    if (r.body.length < 2) throw new Error('Expected at least 2 languages');
  });

  // PUBLIC WEBSITE TEST
  console.log('\n--- TEST 26: Public Website ---');
  await test('Homepage loads', async () => {
    const r = await req('GET', '/', null);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
  });

  await test('Admin page loads', async () => {
    const r = await req('GET', '/admin/', null);
    if (r.status !== 200) throw new Error('Expected 200, got ' + r.status);
  });

  // CLEANUP
  console.log('\n========================================');
  console.log('  RESULTS');
  console.log('========================================');
  console.log(`  ✅ PASSED: ${passCount}`);
  console.log(`  ❌ FAILED: ${failCount}`);
  console.log(`  TOTAL: ${passCount + failCount}`);
  console.log('========================================\n');

  if (failCount > 0) {
    console.log('FAILED TESTS:');
    results.filter(r => r.grade === 'FAIL').forEach(r => console.log(`  ❌ ${r.name}: ${r.detail}`));
    console.log('');
  }

  await server.close();
  await mongoose.disconnect();
  await mongod.stop();
  process.exit(failCount > 0 ? 1 : 0);
}

run().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
