function getYelp(storeName) {
    var deferred = $.Deferred();

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("load", function () {
        if(xhr.status === 200){
          // 3.1) RESOLVE the DEFERRED (this will trigger all the done()...)
          var resJson = JSON.parse(xhr.response);
          var business = resJson.businesses[0];
          deferred.resolve(business);
        } else {
          // 3.2) REJECT the DEFERRED (this will trigger all the fail()...)
          deferred.reject("HTTP error: " + xhr.status);
        }
    });

    xhr.open("GET", "https://api.yelp.com/v3/businesses/search?term=" + encodeURIComponent(storeName) + "&location=20002");
    xhr.setRequestHeader("authorization", "Bearer a3yncN811ps7NidlZndPlw173dregZeY4VI6a2YtHcBaTF_3U9Z435Un4KbFSsFKh5tprPLi5tNyuTZViCpooHwUWwPQqCeYZ1hftiH3gyqoeMCvwv-JAP1NgkqrWXYx");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send();

    return deferred.promise()
}


function main(){
    console.log("Aymon");

    $($.find('.list_item')).each(function (i,e) {
    	var context = $(this);
        var movieNameLink = $(this).closest('h4');
        var movieName = storeNameHeader.text();
        var movie = getMovie(storeName);
        business.done(function (b) {
        	var rating = b.rating;
        	var url = b.url;
        	var numEmpty = 5 - rating;

        	context.find('.rating-rating > span.grey')[0].append(' ' + rating);
        });
    });

}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------
		main();



	}
	}, 10);
});