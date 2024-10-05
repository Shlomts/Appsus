const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { MailDetails } from "../pages/MailDetails.jsx"
import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail, onRemoveMail }) {

    const [isStarred, setIsStarred] = useState(mail.isStarred)
    const [isRead, setIsRead] = useState(mail.isRead)

    function showDate() {
        const mailDate = new Date(mail.createdAt)
        const currDate = new Date()

        if (mailDate.getFullYear() < currDate.getFullYear()) {
            const fullDate = `${mailDate.getDate()}.${mailDate.getMonth()}.${mailDate.getFullYear()}`
            return fullDate
        }
        if (mailDate.getMonth() < currDate.getMonth()) {
            const month = mailDate.toLocaleString('default', { month: 'short' });
            const fullDate = `${mailDate.getDate()} ${month}`
            return fullDate
        }
        else {
            return mailDate.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
        }

    }

    function getReadIcon() {
        return isRead ? 'fa-regular fa-envelope-open' : 'fa-solid fa-envelope'
    }

    function getStarClass() {
        return isStarred ? 'fa-solid fa-star' : 'fa-regular fa-star'
    }

    function onToggleStarred() {
        const currMailState = { ...mail, isStarred: !isStarred }

        mailService.save(currMailState)
            .then(() =>
                setIsStarred(!isStarred)
            )
            .catch(err => {
                console.log('err:', err)
            })
    }

    function getReadClass() {
        return isRead ? 'mail-preview read' : 'mail-preview'

    }

    function onToggleRead() {
        const currMailState = { ...mail, isRead: !isRead }

        mailService.save(currMailState)
            .then(() =>
                setIsRead(!isRead)
            )
            .catch(err => {
                console.log('err:', err)
            })
    }

    return (
        <article className={getReadClass()}>
            <span className={getStarClass()} onClick={onToggleStarred}></span>
            <h2>{mail.from}</h2>
            <Link to={`/mail/${mail.id}`}>
                <section className="main-mail-data">
                    <h3>{mail.subject}</h3>
                    <p className="mail-body">{mail.body}</p>
                </section>
            </Link>

            <p className="mail-date">{showDate()}</p>
            <section className="opt-btns hidden">
                <button className="fa-regular fa-trash-can" onClick={() => onRemoveMail(event, mail.id)}></button>
                <button title="read/unread" className={getReadIcon()} onClick={onToggleRead}></button>
            </section>


        </article>
    )
}