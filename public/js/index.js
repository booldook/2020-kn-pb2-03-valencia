/********************** 사전지식 *************************/
/* var interval = setInterval(function(){
	console.log("hi");
	clearInterval(interval);
}, 5000); */

// $("자식", "부모") == $("부모").find("자식")
// $(".modal-wrapper .btn-close", ".modal-wrapper").click(onModalHide);

/********************** 초기설정 *************************/
new WOW({ offset: 200, animateClass: 'wow-ani', mobile: false }).init();


var headerListIdx = 0;
var bannerInterval;

var winWid;
var winHei;

var prdIdx;					// 상품의 idx - 상품에 hover할때만 변한다.
var prdLastIdx;			// 상품의 이미지의 마지막 idx값(length-1) - 상품에 hover할때만 변한다.
var prdListIdx;			// 상품에서 이미지의 idx - Interval, pagerclick, 상품에 hover(1), leave(0)
var prdInterval;		// 상품의 Animation 간격

var brandTitleWidth;

/********************** 사용자함수 *************************/
function headerBanner() {
	$(".header-wrapper").find(".banner").css({"opacity": 0, "transform": "scale(1.3)"});
	$(".header-wrapper").find(".banner").eq(headerListIdx).css({"opacity": 1, "transform": "scale(1)"});
	$(".header-wrapper").find(".list").removeClass("active");
	$(".header-wrapper").find(".list").eq(headerListIdx).addClass("active");
}

function prdAni() {
	$(".prd-stage").eq(prdIdx).find(".pager").removeClass("active");
	$(".prd-stage").eq(prdIdx).find(".pager").eq(prdListIdx).addClass("active");
	
	$(".prd-stage").eq(prdIdx).find(".list").css({"position": "absolute"}).stop().animate({"opacity": 0}, 500, function(){
		$(this).css({"display": "none"});
	});
	$(".prd-stage").eq(prdIdx).find(".list").eq(prdListIdx).css({"position": "relative", "display": "block"}).stop().animate({"opacity": 1}, 500);
}

/********************** 이벤트콜백 *************************/
function onScroll() {
	var sct = $(this).scrollTop();
	var section = [];
	for(var i=0; i<$("section").length; i++) {
		section[i] = $("section").eq(i).offset().top;
	}
	// console.log(section[1], sct);

	// header-banner 프레임 애니메이션
	if(sct > 0) $(".banner-frame").css("border-width", "32px");
	else $(".banner-frame").css("border-width", 0);

	if(winWid > 991) {
		if(section[1] > sct) {
			$(".type-1 .title-wrapper").css("top", "16px");
			$(".type-1 .title-wrap").css({"top": "calc(50vh - 158px)", "bottom": "auto", "width": "100%", "position": "absolute"});
		}
		else if(section[1] <= sct && section[1] + $("section").eq(1).outerHeight() - $(window).outerHeight() > sct) {
			$(".type-1 .title-wrap").css({"position": "fixed", "width": brandTitleWidth + "px"});
		}
		else {
			$(".type-1 .title-wrapper").css("top", "-16px");
			$(".type-1 .title-wrap").css({"top": "auto", "bottom": "calc(50vh - 158px)", "width": "100%", "position": "absolute"});
		}
	}
	else {
		$(".type-1 .title-wrap").css({"position": "static"});
		$(".type-1 .title-wrap").css({"width": "100%"});
	}
}

function onResize() {
	winWid = $(this).outerWidth();
	winHei = $(this).outerHeight();
	brandTitleWidth = $(".type-1 .title-wrapper").width();
	$(this).trigger("scroll");
}

function onListOver() {
	headerListIdx = $(this).index();
	headerBanner();
	clearInterval(bannerInterval);
}

function onListLeave() {
	bannerInterval = setInterval(onBannerInterval, 8000);
}

function onBannerInterval() {
	if(headerListIdx == 3) headerListIdx = 0;
	else headerListIdx++;
	headerBanner();
}


function onPageEnter() {
	$(this).find(".sub-wrap").stop().slideDown(500);
	$(this).find(".sub-wrap").find("ul").each(function(){
		$(this).find("li").each(function(i){
			$(this).css("transition-delay", (0.25 + 0.05 * i) + "s").addClass("active")
		});
	});


	/*
	var $ul = $(this).find(".sub-wrap").find("ul");	// 2
	for(var i=0, $li; i<$ul.length; i++) {
		$li = $ul.eq(i).find("li");
		for(var j=0; j<$li.length; j++){
			$li.eq(j).css("transition-delay", (0.25 + 0.05 * j) + "s");
			$li.eq(j).addClass("active");
		}
	}
	*/
	/*
	$(this).find(".sub-wrap").find("ul").eq(0).find("li").eq(0).css("transition-delay", "0.5s");
	$(this).find(".sub-wrap").find("ul").eq(0).find("li").eq(1).css("transition-delay", "0.55s");
	$(this).find(".sub-wrap").find("ul").eq(0).find("li").eq(2).css("transition-delay", "0.6s");
	$(this).find(".sub-wrap").find("ul").eq(0).find("li").eq(3).css("transition-delay", "0.65s");
	$(this).find(".sub-wrap").find("ul").eq(0).find("li").eq(4).css("transition-delay", "0.7s");
	$(this).find(".sub-wrap").find("ul").eq(0).find("li").eq(5).css("transition-delay", "0.75s");
	$(this).find(".sub-wrap").find("ul").eq(0).find("li").eq(6).css("transition-delay", "0.8s");
	$(this).find(".sub-wrap").find("ul").eq(0).find("li").eq(7).css("transition-delay", "0.85s");

	$(this).find(".sub-wrap").find("ul").eq(1).find("li").eq(0).css("transition-delay", "0.5s");
	$(this).find(".sub-wrap").find("ul").eq(1).find("li").eq(1).css("transition-delay", "0.55s");
	$(this).find(".sub-wrap").find("ul").eq(1).find("li").eq(2).css("transition-delay", "0.6s");
	$(this).find(".sub-wrap").find("ul").eq(1).find("li").eq(3).css("transition-delay", "0.65s");
	$(this).find(".sub-wrap").find("ul").eq(1).find("li").eq(4).css("transition-delay", "0.7s");
	$(this).find(".sub-wrap").find("ul").eq(1).find("li").eq(5).css("transition-delay", "0.75s");
	$(this).find(".sub-wrap").find("ul").eq(1).find("li").eq(6).css("transition-delay", "0.8s");
	*/

	/* setTimeout(slideCb, 250, this);
	function slideCb(my){
		$(my).find("ul").each(function() {
			$(this).find("li").each(function(i){
				$(this).css("transition-delay", i * 0.05 + "s").addClass("active");
			});
		});
	} */
}

