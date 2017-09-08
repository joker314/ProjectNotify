// This is the content script.

// Adds "Follow (projects)" button
// Adds "Unfollow (projects)" button

const url = location.pathname.toLowerCase();

if(url.startsWith("/users/")) { // On a user's profile
	const name = url.replace(new RegExp("/users/(.+)/"), "$1");
	
	chrome.runtime.sendMessage({msg: "DOES FOLLOW", name}, function(followed) {
		// Is this user "super-followed"?
		const button = document.createElement("DIV");
		const texts = {
			blue: "follow-button button notfollowing blue",
			grey: "follow-button button following grey",
			blueicon: '<span class="follow text"><span class="icon-sm follower white"></span>Notify of Projects</span>',
			greyicon: '<span class="unfollow text"><span class="icon-sm follower black"></span>Stop notifying of projects</span>'
		};
		
		const updateButton = function() {
			if(followed) {
				button.className = texts.grey;
				button.innerHTML = texts.greyicon;
			} else {
				button.className = texts.blue;
				button.innerHTML = texts.blueicon;
			}
		}
		
		document.getElementById("follow-button").appendChild(button);
		
		updateButton();
		
		button.addEventListener("click", function(e) {
			followed = !followed;
			chrome.runtime.sendMessage({msg: followed ? "START FOLLOWING" : "STOP FOLLOWING", name}, function() {
				updateButton();
			});
		});
	});
}