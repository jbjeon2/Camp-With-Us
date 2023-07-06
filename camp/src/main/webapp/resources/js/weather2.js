
const AM = document.querySelectorAll(".AM");
const PM = document.querySelectorAll(".PM");
let loca2 = JSON.parse(localStorage.getItem("loca"));
const loc5 = loc4();
function loc4(){
  let locate;
  let positionX;
  let positionY;

  
  if(loca2 == '강원도' || loca2=== '강원'){
    locate = "11D20000"
    positionX = '37.8';
    positionY = '128.2';
  }else if(loca2 == '서울시' || loca2 ==='경기도' || loca2 === '인천시'){
    locate = "11B00000"
    positionX = '37.5683';
    positionY = '126.9778';

  } else if(loca2 === '대전시' || loca2 ==='세종' || loca2 ==='충청남도'){
    locate = "11C20000"
    positionX = '36.3333'
    positionY = '127.4167'
  
  } else if(loca2 === '충청북도'){
    locate = "11C10000"
    positionX='36.9706'
    positionY='127.9322'
 
  } else if(loca2 === "광주시" || loca2 ==="전라남도"){
    locate = "11F20000"
    positionX='35.1547'
    positionY='126.9156'

  } else if(loca2 ==='전라북도'){
    locate = "11F10000"
    positionX='35.8219'
    positionY='127.1489'
  
  } else if(loca2 ==='대구시' || loca2 ==="경상북도"){
    locate = "11H10000"
    positionX='35.8'
    positionY='128.55'
  
  } else if(loca2 === '부산시' || loca2 ==='울산시' || loca2 ==="경상남도"){
    locate = "11H20000"
    positionX='35.1028'
    positionY='129.0403'
   
  } else if(loca2 === "제주도"){
    locate = "11G00000"
    positionX='33.5097'
    positionY='126.5219'
   
  }
  let positionXY = [];
  
  positionXY[0] = positionX
  positionXY[1] = positionY

  
  let X = positionXY[0];
  let Y = positionXY[1];
 
  console.log(X,Y)
  
  return positionXY
}

console.log(loc5)

function loc6(){
  
  let locate;

  let positionNY
  let positionNX
 
  if(loca2 == '강원도' || loca2=== '강원'){
    locate = "11D20000"
    
    positionNX = '73'
    positionNY = '134'
  }else if(loca2 == '서울' || loca2 ==='경기도' || loca2 === '인천시' || loca2 === '서울시'){
    locate = "11B00000"
 
    positionNX = '60'
    positionNY = '126'
  } else if(loca2 === '대전시' || loca2 ==='세종' || loca2 ==='충청남도'){
    locate = "11C20000"

    positionNX = '67'
    positionNY = '100'
  } else if(loca2 === '충청북도'){
    locate = "11C10000"

    positionNX = '69'
    positionNY = '107'
  } else if(loca2 === "광주시" || loca2 ==="전라남도"){
    locate = "11F20000"

    positionNX = '51'
    positionNY = '67'
  } else if(loca2 ==='전라북도'){
    locate = "11F10000"

    positionNX = '63'
    positionNY = '89'
  } else if(loca2 ==='대구시' || loca2 ==="경상북도"){
    locate = "11H10000"

    positionNX = '89'
    positionNY = '90'
  } else if(loca2 === '부산시' || loca2 ==='울산시' || loca2 ==="경상남도"){
    locate = "11H20000"

    positionNX = '98'
    positionNY = '76'
  } else if(loca2 === "제주도"){
    locate = "11G00000"

    positionNX = '52'
    positionNY = '38'
  }

  let positionNXY = [];

  positionNXY[0] = positionNX
  positionNXY[1] = positionNY

  let NX = positionNXY[0];
  let NY = positionNXY[1];

  console.log(NX, NY)
  return positionNXY
}
const loc7 = loc6();

