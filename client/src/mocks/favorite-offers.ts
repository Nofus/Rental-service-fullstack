import type { OffersList } from '../types/offer';

export const favoriteOffers: OffersList[] = [
    {
        'id': 'bbb06a0e-3f92-446d-9a68-cb64b5d38e2b',
        'title': 'Wood and stone place',
        'type': 'Private room',
        'price': 370,
        'previewImage': '/img/room.jpg',
        'city': {
            'name': 'Paris',
            'location': {
                'latitude': 48.85661,
                'longitude': 2.351499,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 48.868610000000004,
            'longitude': 2.342499,
            'zoom': 16
        },
        'isFavorite': true,
        'isPremium': false,
        'rating': 4.9
    },
    {
        'id': 'ccc06a0e-3f92-446d-9a68-cb64b5d38e2d',
        'title': 'Canal View Prinsengracht',
        'type': 'Apartment',
        'price': 132,
        'previewImage': '/img/apartment-02.jpg',
        'city': {
            'name': 'Amsterdam',
            'location': {
                'latitude': 52.37454,
                'longitude': 4.897976,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 52.3609553943508,
            'longitude': 4.85309666406198,
            'zoom': 16
        },
        'isFavorite': true,
        'isPremium': false,
        'rating': 4.7
    },
    {
        'id': 'aaa06a0e-3f92-446d-9a68-cb64b5d38e2c',
        'title': 'Beautiful studio at great location',
        'type': 'Apartment',
        'price': 90,
        'previewImage': '/img/apartment-01.jpg',
        'city': {
            'name': 'Amsterdam',
            'location': {
                'latitude': 52.37454,
                'longitude': 4.897976,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 52.3909553943508,
            'longitude': 4.85309666406198,
            'zoom': 16
        },
        'isFavorite': true,
        'isPremium': true,
        'rating': 4.5
    }
];