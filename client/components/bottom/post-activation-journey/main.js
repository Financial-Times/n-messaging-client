module.exports = (banner, done, guruResult) => {
const closeButton = banner.bannerElement.querySelector('.n-messaging-postActivationJourney--close');
closeButton.addEventListener('click', function closePopup () {
    banner.close();
});
  done();
}
