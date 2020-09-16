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
		{ id: 0, src: '../img/lx-1-0.jpg', title: '침대1' },
		{ id: 1, src: '../img/lx-1-1.jpg', title: '침대2' },
		{ id: 2, src: '../img/lx-1-2.jpg', title: '침대3' },
		{ id: 3, src: '../img/lx-2-0.jpg', title: '쇼파4' },
		{ id: 4, src: '../img/lx-2-1.jpg', title: '쇼파5' },
		{ id: 5, src: '../img/lx-2-2.jpg', title: '쇼파6' },
		{ id: 6, src: '../img/lx-3-0.jpg', title: '의자1' },
		{ id: 7, src: '../img/lx-3-1.jpg', title: '의자2' },
		{ id: 8, src: '../img/lx-3-2.jpg', title: '의자3' }
	];

	var $slideStage = $(".wrapper5 .stage");
	var $slideWrap = $(".wrapper5 .slide-wrap");
	var $btnPrev = $(".wrapper5 .btn-prev");
	var $btnNext = $(".wrapper5 .btn-next");
	var $pagerWrap = $(".wrapper5 .pager-wrap");
	var $pager;				// 생성된 $(".wrapper5 .pager")
	var $slide;				// 화면에 보여지는 $(".slide") : 항상 3개만 존재
	var $slides = [];	// $(".slide")들 모두를 담아놓는 배열(필요할때 복사해서 가져다 쓴다)
	var idx = 0;											// 현재 화면에 보이는 slide의 index
	var target;												// 움직일 목표값 (-100%, 100%)
	var lastIdx = slides.length - 1;	// $(".slide")들 중에 마지막 index
	var interval;											// setInterval을 담아놓는 변수

	function init() {
		var html, i;
		for(i in slides) {
			html = '<div class="slide">';
			html += '<img class="w-100" src="'+slides[i].src+'">';
			html += '<h1>'+i+'</h1>';
			html += '</div>';
			$slides[i] = $(html);
			html = '<span class="pager">●</span>';
			$pagerWrap.append(html);
		}
		$pager = $pagerWrap.find(".pager");
		$pager.click(onPagerClick).eq(idx).addClass("active");
		slideInit();
		interval = setInterval(onNext, 3000);
	}

	function slideInit() {
		$slideWrap.css("left", 0);
		//가운데(나)
		$slideWrap.html($slides[idx].clone());
		//좌측(prev)
		if(idx == 0) $slideWrap.prepend($slides[lastIdx].clone());
		else $slideWrap.prepend($slides[idx - 1].clone());
		//우측(next)
		if(idx == lastIdx) $slideWrap.append($slides[0].clone());
		else $slideWrap.append($slides[idx + 1].clone());
		$slide = $slideWrap.find(".slide");
	}

	$btnPrev.click(onPrev);
	$btnNext.click(onNext);
	$slideStage.mouseover(onHover);
	$slideStage.mouseleave(onLeave);

	function onHover() {
		clearInterval(interval);
	}

	function onLeave() {
		interval = setInterval(onNext, 3000);
	}

	function onPrev() {
		target = '100%';
		idx = (idx == 0) ? lastIdx : idx - 1;
		ani();
	}

	function onNext() {
		target = '-100%';
		idx = (idx == lastIdx) ? 0 : idx + 1;
		ani();
	}

	function onPagerClick() {
		// 클릭된 페이저에 따라 idx, slide를 바꾼다.
		var oldIdx = idx;
		idx = $(this).index();
		if(oldIdx < idx) { //next
			$slide.eq(2).remove();
			$slideWrap.append($slides[idx].clone());
			target = '-100%';
			ani();
		}
		if(oldIdx > idx) { //prev
			$slide.eq(0).remove();
			$slideWrap.prepend($slides[idx].clone());
			target = '100%';
			ani();
		}
	}

	function ani() {
		$pager.removeClass("active").eq(idx).addClass("active");
		$slideWrap.stop().animate({"left": target}, 500, slideInit);
	}
	init();
})();


// wrapper6 생성, prev/next, interval
(function(){
	var slides = [
		{ id: 0, src: '../img/slide-0.jpg', title: '침대1' },
		{ id: 1, src: '../img/slide-1.jpg', title: '침대2' },
		{ id: 2, src: '../img/slide-2.jpg', title: '침대3' },
		{ id: 3, src: '../img/slide-3.jpg', title: '쇼파4' }
	];

	var $slideStage = $(".wrapper6 .stage");
	var $slideWrap = $(".wrapper6 .slide-wrap");
	var $btnPrev = $(".wrapper6 .btn-prev");
	var $btnNext = $(".wrapper6 .btn-next");
	var $pagerWrap = $(".wrapper6 .pager-wrap");
	var $pager;				// 생성된 $(".wrapper6 .pager")
	var $slide;				// 화면에 보여지는 $(".slide") : 항상 3개만 존재
	var $slides = [];	// $(".slide")들 모두를 담아놓는 배열(필요할때 복사해서 가져다 쓴다)
	var idx = 0;											// 현재 화면에 보이는 slide의 index
	var target;												// 움직일 목표값 (-100%, 100%)
	var lastIdx = slides.length - 1;	// $(".slide")들 중에 마지막 index
	var interval;											// setInterval을 담아놓는 변수

	function init() {
		var html, i;
		for(i in slides) {
			html = '<div class="slide">';
			html += '<img class="w-100" src="'+slides[i].src+'">';
			html += '<h1>'+i+'</h1>';
			html += '</div>';
			$slides[i] = $(html);
			html = '<span class="pager">●</span>';
			$pagerWrap.append(html);
		}
		$pager = $pagerWrap.find(".pager");
		$pager.click(onPagerClick).eq(idx).addClass("active");
		slideInit();
		interval = setInterval(onNext, 3000);
	}

	function slideInit() {
		$slideWrap.html($slides[idx].clone());
	}

	$btnPrev.click(onPrev);
	$btnNext.click(onNext);
	$slideStage.mouseover(onHover);
	$slideStage.mouseleave(onLeave);

	function onHover() {
		clearInterval(interval);
	}

	function onLeave() {
		interval = setInterval(onNext, 3000);
	}

	function onPrev() {
		idx = (idx == 0) ? lastIdx : idx - 1;
		ani();
	}

	function onNext() {
		idx = (idx == lastIdx) ? 0 : idx + 1;
		ani();
	}

	function onPagerClick() {
		idx = $(this).index();
		ani();
	}

	function ani() {
		$pager.removeClass("active").eq(idx).addClass("active");
		$($slides[idx].clone()).appendTo($slideWrap).stop().animate({"opacity": 1}, 500, slideInit);
	}
	init();
})();