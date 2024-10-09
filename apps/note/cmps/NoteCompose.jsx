const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

export function NoteCompose({ loadNotes }) {
    const [composeNote, setComposeNote] = useState(noteService.getEmptyNote())
    const { title, txt } = composeNote
    console.log(composeNote)

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setComposeNote((prevComposeNote) => {
            prevComposeNote.info[field] = value
            return prevComposeNote
        })
    }

    function onSaveNote(ev) {
        ev.preventDefault() // IS NEEDED??
        const newComposeNote = { ...composeNote }
        console.log("newComposeNote", newComposeNote)
        noteService
            .save(newComposeNote)
            .then((composeNote) => {
                setComposeNote(composeNote)
                console.log("onsavenote:", composeNote)
                loadNotes()
            })
            .catch((err) => {
                console.log("err:", err)
            })
            .finally(() => {
                loadNotes()
                // navigate('/car')
            })
    }

    return (
        <form onSubmit={onSaveNote} className="compose-note">
            {/* <header className="header">
                    <h2>New Note</h2>
                    <button
                        onClick={(ev) => {
                            ev.preventDefault
                            onDraft()
                            toggleComposeForm()
                        }}
                        className="fa-solid fa-xmark"
                    ></button>
                </header> */}
            <label htmlFor="title">
                <input
                    value={title}
                    onChange={handleChange}
                    type="text"
                    name="title"
                    placeholder="Title"
                ></input>
            </label>
            <label htmlFor="txt">
                <input
                    value={txt}
                    onChange={handleChange}
                    type="text"
                    name="txt"
                    placeholder="New note..."
                ></input>
            </label>
            <button>Save</button>
            {/* <button
                        className="fa-regular fa-trash-can"
                        onClick={(ev) => {
                            ev.preventDefault
                            toggleComposeForm()
                        }}
                    ></button> */}
        </form>
    )
}
