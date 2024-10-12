// import { utilService } from "../services/util.service.js"
const { useEffect, useState } = React
// import iconGmail from "../../../assets/img/icon-gmail.png"

export function MailFilter({ filterBy, onSetFilterBy, setSortBy, toggleSideBar }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name, type } = target
        const value = type === 'number' ? +target.value : target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: value }))
    }

    function handleSortChange({ target }) {

        const selectedSort = target.value
        let currSort

        switch (selectedSort) {

            case 'date - descending':
                currSort = { createdAt: -1 }
                break

            case 'date-ascending':
                currSort = { createdAt: 1 }
                break

            case 'subject-descending':
                currSort = { subject: 1 }
                break

            case 'subject-ascending':
                currSort = { subject: -1 }
                break
        }

        setSortBy(currSort)
    }


    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    return (
        <section className="mail-filter">

            <section className="gmail-logo">
                <button onClick={toggleSideBar} className="hamburger fa-solid fa-bars">   </button>
                <img src="https://img.icons8.com/color/48/gmail-new.png" alt="gmail-icon"></img>
                <span>Mister Mail</span>
            </section>

            <form onSubmit={onSubmit}>
                <button type="submit" className="fa-solid fa-magnifying-glass"></button>
                <input value={filterByToEdit.txt} onChange={handleChange} type="text" name="txt" placeholder='Search mail' />
            </form>

            <select className="isRead-filter" name="isRead" value={filterByToEdit.isRead || ''} onChange={handleChange}>
                <option value="">Show All</option>
                <option value="true">Read</option>
                <option value="false">Unread</option>
            </select>

            <section className="mail-sort">
                <select onChange={handleSortChange} name="sort-by">
                    <option value="date-descending">Newer</option>
                    <option value="date-ascending">Older</option>
                    <option value="subject-descending">A-Z</option>
                    <option value="subject-ascending">Z-A</option>
                </select>
            </section>

        </section>
    )
}
