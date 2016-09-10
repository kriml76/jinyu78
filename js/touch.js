
window.onload=function  () {
	var oWrap=document.getElementById("person_wrap");
	var aLi=oWrap.getElementsByTagName("li");
	var slider=document.getElementById("slider");
	var lis=slider.getElementsByTagName("li");
	var issue=document.getElementById("issue");
	var detail=document.getElementById("detail");
	var aP=detail.getElementsByTagName("p");
	var pro_wrap=document.getElementById("pro_wrap");
	var aChild=pro_wrap.children;

	aLi[0].style.borderColor="#e2a31b";
	aLi[0].style.marginLeft="5.5%" ;
	lis[0].style.width="10px";
	lis[0].style.height="10px";
	lis[0].style.marginTop=0;
	aP[0].style.display="block";
	oWrap.style.webkitTransition="all 0.3s";
	issue.style.webkitTransition="all 0.8s";

	var startX;
	var startY;
	var index=0;
	var num=0;
	var isMoving = false;
	var ind=0

	function getStyle(obj,styleName){

		if (obj.currentStyle){
			return obj.currentStyle[styleName];
		}
		else{
			return getComputedStyle(obj,null)[styleName];
		}
	}
	var oWidth=parseInt(aLi[0].offsetWidth);
	var oRight=parseInt(getStyle(aLi[0],"marginRight"));
	var oScroll=oWidth+oRight;
	var proWidth=aChild[0].offsetWidth;
	var oHeight=document.documentElement.clientHeight;
	issue.style.top=-oHeight*4+"px";

	var oSign=document.getElementById("sign");
	var oSignImg=oSign.children[0];
	var oapply=document.getElementById("apply");
	var oMark = document.getElementById("mask");

	oSignImg.onclick=function(){
		oapply.style.display="block";
		oMark.style.display="block";
	}	
	var oclose=document.getElementById('close');
	oclose.onclick=function(){
		oapply.style.display="none";
		oMark.style.display="none";
	}
	
	function cancelTouch() {
		 this.removeEventListener('touchmove', onTouchMove);
		 startX = null;
		 isMoving = false;
	 }

	function onTouchMoveL (e) {
		e.preventDefault();
		if(isMoving) {
			var x = e.touches[0].pageX;
			var dx = startX - x;
			if(Math.abs(dx) >= 10) {
				cancelTouch();
				if(dx > 0) {
					if (num!=3) {
						index++;
						if (index>=aLi.length-1) {
							index=aLi.length-1;
						};
						oWrap.style.left=-oScroll*(index)+"px";
						for (var i = 0; i < aLi.length; i++) {
							aLi[i].style.borderColor="#daf0ff";
							lis[i].style.width="5px";
							lis[i].style.height="5px";
							lis[i].style.marginTop="1%";
							aP[i].style.display="none";
						};
						lis[index].style.width="10px";
						lis[index].style.height="10px";
						aLi[index].style.borderColor="#e2a31b";	
						aP[index].style.display="block";
						lis[index].style.marginTop=0;
					}
					else{
						ind++;
						if (ind>aChild.length-1) {
							ind=aChild.length-1;
						};
						pro_wrap.style.left=-proWidth*ind+"px";
					}
				}
				else {
					if (num!=3) {
						index--;
						if (index<0) {
							index=0;
						};
						oWrap.style.left=-oScroll*(index)+"px";
						for (var i = 0; i < aLi.length; i++) {
							aLi[i].style.borderColor="#daf0ff";
							lis[i].style.width="5px";
							lis[i].style.height="5px";
							aP[i].style.display="none";
							lis[i].style.marginTop="1%";
						};
						lis[index].style.width="10px";
						lis[index].style.height="10px";
						aLi[index].style.borderColor="#e2a31b";
						aP[index].style.display="block";
						lis[index].style.marginTop=0;
					}
					else{
						ind--;
						if (ind<0) {
							ind=0;
						};
						pro_wrap.style.left=-proWidth*ind+"px";
					}
				}
			}
		}
	}
	function onTouchMove(e) {
		 e.preventDefault();
		 if(isMoving) {
			 var y = e.touches[0].pageY;
			 var dy = startY - y;
			 if(Math.abs(dy) >= 10) {
    			cancelTouch();
    			if(dy > 0) {
    				num++;
    				if (num>4) {
    					num=4;
    				};
    				issue.style.top=-oHeight*num+"px";
    			}
    			else {
    				num--;
    				if (num<0) {
    					num=0;
    				};
    				issue.style.top=-oHeight*num+"px";
    			}
    		 }
		 }
	 }

	document.addEventListener("touchstart", function (e){

		if (e.touches.length == 1) {
			 startX = e.touches[0].pageX;
			 startY = e.touches[0].pageY;
			 isMoving = true;
			 this.addEventListener('touchmove', onTouchMove, false);
		 }
	}, false);
	oWrap.addEventListener("touchstart", function (e){

		if (e.touches.length == 1) {
			 startX = e.touches[0].pageX;
			 startY = e.touches[0].pageY;
			 isMoving = true;
			 this.addEventListener('touchmove', onTouchMoveL, false);
		 }
	}, false);
	pro_wrap.addEventListener("touchstart", function (e){

		if (e.touches.length == 1) {
			 startX = e.touches[0].pageX;
			 startY = e.touches[0].pageY;
			 isMoving = true;
			 this.addEventListener('touchmove', onTouchMoveL, false);
		 }
	}, false);

	var oapply=document.getElementById("apply");
	var aInput=oapply.getElementsByTagName("input");

	var osub=aInput[aInput.length-1];
	osub.onclick=function(){
	for (var i = 0; i < aInput.length-1; i++) {
		if(aInput[i].value=="") {
			alert("填写不完整");
			return false;
			}	
		var strname=aInput[0].value;
		var rHz=/[\u4e00-\u9fa5]{2,4}/g;
		if(rHz.test(strname)==false){
			alert("姓名为两到四个汉字");
			return false;
		}
		var strsex=aInput[1].value;
		if(strsex!="女"&&strsex!="男"){
			alert("性别填写错误");
			return false;
		}	
		var strage=aInput[2].value;
		var rsex=/^[5-9]$|^[1-9]\d$/;
		if(rsex.test(strage)==false){
			alert("填写正确的年龄");
			return false;
		}
		var stremail=aInput[3].value;
		var remail=/^\w+@[a-z0-9]{2,6}(\.[a-z]{2,6}){1,4}$/;
		if(remail.test(stremail)==false){
			alert("邮箱填写错误");
			return false;
		}
		var strphone=aInput[4].value;
		var rphone=/^1\d{10}$/;
		if(rphone.test(strphone)==false){
			alert("手机号码填写错误");
			return false;
		}
	};
	};
}
