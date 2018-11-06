$(function () {
    $('.chat-launcher').on('click', function () {
        $('.chat-launcher').toggleClass('active');
        $('.chat-wrapper').toggleClass('is-open');
    });
});