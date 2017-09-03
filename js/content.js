// ==UserScript==
// @name IMDB Ratings Viewer
// @include http://www.imdb.com/*
// ==/UserScript==
//

/*
Author: shadyabhi (Abhijeet Rastogi)
Email: abhijeet.1989@gmail.com
*/

/*MISC FUNCTIONS*/

function getRating(storeName) {
    var deferred = $.Deferred();

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("load", function () {
        if(xhr.status === 200){
          // 3.1) RESOLVE the DEFERRED (this will trigger all the done()...)
          deferred.resolve(xhr.response.businesses[0].rating);
        } else {
          // 3.2) REJECT the DEFERRED (this will trigger all the fail()...)
          deferred.reject("HTTP error: " + xhr.status);
        }
    });

    xhr.open("GET", "https://api.yelp.com/v3/businesses/search?term=" + encodeURIComponent(storeName) + "&location=20002");
    xhr.setRequestHeader("authorization", "Bearer a3yncN811ps7NidlZndPlw173dregZeY4VI6a2YtHcBaTF_3U9Z435Un4KbFSsFKh5tprPLi5tNyuTZViCpooHwUWwPQqCeYZ1hftiH3gyqoeMCvwv-JAP1NgkqrWXYx");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send();

    return deffered.promise()
}


function main(){
    console.log("Aymon");

    var script = document.createElement('script');
    script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);

    $($.find('.merchant-tile_name')).each(function (i,e) {
        var storeNameHeader = $(this).closest('h4');
        var storeName = storeNameHeader.text();
        $(this).closest('h4').append(" " + getRating(storeName))
    });

}

main()
