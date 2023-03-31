import { useState } from 'react'

const defaultItems = [
  {
    id: 1,
    text: 'Kupi mlijeko',
    done: false,
  },
  {
    id: 2,
    text: 'Kupi brašno',
    done: true,
  }
];

function App() {
  const [items, setItems] = useState(defaultItems);

  const itemComponents = items.map(item => {
    const handleChange = () => {
      console.log('handle change for item', item);
      setItems(items.map(newItem => {
        if (newItem.id === item.id) {
          return { ...newItem, done: !item.done };
        }
        return newItem;
      }));
    };

    return (
      <div key={item.id}>
        <input type="checkbox" checked={item.done} onChange={handleChange}/>{item.text}
      </div>
    )
  })

  return (
    <div>
      <h1>TODO APP</h1>
      {itemComponents}
    </div>
  )
}

export default App
