import { useState } from 'react';
import * as classApi from '../../utilities/class-api'

export default function ClassForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await classApi.addClass({ name, description, icon });
      setName('');
      setDescription('');
      setIcon('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(evt) => setName(evt.target.value)} />

      <label htmlFor="description">Description:</label>
      <input type="text" id="description" value={description} onChange={(evt) => setDescription(evt.target.value)} />

      <label htmlFor="icon">Icon Url:</label>
      <input type="text" id="icon" value={icon} onChange={(evt) => setIcon(evt.target.value)} />

      <button type="submit">Add Class</button>
    </form>
  );
}
