import { useState, type KeyboardEvent } from 'react';
import classNames from 'classnames';
import { SortOffersType } from '../../const';
import type { SortOffer } from '../../types/sort';

type SortOptionsProps = {
    activeSorting: SortOffer;
    onChange: (newSorting: SortOffer) => void;
}

function SortOptions({ activeSorting, onChange }: SortOptionsProps) {
    const [isOpen, setIsOpen] = useState(false);

    const iconStyle = {
        transform: `translateY(-50%) ${isOpen ? 'rotate(180deg)' : ''}`
    };

    function keyDownHandler(evt: KeyboardEvent) {
        if (evt.key === 'Escape' && isOpen) {
            evt.preventDefault();
            setIsOpen(false);
        }
    }

    function typeClickHandler() {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    }

    function sortingItemClickHandler(type: SortOffer) {
        onChange(type);
        setIsOpen(false);
    }

    const sortOptions: { key: SortOffer, label: string }[] = [
        { key: 'Popular', label: 'Popular' },
        { key: 'PriceToHigh', label: 'Price: low to high' },
        { key: 'PriceToLow', label: 'Price: high to low' },
        { key: 'TopRated', label: 'Top rated first' }
    ];

    return (
        <form className="places__sorting" action="#" method="get" onKeyDown={keyDownHandler}>
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0} onClick={typeClickHandler}>
                {sortOptions.find(option => option.key === activeSorting)?.label || 'Popular'}
                <svg className="places__sorting-arrow" width={7} height={4} style={iconStyle}>
                    <use xlinkHref="#icon-arrow-select"></use>
                </svg>
            </span>
            <ul className={classNames({'places__options--opened': isOpen}, 'places__options', 'places__options--custom')}>
                {sortOptions.map((option) => (
                    <li 
                        key={option.key} 
                        className={classNames({'places__option--active': option.key === activeSorting}, 'places__option')} 
                        tabIndex={0} 
                        onClick={() => sortingItemClickHandler(option.key)}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </form>
    );
}

export { SortOptions };