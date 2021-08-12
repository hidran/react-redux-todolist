
export default function Todo({ todo, onRemoveTodo,onToggleTodo }) {
    const completeIcon = todo.completed?  <i className="bi bi-check-square"></i>: <i className="bi bi-square"></i>
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span>
            <button type="button" className="btn" onClick = {() => onToggleTodo(todo)}>
               {completeIcon}
            </button>
            {todo.name}
            </span>
            <button onClick={() => onRemoveTodo(todo)} className="btn btn-danger btn-sm">
                <li className="bi bi-trash"></li>
            </button>
      </li>
    )
}
