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
			$(".brand-wrapper .title-wrapper").css("top", "16px");
			$(".brand-wrapper .title-wrap").css({"top": "calc(50vh - 158px)", "bottom": "auto", "width": "100%", "position": "absolute"});
		}
		else if(section[1] <= sct && section[1] + $("section").eq(1).outerHeight() - $(window).outerHeight() > sct) {
			$(".brand-wrapper .title-wrap").css({"position": "fixed", "width": brandTitleWidth + "px"});
		}
		else {
			$(".brand-wrapper .title-wrapper").css("top", "-16px");
			$(".brand-wrapper .title-wrap").css({"top": "auto", "bottom": "calc(50vh - 158px)", "width": "100%", "position": "absolute"});
		}
	}
	else {
		$(".brand-wrapper .title-wrap").css({"position": "static"});
		$(".brand-wrapper .title-wrap").css({"width": "100%"});
	}
}

function onResize() {
	winWid = $(this).outerWidth();
	winHei = $(this).outerHeight();
	brandTitleWidth = $(".brand-wrapper .title-wrapper").width();
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

$(".prd-stage").hover(onPrdOver, onPrdLeave);
$(".prd-stage .pager").click(onPagerClick);

$(".brand-wrapper .btn-wish").click(onWishModalShow);
$(".modal-wrapper .btn-close, .modal-wrapper").click(onModalHide);
$(".modal-wrap").click(function(e) { e.stopPropagation() });

 
