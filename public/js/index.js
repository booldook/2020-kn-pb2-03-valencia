/********************** 사전지식 *************************/
/* var interval = setInterval(function(){
	console.log("hi");
	clearInterval(interval);
}, 5000); */

// $("자식", "부모") == $("부모").find("자식")
// $(".modal-wrapper .btn-close", ".modal-wrapper").click(onModalHide);

/********************** 초기설정 *************************/
new WOW({ offset: 200, animateClass: 'wow-ani' }).init();


var headerListIdx = 0;
var bannerInterval;

var prdListIdx = [];
var prdInterval = [];

var brandTitleWidth;

/********************** 사용자함수 *************************/
function headerBanner() {
	$(".header-wrapper").find(".banner").css({"opacity": 0, "transform": "scale(1.3)"});
	$(".header-wrapper").find(".banner").eq(headerListIdx).css({"opacity": 1, "transform": "scale(1)"});
	$(".header-wrapper").find(".list").removeClass("active");
	$(".header-wrapper").find(".list").eq(headerListIdx).addClass("active");
}

function prdAni(idx, n) {
	$(".prd-stage").eq(n).find(".pager").removeClass("active");
	$(".prd-stage").eq(n).find(".pager").eq(idx).addClass("active");
	
	$(".prd-stage").eq(n).find(".list")
	.css({"position": "absolute"})
	.stop().animate({"opacity": 0}, 500, function(){
		$(this).css({"display": "none"});
	});
	$(".prd-stage").eq(n).find(".list").eq(idx)
	.css({"position": "relative", "display": "block", "z-index": 2})
	.stop().animate({"opacity": 1}, 500);
}

/********************** 이벤트콜백 *************************/
function onScroll() {
	var sct = $(this).scrollTop();
	var section = [];
	for(var i=0; i<$("section").length; i++) {
		section[i] = $("section").eq(i).offset().top;
	}
	// console.log(section[1], sct);
	if(sct > 10) $(".banner-frame").css("border-width", "32px");
	else $(".banner-frame").css("border-width", 0);

	
	if(section[1] > sct) {
		$(".brand-wrapper .title-wrap").css({"top": "calc(50vh - 158px)", "bottom": "auto", "width": "100%", "position": "absolute"});
	}
	else if(section[1] <= sct && section[1] + $("section").eq(1).outerHeight() - $(window).outerHeight() > sct) {
		$(".brand-wrapper .title-wrap").css({"position": "fixed", "width": brandTitleWidth + "px"});
	}
	else {
		$(".brand-wrapper .title-wrap").css({"top": "auto", "bottom": "calc(50vh - 158px)", "width": "100%", "position": "absolute"});
	}
}

function onResize() {
	brandTitleWidth = $(".brand-wrapper .title-wrapper").width();
	$(".brand-wrapper .title-wrap").css({"width": brandTitleWidth + "px"});
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
	var n = $(this).index();
	prdListIdx[n] = 1;
	prdInterval[n] = setInterval(onPrdInterval, 4000, n);
	prdAni(prdListIdx[n], n);
}

function onPrdLeave() {
	var n = $(this).index();
	prdListIdx[n] = 0;
	clearInterval(prdInterval[n]);
	prdAni(prdListIdx[n], n);
}

function onPagerClick() {
	prdListIdx = $(this).index();
	prdAni(prdListIdx);
	clearInterval(prdInterval);
	prdInterval = setInterval(onPrdInterval, 4000);
}

function onPrdInterval(n){
	if(prdListIdx[n] == 2) prdListIdx[n] = 0;
	else prdListIdx[n]++;
	prdAni(prdListIdx[n], n);
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

 
