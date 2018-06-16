exports.test_route = function(req, res, next) {
	console.log(req);
	res.sendStatus(200);
}

exports.test_route_post = function(req, res, next) {
	console.log(req);
	res.sendStatus(200);
}




exports.ack_get = function(req, res, next) {
	console.log("[GET] - ack_get");
	res.send(req);
}

exports.ack_post = function(req, res, next) {
	console.log("[POST] - ack_post");
	res.send(req);
}



exports.point_get = function(req, res, next) {
	console.log("[GET] - point_get | [" + Math.floor(Date.now() / 1000) + "]");
	console.log(req.params);

	res.sendStatus(200);
}