const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

export function NoteCompose({ loadNotes }) {
    const [composeNote, setComposeNote] = useState(noteService.getEmptyNote())
    const [body, setBody] = useState("")
    const [title, setTilte] = useState("")

    // let body
    // let title

    // console.log("info:", info)
    // console.log("txt", body)

    useEffect(() => {
        loadNotes()
    }, [])

    useEffect(() => {
        setTilte("")
        setBody("")
    }, [composeNote])
    // console.log(composeNote)

    // const [txt, setTxt] = useState('')
    // const [title, setTilte] = useState('')

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        if (field === "title") setTilte(value)
        if (field === "body") setBody(value)

        setComposeNote((prevComposeNote) => {
            prevComposeNote.info[field] = value
            return prevComposeNote
        })
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService
            .save(composeNote)
            .then((note) => {
                console.log("nte", note)
            })
            .catch((err) => {
                console.log("err:", err)
            })
            .finally(() => {
                //             // navigate('/car')

                loadNotes(), setComposeNote(noteService.getEmptyNote())
            })
    }

    return (
        <form onSubmit={onSaveNote} className="note-compose">
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
                    value={body}
                    onChange={handleChange}
                    type="text"
                    name="body"
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
