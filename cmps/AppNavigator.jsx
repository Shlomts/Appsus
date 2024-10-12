const { Link, NavLink } = ReactRouterDOM
const { useEffect, useState } = React


export function AppNavigator() {

    const [appsWindow, setAppWindow] = useState(false)

    function toggleAppsWindow() {
        setAppWindow((preAppWindow) => !preAppWindow)
    }

    function closeAppWindow() {
        setAppWindow(false)
    }

    return <header className="app-navigator">
        <div className="app-btn">
            <button onClick={toggleAppsWindow} className="apps-btn fa-solid fa-grip"></button>
        </div>

        {appsWindow && (
            <div className="apps-window">
                <Link to="/mail" onClick={closeAppWindow}>
                    <img src="https://img.icons8.com/color/48/gmail-new.png" alt="gmail-icon"></img>
                </Link>
                <Link to="/note" onClick={closeAppWindow}>
                    <img src="https://img.icons8.com/color/48/google-keep.png" alt="gmail-keep-icon"></img>
                </Link>
                {/* <Link to="/mail"> */}
                <img src="https://img.icons8.com/doodle/48/books.png" alt="miss-books-icon"></img>
                {/* </Link> */}

            </div>
        )}
    </header>
}
