var http = require('http');
var request = require('request');
var jsdom = require('jsdom').jsdom;

var port = 3000;

var server = http.createServer((req, res) => {
	console.log('Got request!');
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	buildData((data) => {
		res.end(JSON.stringify(data));
	});
});

server.listen(port, () => {
  console.log('Server running at port ' + port);
});

function scrapper(url, callback) {
	request(url, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			console.log('Got: ' + url);
			var document = jsdom(body);
			callback(document); 
		}
	});
}

function buildData(callback) {
scrapper('http://observatorio.info', (observatorio) => {
		scrapper('https://apod.nasa.gov/apod/archivepix.html', (apod_archive) => {
			var url = 'https://apod.nasa.gov/apod/' + apod_archive.getElementsByTagName('a')[3].getAttribute('href');			
			var img = observatorio.getElementsByTagName('img')[1].getAttribute('src');
			var body = observatorio.getElementsByTagName('p')[1].textContent;
			var title = observatorio.getElementsByClassName('intro')[0].textContent;
			var info = observatorio.getElementsByClassName('info')[0];
		
			info.innerHTML = info.innerHTML.replace('<br>', '\n');
			info = info.textContent;
		
		
			callback({'title': title, 'info': info, 'body': body, 'img': img, 'url': url});
		});
	});
}