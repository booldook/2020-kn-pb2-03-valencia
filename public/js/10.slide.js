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
