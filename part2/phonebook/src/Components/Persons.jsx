const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <ul>
      {personsToShow.map((p) => (
        <li key={p.name}>
          {p.name} - {p.number}
          <button onClick={() => handleDelete(p.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
