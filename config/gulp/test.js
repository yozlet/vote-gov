/*function UserAction() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             alert(this.responseText);
         }
    };
    xhttp.open("POST", "https://www.googleapis.com/civicinfo/v2/elections?key=", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("Your JSON Data Here");
}
*/

const UserAction = async () => {
    const response = await fetch('https://www.googleapis.com/civicinfo/v2/elections?key=', {
      method: 'POST',
      body: myBody, // string or object
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
  }