const LOW_RATING = 0
const HIGH_RATING = 100
const LOW_COLOR = 0
const HIGH_COLOR = 150

export default class RatingColor {
		constructor (fromSelector, toSelector) {
				const from = document.querySelector(fromSelector);
				const to = document.querySelector(toSelector);

				to.textContent = from.value;
				to.style.backgroundColor = 'hsl(' + this.caffeineRatingToHSL(from.value) + ', 100%, 50%)';

				from.addEventListener('input', e => {
						to.textContent = from.value;
						to.style.backgroundColor = 'hsl(' + this.caffeineRatingToHSL(from.value) + ', 100%, 50%)';
				})
		}

		caffeineRatingToHSL (rating) {
				return HIGH_COLOR - (((rating - LOW_RATING) / (HIGH_RATING - LOW_RATING)) * (HIGH_COLOR - LOW_COLOR))
		}
}
