// Background script

chrome.runtime.onMessage.addListener(function(data, sender, reply) {
	switch(data.msg) {
		case "DOES FOLLOW":
			chrome.storage.sync.get(data.name, function(res) {
				if(res[data.name]) {
					reply(true);
				} else {
					reply(false);
				}
			});
			break;
		case "START FOLLOWING":
			let obj = {};
			obj[data.name] = true;
			// TODO: request project activity.
			chrome.storage.sync.set(obj, function() {
				reply();
			});
			break;
		case "STOP FOLLOWING":
			chrome.storage.remove(data.name, function() {
				reply();
			});
	}
	return true;
});

const checkNext = function() {
	chrome.storage.sync.get(null, function(res) {
		const keys = Object.keys(res);
		const users = keys.filter(user => user !== "** ITER **");
		
		if(users.length === 0) return;
		
		const iter = keys.includes("** ITER **") ? ( (res["** ITER **"] + 1) % users.length) || 0;
		
		chrome.storage.sync.set({"** ITER **": iter}, function() {
			const request = new XMLHttpRequest();
			request.open("GET", );
			request.onreadystatechange = function() {
				if(request.
			};
			request.send();
		});
	});
}