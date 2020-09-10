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

var prdListIdx = 0;
var prdInterval;

/********************** 사용자함수 *************************/
function headerBanner() {
	$(".header-wrapper").find(".banner").css({"opacity": 0, "transform": "scale(1.3)"});
	$(".header-wrapper").find(".banner").eq(headerListIdx).css({"opacity": 1, "transform": "scale(1)"});
	$(".header-wrapper").find(".list").removeClass("active");
	$(".header-wrapper").find(".list").eq(headerListIdx).addClass("active");
}

function prdAni(idx) {
	$(".prd-stage").find(".pager").removeClass("active");
	$(".prd-stage").find(".pager").eq(idx).addClass("active");
	
	$(".prd-stage").find(".list")
	.css({"position": "absolute"})
	.stop().animate({"opacity": 0}, 500, function(){
		$(this).css({"display": "none"});
	});
	$(".prd-stage").find(".list").eq(idx)
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

	if(section[1] <= sct && section[1] + $("section").eq(1).outerHeight() - $(window).outerHeight() > sct) {
		$(".brand-wrapper .title-wrap").css("position", "fixed");
	}
	else {
		$(".brand-wrapper .title-wrap").css("position", "absolute");
	}
}

function onResize() {
	
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
	prdListIdx = 1;
	prdInterval = setInterval(onPrdInterval, 4000);
	prdAni(prdListIdx);
}

function onPrdLeave() {
	prdListIdx = 0;
	clearInterval(prdInterval);
	prdAni(prdListIdx);
}

function onPagerClick() {
	prdListIdx = $(this).index();
	prdAni(prdListIdx);
	clearInterval(prdInterval);
	prdInterval = setInterval(onPrdInterval, 4000);
}

function onPrdInterval(){
	if(prdListIdx == 2) prdListIdx = 0;
	else prdListIdx++;
	prdAni(prdListIdx);
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

 
