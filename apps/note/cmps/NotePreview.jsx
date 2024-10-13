import  { Video } from "./dynamic-inputs/Video.jsx"
import  { Todos } from "./dynamic-inputs/Todos.jsx"

export function NotePreview({ note, onSelectNote }) {
    return (
        <article
            style={{ backgroundColor: note.style.backgroundColor }}
            className="note-preview"
            onClick={(ev) => {
                ev.preventDefault()
                onSelectNote(note.id)
            }}
        >
            <h3>{note.info.title}</h3>
            <DynamicCmp note={note} />
        </article>
    )
}

function DynamicCmp({ note }) {
    // console.log('props:', props)
    switch (note.type) {
        case "txt":
            return <p>{note.info.body}</p>
        case "img":
            return <img src={note.info.body}/>
        case "video":
            return <Video videoUrl={note.info.body} />
        case "todos":
            return <Todos list={note.info.body} />
    }
}
