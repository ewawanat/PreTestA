 
var saveme = function () {
	var page = document.getElementById("page").value;
	var data1 = document.getElementById("username").value;
	var data2 = document.getElementById("username2").value;
	var data3 = document.getElementById("username3").value;
	localStorage.setItem( page+'field1', data1);
	localStorage.setItem(page+'field2', data2);
	localStorage.setItem(page+'field3', data3);
	location.reload();
window.location.assign("ewapage2.html")}

 	
document.getElementById('saveme').onclick = saveme;

  