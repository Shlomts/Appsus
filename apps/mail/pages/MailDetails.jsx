
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
            .then(setMail)
            .catch(() => {
                showErrorMsg('Couldnt get mail...')
                navigate(`/mail`)
            })
    }


    if (!mail) return <h1>Loading...</h1>

    return (
        <article className="mail-details">
            <h2>{mail.subject}</h2>
            <h3>{mail.to}</h3>
            <h4>{mail.from}</h4>
            <p>{mail.subject}</p>
        </article>
    )
}