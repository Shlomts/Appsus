
const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])


    function loadMail() {
        mailService.get(params.mailId)
            .then((currMail) => {
                currMail.isRead = true
                return mailService.save(currMail)
            })
            .then(setMail)
            .catch(() => {
                // showErrorMsg('Couldnt get mail...')
                navigate(`/mail`)
            })
    }

    function onRemoveMail() {
        mailService.remove(params.mailId)
            .then(() => {
                navigate('/mail')
                // showSuccessMsg(`Car removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing mail:', err)
                // showErrorMsg(`Problems removing mail (${mailId})`)
            })
    }

    function getSenderName(mailAddress) {
        const [senderName] = mailAddress.split('@')
        return senderName.charAt(0).toUpperCase() + senderName.slice(1)
    }

    function onBack() {
        navigate('/mail')
    }


    if (!mail) return <h1>Loading...</h1>

    return (
        <article className="mail-details">
            <section className="mail-header">
                <section className="left-header">
                    <h2>{mail.subject}</h2>
                </section>
                <section className="mail-btns">
                    <button title="return" className="fa-solid fa-arrow-left" onClick={onBack}></button>
                    <button title="save as note" className="fa-solid fa-paper-plane"></button>
                    <button title="delete" className="fa-regular fa-trash-can" onClick={onRemoveMail}></button>
                </section>
            </section>
            <section className="sender-section">
                <h3>{getSenderName(mail.from)}</h3>
                <p>{`< ${mail.from} >`}</p>
            </section>
            <p>{mail.body}</p>
        </article>
    )
}