import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFound() {
    return (
        <div className="not_found">
            <h1>Ошибка 404. Страница не найдена</h1>
            <Link to={AppRoute.Main}>Вернуться на главную</Link>
        </div>
    )
}

export { NotFound };