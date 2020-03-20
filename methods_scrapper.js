var request = require('request');

//obselete

request('http://localhost/oniro/api/getMethodes.php', function(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info)
    } else {
        console.log(error)
        console.log(response.statusCode)
    }
})