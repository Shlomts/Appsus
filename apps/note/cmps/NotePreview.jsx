import { Video } from "./dynamic-inputs/Video.jsx"
import { Todos } from "./dynamic-inputs/Todos.jsx"

export function NotePreview({ note, onSelectNote, onRemoveNote }) {
    return (
        <article
            style={{ backgroundColor: note.style.backgroundColor }}
            className="note-preview"
        >
            <section
                className="note-body"
                onClick={(ev) => {
                    ev.preventDefault()
                    onSelectNote(note.id)
                }}
            >
                <h3>{note.info.title}</h3>
                {note.isPinned && (
                    <button className="fa-solid fa-thumbtack"></button>
                )}
                <DynamicCmp note={note} />
            </section>

            <button onClick={() => onRemoveNote(note.id)} className="fa-regular fa-trash-can"/>
        </article>
    )
}

function DynamicCmp({ note }) {
    switch (note.type) {
        case "txt":
            return <p>{note.info.body}</p>
        case "img":
            return <img src={note.info.body} />
        case "video":
            return <Video videoUrl={note.info.body} />
        case "todos":
            return <Todos list={note.info.body} />
    }
}