$.getJSON('http://api.openweathermap.org/data/2.5/forecast?lat='+loc5[0]+'&lon='+loc5[1]+'&appid=키&units=metric', function(result){
          
    //당일오전
//   const firstAm = result.list[0].weather[0].id
//   const firstPm = result.list[2].weather[0].id
//   console.log(firstAm)
//   if(700 <= Number(firstAm) <= 804){
//     if(Number(firstAm) != 800){
//     AM[0].innerHTML = "<img src = 'images/cloudMany.png' width= '50px' height= '50px'>"}
//   }else if(200 <= Number(firstAm) <= 599){
//     AM[0].innerHTML = "<img src = 'images/비.png' width= '50px' height= '50px'>"
//     console.log(Number(firstAm))
//   }else if(600<= Number(firstAm) <= 699){
//     AM[0].innerHTML = "<img src = 'images/눈.png' width= '50px' height= '50px'>"
//   }else if(Number(firstAm) == 800){
//     AM[0].innerHTML = "<img src = 'images/맑음.png' width= '50px' height= '50px'>"
//   }
// // 당일 오후
// if(700 <= Number(firstPm) <= 804){
//     if(Number(firstPm) != 800){
//     PM[0].innerHTML = "<img src = 'images/cloudMany.png' width= '50px' height= '50px'>"}
//   }else if(200 <= Number(firstPm) <= 599){
//     PM[0].innerHTML = "<img src = 'images/비.png' width= '50px' height= '50px'>"
//     console.log(Number(firstPm))
//   }else if(600<= Number(firstPm) <= 699){
//     PM[0].innerHTML = "<img src = 'images/눈.png' width= '50px' height= '50px'>"
//   }else if(Number(firstPm) == 800){
//     PM[0].innerHTML = "<img src = 'images/맑음.png' width= '50px' height= '50px'>"
//   }

// 다음날 오전 오후

  const secondAm = result.list[8].weather[0].id
  const secondPm = result.list[10].weather[0].id

  if(Number(secondAm) === 800){
    AM[0].innerHTML = "<img src = '"+ `${contextPath}` + "/resources/images/sunny.jpg' width= '50px' height= '50px'>"
  
  }else if(700 <= Number(secondAm) <= 804 ){
    
    AM[0].innerHTML = "<img src = '"+ `${contextPath}` + "/resources/images/cloud.jpg' width= '50px' height= '50px'>"
  }else if(200 <= Number(secondAm) <= 599){

    AM[0].innerHTML = "<img src = '"+ `${contextPath}` + "/resources/images/rain.jpg' width= '50px' height= '50px'>"
  }else if(600<= Number(secondAm) <= 699){
    AM[0].innerHTML = "<img src = '"+ `${contextPath}` + "/resources/images/snow.jpg' width= '50px' height= '50px'>"

  }
   

  if(Number(secondAm) === 800){
    PM[0].innerHTML = "<img src = '"+ `${contextPath}` + "/resources/images/sunny.jpg' width= '50px' height= '50px'>"
  
  }else if(700 <= Number(secondPm) <= 804 ){
    
    PM[0].innerHTML = "<img src = '"+ `${contextPath}` + "/resources/images/cloud.jpg' width= '50px' height= '50px'>"
  }else if(200 <= Number(secondPm) <= 599){

    PM[0].innerHTML = "<img src = '"+ `${contextPath}` + "/resources/images/rain.jpg' width= '50px' height= '50px'>"
  }else if(600<= Number(secondPm) <= 699){
    PM[0].innerHTML = "<img src = '"+ `${contextPath}` + "/resources/images/snow.jpg' width= '50px' height= '50px'>"


  }
  
  const thirdAm = result.list[16].weather[0].main
  const thirdPm = result.list[18].weather[0].main
  
  if(Number(thirdAm) === 800){
    AM[1].innerHTML = "<img src = '"+ `${contextPath}` + "/resources/images/sunny.jpg' width= '50px' height= '50px'>"
  
  }else if(700 <= Number(thirdAm) <= 804 ){
    
    AM[1].innerHTML = "<img src = '"+ `${contextPath}` + "/resources/images/cloud.jpg' width= '50px' height= '50px'>"
  }else if(200 <= Number(thirdAm) <= 599){

    AM[1].innerHTML = "<img src = '"+ `${contextPath}` + "/resources/images/rain.jpg' width= '50px' height= '50px'>"
  }else if(600<= Number(thirdAm) <= 699){
    AM[1].innerHTML = "<img src = '"+ `${contextPath}` + "/resources/images/snow.jpg' width= '50px' height= '50px'>"

  }

  if(Number(thirdPm) === 800){
    PM[1].innerHTML = "<img src = '"+ `${contextPath}` + "/resources/images/sunny.jpg' width= '50px' height= '50px'>"
  
  }else if(700 <= Number(thirdPm) <= 804 ){
    
    PM[1].innerHTML = "<img src = '"+ `${contextPath}` + "/resources/images/cloud.jpg' width= '50px' height= '50px'>"
  }else if(200 <= Number(thirdPm) <= 599){

    PM[1].innerHTML = "<img src = '"+ `${contextPath}` + "/resources/images/rain.jpg' width= '50px' height= '50px'>"
  }else if(600<= Number(thirdPm) <= 699){
    PM[1].innerHTML = "<img src = '"+ `${contextPath}` + "/resources/images/snow.jpg' width= '50px' height= '50px'>"

  }
});
const formattedDate2 = getFormattedDate2();

