import { mailService, loggedinUser } from "../services/mail.service.js"
const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function MailCompose({ toggleComposeForm }) {
    const [composeMail, setComposeMail] = useState(mailService.getEmptyMail())
    const { to, subject, body, from } = composeMail
    const navigate = useNavigate()

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

    function onDraft() {
        const newComposeMail =
            { ...composeMail, isDraft: true}

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
                        ev.preventDefault()
                        toggleComposeForm()
                        onDraft()
                    }}
                    className="fa-solid fa-xmark"
                ></button>
            </header>
            <section className="compose-body">
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
                    <textarea
                        value={body}
                        onChange={handleChange}
                        type="text"
                        name="body"
                    ></textarea>
                </label>
            </section>
            <footer className="footer">
                <button className="send-btn">Send</button>
                <button
                    className="fa-regular fa-trash-can"
                    onClick={(ev) => {
                        ev.preventDefault()
                        toggleComposeForm()
                        navigate("/mail")
                    }}
                ></button>
            </footer>
        </form>
    )
}
