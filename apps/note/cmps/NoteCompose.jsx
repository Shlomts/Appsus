import { noteService } from "../services/note.service.js"
const { useState, useEffect } = React

export function NoteCompose() {
    const [composeNote, setComposeNote] = useState(noteService.getEmptyNote())
    const { title, txt } = composeNote

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setComposeNote((prevComposeNote) => ({
            ...prevComposeNote,
            [field]: value,
        }))
        console.log("handlechange:", composeNote)
    }

    return (
        <form className="compose-note">
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
                    // onChange={handleChange}
                    type="txt"
                    name="title"
                    placeholder="Title"
                ></input>
            </label>
            <label htmlFor="txt">
                <input
                    value={txt}
                    // onChange={handleChange}
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
