import type { FullOffer } from '../types/offer';

export const offers: FullOffer[] = [
    {
        'id': 'aaa06a0e-3f92-446d-9a68-cb64b5d38e2c',
        'title': 'Beautiful & luxurious apartment at great location',
        'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
        'type': 'Apartment',
        'price': 120,
        'images': [
            '/img/apartment-01.jpg',
            '/img/apartment-02.jpg',
            '/img/apartment-03.jpg',
        ],
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
        'goods': ['Wi-Fi', 'Heating', 'Kitchen', 'Washing machine'],
        'host': {
            'isPro': true,
            'name': 'Angelina',
            'avatarUrl': '/img/avatar-angelina.jpg'
        },
        'isPremium': true,
        'isFavorite': false,
        'rating': 4.9,
        'bedrooms': 3,
        'maxAdults': 4
    },
    {
        'id': 'bbb06a0e-3f92-446d-9a68-cb64b5d38e2b',
        'title': 'Wood and stone place',
        'description': 'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families',
        'type': 'Private room',
        'price': 370,
        'images': [
            '/img/apartment-01.jpg',
            '/img/apartment-02.jpg',
            '/img/apartment-03.jpg',
            '/img/room.jpg',
            '/img/studio-01.jpg',
        ],
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
        'goods': [
            'Heating', 'Wi-Fi', 'Fridge', 'Laptop friendly workspace',
            'Baby seat', 'Air conditioning', 'Washer', 'Towels',
            'Dishwasher', 'Kitchen', 'Washing machine', 'Breakfast',
            'Coffee machine'
        ],
        'host': {
            'isPro': true,
            'name': 'Angelina',
            'avatarUrl': '/img/avatar-angelina.jpg'
        },
        'isPremium': false,
        'isFavorite': true,
        'rating': 4.9,
        'bedrooms': 2,
        'maxAdults': 3
    },
    {
        'id': 'ccc06a0e-3f92-446d-9a68-cb64b5d38e2d',
        'title': 'Canal View Prinsengracht',
        'description': 'An independent House, strategically located between Rembrand Square and National Opera.',
        'type': 'Apartment',
        'price': 132,
        'images': [
            '/img/apartment-02.jpg',
            '/img/apartment-03.jpg',
            '/img/room.jpg',
        ],
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
        'goods': ['Wi-Fi', 'Heating', 'Kitchen', 'Cabel TV'],
        'host': {
            'isPro': false,
            'name': 'Angelina',
            'avatarUrl': '/img/avatar-angelina.jpg'
        },
        'isPremium': false,
        'isFavorite': true,
        'rating': 4.7,
        'bedrooms': 1,
        'maxAdults': 2
    },
    {
        'id': 'ddd06a0e-3f92-446d-9a68-cb64b5d38e2e',
        'title': 'Nice, cozy, warm big bed apartment',
        'description': 'The building is green and from 18th century.',
        'type': 'Apartment',
        'price': 180,
        'images': [
            '/img/apartment-03.jpg',
            '/img/studio-01.jpg',
            '/img/room.jpg',
        ],
        'city': {
            'name': 'Cologne',
            'location': {
                'latitude': 50.938361,
                'longitude': 6.959974,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 50.950361,
            'longitude': 6.961974,
            'zoom': 16
        },
        'goods': ['Wi-Fi', 'Kitchen', 'Fridge', 'Coffee machine'],
        'host': {
            'isPro': true,
            'name': 'Angelina',
            'avatarUrl': '/img/avatar-angelina.jpg'
        },
        'isPremium': true,
        'isFavorite': false,
        'rating': 5.0,
        'bedrooms': 2,
        'maxAdults': 3
    },
    {
        'id': 'eee06a0e-3f92-446d-9a68-cb64b5d38e2f',
        'title': 'Loft Studio in the Central Area',
        'description': 'Modern loft studio in central Amsterdam.',
        'type': 'Apartment',
        'price': 200,
        'images': [
            '/img/apartment-01.jpg',
            '/img/apartment-02.jpg',
        ],
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
            'longitude': 4.929309666406198,
            'zoom': 16
        },
        'goods': ['Wi-Fi', 'Kitchen', 'TV', 'Heating'],
        'host': {
            'isPro': false,
            'name': 'Michael',
            'avatarUrl': '/img/avatar-max.jpg'
        },
        'isPremium': false,
        'isFavorite': false,
        'rating': 4.5,
        'bedrooms': 1,
        'maxAdults': 2
    },
    {
        'id': 'fff06a0e-3f92-446d-9a68-cb64b5d38e2g',
        'title': 'Penthouse with Panoramic View',
        'description': 'Luxury penthouse with amazing city views.',
        'type': 'House',
        'price': 450,
        'images': [
            '/img/apartment-02.jpg',
            '/img/apartment-03.jpg',
        ],
        'city': {
            'name': 'Amsterdam',
            'location': {
                'latitude': 52.37454,
                'longitude': 4.897976,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 52.3809553943508,
            'longitude': 4.939309666406198,
            'zoom': 16
        },
        'goods': ['Wi-Fi', 'Kitchen', 'Pool', 'Gym', 'Parking'],
        'host': {
            'isPro': true,
            'name': 'John',
            'avatarUrl': '/img/avatar-angelina.jpg'
        },
        'isPremium': true,
        'isFavorite': true,
        'rating': 4.9,
        'bedrooms': 3,
        'maxAdults': 4
    }
];