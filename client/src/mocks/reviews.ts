import type { Review } from '../types/review';

export const reviews: Review[] = [
  {
    'id': '463623e8-eecc-42a2-b2fc-797a29965230',
    'comment': 'The room was spacious and clean. The pool looked nothing like the photos',
    'date': '2025-06-29T21:00:00.4652',
    'rating': 5,
    'user': {
      'name': 'Max',
      'avatarUrl': '/img/avatar-max.jpg',
      'isPro': true
    }
  },
  {
    'id': '573623e8-eecc-42a2-b2fc-797a29965231',
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'date': '2025-04-24T21:00:00.4652',
    'rating': 4,
    'user': {
      'name': 'Robert',
      'avatarUrl': '/img/avatar-robert.jpg',
      'isPro': false
    }
  }
];