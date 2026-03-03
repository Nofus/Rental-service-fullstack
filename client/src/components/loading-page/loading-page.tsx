import type { JSX } from 'react';
import '../../../public/css/main.css';

function LoadingPage(): JSX.Element {
  return (
    <div className="loading-page">
      <div className="spinner"></div>
      <p>Загрузка...</p>
    </div>
  );
}

export { LoadingPage };