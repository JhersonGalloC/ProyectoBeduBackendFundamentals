const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API = 'https://api.escuelajs.co/api/v1'; //Using this API endpoint as a reference since my API is not ready.

//This queries.js file will help me to make requests into API's with all the information from my database in a future, 
//the reason why I decided to use XMLHttpRequest 
//is because I'll be manipulating a lot of information into my proyect once it is upload into HEROKU

function fetchData(urlAPI, callback){
    let xhttp = new XMLHttpRequest();

    xhttp.open('GET',urlAPI, true); 
    xhttp.onreadystatechange = function (event) {
        if (xhttp.readyState === 4){
        if (xhttp.status === 200){
        callback(null, JSON.parse(xhttp.responseText))
        }else {
            const error = new Error('Error' + urlAPI)
            return callback(error, null);
           }
        }
    }
    xhttp.send();
}

fetchData(`${API}/products`, function(error1, data1) {
    if(error1) return console.error(error1);
    fetchData(`${API}/products/${data1[0].id}`, function(error2, data2){
        if (error2) return console.error(error2);
        fetchData(`${API}/categories/${data2?.category.id}`, function (error3, data3) {
            if (error3) return console.error(error3);
            console.log(data1[0]);
            console.log(data2.title);
            console.log(data3.name);
        })
    })
});

