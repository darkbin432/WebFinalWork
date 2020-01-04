/**
 * 页面懒加载
 * <img src = "" data-src = "url" ></img>
 * */

start();

$(window).on('scroll', function () {
    start()
});

function start() {
    $('img').not('[data-isLoaded]').each(function () {
        var $node = $(this);
        if (isShow($node)) {
            loadImg($node)
        }
    })
}


function isShow($node) {
    return $node.offset().top <= $(window).height() + $(window).scrollTop()
}

function loadImg($img) {
    $img.attr('src', $img.attr('data-src'));
    $img.attr('data-isLoaded', 1)
}