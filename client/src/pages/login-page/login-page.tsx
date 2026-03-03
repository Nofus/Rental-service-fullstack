import { useRef, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { Logo } from '../../components/logo/logo';
import { useAppDispatch, useAppSelector } from '../../components/hooks';
import { loginAction } from '../../components/store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../const';
import type { AuthData } from '../../types/user-data';
import { Link } from 'react-router-dom';

function LoginPage() {
    const loginRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();
    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

    if (authorizationStatus === AuthorizationStatus.Auth) {
        return <Navigate to={AppRoute.Main} />;
    }

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        if (loginRef.current && passwordRef.current) {
            const authData: AuthData = {
                email: loginRef.current.value,
                password: passwordRef.current.value,
            };
            dispatch(loginAction(authData));
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
                                    ref={loginRef}
                                    className="login__input form__input" 
                                    type="email" 
                                    name="email"
                                    placeholder="Email" 
                                    required
                                />
                            </div>
                            <div className="login__input-wrapper form__input-wrapper">
                                <label className="visually-hidden">Password</label>
                                <input 
                                    ref={passwordRef}
                                    className="login__input form__input" 
                                    type="password" 
                                    name="password"
                                    placeholder="Password" 
                                    required
                                />
                            </div>
                            <button className="login__submit form__submit button" type="submit">
                                Sign in
                            </button>
                        </form>
                    </section>
                    <section className="locations locations--login locations--current">
                        <div className="locations__item">
                            <Link className="locations__item-link" to={AppRoute.Main}>
                                <span>Amsterdam</span>
                            </Link>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export { LoginPage };