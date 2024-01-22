const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Örnek veri
const users = [
  { id: 1, username: 'john_doe', email: 'john@example.com' },
  { id: 2, username: 'jane_doe', email: 'jane@example.com' }
];

// API Endpoint: Tüm kullanıcıları getir
app.get('/api/users', (req, res) => {
  res.json(users);
});

// API Endpoint: Belirli bir kullanıcıyı getir
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
  }

  res.json(user);
});

// API Endpoint: Yeni bir kullanıcı oluştur
app.post('/api/users', (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: 'Eksik bilgi, kullanıcı oluşturulamadı' });
  }

  const newUser = {
    id: users.length + 1,
    username,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// API'yi dinleme
app.listen(port, () => {
  console.log(`API sunucusu ${port} portunda çalışıyor.`);
});
