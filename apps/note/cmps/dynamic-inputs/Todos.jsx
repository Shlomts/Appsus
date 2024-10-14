import { utilService } from "../../../services/util.service.js"

export function Todos({ list }) {
    
    const rawTodosList = list.split(", ")
    let todosList = setTodos(rawTodosList)


    function setTodos(list) {
        const todosLisrArr = list.map((todo) => ({
            id: utilService.makeId(),
            do: todo,
        }))
        return todosLisrArr
    }

    return (
        <section className="todos" >
            {todosList.map((todo) => (
                <article key={todo.id} className="todo">
                    <button className="fa-regular fa-square"></button>
                    <p>{todo.do}</p>
                    {/* <button
                        className="fa-solid fa-xmark"
                        title="Delete"
                        onClick={ev => {
                            ev.preventDefault()
                            deleteTodo(todo.id)
                        }}
                    ></button> */}
                </article>
            ))}
        </section>
    )
}
