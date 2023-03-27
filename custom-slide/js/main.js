$(document).ready(function () {
    var $header = $('.header'),
        $footer = $('.footer'),
        $navBtn = $(".nav-btn a"),
        $service = $('.main-service'),
        $html = $('html, body'),
        $lolling = $('.main-lolling');

    // 메인 클래스 적용(임시) 개발에서 적용 요망
    // 현제 화면 오픈시 class 적용 전 화면이 보이는 문제 발생
    $header.addClass('main-style');
    $footer.addClass('main-style');

    // 메인 스크립트 - 서비스 영역
    var serviceClose = function (el) {
        $lolling.removeClass('active');
        if (el.find('input').length >= 1) {
            if (el.find('input').val() == '') {
                el.stop(true, false).animate({
                    height: 105
                }, 300).removeClass('active');
            }
        } else {
            el.stop(true, false).animate({
                height: 105
            }, 300).removeClass('active');
        }
    }
    var serviceOpen = function (el) {
        el.addClass('active');
        $lolling.addClass('active');
        if (el.hasClass("mychart")) {
            el.stop(true, false).animate({
                height: 315
            }, 300);
        } else {
            el.stop(true, false).animate({
                height: 200
            }, 300);
        }
    }
    $service.children('div').on('mouseenter focus', function () {
        if ($(this).prev('div').length >= 1) {
            serviceClose($(this).prev('div'));
        }
        serviceOpen($(this));

    });
    $service.children('div').on('mouseleave', function () {
        serviceClose($(this));
    });
    $service.find('button').last().on('blur', function () {
        serviceClose($(this).parents('.mychart'));
    });

    // 메인 상단 슬라이드 적용
   
    $('.section .main-bg').bxSlider({
        auto: true,
        autoControls: false,
        onSlideAfter: function (currentSlideNumber, totalSlideQty, currentSlideHtmlObject) {
            $('.main-con .main-copy ul li').eq(currentSlideHtmlObject).show().siblings('li').hide();
        }
    });

    
});
window.onload = function () {
    $("html,body").scrollTop(0);
    $(".section").eq(0).addClass("current");
    $(".section").each(function () {
        // 개별적으로 Wheel 이벤트 적용
        
    });


    $(".sns-wrapper").on("mousewheel DOMMouseScroll", function (e) {
        var timer;
        e.preventDefault();
        var delta = 0;
        var direction;

        
        if (direction === "next") {
            if ($(".section.current").next(".section").length === 0) {
                moveTop = $(".main-wrap").outerHeight(true);
            } else {
                moveTop = $(".section.current").next(".section").offset().top
                $(".section.current").next(".section").addClass("current").siblings(".section").removeClass("current");
                if ($(".section.current").next(".section").hasClass("now")) {
                    $(".sns-wrapper").addClass("white");
                } else {
                    $(".sns-wrapper").removeClass("white");
                }
                $(".section.current").next(".section").addClass("current").siblings(".section").removeClass("current");
            }
        } else {
            if (moveTop = $(".section.current").prev(".section").length === 0) {
                moveTop = 0;
            } else {
                moveTop = $(".section.current").prev(".section").offset().top
                $(".section.current").prev(".section").addClass("current").siblings(".section").removeClass("current");
                if ($(".section.current").prev(".section").hasClass("healthy")) {
                    $(".sns-wrapper").addClass("white");
                } else {
                    $(".sns-wrapper").removeClass("white");
                }
            }
        }

        // 화면 이동 0.8초(800)
        $("html,body").stop().animate({
            scrollTop: moveTop + 'px'
        }, {
            duration: 800,
            complete: function () {}
        });
    })

}
