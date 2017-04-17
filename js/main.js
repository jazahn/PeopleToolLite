// https://jsonplaceholder.typicode.com/users
let data;
let request = new XMLHttpRequest();
//request.open('GET', 'https://esb1.dev.uds.harvard.edu:9001/api/person/restricted/people?person_keys=2940935f3b990174,acd3d0471e7ed076,c2f8e8f8632a2cd7', true);
request.open('GET', 'http://localhost:8080/people.json');
request.onload = function(){
  if(request.status >= 200 && request.status < 400){
    console.log("success");
    data = JSON.parse(request.responseText);
    console.log(data);
    buildTable(data);
  } else {
    console.log("error on server");
  }
};
request.onerror = function(){ console.log("error connecting to server"); };
request.send();

var buildTable = function(data){
  //document.getElementById('mytable').innerHTML = '';
  // https://jsperf.com/innerhtml-vs-removechild
  var mytable = document.getElementById('mytable');
  while(mytable.firstChild){
    mytable.removeChild(mytable.firstChild);
  }

  data.personList.person.forEach(function(item){
    var row = document.createElement("tr");
    //row.innerHTML = "<td>" + item.name + "</td>";
    var nametd = document.createElement("td");
    var nametext = document.createTextNode(item.eppn);
    nametd.appendChild(nametext);
    row.appendChild(nametd);

    var nametd = document.createElement("td");
    var nametext = document.createTextNode(item.emailList.email[0].emailUserName);
    nametd.appendChild(nametext);
    row.appendChild(nametd);

    document.getElementById('mytable').appendChild(row);

  });

};
