import { useState } from 'react'
import { TodoItem } from './components/TodoItem';
import { TodoItemForm } from './components/TodoItemForm';

function App() {
  const [items, setItems] = useState([]);
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

  const handleCreateItem = (item) => {
    setItems([...items, item]);   //kopira sve iteme i kreira novi item tako da ...items rasprsi array i na kraju doda novi objekt
  }

  const handleClearItems = () => {
    setItems([]);
  }

  const handleMarkItemAsDone = (id, done) => {
    setItems(items.map(newItem => {
      if (newItem.id === id) {
        return { ...newItem, done: !done };
      }
      return newItem;
    }));
  };

  const handleDeleteItem = (id) => {
    setItems (items.filter(newItem => {
      return newItem.id !== id;
    }));
  };

  const itemComponents = items
    .sort((a, b) => {
      if (sort === "createdAtAsc"){
        return a.createdAt - b.createdAt;
      }
      return b.createdAt - a.createdAt;
    })
    .map(item => {
      return <TodoItem key={item.id} id={item.id} done={item.done} text={item.text} createdAt={item.createdAt}
        onDeleteItem={handleDeleteItem} onMarkItemsAsDone={handleMarkItemAsDone} />
      
  });

  return (
    <div>
      <h1>TODO APP</h1>
      <TodoItemForm onCreateItem={handleCreateItem} />
      <button onClick={handleClearItems}>Clear</button>
      <select onChange={handleSortChange} defaultValue={sort}>
        <option value="createdAtAsc">Created at (ascending)</option>
        <option value="createdAtDesc">Created at (descending)</option>
      </select>
      {itemComponents}
    </div>
  )
}

export default App
