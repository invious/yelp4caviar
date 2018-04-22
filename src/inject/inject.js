const waitFor = (ms) => new Promise(r => setTimeout(r, ms))

function getYelp(storeName, city) {
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

    xhr.open("GET", "https://api.yelp.com/v3/businesses/search?term=" + encodeURIComponent(storeName) + "&location=" + city);
    xhr.setRequestHeader("authorization", "Bearer a3yncN811ps7NidlZndPlw173dregZeY4VI6a2YtHcBaTF_3U9Z435Un4KbFSsFKh5tprPLi5tNyuTZViCpooHwUWwPQqCeYZ1hftiH3gyqoeMCvwv-JAP1NgkqrWXYx");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send();

    return deferred.promise()
}


async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}   

async function main(){
    try {
        city = $($.find('head > meta:nth-child(25)')[0])[0].baseURI.match(/com\/(.+?$)/)[1]
    } catch (error) {
        city = ''
    }

    await asyncForEach($($.find('.merchant-tile_name')), async (el) =>  {
        await waitFor(200);
    	var context = $(el);
        var storeNameHeader = $(el).closest('h4');
        var storeName = storeNameHeader.text();
        var business = getYelp(storeName, city);
        business.done(function (b) {
          try {
          	var rating = b.rating;
          	var url = b.url;
          	var numEmpty = 5 - rating;

          	starsHTML = '<div class="star"><i class="star-filled"></i></div>'.repeat(rating);
          	starsHTML = rating === Math.floor(rating) ? starsHTML : starsHTML + '<div class="star"><i class="star-half"></i></div>';
          	context.closest('h4').append('<span style="float:right">' + b.price + '</span><a href="' + url + '"><span class="rating star-icon direction-ltr label-right value-' + Math.floor(rating) + ' color-default"><div class="label-value">'+ rating + '</div><div class="star-container">'+ starsHTML +'</div></span></a>');
          } catch(error){
            console.log(error)
            console.log(b)
          }

        });
    });

}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		main();



	}
	}, 10);
});