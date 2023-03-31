import { useState } from 'react';
import * as classApi from '../../utilities/class-api'

export default function ClassForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [classType, setClassType] = useState('')

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await classApi.addClass({ name, description, classType });
      setName('');
      setDescription('');
      setClassType('');
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

      <label htmlFor="classType">Class Type:</label>
      <select name="classType" id="classType" value={classType} onChange={(evt) => setClassType(evt.target.value)}>
        <option value="">Select a class type</option>
        <option value="tank">Tank</option>
        <option value="healer">Healer</option>
        <option value="dps">DPS</option>
      </select>


      <button type="submit">Add Class</button>
    </form>
  );
}
