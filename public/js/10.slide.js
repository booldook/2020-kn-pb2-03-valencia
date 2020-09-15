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


