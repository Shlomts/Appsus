const { useEffect, useState } = React

import { NoteList } from "../cmps/NoteList.jsx"
import { NoteCompose } from "../cmps/NoteCompose.jsx"
import { noteService } from "../services/note.service.js"

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [sortBy, setSortBy] = useState({ createdAt: -1 })

    // useEffect(() => {
    //     loadNotes()
    // }, [filterBy, sortBy])

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService
            .query(filterBy, sortBy)
            .then(setNotes)
            .catch((err) => {
                console.log("Problem getting mails", err)
            })
    }

    function onRemoveNote(noteId) {
        // const note = notes.filter((notes) => notes.id === noteId)[0]

        // ev.preventDefault()

        noteService
            .remove(noteId)
            .then(() => {
                setNotes((notes) => notes.filter((note) => note.id !== noteId))
                // showSuccessMsg(Car removed successfully!)
            })
            .catch((err) => {
                console.log("Problems removing note:", err)
                // showErrorMsg(Problems removing car (${carId}))
            })
    }

    if (!notes) return <h1>Loading...</h1>

    return (
        <section className="note-index">
            <NoteCompose />
            <NoteList 
            notes={notes} 
            onRemoveNote={onRemoveNote} />
        </section>
    )
}
