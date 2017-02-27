var url = "http://127.0.0.1:3000";
var request = new XMLHttpRequest();
request.open('GET', url);
request.responseType = 'json';
request.onload = function() {
	if (request.status == 200) {
		var json = request.response;
		document.getElementById('previewTitle').textContent = json['title'];
		document.getElementById('previewUrl').textContent = json['url'];
		document.getElementById('previewInfo').textContent = json['info'];
		document.getElementById('previewImg').src = json['img'];
		document.getElementById('previewBody').textContent = json['body'];
	}
	else {
		document.getElementById('previewTitle').textContent = "Couldn't connect to server...";
	}
}
request.onerror = function() {
	document.getElementById('previewTitle').textContent = "Couldn't connect to server...";
}
request.send();
