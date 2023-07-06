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
    childSelect = document.querySelector(".childSelect"),
    priceElement = document.getElementById("priceSum"),
    totalday = localStorage.getItem("totalDay");


let a = document.getElementsByClassName("a")[0];
let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let selectMonth = document.querySelectorAll(".pickMonth");
let selectDay = document.querySelectorAll(".pickDay");
let mon = document.querySelectorAll(".mon");
let dat = document.querySelectorAll(".dat");
let wave = document.querySelector(".wave");
let dat2 = document.querySelectorAll(".dat2");
const check = document.querySelector(".check")
const total_days = document.querySelector(".total-days");
var datePick = document.getElementsByClassName("day");
var dayBetween = document.getElementsByClassName("dayBetween");


let todayYear = new Date().getFullYear();

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

const currentDate = new Date(); // 현재 날짜와 시간을 가지는 Date 객체 생성
const currentDateString = currentDate.toLocaleDateString('ko-KR', {month: 'short', day: 'numeric', year: 'numeric'});
console.log(currentDate)
let currentMonth = new Date().getMonth() + 1;
let firstSelectDate
let secondSelectDate
let firstDateString

console.log(currentDateString);

// ----------------------------------------------달력 생성 ------------------------------------------------------------------
function initCalendar(){
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    // 달력 위쪽 년/월 업데이트
    date.innerHTML = months[month] + " " + year;
    
    // 날짜
    let days =""; 

    // 다음 월
    for ( let x = day; x > 0; x-- ){
        days += `<div class="day prev-date" style="pointer-events: none;">${prevDays - x + 1}</div>`;
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
        days += `<div class="day next-date" style="pointer-events: none;">${j}</div>`;
    }
    
    daysContainer.innerHTML = days;

    for(let i=0; i<datePick.length; i++) {
        datePick[i].addEventListener("click", (e) => {
            if(count == 0) {
                
                selectMonth[0].value = (month+1);
                selectDay[0].value = e.target.innerText;
                firstSelectDate = new Date(todayYear + "-" + selectMonth[0].value + "-" + selectDay[0].value);
                if(firstSelectDate <= currentDate){
                    alert("올바른 날짜를 입력하세요.")
                    reselect1();
                    return false;
                }
                mon[0].value ="월";
                dat[0].value ="일";
                const selectedDayOfWeek = getSelectedDayOfWeek();
                console.log("요일"+selectedDayOfWeek)
                dat2[0].value = '\u00A0'+"("+selectedDayOfWeek+")"
                
                

                wave.value = "~"
                count++;
            } else if(count == 1) {
                selectMonth[1].value = (month+1);
                selectDay[1].value = e.target.innerText;
                secondSelectDate = new Date(todayYear + "-" + selectMonth[1].value + "-" + selectDay[1].value);
                
                if(secondSelectDate < firstSelectDate){
                    alert("올바른 날짜를 입력해 주세요.")
                    
                    count == 0;

                    reselect1();

                    return false;
                }
                mon[1].value ="월";
                dat[1].value ="일";
                const selectedDayOfWeek2 = getSelectedDayOfWeek2();
                
                dat2[1].value = '\u00A0'+"("+selectedDayOfWeek2+")"
                var test = calculateDays();
                dayBetween[0].innerText = test + "박";
                dayBetween[1].innerText = test+ 1 + "일";
                
                check.classList.add("sel");
                total_days.classList.add("sel");
                

               /*  a.innerText = test + "박" + (test+1) + "일"; */
                localStorage.clear();
                localStorage.setItem("totalDay", test);
                localStorage.setItem("Month", selectMonth[0].value)
                console.log("스토리지'Month' :: "+localStorage.getItem("Month"));
                count = 0;

                /* let monthValue = localStorage.getItem("Month"); */

                $.ajax({
                    url: "selectPrice",
                    type: "GET",
                    data: {"month" : Number(selectMonth[0].value)},
                    success: function(price) {
                        console.log(price);
                        console.log("몇월달 ? " + Number(selectMonth[0].value));
                        let childrenPrice = price * 0.5;
                        let adultOptionValue = adultSelect.value;
                        let adultTotalPrice = price * adultOptionValue;
                        
                        

                        let childrenOptionValue = childSelect.value;
                        let childrenTotalPrice = childrenPrice * childrenOptionValue;
                        
                        let totalPeople = Number(adultOptionValue) + Number(childrenOptionValue);
                        
                        let totalPrice = 0;

                       

                        if(localStorage.getItem("totalDay") == null) {
                            totalPrice = (adultTotalPrice + childrenTotalPrice)*0;
                        } else {
                            totalPrice = (adultTotalPrice + childrenTotalPrice)*localStorage.getItem("totalDay");
                        }
                        localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
                        console.log(localStorage.getItem("totalPrice"))
                        priceValue = totalPrice;
                        people = totalPeople;
                      
                        
                        console.log(people);
                        console.log(adultOptionValue);
                        console.log(childrenOptionValue);
                        console.log("스토리지js" + localStorage.getItem("totalDay"));
                        

                    },
                    error: function() {
                        console.log("에러 발생");
                    }
                });
                let datePicker = {
                    sel1 : selectMonth[0].value + mon[0].value + selectDay[0].value + dat[0].value,
                   
                    selmon2 : selectMonth[1].value + mon[1].value + selectDay[1].value + dat[1].value
                    }
                localStorage.setItem('datePicker', JSON.stringify(datePicker));
                console.log(localStorage.getItem('datePicker'));
           }

        });

    }
    localStorage.clear();
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

let count = 0;

reselect.addEventListener("click", function(){

    selectMonth[0].value ="";
    selectDay[0].value ="";
    selectMonth[1].value ="";
    selectDay[1].value ="";
    dayBetween[0].innerText = "";
    dayBetween[1].innerText = "";
    mon[0].value ="";
    mon[1].value ="";
    dat[0].value="";
    dat[1].value="";
    dat2[0].value ="";
    dat2[1].value ="";
    wave.value="";
    count = 0;
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    
    dateInput.value ="";
    localStorage.clear();
    
    check.classList.remove("sel")
    total_days.classList.remove("sel")
    
    
    console.log(count)
    console.log(localStorage.getItem("totalDay"))
    
    initCalendar();
});

function reselect1(){
    selectMonth[0].value =null;
    selectDay[0].value =null;
    selectMonth[1].value =null;
    selectDay[1].value =null;
    dayBetween[0].innerText = null;
    dayBetween[1].innerText = null;
    mon[0].value =null;
    mon[1].value =null;
    dat[0].value=null;
    dat[1].value=null;
    dat2[0].value =null;
    dat2[1].value =null;
    wave.value=null;
    count = 0;
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    
    dateInput.value =null;
    localStorage.clear();
    
    check.classList.remove("sel")
    total_days.classList.remove("sel")
    
    
    console.log(count)
    console.log(localStorage.getItem("totalDay"))
    
    initCalendar();
}
var totalDay = calculateDays();
function calculateDays() {
    const startDate = new Date(year, selectMonth[0].value, selectDay[0].value);
    const endDate = new Date(year, selectMonth[1].value, selectDay[1].value);
    
    // 24시간(ms) * 60분 * 60초 * 1000을 통해 1일을 나타내는 밀리초 단위의 값을 구합니다.
    const oneDay = 24 * 60 * 60 * 1000;
  
    // 시작 날짜와 종료 날짜 사이의 일수를 계산합니다.
    const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
    

    return diffDays;
}

function getSelectedDayOfWeek() {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

    const selectedMonth = selectMonth[0].value -1;
    const selectedDay = selectDay[0].value;
    const selectedYear = year;
  
    const selectedDate = new Date(selectedYear,selectedMonth,selectedDay).getDay();
    
    const dayOfWeek = daysOfWeek[selectedDate];
  
    return dayOfWeek;
  }

  function getSelectedDayOfWeek2() {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

    const selectedMonth = selectMonth[1].value -1;
    const selectedDay = selectDay[1].value;
    const selectedYear = year;
  
    const selectedDate = new Date(selectedYear,selectedMonth,selectedDay).getDay();
    
    const dayOfWeek = daysOfWeek[selectedDate];
  
    return dayOfWeek;
  }
  
  
  

  
  
//   var daysBetween = calculateDays();
//   console.log(daysBetween);  // 예상 결과: 21
  




