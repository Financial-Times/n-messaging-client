module.exports = function customSetup (banner, done) {

	// HACK: Adds a line of text below the usa banner button

	if (banner.innerElement.querySelector('#usa')) {
		const extraLine = document.createElement('p');
		extraLine.innerHTML = '*Available for new customers only';

		banner.innerElement.appendChild(extraLine);
	}

	done();
};
