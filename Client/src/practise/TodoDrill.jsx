import { useState } from "react";


const TodoDrill = () => {
    const [todoData, setTodoData] = useState("");

    const [toDoList, setTodoList] = useState([]);
    const addToDoList = (e) => {
        e.preventDefault();
        if (todoData.trim() === "")
            return;
        setTodoList([...toDoList, { id: Date.now(), text: todoData }]);
        setTodoData("");
    };
    const deleteToDo = (Id) => {
        setTodoList(toDoList.filter(x => x.id !== Id));
    };


    return (<form onSubmit={(e) => addToDoList(e)} className="form-card">
        <label>Todo
            <input type="text" value={todoData} onChange={(e) => setTodoData(e.target.value)} /></label>
            <button>Add</button>
        <ul>
            {toDoList.map((x) =>
                <li key={x.id}>
                    {x.text}
                    <button type="button" onClick={() => deleteToDo(x.id)} >Remove</button>
                </li>
            )}
        </ul>
    </form>);
};
export default TodoDrill;