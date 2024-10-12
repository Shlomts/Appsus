const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM


import { bookService } from "../services/book.service.js"

export function BookDetails() {
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem getting book', err)
            })
    }

    if (!book) return <div>Loading..</div>

    function getTypeOfReading() {
        if (book.pageCount > 500) return 'Serious Reading'
        if (book.pageCount < 500 && book.pageCount > 200) return 'Descent Reading'
        if (book.pageCount < 100) return 'Light Reading'
        return ''
    }

    function getTypeByPublishTime() {
        const currYear = new Date().getFullYear()
        if ((currYear - book.publishedDate) > 10) return 'Vintage'
        if ((currYear - book.publishedDate) <= 1) return 'New'
        return ''
    }

    function getAmountClass() {
        if (book.listPrice.amount > 100) return 'red'
        if (book.listPrice.amount < 20) return 'green'
        return ''
    }

    function onBack(){
        navigate('/book')
    }

    const typeOfReading = getTypeOfReading()
    const typeByPublishTime = getTypeByPublishTime()
    const amountClass = getAmountClass()


    return (
        <section className="book-details">
            <h1>{book.title}</h1>
            <h3>Book Price: <span className={`amount ${amountClass}`}>{book.listPrice.amount}</span></h3>
            <p>Authors: {book.authors}</p>
            <p>Description: {book.description}</p>
            <p>Subtitle: {book.subtitle}</p>
            <p>Language: {book.language}</p>
            <p>Book Categories: {book.categories.join(', ')}</p>
            <p>{typeOfReading}</p>
            <p>{typeByPublishTime}</p>

            <div className="img-container">
                {book.listPrice.isOnSale &&
                    <img src={"./assets/img/onSale.svg"} alt="on-sale-icon" className="on-sale-icon" />}
                <img src={book.thumbnail} alt="book-image" className="book-image" />
            </div>
            
            <button onClick={onBack}>Back</button>
        </section>
    )
}