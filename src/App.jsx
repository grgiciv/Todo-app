import { useState } from 'react'

function App() {
  const [items, setItems] = useState([]);
  const [formState, setFormState] = useState({
    text:'',
  });
  const [sort, setSort] = useState("createdAtDesc");

  const handleSortChange = (event) => {
    setSort(event.target.value)
  }

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setItems([
      //kopira sve iteme i kreira novi item tako da ...items rasprsi array i na kraju doda novi objekt
      ...items,
      {
        id: Date.now(),
        text: formState.text,
        done: false,
        createdAt: Date.now(),
      }
    ]);
    setFormState({ ...formState, text: '' });
  }

  const itemComponents = items
    .sort((a, b) => {
      if (sort === "createdAtAsc"){
        return a.createdAt - b.createdAt;
      }
      return b.createdAt - a.createdAt;
    })
    .map(item => {
      const handleChange = () => {
        console.log('handle change for item', item);
        setItems(items.map(newItem => {
          if (newItem.id === item.id) {
            return { ...newItem, done: !item.done };
          }
          return newItem;
        }))
    };

    const handleClick = () => {
      setItems (items.filter(newItem => {
        return newItem.id !== item.id;
      }));
    };

    return (
      <div key={item.id}>
        <input type="checkbox" checked={item.done} onChange={handleChange}/>
        {item.text} ({new Date(item.createdAt).toUTCString()})
        <button onClick={handleClick}>X</button>
      </div>
    )
  });

  return (
    <div>
      <h1>TODO APP</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="text" value={formState.text} onChange={handleChange}></input>
        <button type='submit'>Add item</button>
      </form>
      <select onChange={handleSortChange} defaultValue={sort}>
        <option value="createdAtAsc">Created at (ascending)</option>
        <option value="createdAtDesc">Created at (descending)</option>
      </select>
      {itemComponents}
    </div>
  )
}

export default App
