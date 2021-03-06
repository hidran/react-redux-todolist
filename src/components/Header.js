import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Header = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <nav className='navbar fixed-top navbar-expand-lg navbar-dark bg-dark'>
            <div className='container-fluid'>
                <Link className='navbar-brand' to='/'>
                    Mytodo
                </Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon' />
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink
                                activeClassName='active'
                                className='nav-link'
                                to='/'>
                                Home
                            </NavLink>
                        </li>
                        {user && (
                            <li className='nav-item'>
                                <NavLink
                                    activeClassName='active'
                                    className='nav-link'
                                    to='/lists'>
                                    Lists
                                </NavLink>
                            </li>
                        )}
                        {!user && (
                            <>
                                <li className='nav-item'>
                                    <NavLink
                                        activeClassName='active'
                                        className='nav-link'
                                        to='/login'>
                                        Login
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink
                                        activeClassName='active'
                                        className='nav-link'
                                        to='/register'>
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {user && (
                            <>
                                <li className='nav-link'>{user.name}</li>
                                <li className='nav-item'>
                                    <NavLink
                                        activeClassName='active'
                                        className='nav-link'
                                        to='/logout'>
                                        Logout
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default Header;
