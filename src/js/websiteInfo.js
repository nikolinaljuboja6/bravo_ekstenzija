document.addEventListener('DOMContentLoaded', function() {
    getWebsiteInfo();
});

function getRequest()
{
    if(window.XMLHttpRequest)
    {
        return new XMLHttpRequest();
    }
    else if(window.ActiveXObject)
    {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
    else
    {
        return null;
    }
}

function getWebsiteInfo()
{
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        var url = tabs[0].url;
        var url_with_pipe = url.replace(/\//g, "|");
        var request = getRequest();
        request.open("GET","https://salty-shelf-58961.herokuapp.com/"+url_with_pipe,false);
        request.send(null);
        var response = request.responseText;
        var responseJSON = JSON.parse(response);

        if(responseJSON.status != "failed")
        {
            var city = responseJSON.city;
            var country = responseJSON.country;
            var ipAddress = responseJSON.query;
            var timeZone = responseJSON.timezone;
            document.getElementById("ipAddress").innerHTML = ipAddress;
            document.getElementById("city").innerHTML = city;
            document.getElementById("country").innerHTML = country;
            document.getElementById("timeZone").innerHTML = timeZone;
            document.getElementById("naslov").innerHTML = url.split("/")[2];
        }
        else
        {
            var request = getRequest();
            request.open("GET","http://ip-api.com/json",false);
            request.send(null);
            var response = request.responseText;
            var responseJSON = JSON.parse(response);
            var city = responseJSON.city;
            var country = responseJSON.country;
            var ipAddress = responseJSON.query;
            var timeZone = responseJSON.timezone;
            document.getElementById("ipAddress").innerHTML = ipAddress;
            document.getElementById("city").innerHTML = city;
            document.getElementById("country").innerHTML = country;
            document.getElementById("timeZone").innerHTML = timeZone;
            document.getElementById("naslov").innerHTML = "Current location";
        }
    });
}