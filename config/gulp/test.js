/*function UserAction() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             alert(this.responseText);
         }
    };
    xhttp.open("POST", "https://www.googleapis.com/civicinfo/v2/elections?key=AIzaSyAmyry3f504oIL6vdP8SbhRSGS0O0e9lkI", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("Your JSON Data Here");
}
*/

const UserAction = async () => {
    const response = await fetch('https://www.googleapis.com/civicinfo/v2/elections?key=AIzaSyAmyry3f504oIL6vdP8SbhRSGS0O0e9lkI', {
      method: 'POST',
      body: myBody, // string or object
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
  }