// 다음날 다다음날 강수확률
const rp2 = document.querySelectorAll(".rp");
$.getJSON('https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=키&pageNo=1&numOfRows=1000&dataType=JSON&base_date='+formattedDate2+'&base_time=0500&nx='+loc7[0]+'&ny='+loc7[1],function(result){
  let rpAM = [];
  let rpPM = [];
  let fcstValue = 'fcstValue'
  let item1 = result.response.body.items.item[345];
  let item2 = result.response.body.items.item[405];
  let item3 = result.response.body.items.item[635];
  let item4 = result.response.body.items.item[695];
  console.log(item1)
  console.log(item2)
  console.log(item3)
  console.log(item4)

  rpAM[0] =  item1[fcstValue];
  rpAM[1] =  item2[fcstValue];

  rpPM[0] = item3[fcstValue];
  rpPM[1] = item4[fcstValue];


  console.log(rpAM)
  for(let i=0; i<=1; i++){
  rp2[i].innerHTML = "강수 확률" + "<br>" + "AM : " + rpAM[i] + " %<br>" + "PM : " + rpPM[i]+" %"
    
  }
})




function getFormattedDate2() {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  
  // 시간이 00시 부터 05시 사이일 경우, 전날의 날짜로 설정
  if (date.getHours() >= 0 && date.getHours() < 6){
    const previousDay = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    month = previousDay.getMonth() + 1;
    day = previousDay.getDate();
  }
  // 월과 일이 한 자리 수인 경우 앞에 0을 추가합니다.
  if (month < 10) {
    month = '0' + month;
  }

  if (day < 10) {
    day = '0' + day;
  }

  return year + month + day;
}

// day = getDates2();
//                   console.log(day);
                  
//                   for(i = 0; i < 10; i++){
//                     DATE[i].innerText = day[i]
// }

// function getDates2() {
//   var today = new Date(); // 현재 날짜를 가져옴
//   var dates = [];

//   for (var i = 1; i <= 10; i++) {
//     var futureDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000); // 현재 날짜에 i일을 더한 날짜 계산
//     var month = futureDate.getMonth() + 1; // 월은 0부터 시작하므로 +1 처리
//     var day = futureDate.getDate();
//     var formattedDate = month + "/" + day;
//     dates.push(formattedDate);
//   }

//   return dates;
// }

console.log(formattedDate2)