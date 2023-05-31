const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input"),
    reselect = document.querySelector(".reselect"),
    selectDays = document.querySelector(".selectDays"),
    adultSelect = document.querySelector(".adultSelect"),
    childrenSelect = document.querySelector(".childrenSelect"),
    priceElement = document.getElementById("priceSum"),
    totalday = localStorage.getItem("totalDay");


let a = document.getElementsByClassName("a")[0];
let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let selectMonth = document.querySelectorAll(".pickMonth");
let selectDay = document.querySelectorAll(".pickDay");

var datePick = document.getElementsByClassName("day");
var dayBetween = document.getElementsByClassName("dayBetween");

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];


// ----------------------------------------------달력 생성 ------------------------------------------------------------------
function initCalendar(){
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDate();
    const nextDays = 7 - lastDay.getDay() - 1;

    // 달력 위쪽 년/월 업데이트
    date.innerHTML = months[month] + " " + year;
    
    // 날짜
    let days =""; 

    // 다음 월
    for ( let x = day; x > 0; x-- ){
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }
    
    // 현재 월 일 생성
    for(let i = 1; i <= lastDate; i++) {
        
        if(
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ){
            days += `<div class="day today">${i}</div>`;
        } 
        else{
            days += `<div class="day">${i}</div>`;
        }
    }
       

    // 다음 월 일
    
    for (let j = 1; j <= nextDays -3; j++){
        days += `<div class="day next-date">${j}</div>`;
    }
    
    daysContainer.innerHTML = days;

    for(let i=0; i<datePick.length; i++) {
        datePick[i].addEventListener("click", (e) => {
            if(count == 0) {
                selectMonth[0].innerText = (month+1);
                selectDay[0].innerText = e.target.innerText;
                count++;
            } else if(count == 1) {
                selectMonth[1].innerText = (month+1);
                selectDay[1].innerText = e.target.innerText;
                var test = calculateDays();
            
                dayBetween[0].innerText = test + "박";
                dayBetween[1].innerText = test+1 + "일";
            
                a.innerText = test + "박" + (test+1) + "일";
                localStorage.clear();
                localStorage.setItem("totalDay", test);
                localStorage.setItem("Month", selectMonth[0].innerText)
                console.log("스토리지'Month' :: "+localStorage.getItem("Month"));
                count = 0;

                /* let monthValue = localStorage.getItem("Month"); */

                $.ajax({
                    url: "selectPrice",
                    type: "GET",
                    data: {"month" : Number(selectMonth[0].innerText)},
                    success: function(price) {
                  /*       console.log(price); */
                        console.log("ajax 안 month :: " + Number(selectMonth[0].innerText));
                        let childrenPrice = price * 0.5;
                        let adultOptionValue = adultSelect.options[adultSelect.selectedIndex].value;
                        let adultTotalPrice = price * adultOptionValue;
                        
                        

                        let childrenOptionValue = childrenSelect.options[childrenSelect.selectedIndex].value;
                        let childrenTotalPrice = childrenPrice * childrenOptionValue;
                        
                        let totalPeople = Number(adultOptionValue) + Number(childrenOptionValue);
                        
                        let totalPrice = 0;

                       

                        if(localStorage.getItem("totalDay") == null) {
                            totalPrice = (adultTotalPrice + childrenTotalPrice)*0;
                        } else {
                            totalPrice = (adultTotalPrice + childrenTotalPrice)*localStorage.getItem("totalDay");
                        }
                        priceElement.textContent = "총 가격: " + totalPrice + "원";
                        priceValue = totalPrice;
                        people = totalPeople;
                    
                        
/*                         console.log(people);
                        console.log(adultOptionValue);
                        console.log(childrenOptionValue);
                        console.log(localStorage.getItem("totalDay")) */
                        

                    },
                    error: function() {
                        console.log("에러 발생");
                    }
                });

                
           }

           
        
        });

        
    }
    
};

initCalendar();

// 이동하고자 하는 년,월 인풋 정규식
dateInput.addEventListener("input", (e)=>{

    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if(dateInput.value.length === 2){
        dateInput.value += "/";
    }
    if(dateInput.value.length > 7){
        dateInput.value = dateInput.value.slice(0, 7);
    }
    if(e.inputType === "deleteContentBackward"){
        if(dateInput.value.length === 3){
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

// 선택 월/일 이동 ----------------------------------------------------------------------------------------------------------
gotoBtn.addEventListener("click",function(){
   
    
    const dateArr = dateInput.value.split("/");
    console.log(dateArr);
    if(dateArr.length === 2){
        if(dateArr[0] > 0 && 
            dateArr[0] < 13 && 
            dateArr[1].length === 4
           ){
            month = dateArr[0] -1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    alert("올바른 날짜를 입력하세요.");

});

// 이전 달 이동 ----------------------------------------------------------------------------------------------------------
function prevMonth(){
    month --;
    if( month < 0){
        month = 11;
        year --;
    }
    initCalendar();
    
}
// 다음 달 이동 ----------------------------------------------------------------------------------------------------------
function nextMonth(){
    month ++;
    if( month > 11){
        month = 0;
        year++;
    }
    initCalendar();
    
}
//----------------------------------------------------------------------------------------------------------

// 이전달 다음달 이벤트
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

// 오늘 날짜로 이동 ---------------------------------------------------------------------------------------------------------------
todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
   
});

var count = 0;

reselect.addEventListener("click", function(){

    selectMonth[0].innerText ="";
    selectDay[0].innerText ="";
    selectMonth[1].innerText ="";
    selectDay[1].innerText ="";
    dayBetween[0].innerText = "";
    dayBetween[1].innerText = "";
    count = 0;
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    
    dateInput.value ="";
    localStorage.clear();
    
    
    console.log(count)
    console.log(localStorage.getItem("totalDay"))
    priceElement.textContent = "총 가격 : 0원"

    initCalendar();
});
var totalDay = calculateDays();
function calculateDays() {
    const startDate = new Date(year, selectMonth[0].innerText, selectDay[0].innerText);
    const endDate = new Date(year, selectMonth[1].innerText, selectDay[1].innerText);
    
    // 24시간(ms) * 60분 * 60초 * 1000을 통해 1일을 나타내는 밀리초 단위의 값을 구합니다.
    const oneDay = 24 * 60 * 60 * 1000;
  
    // 시작 날짜와 종료 날짜 사이의 일수를 계산합니다.
    const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
    //console.log(diffDays);

    return diffDays;
  }
  
//   var daysBetween = calculateDays();
//   console.log(daysBetween);  // 예상 결과: 21
  