function onPageLeave() {
	$(this).find(".sub-wrap").stop().slideUp(500, slideCb);
	function slideCb() {
		$(this).find("li").removeClass("active");
	}
}

function onPrdOver() {
	prdIdx = $(this).index();
	prdLastIdx = $(this).find(".list").length - 1;
	prdListIdx = 1;
	prdInterval = setInterval(onPrdInterval, 4000);
	prdAni();
}

function onPrdLeave() {
	prdListIdx = 0;
	clearInterval(prdInterval);
	prdAni();
}

function onPagerClick() {
	prdListIdx = $(this).index();
	prdAni();
	clearInterval(prdInterval);
	prdInterval = setInterval(onPrdInterval, 4000);
}

function onPrdInterval(){
	if(prdListIdx == prdLastIdx) prdListIdx = 0;
	else prdListIdx++;
	prdAni();
}

function onWishModalShow(e){
	e.preventDefault();
	$(".modal-wish").css("display", "flex");
	$(this).find("i").removeClass("far").addClass("fa");
}

function onModalHide() {
	$(".modal-wrapper").css("display", "none");
}

/********************** 이벤트등록 *************************/
$(window).scroll(onScroll);
$(window).resize(onResize).trigger("resize");
$(".header-wrapper").find(".list").hover(onListOver, onListLeave);
bannerInterval = setInterval(onBannerInterval, 8000);

$(".header-wrapper .navi-page").find(".sub-wrap").slideUp(0);
$(".header-wrapper .navi-page").mouseenter(onPageEnter);
$(".header-wrapper .navi-page").mouseleave(onPageLeave);

$(".prd-stage").hover(onPrdOver, onPrdLeave);
$(".prd-stage .pager").click(onPagerClick);

$(".type-1 .btn-wish").click(onWishModalShow);
$(".modal-wrapper .btn-close, .modal-wrapper").click(onModalHide);
$(".modal-wrap").click(function(e) { e.stopPropagation() });

/********************** 슬라이드 *************************/
(function(){
	var $stage = $(".type-slide .stage");
	var $wrapper = $(".type-slide .slide-wrapper");
	var $slides = $(".type-slide .slide");
	var $titleLt = $(".type-slide .title-lt"); 
	var $titles = $(".type-slide .title-lt .title-wrap");
	var $pagerWrap = $(".type-slide .pager-wrap");
	var bg = ['../img/slide-0.jpg','../img/slide-1.jpg','../img/slide-2.jpg','../img/slide-3.jpg'];
	var idx = 0;
	var lastIdx = $slides.length - 1;
	var interval;
	init();
	
	function init() {
		for(var i=0; i<$slides.length; i++) {
			$pagerWrap.append('<div class="pager">·</div>');
		}
		$pagerWrap.find(".pager").click(onClick);
		interval = setInterval(onInterval, 3000);
		$stage.mouseenter(onEnter).mouseleave(onLeave);
		slideInit();
	}

	function slideInit() {
		$wrapper.empty();
		$(".type-slide .title-lt .title-wrap").remove();
		$($($slides[idx]).clone()).appendTo($wrapper).css("background-image", "url("+bg[idx]+")");
		$($($titles[idx]).clone()).prependTo($titleLt);
		$(".type-slide .title-lt .title-wrap").css("opacity");
		$(".type-slide .title-lt .title-wrap").css("transform");
		$(".type-slide .title-lt .title-wrap").css({"opacity": 1, "transform": "translateX(0)"});
		$pagerWrap.find(".pager").removeClass("active");
		$pagerWrap.find(".pager").eq(idx).addClass("active");
	}

	function onEnter() {
		clearInterval(interval);
	}

	function onLeave() {
		interval = setInterval(onInterval, 3000);
	}

	function onClick() {
		idx = $(this).index();
		ani();
	}

	function onInterval() {
		idx = (idx == lastIdx) ? 0 : idx + 1;
		ani();
	}

	function ani() {
		$(".type-slide .title-lt .title-wrap").stop().animate({"opacity": 0}, 300);
		$($($slides[idx]).clone())
		.appendTo($wrapper)
		.css("background-image", "url("+bg[idx]+")")
		.stop()
		.animate({"opacity": 1}, 500, slideInit);
	}

})();
 
