const { Link, NavLink, useNavigate } = ReactRouterDOM


export function AppHeader() {

    return (

        < header className="app-header" >
            <section>
                <h1>Miss Books</h1>
                <nav className="app-nav">
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/book">Books</NavLink>
                </nav>
            </section>
        </header >
    )
}