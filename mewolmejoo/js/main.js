//메뉴
const menuBtn = $('header .menuBtn');
const menuBg = $('header .menuBg');
const menu = $('header nav');
menuBtn.click(function(){
    menuBtn.toggleClass('openBtn');
    menu.toggleClass('openNav');
    menuBg.toggleClass('openBg');
});
//메인 첫페이지 배너
const tabContent = $('.tab-content-wrap>.tab-content');
const tabTit = $('.tab-content-wrap .tab-tit>li');
const tabBg = $('.tab-bg ul li');

tabContent.hide();
tabContent.first().show();
tabTit.first().addClass('on');
tabBg.first().addClass('op');

tabTit.click(function(){
    tabTit.removeClass('on');
    $(this).addClass('on');
    tabContent.hide();
    tabContent.eq($(this).index()).show();
    tabBg.removeClass('op');
    tabBg.eq($(this).index()).addClass('op');
});

function tabSlideFn(){
    for (i = 0; i < slideIndex; i++) {
        tabTit[i].click();
    }
    slideIndex++;
    if(slideIndex > tabTit.length){
        slideIndex= 0;
    }
}
var slideIndex = 0;
tabSlideFn();
setInterval("tabSlideFn()", 4000);


$(window).scroll(function() {
    const topOfWindow = $(window).scrollTop();

    $('.sticky-container').each(function(){
    const imagePos = $(this).offset().top;
        if (imagePos < topOfWindow+400) {
            $(this).find('.object').addClass("slideUp");
        }
    });
    const brandPos = $('.brand-content-wrap').offset().top;
    if (brandPos < topOfWindow+400){
        $('.count-num').each(function() { 
            var $this = $(this),
                countTo = $this.attr('data-count');
                        
            $({ countNum: $this.text()}).animate({
                countNum: countTo 
            },
            {
                duration: 400,
                easing:'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() { 
                    $this.text(this.countNum);
                }
            });  
        });
    }
});
// 메인페이지 양조장브랜드content
function rollingBrand(){
    // 롤링 배너 복제본 생성
    let roller = document.querySelector('.rolling-list');
    roller.id = 'roller1'; // 아이디 부여

    let clone = roller.cloneNode(true)
    // cloneNode : 노드 복제. 기본값은 false. 자식 노드까지 복제를 원하면 true 사용
    clone.id = 'roller2';
    document.querySelector('.rolling-wrap').appendChild(clone); // wrap 하위 자식으로 부착

    document.querySelector('#roller1').style.left = '0px';
    document.querySelector('#roller2').style.left = document.querySelector('.rolling-list ul').offsetWidth + 'px';
    // offsetWidth : 요소의 크기 확인(margin을 제외한 padding값, border값까지 계산한 값)

    roller.classList.add('original');
    clone.classList.add('clone');
}
rollingBrand();

//메인페이지 리뷰content
function reviewLeft(){
    var cnt = setId = 0;
    autoplayFn();

    function autoplayFn() {
        setId = setInterval(nextCountFn, 4000);
    };
    function nextCountFn() {
        cnt++;
        reviewSlideFn();
    };
    function reviewSlideFn() {
        $(".review-content>ul").animate({
            left: (-100 * cnt) + "%"
        }, 300, function() {
            if (cnt > 3) {
                cnt = 0;
            }
            $(".review-content>ul").animate({
                left: (-100 * cnt) + "%"
            }, 0)
        });
    }
}
reviewLeft();

//가로스크롤content
function horizonScroll (){
    init();
    var g_containerInViewport;
    function init(){
        setStickyContainersSize();
        bindEvents();
    }
    function bindEvents(){
        window.addEventListener("wheel", wheelHandler);
    }
    function setStickyContainersSize(){
        document.querySelectorAll('.sticky-container').forEach(function(container){
            const stContainerHeight = container.querySelector('.sticky-item-wrap').scrollWidth;
            container.setAttribute('style', 'height: ' + stContainerHeight + 'px');
        });
    }
    function isElementInViewport (el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
    }
    function wheelHandler(evt){
        const containerInViewPort = Array.from(document.querySelectorAll('.sticky-container')).filter(function(container){
            return isElementInViewport(container);
        })[0];
        if(!containerInViewPort){
            return;
        }
        var isPlaceHolderBelowTop = containerInViewPort.offsetTop < document.documentElement.scrollTop;
        var isPlaceHolderBelowBottom = containerInViewPort.offsetTop + containerInViewPort.offsetHeight > document.documentElement.scrollTop;
        let g_canScrollHorizontally = isPlaceHolderBelowTop && isPlaceHolderBelowBottom;
        if(g_canScrollHorizontally){
            containerInViewPort.querySelector('.sticky-item-wrap').scrollLeft += evt.deltaY;
        }
    }
}
horizonScroll();