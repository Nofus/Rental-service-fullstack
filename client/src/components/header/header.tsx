import { Link } from 'react-router-dom';
import { Logo } from '../logo/logo';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector, useAppDispatch } from '../../components/hooks';
import { logoutAction } from '../../components/store/api-actions'; 

function Header() {
    const dispatch = useAppDispatch();
    const favoriteOffers = useAppSelector((state) => 
        state.offers.filter((offer) => offer.isFavorite)
    );
    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
    const userEmail = useAppSelector((state) => state.userEmail);
    const userName = useAppSelector((state) => state.userName);
    const userAvatar = useAppSelector((state) => state.userAvatar);
    
    const isAuth = authorizationStatus === AuthorizationStatus.Auth;

    const handleLogoutClick = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(logoutAction()); 
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
                                            <div 
                                                className="header__avatar-wrapper user__avatar-wrapper"
                                                style={userAvatar ? { 
                                                    backgroundImage: `url(${userAvatar})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    borderRadius: '50%',
                                                    width: '32px',  
                                                    height: '32px', 
                                                    border: '2px solid #4481c3', 
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
                                                } : {
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#f0f0f0', 
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                {!userAvatar && (
                                                    <img 
                                                        src="/img/avatar.svg" 
                                                        alt="Avatar" 
                                                        width="20" 
                                                        height="20"
                                                        style={{
                                                            borderRadius: '50%',
                                                            opacity: 0.8
                                                        }}
                                                    />
                                                )}
                                            </div>
                                            <span className="header__user-name user__name">
                                                {userName || userEmail?.split('@')[0] || 'User'}
                                            </span>
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