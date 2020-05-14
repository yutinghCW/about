$(function() {
    var width = $(window).width();
    // 漢堡
    $('body').append('<div class="black"></div><div class="opacity"></div>');
    $('.hamburger').click(function() {
        $('body').addClass('opened');
        $('nav').addClass('opened');
        $('.black').addClass('opened nav');
    });
    $('.black').click(function() {
        if ($(this).hasClass("nav")) {
            $('body').removeClass('opened');
            $('nav').removeClass('opened');
            $('.black').removeClass('opened nav');
        }
    });
    if (width < 1024) {
        $('.channel__title').click(function() {
            $(this).children('i.icon').toggleClass('active');
            $(this).siblings('.channel__option').slideToggle();
            $(this).parent().siblings('.channel__item').children('.channel__title').children('i.icon').removeClass('active');
            $(this).parent().siblings('.channel__item').children('.channel__option').slideUp();
        })
    }
    // tab__nav寬度設為等分
    function tabNavWidth(width) {
        $(".tab").each(function() {
            var tabLength = $(this).children(".tab__nav").children("ul").children("li").length,
                tabLiWidth = $(this).width() / tabLength;
            $(this).children(".tab__nav").not(".tab__nav--inline").children("ul").children("li").css("width", tabLiWidth);
        });
    }
    tabNavWidth(width);

    $('.slider--1col').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<div class="slider__navi slider__navi--prev"><a class="icon-btn icon-btn-center"><i class="icon icon--white icon-arrow-left"></i></a></div>',
        nextArrow: '<div class="slider__navi slider__navi--next"><a class="icon-btn icon-btn-center"><i class="icon icon--white icon-arrow-right"></i></a></div>',
        responsive: [{
            breakpoint: 1024,
            settings: {
                arrows: false
            }
        }]
    });
    $('.slider--3col').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<div class="slider__navi slider__navi--prev"><a class="icon-btn icon-btn-center"><i class="icon icon--white icon-arrow-left"></i></a></div>',
        nextArrow: '<div class="slider__navi slider__navi--next"><a class="icon-btn icon-btn-center"><i class="icon icon--white icon-arrow-right"></i></a></div>',
        responsive: [{
            breakpoint: 1024,
            settings: {
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                centerMode: true,
                arrows: false
            }
        }]
    });
    $('.slider--4col').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: '<div class="slider__navi slider__navi--prev"><a class="icon-btn icon-btn-center"><i class="icon icon--white icon-arrow-left"></i></a></div>',
        nextArrow: '<div class="slider__navi slider__navi--next"><a class="icon-btn icon-btn-center"><i class="icon icon--white icon-arrow-right"></i></a></div>',
        responsive: [{
            breakpoint: 1024,
            settings: {
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                centerMode: true,
                arrows: false
            }
        }]
    });
    $(window).load(function() {
        var headerHeight = $('header').outerHeight();
        $('a.scroll--smooth').click(function() {
            if (window.location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && window.location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 65
                    }, 1000);
                    return false;
                }
            }
        });
        $('nav').css({
            'top': (headerHeight / 2)
        });
        // tabs
        $(".tab__nav > ul li").click(function() {
            var tabsIndex = $(this).index();
            if (!$(this).parent().parent().parent().parent(".group").hasClass("group--disabled")) {
                $(this).addClass('active').siblings('.active').removeClass('active');
                $(this).parent().parent().siblings('.tab__content').children('.tab__content__pane').removeClass('active');
                $(this).parent().parent().siblings('.tab__content').children('.tab__content__pane').eq(tabsIndex).addClass('active');
                $('.slider').slick("slickSetOption", "draggable", true, true);
            }
        });
        $.get("https://spreadsheets.google.com/feeds/list/1S8HLsPB3mLdxPfvIpW6oVCXAsBk5VgXIeZdtS9p3EBA/1/public/values?alt=json", function(data) {
            var rows = data['feed']['entry'].reverse(),
                lastest = '';
            for (var i = 0; i < 5; i++) {
                lastest += '<li><a href="' + rows[i]['gsx$link']['$t'] + '" target="_blank">';
                lastest += '<span class="lastest__time">' + rows[i]['gsx$release']['$t'] + '</span>';
                lastest += '<span class="lastest__title">' + rows[i]['gsx$title']['$t'] + '</span></a></li>'
            }
            $('.lastest__group').html(lastest);
        });
        $.get("https://spreadsheets.google.com/feeds/list/1S8HLsPB3mLdxPfvIpW6oVCXAsBk5VgXIeZdtS9p3EBA/2/public/values?alt=json", function(data) {
            var rows = data['feed']['entry'],
                salesperson = '';
            $('.sales__group').addClass('sales__group--' + rows.length + 'col');
            for (var i = 0; i < rows.length; i++) {
                salesperson += '<div class="sales__item"><div class="sales__img my10">';
                if (rows[i]['gsx$gender']['$t'] == 'Male') {
                    salesperson += '<img src="assets/images/8-3-1.svg"';
                } else {
                    salesperson += '<img src="assets/images/8-3-2.svg"';
                }
                salesperson += ' alt="' + rows[i]['gsx$name']['$t'] + '"></div>';
                salesperson += '<div class="sales__text"><h6 class="my0">' + rows[i]['gsx$name']['$t'] + '</h6>';
                salesperson += '<p class="my0">電話：<a class="btn--text" href="tel:+886225078627;' + rows[i]['gsx$ext']['$t'] + '">(02)2507-8627 ext.' + rows[i]['gsx$ext']['$t'] + '</a><br>';
                salesperson += 'E-mail：<a class="btn--text" href="mailto:' + rows[i]['gsx$username']['$t'] + '@cw.com.tw">' + rows[i]['gsx$username']['$t'] + '@cw.com.tw</a></p></div></div>';
            }
            $('.sales__group').html(salesperson);
        });
    });
    $(window).resize(function() {
        var width = $(window).width(),
            headerHeight = $('header').outerHeight();
        tabNavWidth(width);
    });
});