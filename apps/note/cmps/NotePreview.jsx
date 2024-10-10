export function NotePreview({note}) {

    return (
        <article className="note-preview">
            <h3>{note.info.title}</h3>
            <p>{note.info.body}</p>
        </article>
    )
}