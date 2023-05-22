import express from 'express';

const app = express();

app.use(express.json());

const users = [
    'Hugo',
    'Juli',
    'Luke',
    'Paulo',
    'Claudia'
]

app.get('/users', (request, response) => {
  const search = String(request.query.search);

  const filteredUsers = search ? users.filter(user => users.includes(search)):users;

  return response.json(filteredUsers);
});

app.get('/users/:id', (request, response) =>{
  const id = Number(request.params.id);
  const user = users[id];

  return response.json(user);
});

app.post('/users', (request, response) => {
  const data = request.body;

  console.log(data);

  const user = {
    name: 'Hugo',
    email: 'hugosimoescontato@gmail.com'
  };

  return response.json(user);
});

app.listen(3333);