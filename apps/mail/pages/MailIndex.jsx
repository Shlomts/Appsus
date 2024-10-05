const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouter

import { mailService } from "../services/mail.service.js"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailPreview } from "../cmps/MailPreview.jsx"


export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(setMails)
            .catch(err => {
                console.log('Problem getting mails', err)
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(preFilter => ({ ...preFilter, ...filterBy }))
    }

    function onRemoveMail(ev, mailId) {
        ev.preventDefault()
        mailService.remove(mailId)
            .then(() => {
                setMails(mails => mails.filter(mails => mails.id !== mailId))
                // showSuccessMsg(`Car removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing mail:', err)
                // showErrorMsg(`Problems removing mail (${mailId})`)
            })
    }

    if (!mails) return <h1>Loading...</h1>

    return (
        <section className="mail-index">
            {/* <MailFolderList /> */}
            <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <MailList
                mails={mails}
                onRemoveMail={onRemoveMail}
            />
        </section>
    )
}

