import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/logo/logo';
import { useAppDispatch } from '../../components/hooks';
import { requireAuthorization } from '../../components/store/action';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();

        if (email && password.length >= 3) {
            dispatch(requireAuthorization(AuthorizationStatus.Auth, email));
            navigate(AppRoute.Main);
        }
    };

    return (
        <div className="page page--gray page--login">
            <header className="header">
                <div className="container">
                    <div className="header__wrapper">
                        <div className="header__left">
                            <Logo />
                        </div>
                        <nav className="header__nav">
                            <ul className="header__nav-list">
                                <li className="header__nav-item user">
                                    <Link 
                                        className="header__nav-link header__nav-link--profile" 
                                        to={AppRoute.Favorites}
                                    >
                                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                                        <span className="header__login">Sign in</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="page__main page__main--login">
                <div className="page__login-container container">
                    <section className="login">
                        <h1 className="login__title">Sign in</h1>
                        <form className="login__form form" onSubmit={handleSubmit}>
                            <div className="login__input-wrapper form__input-wrapper">
                                <label className="visually-hidden">E-mail</label>
                                <input 
                                    className="login__input form__input" 
                                    type="email" 
                                    name="email"
                                    placeholder="Email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="login__input-wrapper form__input-wrapper">
                                <label className="visually-hidden">Password</label>
                                <input 
                                    className="login__input form__input" 
                                    type="password" 
                                    name="password"
                                    placeholder="Password" 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="login__submit form__submit button" type="submit">
                                Sign in
                            </button>
                        </form>
                    </section>
                    <section className="locations locations--login locations--current">
                        <div className="locations__item">
                            <a className="locations__item-link" href="#">
                                <span>Amsterdam</span>
                            </a>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export { LoginPage };