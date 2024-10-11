export function NotePreview({ note, onSelectNote }) {
    return (
        <article
            className="note-preview"
            onClick={(ev) => {
                ev.preventDefault()
                onSelectNote(note.id)
            }}
        >
            <h3>{note.info.title}</h3>
            <p>{note.info.body}</p>
        </article>
    )
}
