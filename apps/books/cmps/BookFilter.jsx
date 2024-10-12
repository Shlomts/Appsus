const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'txt':
                value = value
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)

    }

    const { txt, minPrice } = filterByToEdit
    const isValid = txt

    return (
        <section className="book-filter">

            <section className="book-logo">
                <img src="https://img.icons8.com/doodle/48/books.png" alt="book-icon"></img>
                <span>Miss Books</span>
            </section>

            <form onSubmit={onSubmit}>
                <label htmlFor="txt">Title</label>
                <input value={txt} onChange={handleChange} type="text" name="txt" id="txt" />

                <label htmlFor="minPrice">Min Price</label>
                <input value={minPrice || ''} onChange={handleChange} type="number" name="minPrice" id="minPrice" />

                <button disabled={!isValid}>Submit</button>
            </form>
        </section>
    )

}