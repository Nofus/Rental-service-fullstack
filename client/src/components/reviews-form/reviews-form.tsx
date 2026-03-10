import { useState, type FormEvent, Fragment } from 'react';
import { useAppDispatch } from '../../components/hooks';
import { postCommentAction } from '../../components/store/api-actions';

type ReviewsFormProps = {
  offerId: string;
}

function ReviewsForm({ offerId }: ReviewsFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    
    if (rating > 0 && comment.length >= 50 && comment.length <= 300) {
      setIsSubmitting(true);
      
      try {
        await dispatch(postCommentAction({ 
          offerId, 
          rating, 
          comment 
        })).unwrap();
        
        
        setRating(0);
        setComment('');
      } catch (error) {
        console.error('Failed to post comment:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const isSubmitDisabled = rating === 0 || comment.length < 50 || comment.length > 300 || isSubmitting;

  
  const ratings = [
    { value: 5, title: 'perfect' },
    { value: 4, title: 'good' },
    { value: 3, title: 'not bad' },
    { value: 2, title: 'badly' },
    { value: 1, title: 'terribly' }
  ];

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {ratings.map(({ value, title }) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={rating === value}
              onChange={() => setRating(value)}
              disabled={isSubmitting}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <img 
                className="form__star-image" 
                src={rating >= value ? "/img/star-active.svg" : "/img/star-white.svg"} 
                width="37" 
                height="33" 
                alt={`${value} stars`}
                style={{
                  
                  filter: rating >= value 
                    ? 'brightness(1.1) drop-shadow(0 0 2px rgba(255, 200, 0, 0.5))' 
                    : 'brightness(0.85) drop-shadow(0 0 1px rgba(0, 0, 0, 0.2))',
                  opacity: rating >= value ? 1 : 0.9,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  
                  if (rating < value) {
                    e.currentTarget.style.filter = 'brightness(0.95) drop-shadow(0 0 2px rgba(0, 0, 0, 0.3))';
                  }
                }}
                onMouseLeave={(e) => {
                  
                  if (rating < value) {
                    e.currentTarget.style.filter = 'brightness(0.85) drop-shadow(0 0 1px rgba(0, 0, 0, 0.2))';
                  }
                }}
              />
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={isSubmitting}
        minLength={50}
        maxLength={300}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay with at
          least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export { ReviewsForm };