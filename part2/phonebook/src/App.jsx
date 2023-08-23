import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Components/Filter';
import PersonForm from './Components/PersonForm';
import Persons from './Components/Persons';
import personService from './services/personService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    setFilterName(e.target.value);
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().startsWith(filterName.toLowerCase())
    );
    setFilteredPersons(filtered);
  };

  const handleNewName = (e) => {
    e.preventDefault();
    setNewName(e.target.value);
  };

  const handleNewNumber = (e) => {
    e.preventDefault();
    setNewNumber(e.target.value);
  };

  const handleDelete = (id) => {
    personService.deleteOne(id);
    setPersons(
      persons.filter((p) => {
        return p.id !== id;
      })
    );
  };

  const handleSubmit = (e) => {
    const personObj = {
      name: newName,
      number: newNumber,
    };
    e.preventDefault();
    const foundPerson = persons.find((person) => {
      if (person.name === personObj.name) {
        return person;
      } else {
        return false;
      }
    });
    if (foundPerson) {
      if (window.confirm(`${newName} is already added to phonebook`)) {
        personService
          .update(foundPerson.id, personObj)
          .then((updated) =>
            setPersons(persons.map((person) => (person.id !== foundPerson.id ? person : updated)))
          );
      }
    } else {
      personService.create(personObj).then((newPerson) => setPersons(persons.concat(newPerson)));
    }
  };

  const personsToShow = filterName ? filteredPersons : persons;

  return (
    <>
      <h1>Phonebook</h1>
      <Filter handleFilter={handleFilter} />
      <h1>Add a new</h1>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </>
  );
};

export default App;
