function loc2(){
  let locate;
  let loca = JSON.parse(localStorage.getItem("loca"));

  if(loca == '강원도' || loca=== '강원'){
    locate = "11D20000"
  }else if(loca == '서울시' || loca ==='경기도' || loca === '인천시' || loca == '서울'){
    locate = "11B00000"
  } else if(loca === '대전시' || loca ==='세종' || loca ==='충청남도'){
    locate = "11C20000"
  } else if(loca === '충청북도'){
    locate = "11C10000"
  } else if(loca === "광주시" || loca ==="전라남도"){
    locate = "11F20000"
  } else if(loca ==='전라북도'){
    locate = "11F10000"
  } else if(loca ==='대구시' || loca ==="경상북도"){
    locate = "11H10000"
  } else if(loca === '부산시' || loca ==='울산시' || loca ==="경상남도"){
    locate = "11H20000"
  } else if(loca === "제주도"){
    locate = "11G00000"
  }
  return locate
}

const loc3 = loc2();

var day = [];
const formattedDate = getFormattedDate();

const DATE = document.querySelectorAll(".date");
const info1 = document.querySelectorAll(".AM");
const info2 = document.querySelectorAll(".PM");
const rp = document.querySelectorAll(".rp");
        day = getDates();
                  console.log(day);
                  
                  for(i = 0; i < 10; i++){
                    DATE[i].innerText = day[i];
                  }
console.log(formattedDate)

