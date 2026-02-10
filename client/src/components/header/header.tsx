import { Link } from 'react-router-dom';
import { Logo } from '../logo/logo';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector, useAppDispatch } from '../../components/hooks';
import { logout } from '../../components/store/action';

function Header() {
    const dispatch = useAppDispatch();
    const favoriteOffers = useAppSelector((state) => 
        state.offers.filter((offer) => offer.isFavorite)
    );
    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
    const userEmail = useAppSelector((state) => state.userEmail);
    
    const isAuth = authorizationStatus === AuthorizationStatus.Auth;

    const handleLogoutClick = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__left">
                        <Logo />
                    </div>
                    <nav className="header__nav">
                        <ul className="header__nav-list">
                            {isAuth ? (
                                <>
                                    <li className="header__nav-item user">
                                        <Link 
                                            className="header__nav-link header__nav-link--profile" 
                                            to={AppRoute.Favorites}
                                        >
                                            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                                            <span className="header__user-name user__name">{userEmail || 'User'}</span>
                                            <span className="header__favorite-count">{favoriteOffers.length}</span>
                                        </Link>
                                    </li>
                                    <li className="header__nav-item">
                                        <Link 
                                            className="header__nav-link" 
                                            to={AppRoute.Main}
                                            onClick={handleLogoutClick}
                                        >
                                            <span className="header__signout">Sign out</span>
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <li className="header__nav-item">
                                    <Link 
                                        className="header__nav-link" 
                                        to={AppRoute.Login}
                                    >
                                        <span className="header__signout">Sign in</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export { Header };