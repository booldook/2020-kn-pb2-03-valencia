// 즉시실행함수 IIFE -Immediately Invoked Fucntion Expression
(function () {
	var a = 1;
	console.log(a);
	console.log("즉시실행");
})();

// 시험장
(function(){
	var n = 0;
	function ani() {
		if(n == 3) n = 0;
		else n++;
		$(".wrapper1 .slide-wrap").stop().animate({"left": -n*100 + "%"}, 500);
	}
	setInterval(ani, 3000);
})();


// 무한루프
(function(){
	var n = 1;
	function ani() {
		$(".wrapper2 .slide-wrap").stop().animate({"left": -n*100 + "%"}, 500, function(){
			if(n == 4) {
				$(this).css("left", 0);
				n = 1;
			}
			else {
				n++;
			}
		});
	}
	setInterval(ani, 3000);
})();


// 시험장 prev, next
(function(){
	var $slideWrap = $(".wrapper3 .slide-wrap");
	var $pagerSpan = $(".wrapper3 .pager-wrap span");
	var $btnPrev = $(".wrapper3 .btn-prev");
	var $btnNext = $(".wrapper3 .btn-next");
	var n = 0;

	$btnPrev.click(onPrev);
	$btnNext.click(onNext);

	function onPrev() {
		if(n > 0) n--;
		ani();
		//pagerToggle();
	}
	function onNext() {
		if(n < 3) n++;
		ani();
		//pagerToggle();
	}
	function ani() {
		$slideWrap.stop().animate({"left": -n*100 + "%"}, 500);
	}
	/*
	function pagerToggle(){
		$pagerSpan.show();
		if(n == 0) {
			$pagerSpan.eq(0).hide();
			$pagerSpan.eq(1).hide();
		}
		if(n == 3) {
			$pagerSpan.eq(1).hide();
			$pagerSpan.eq(2).hide();
		}
	}
	pagerToggle();
	*/
})();

// pager prev, next
(function(){
	var $slideWrap = $(".wrapper4 .slide-wrap");
	var $slide = $(".wrapper4 .slide");
	var $btnPrev = $(".wrapper4 .btn-prev");
	var $btnNext = $(".wrapper4 .btn-next");
	var n = 0;
	var last = $slide.length - 1;
	var speed = 500;

	$btnPrev.click(onPrev);
	$btnNext.click(onNext);

	function onPrev() {
		n--;
		ani();
		pagerToggle();
	}
	function onNext() {
		n++;
		ani();
		pagerToggle();
	}

	function ani() {
		$slideWrap.stop().animate({"left": -n*100 +"%"}, speed);
	}
	function pagerToggle() {
		if(n == 0) {
			$btnPrev.hide();
			$btnNext.show();
		}
		else if(n == last) {
			$btnPrev.show();
			$btnNext.hide();
		}
		else {
			$btnPrev.show();
			$btnNext.show();
		}
	}
})();

// wrapper5 생성, prev/next, interval
(function(){
	var slides = [
		{ id: 1, src: '../img/lx-1-0.jpg', title: '침대1' },
		{ id: 2, src: '../img/lx-1-1.jpg', title: '침대2' },
		{ id: 3, src: '../img/lx-1-2.jpg', title: '침대3' },
		{ id: 4, src: '../img/lx-2-0.jpg', title: '쇼파4' },
		{ id: 5, src: '../img/lx-2-1.jpg', title: '쇼파5' },
		{ id: 6, src: '../img/lx-2-2.jpg', title: '쇼파6' },
		{ id: 7, src: '../img/lx-3-0.jpg', title: '의자1' },
		{ id: 8, src: '../img/lx-3-1.jpg', title: '의자2' }
	]
})();