console.log(loc3)
console.log(doNm)
$.getJSON(
          "https://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst?serviceKey="
          +"키&pageNo=1"
          +"&numOfRows=10&dataType=JSON&regId="+loc3+"&tmFc="+formattedDate+"0600",
          function(result){
                  
              let content1 = [];
              let content2 = [];
              let content3 = [];
              let rp1 = [];
              let rp2 = [];
              let rp3 = [];
              let item = result.response.body.items.item[0];
              console.log(item)
              let j = 3;
  
              for(let i = 0; i <= 7; i++){
              let propertyName1 = 'wf' + j + 'Am';
              let propertyName2 = 'wf' + j + 'Pm';
              let propertyName3 = 'wf' + j;
              let propertyName4 = 'rnSt' + j + 'Am';
              let propertyName5 = 'rnSt' + j + 'Pm';
              let propertyName6 = 'rnSt' + j;
              console.log(propertyName1)
              if(j < 8){
                    content1[i] = item[propertyName1];
                    content2[i] = item[propertyName2];
                    rp1[i] = item[propertyName4];
                    rp2[i] = item[propertyName5];
                    j++;
                  
                  }else{
                      content3[i-5] = item[propertyName3];
                      rp3[i-5] = item[propertyName6];
                      
                      j++;
                    }
                    console.log(propertyName4)
                }
              
              
              console.log(content1, content2, content3)
              
              
              for(let i = 0; i <= 4; i++){
                switch(content1[i]){
                  
                  case "맑음":
                    info1[i+2].innerHTML =  "<img src='"+ `${contextPath}` + "/resources/images/sunny.jpg' width= '50px' height= '50px'>"
                    break;
                    
                  case "구름많음":
                    info1[i+2].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/cloud.jpg' width= '50px' height= '50px'>"
                    break;
                      
                      case "흐림":
                        info1[i+2].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/cloudMany.jpg' width= '65px' height= '65px'>"
                        break;
                      
                      case "구름많고 비":
                        info1[i+2].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/rain.jpg' width= '65px' height= '65px'>"
                        break;

                      case "구름많고 눈":
                        info1[i+2].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/snowy.jpg' width= '65px' height= '65px'>"
                        break;

                      case "구름많고 비/눈":
                        info1[i+2].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/snowy.jpg' width= '65px' height= '65px'>"
                        break;

                      case "구름많고 소나기":
                        info1[i+2].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/rain.jpg' width= '65px' height= '65px'>"
                        break;

                      case "흐리고 비":
                        info1[i+2].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/rain.jpg' width= '65px' height= '65px'>"
                        break;

                      case "흐리고 눈":
                        info1[i+2].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/snowy.jpg' width= '65px' height= '65px'>"
                        break;

                      case "흐리고 비/눈":
                        info1[i+2].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/snowy.jpg' width= '65px' height= '65px'>"
                        break;
                      
                      case "흐리고 소나기":
                        info1[i+2].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/rain.jpg' width= '65px' height= '65px'>"
                        break;
                    }
              }

              for(let i = 0; i <= 4; i++){
                    switch(content2[i]){
                    case "맑음":
                    info2[i+2].innerHTML =  "<img src='"+ `${contextPath}` + "/resources/images/sunny.jpg' width= '50px' height= '50px'>"
                    break;

                    case "구름많음":
                      info2[i+2].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/cloud.jpg' width= '50px' height= '50px'>"
                      break;
                    
                    case "흐림":
                      info2[i+2].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/cloudMany.jpg' width= '65px' height= '65px'>"
                      break;

                      case "구름많고 비":
                        info2[i+2].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/rain.jpg'" + "width= '65px' height= '65px'>"
                        break;

                      case "구름많고 눈":
                        info2[i+2].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/snowy.jpg' width= '65px' height= '65px'>"
                        break;

                      case "구름많고 비/눈":
                        info2[i+2].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/snowy.jpg' width= '65px' height= '65px'>"
                        break;

                      case "구름많고 소나기":
                        info2[i+2].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/rain.jpg' width= '65px' height= '65px'>"
                        break;

                      case "흐리고 비":
                        info2[i+2].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/rain.jpg' width= '65px' height= '65px'>"
                        break;

                      case "흐리고 눈":
                        info2[i+2].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/snowy.jpg width= '65px' height= '65px'>"
                        break;

                      case "흐리고 비/눈":
                        info2[i+2].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/snowy.jpg' width= '65px' height= '65px'>"
                        break;
                      
                      case "흐리고 소나기":
                        info2[i+2].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/rain.jpg' width= '65px' height= '65px'>"
                        break;
                    }
                    
                    rp[i+2].innerHTML ="강수 확률"+"<br>"+ "AM : " + rp1[i]+" %<br>" + "PM : " + rp2[i]+" %"
                  }

                  let a = 7;
                  for(let i = 0; i <= 2; i++){
                    
                    switch(content3[i]){
                      case "맑음":
                      info1[a].innerHTML ="<img src='"+ `${contextPath}` + "/resources/images/sunny.jpg' width= '50px' height= '50px'>"
                      break;
                        
                      case "구름많음":
                      info1[a].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/cloud.jpg' width= '50px' height= '50px'>"
                      break;
                          
                      case "흐림":
                      info1[a].innerHTML ="<img src='"+ `${contextPath}` + "/resources/images/cloudMany.jpg' width= '65px' height= '65px'>"
                      break;

                      case "구름많고 비":
                        info1[a].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/rain.jpg' width= '65px' height= '65px'>"
                        break;

                      case "구름많고 눈":
                        info1[a].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/snowy.jpg' width= '65px' height= '65px'>"
                        break;

                      case "구름많고 비/눈":
                        info1[a].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/snowy.jpg' width= '65px' height= '65px'>"
                        break;

                      case "구름많고 소나기":
                        info1[a].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/rain.jpg' width= '65px' height= '65px'>"
                        break;

                      case "흐리고 비":
                        info1[a].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/rain.jpg' width= '65px' height= '65px'>"
                        break;

                      case "흐리고 눈":
                        info1[a].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/snowy.jpg' width= '65px' height= '65px'>"
                        break;

                      case "흐리고 비/눈":
                        info1[a].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/snowy.jpg' width= '65px' height= '65px'>"
                        break;
                      
                      case "흐리고 소나기":
                        info1[a].innerHTML = "<img src='"+ `${contextPath}` + "/resources/images/rain.jpg' width= '65px' height= '65px'>"
                        break;
                      
                    }
                    rp[a].innerHTML = "강수 확률" +"<br>" + rp3[i] +" %";

                    a++;
                  }

                  

});



function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  
  // 시간이 00시 부터 05시 사이일 경우, 전날의 날짜로 설정
  if (date.getHours() >= 0 && date.getHours() < 7){
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

function getDates() {
  var today = new Date(); // 현재 날짜를 가져옴
  var dates = [];

  for (var i = 1; i <= 10; i++) {
    var futureDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000); // 현재 날짜에 i일을 더한 날짜 계산
    var month = futureDate.getMonth() + 1; // 월은 0부터 시작하므로 +1 처리
    var day = futureDate.getDate();
    var formattedDate = month + "/" + day;
    dates.push(formattedDate);
  }

  return dates;
}
