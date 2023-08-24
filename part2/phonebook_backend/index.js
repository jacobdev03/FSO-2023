const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

morgan.token('body', function (req, res) {
  return `${req.body.name} - ${req.body.number}`;
});

app.use(morgan(':body :method :url :response-time'));

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.post('/api/persons', (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      error: 'content missing',
    });
  }

  const { name, number } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'name missing' });
  }

  if (!number) {
    return res.status(400).json({ error: 'number missing' });
  }

  const isFound = persons.find((p) => p.name === name);

  if (isFound) {
    return res.status(400).json({ error: 'name already exists in phonebook' });
  }

  const person = {
    id: generateId(),
    name: name,
    number: number,
  };
  persons = persons.concat(person);
  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

app.get('/info', (req, res) => {
  const date = new Date();
  res.send(`<p>Phonebook has ${persons.length} persons</p><p>${date}</p>`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
