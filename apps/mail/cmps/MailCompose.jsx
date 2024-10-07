import { mailService, loggedinUser } from "../services/mail.service.js"
const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function MailCompose({ toggleComposeForm }) {
    const [composeMail, setComposeMail] = useState(mailService.getEmptyMail())
    const { to, subject, body, from } = composeMail

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setComposeMail((prevComposeMail) => ({
            ...prevComposeMail,
            [field]: value,
        }))
        console.log("handlechange:", composeMail)
    }

    function onSendMail(ev) {
        ev.preventDefault()
        const newComposeMail = { ...composeMail, sentAt: new Date(), from: loggedinUser.email }

        mailService
            .save(newComposeMail)
            .then((composeMail) => {
                setComposeMail(composeMail)
                console.log("onsendmail:", composeMail)
            })
            .catch((err) => {
                console.log("err:", err)
            })
            .finally(() => {
                toggleComposeForm()
            })
    }

    function onDraft(ev) {
        // ev.preventDefault()
        const newComposeMail = { ...composeMail, isDraft: true }

        mailService
            .save(newComposeMail)
            .then((composeMail) => {
                setComposeMail(composeMail)
                console.log("onsendmail:", composeMail)
            })
            .catch((err) => {
                console.log("err:", err)
            })
            .finally(() => {
                // toggleComposeForm()
            })
    }

    return (
        <form onSubmit={onSendMail} className="compose-form">
            <header className="header">
                <h2>New Message</h2>
                <button
                    onClick={(ev) => {
                        ev.preventDefault
                        onDraft()
                        toggleComposeForm()
                    }}
                    className="fa-solid fa-xmark"
                ></button>
            </header>
            <label htmlFor="to">
                <input
                    value={to}
                    onChange={handleChange}
                    type="mail"
                    name="to"
                    placeholder="Recipients"
                ></input>
            </label>
            <label htmlFor="subject">
                <input
                    value={subject}
                    onChange={handleChange}
                    type="text"
                    name="subject"
                    placeholder="Subject"
                ></input>
            </label>
            <label htmlFor="body">
                <input
                    value={body}
                    onChange={handleChange}
                    type="text"
                    name="body"
                    placeholder="Write something.."
                ></input>
            </label>
            <footer className="footer">
                <button>Send</button>
                <button
                    className="fa-regular fa-trash-can"
                    onClick={(ev) => {
                        ev.preventDefault
                        toggleComposeForm()
                    }}
                ></button>
            </footer>
        </form>
    )
}
