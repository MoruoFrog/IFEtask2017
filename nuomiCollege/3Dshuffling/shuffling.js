var boxNode = document.getElementById("box")
var ringBtns = document.getElementsByClassName("ring")
var currentRing = 4

function changeRing(method){
	if(method == "next"){
		var index = -1
	}else if(method == "last"){
		var index = 1
	}

	Array.prototype.forEach.call(
		ringBtns,
		function(item,index,array){
			item.style.backgroundColor = "white"
		}
	)

	currentRing = currentRing + index
	if(currentRing == -1){
		currentRing = 8
	}else if(currentRing == 9){
		currentRing = 0
	}
	ringBtns[currentRing].style.backgroundColor = "black"
}

function selfRotate(){
	var delay = 7000,
			rotateDeg,
			regRotate = /-?\d+/
	//自动旋转
	window.rotate = setInterval(function(){
		rotateDeg = boxNode.style.transform || "rotateY(0deg)"
		rotateDeg = parseInt(regRotate.exec(rotateDeg)[0]) + 40
		var rotate = "rotateY(" + rotateDeg + "deg)"
		boxNode.style.transform = rotate
		changeRing("next")
		},delay)

	//鼠标悬停时停止旋转，离开后恢复旋转
	var imgs = document.getElementsByTagName("img"),
	 	len = imgs.length

	for(let i = 0; i < len; i++){
		imgs[i].onmouseover = function(event){

			if( i + currentRing == 13 || i + currentRing == 4 ){
				clearInterval(window.rotate)
				imgs[i].onmouseout = function(event){
					window.rotate = setInterval(function(){
					rotateDeg = boxNode.style.transform || "rotateY(0deg)"
					rotateDeg = parseInt(regRotate.exec(rotateDeg)[0]) + 40
					var rotate = "rotateY(" + rotateDeg + "deg)"
					boxNode.style.transform = rotate
					changeRing("next")
				},delay)
					event.stopPropagation()
					this.onmouseout = null
				}
			}	

			event.stopPropagation()
		}
	}
}

function handleBtn(){
	var last = document.querySelector(".last-pic"),
			next = document.querySelector(".next-pic"),
	 		rotateDeg,
			regRotate = /-?\d+/

	last.onclick = function(event){
		rotateDeg = boxNode.style.transform || "rotateY(0deg)"
		rotateDeg = parseInt(regRotate.exec(rotateDeg)[0]) - 40
		var rotate = "rotateY(" + rotateDeg +"deg)"
		boxNode.style.transform = rotate
		changeRing("last")
		//重新计时
		clearInterval(window.rotate)
		selfRotate()
	}

	next.onclick = function(event){
		rotateDeg = boxNode.style.transform || "rotateY(0deg)"
		rotateDeg = parseInt(regRotate.exec(rotateDeg)[0]) + 40
		var rotate = "rotateY(" + rotateDeg +"deg)"
		boxNode.style.transform = rotate
		changeRing("next")
		//重新计时
		clearInterval(window.rotate)
		selfRotate()
		}

	//点击图片下方的按钮，跳转到对应的图片
	var len = ringBtns.length
	for(let i = 0; i < len; i++){
		ringBtns[i].onclick = function(event){
			var index = Array.prototype.indexOf.call(ringBtns,this)

			rotateDeg = boxNode.style.transform || "rotateY(0deg)"
			rotateDeg = parseInt(regRotate.exec(rotateDeg)[0])
			if(currentRing - index > 4){
				rotateDeg = rotateDeg + ((currentRing - index) * 40 - 360)
			}else if(currentRing - index < -4){
				rotateDeg = rotateDeg = rotateDeg + ((currentRing - index) * 40 + 360)
			}else{
				rotateDeg = rotateDeg + (currentRing - index) * 40
			}

			var rotate = "rotateY(" + rotateDeg +"deg)"
			boxNode.style.transform = rotate

			ringBtns[currentRing].style.backgroundColor = "white"
			this.style.backgroundColor = "black"
		
			currentRing = index
			//重新计时
			clearInterval(window.rotate)
			selfRotate()
		}
	}
}

selfRotate()
handleBtn()