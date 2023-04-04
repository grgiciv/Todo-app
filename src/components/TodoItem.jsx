export function TodoItem(props) {
    
        const handleChange = () => {
            props.onMarkItemsAsDone(props.id, props.done);
        };
    
        const handleClick = () => {
          props.onDeleteItem(props.id);
        };
    
        return (
          <div key={props.id}>
            <input type="checkbox" checked={props.done} onChange={handleChange}/>
            {props.text} ({new Date(props.createdAt).toUTCString()})
            <button onClick={handleClick}>X</button>
          </div>
        )
}