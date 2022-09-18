const url = "https://restcountries.com/v2/all";

let tableJson = (url) => {
    fetch(url, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((response) => {
        fetchNames(response);
        //fetchCapital(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

tableJson(url);


let weatherarr = [];
let a = [];
function fetchNames(data){
 
    for(let i=0;i<data.length;i++)
    {
      let n = {
        name:null,
        flag : null,
        weather :null,
        capital : null
      };
      n.name = data[i].name;
      n.flag = data[i].flag;
      n.capital = data[i].capital;
      a.push(n);
    }
    //console.log(a);
    
  

// let n = a.length;
 //console.log(n);

  //extract values for table head
  let col = [];
  for(let i=0;i<a.length;i++){
    for(let key in a[i]){
      if(col.indexOf(key) === -1){
        col.push(key);
      }
    }
  }

 //create table 
const table = document.createElement('table');

let tr = table.insertRow(-1);

for(let i=0;i<col.length;i++){
  let th = document.createElement("th");
  th.innerHTML = col[i];
  tr.appendChild(th);
}

//add json data to table as rows
for (let i = 0; i < a.length; i++) {

  tr = table.insertRow(-1);

let capital1=a[i].capital;
//console.log(capital1);

const url2 =  `https://api.openweathermap.org/data/2.5/weather?q=${capital1}&appid=74ca63f5c9014daf74ae560d33d40924`;
let w = (url2) => {
  fetch(url2, {
    method: "GET",
  })
    .then((data) => data.json())
    .then((response) => {
      weather2(response)
      //console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

w(url2);


function weather2(data){
  //console.log(data.coord.lat);
  let file = {
    country_name : null,
    temp : null,
    humidity : null
  };
  file.country_name =a[i].name;
  file.temp = data.main.temp;
  file.humidity = data.main.humidity;
  //console.log(file.temp);
  weatherarr.push(file);
  //console.log(weatherarr)
}


  for (let j = 0; j < col.length; j++) {
    let tabCell = tr.insertCell(-1);
    if(j===1){
      var image=document.createElement('img');
      image.src=a[i][col[j]];
      tabCell.appendChild(image);
    }
    else if(j===2){
      var btn = document.createElement('button');
      btn.className = "countryBtn";
      btn.innerHTML = "Weather_Report"
      tabCell.appendChild(btn);
      //btn.onclick = function popup1(){
        //alert("hi");
        /*
        alert("Weather Reports is as follows - ");
        var m = true;
        while(m){
          var humidity = prompt('Humidity = ');
          alert('Humidity = '+humidity);
          m = confirm('Do you want to know more ? ')
        }
        alert('Thankyou !');
        */
        /*
        var popup = document.createElement('div');
        popup.className = 'popup';
        popup.id = 'test';
        var cancel = document.createElement('div');
        cancel.className = 'cancel';
        cancel.innerHTML = 'close';
        cancel.onclick = function (e) { popup.parentNode.removeChild(popup) };
        var message = document.createElement('span');
        message.innerHTML = "This is a test message";
        popup.appendChild(message);                                    
        popup.appendChild(cancel);
        document.body.appendChild(popup);
        */

        //opens a new page-working
        /*
        var popup = open("", "Popup", "width=500,height=150");
        popup.className = "popupCss";
        var txtOk = popup.document.createElement("TEXTAREA");
        var aOk = popup.document.createElement("a");
        aOk.innerHTML = "Click here";
        
        popup.document.body.appendChild(txtOk);
        popup.document.body.appendChild(aOk);
        */
      //};
      btn.addEventListener('click',function (){
        let m = document.createElement('div');
        m.className = 'bigdiv';

        document.getElementsByClassName('sec')[0].appendChild(m);

        let innerdiv = document.createElement('div');
        innerdiv.className = 'innerdiv';

        m.appendChild(innerdiv);

        //let h1 = document.createElement('h1');
        //h1.innerText = 

        /*
        let para = document.createElement('p');
        para.innerText = "|| Weather Report ||";
        para.className = "para";
        para.style.marginLeft = "200px";
        para.style.marginTop = "5px";

        innerdiv.appendChild(para);
        */

        /*
        let temp = document.createElement('p')
        temp.innerText = "Temperature = 45 degree";
        temp.className = "temp";

        innerdiv.appendChild(temp);

        let humidity = document.createElement('p')
        humidity.innerText = "Humidity = 45 degree";
        humidity.className = "humidity";
        
        
        innerdiv.appendChild(humidity);
        */

        //----------------------------------------------------------------------------------------

        //weatherarray
        //console.log(weatherarr);
        for(let j=0;j<weatherarr.length;j++){
             if(weatherarr[j].country_name===a[i].name){

             let s1=document.createElement('span');
             let s2=document.createElement('span');
             
             s1.className = "t1";
             s2.className = "hum";

             let pp1=document.createElement('p');
             let p1=document.createElement('p');
             s1.appendChild(pp1);
             s1.appendChild(p1);

             let pp2=document.createElement('p');
             let p2=document.createElement('p');
             s2.appendChild(pp2);
             s2.appendChild(p2);
      
             pp1.innerHTML="TEMPERATURE ";
             p1.innerHTML=weatherarr[j].temp;

             pp2.innerHTML="HUMIDITY ";
             p2.innerHTML=weatherarr[j].humidity;
             
             innerdiv.appendChild(s1);
             innerdiv.appendChild(s2);

             
             }
        }
        //----------------------------------------------------------------------------------------

        let close = document.createElement('button');
        close.className = "close";
        close.style.background = "blue";
        close.innerText = "Close Report";
        

        innerdiv.appendChild(close);

        m.classList.add('bg-active');

        close.addEventListener('click',function (){
          m.classList.remove('bg-active');
        })
      })
    }
    else{
    tabCell.innerHTML = a[i][col[j]];
    }

  }

  
  

const divShowData = document.getElementById('show');
    divShowData.innerHTML = "";
    divShowData.appendChild(table);

}

console.log(weatherarr);
//let capitals = []
//let i =0;
/*
function fetchCapital(data){
  for(i=0;i<data.length;i++){
    capitals.push(data[i].capital);
  }
  console.log(capitals);
}
*/


}