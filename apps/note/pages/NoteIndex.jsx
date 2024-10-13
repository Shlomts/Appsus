const { useEffect, useState, useRef } = React

import { NoteList } from "../cmps/NoteList.jsx"
import { NoteCompose } from "../cmps/NoteCompose.jsx"
import { NoteEdit } from "../cmps/NoteEdit.jsx"
import { noteService } from "../services/note.service.js"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteFolderList } from "../cmps/NoteFolderList.jsx"


export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [currNote, setCurrNote] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [sortBy, setSortBy] = useState({ createdAt: -1 })
    const [showSideBar, setShowSideBar] = useState(false)

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

    function onSelectNote(noteId) {
        noteService.get(noteId).then((note) => setCurrNote(note))
    }

    function onRemoveNote(noteId) {
        setCurrNote(null)        // const note = notes.filter((notes) => notes.id === noteId)[0]

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


    function toggleSideBar() {
        setShowSideBar((prevShowSideBar) => !prevShowSideBar)
    }


    if (!notes) return <h1>Loading...</h1>

    return (
        <section className="note-index">
            <NoteFolderList />

            <NoteCompose loadNotes={loadNotes} setCurrNote={setCurrNote} />

            <NoteFilter
                showSideBar={showSideBar}
                toggleSideBar={toggleSideBar}
            />

            <NoteList
                notes={notes}
                onSelectNote={onSelectNote}
                onRemoveNote={onRemoveNote}
            />

            {currNote && (
                <NoteEdit
                    className="edit-note"
                    loadNotes={loadNotes}
                    note={currNote}
                    setCurrNote={setCurrNote}
                />
            )}

            {/* <section className="edit-note">
                <NoteCompose loadNotes={loadNotes} note={currNote} />
            </section> */}
        </section>
    )
}
