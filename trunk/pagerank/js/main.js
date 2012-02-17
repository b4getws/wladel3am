var xml = makeXML();
var form;
var loading;
var results;
function makeXML () {
	if (typeof XMLHttpRequest == 'undefined') {
		objects = Array(
			'Microsoft.XmlHttp',
			'MSXML2.XmlHttp',
			'MSXML2.XmlHttp.3.0',
			'MSXML2.XmlHttp.4.0',
			'MSXML2.XmlHttp.5.0'
		);
		for (i = 0; i < objects.length; i++) {
			try {
				return new ActiveXObject(objects[i]);
			} catch (e) {}
		}
	} else {
		return new XMLHttpRequest();
	}
}
window.onload = function () {
	form = document.getElementById('form');
	loading = document.getElementById('loading');
	results = document.getElementById('results');
	form.onsubmit = function () {
		results.style.display = 'none';
		results.innerHTML = '';
		loading.style.display = 'inline';
		xml.open('get', './results.php?url=' + escape(this.url.value));
		xml.onreadystatechange = function () {
			if (xml.readyState == 4 && xml.status == 200) {
				results.style.display = 'block';
				results.innerHTML = xml.responseText;
				loading.style.display = 'none';
			}
		}
		xml.send(null);
		return false;
	}
}