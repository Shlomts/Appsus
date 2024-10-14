const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { AppNavigator } from "./cmps/AppNavigator.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx"
import { MailDetails } from "./apps/mail/pages/MailDetails.jsx"
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"
// import { BookDetails } from './apps/books/pages/BookDetails.jsx'
// import { BookIndex } from './apps/books/pages/BookIndex.jsx'
// import { BookEdit } from './apps/books/pages/BookEdit.jsx'

export function App() {
    return <Router>
        <section className="app">
            {/* <AppHeader /> */}
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<MailIndex />} />
                    {/* <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} /> */}
                    <Route path="/mail" element={<MailIndex />}>
                        <Route path="/mail/:mailId" element={<MailDetails />} />
                    </Route>
                    
                    <Route path="/note" element={<NoteIndex />} />



                    
                    {/* <Route path="/book" element={<BookIndex />} />
                    <Route path="/book/:bookId" element={<BookDetails />} />
                    <Route path="/book/edit" element={<BookEdit />} />
                    <Route path="/book/edit/:bookId" element={<BookEdit />} />
                     */}
                </Routes>
            </div>
            <AppNavigator />
        </section>

    </Router>
}
