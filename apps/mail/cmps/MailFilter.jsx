// import { utilService } from "../services/util.service.js"
const { useEffect, useState } = React



export function MailFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name, type } = target
        const value = type === 'number' ? +target.value : target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    return (
        <section className="mail-filter">
            <form onSubmit={onSubmit}>
                <button type="submit" className="fa-solid fa-magnifying-glass"></button>
                <input value={filterByToEdit.txt} onChange={handleChange} type="text" name="txt" placeholder='Search' />
            </form>
            <select name="isRead" value={filterByToEdit.isRead || ''} onChange={handleChange}>
                <option value="">All</option>
                <option value="true">Read</option>
                <option value="false">Unread</option>
            </select>
        </section>
    )
}
