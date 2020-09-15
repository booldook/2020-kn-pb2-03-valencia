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
	var n = 0;
	$(".wrapper3 .btn-prev").click(onPrev);
	$(".wrapper3 .btn-next").click(onNext);
	function onPrev() {
		if(n > 0) n--;
		ani();
	}
	function onNext() {
		if(n < 3) n++;
		ani();
	}
	function ani() {
		$(".wrapper3 .slide-wrap").stop().animate({"left": -n*100 + "%"}, 500, pagerToggle);
	}
	function pagerToggle(){
		$(".wrapper3 .pager-wrap").find("span").show();
		if(n == 0) {
			$(".wrapper3 .pager-wrap").find("span").eq(0).hide();
			$(".wrapper3 .pager-wrap").find("span").eq(1).hide();
		}
		if(n == 3) {
			$(".wrapper3 .pager-wrap").find("span").eq(1).hide();
			$(".wrapper3 .pager-wrap").find("span").eq(2).hide();
		}
	}
	pagerToggle();
})();


