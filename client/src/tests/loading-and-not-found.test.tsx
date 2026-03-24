import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoadingPage } from '../components/loading-page/loading-page';
import { NotFound } from '../components/not-found/not-found';
import { AppRoute } from '../const';

describe('LoadingPage', () => {
    it('отображает текст загрузки', () => {
        render(<LoadingPage />);
        expect(screen.getByText(/Загрузка.../i)).toBeInTheDocument();
    });
});

describe('PageNotFound', () => {
    const renderPage = () => render(
        <MemoryRouter>
            <NotFound />
        </MemoryRouter>
    );

    it('отображает заголовок PAGE NOT FOUND', () => {
        renderPage();
        expect(screen.getByText(/Ошибка 404. Страница не найдена/i)).toBeInTheDocument();
    });

    it('ссылка на главную страницу присутствует', () => {
        renderPage();
        const link = screen.getByRole('link', { name: /Вернуться на главную/i });
        expect(link).toBeInTheDocument();
    });

    it('ссылка ведет на "/"', () => {
        renderPage();
        const link = screen.getByRole('link', { name: /Вернуться на главную/i });
        expect(link).toHaveAttribute('href', AppRoute.Main);
    });
});