import { useState, type FormEvent, Fragment } from 'react';

type ReviewsFormProps = {
  onSubmit: (rating: number, comment: string) => void;
}

function ReviewsForm({ onSubmit }: ReviewsFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    
    if (rating > 0 && comment.length >= 50 && comment.length <= 300) {
      setIsSubmitting(true);
      onSubmit(rating, comment);
      
      setRating(0);
      setComment('');
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled = rating === 0 || comment.length < 50 || comment.length > 300 || isSubmitting;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              checked={rating === star}
              onChange={() => setRating(star)}
              disabled={isSubmitting}
            />
            <label
            htmlFor={`${star}-stars`}
            className="reviews__rating-label form__rating-label"
            title={['perfect', 'good', 'not bad', 'badly', 'terribly'][5 - star]}>
                <img 
                className="form__star-image" 
                src={rating >= star ? "/img/star-active.svg" : "/img/star-white.svg"} 
                width="37" 
                height="33" 
                alt={`${star} stars`}
                style={{
                    filter: rating >= star ? 'brightness(1.1)' : 'brightness(0.8) opacity(0.7)'
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