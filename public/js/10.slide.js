var n = 1;
function ani() {
	$(".slide-wrap").stop().animate({"left": -n*100 + "%"}, 500, function(){
		if(n == 4) {
			n = 1;
			$(this).css("left", 0);
		}
		else n++;
	});
}

setInterval(ani, 3000);
