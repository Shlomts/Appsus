const { Link } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx"


export function MailList({ mails }) {
    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <li key={mail.id}>
                    <Link to={`/mail/${mail.id}`}>
                        <MailPreview mail={mail} />
                        <section>
                            {/* <button onClick={() => onRemoveCar(car.id)}>Remove</button> */}
                        </section>
                    </Link>
                </li>

            )}
        </ul>
    )
}
