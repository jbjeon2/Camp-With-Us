



//  시 군 구 option List 
function categoryChange(e) {
  const state = document.getElementById("state");

  const gangwon = ["강릉시", "동해시", "삼척시", "속초시", "원주시", "춘천시", "태백시", "고성군", "양구군", "양양군", "영월군", "인제군", "정선군", "철원군", "평창군", "홍천군", "화천군", "횡성군"];
  const gyeonggi = ["고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양주시", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시", "가평군", "양평군", "여주군", "연천군"];
  const gyeongsangnam = ["거제시", "김해시", "마산시", "밀양시", "사천시", "양산시", "진주시", "진해시", "창원시", "통영시", "거창군", "고성군", "남해군", "산청군", "의령군", "창녕군", "하동군", "함안군", "함양군", "합천군"];
  const gyeongsangbuk = ["경산시", "경주시", "구미시", "김천시", "문경시", "상주시", "안동시", "영주시", "영천시", "포항시", "고령군", "군위군", "봉화군", "성주군", "영덕군", "영양군", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군"];
  const gwangju = ["광산구", "남구", "동구", "북구", "서구"];
  const daegu = ["남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군"];
  const daejeon = ["대덕구", "동구", "서구", "유성구", "중구"];
  const busan = ["강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구", "기장군"];
  const seoul = ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"];
  const ulsan = ["남구", "동구", "북구", "중구", "울주군"];
  const incheon = ["계양구", "남구", "남동구", "동구", "부평구", "서구", "연수구", "중구", "강화군", "옹진군"];
  const jeonnam = ["광양시", "나주시", "목포시", "순천시", "여수시", "강진군", "고흥군", "곡성군", "구례군", "담양군", "무안군", "보성군", "신안군", "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"];
  const jeonbuk = ["군산시", "김제시", "남원시", "익산시", "전주시", "정읍시", "고창군", "무주군", "부안군", "순창군", "완주군", "임실군", "장수군", "진안군"];
  const jeju = ["서귀포시", "제주시", "남제주군", "북제주군"];
  const chungbuk = ["제천시", "청주시", "충주시", "괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "증평군", "진천군", "청원군"];
  const chungnam = ["천안시", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"]



  if (e.value == "서울") {
    add = seoul;
  } else if (e.value == "부산") {
    add = busan;
  } else if (e.value == "대구") {
    add = daegu;
  } else if (e.value == "인천") {
    add = incheon;
  } else if (e.value == "광주") {
    add = gwangju;
  } else if (e.value == "대전") {
    add = daejeon;
  } else if (e.value == "울산") {
    add = ulsan;
  } else if (e.value == "경기") {
    add = gyeonggi;
  } else if (e.value == "강원") {
    add = gangwon;
  } else if (e.value == "충청북도") {
    add = chungbuk;
  } else if (e.value == "충청남도") {
    add = chungnam;
  } else if (e.value == "전라북도") {
    add = jeonbuk;
  } else if (e.value == "전라남도") {
    add = jeonnam;
  } else if (e.value == "경상북도") {
    add = gyeongsangbuk;
  } else if (e.value == "경상남도") {
    add = gyeongsangnam;
  } else if (e.value == "제주") {
    add = jeju;
  }

  state.options.length = 1;
  // 군/구 갯수;

  for (property in add) {
    let opt = document.createElement("option");
    opt.value = add[property];
    opt.innerHTML = add[property];
    state.appendChild(opt);
  }
}

const selectCampBtn = document.getElementById("selectCampBtn");  // 검색하기 버튼 
const searchBox = document.getElementById("searchBox"); // 검색결과 뽑아내는 section .
const searchVal1 = document.getElementById("searchVal1"); // 검색창 inputtext
const searchVal2 = document.getElementById("searchVal2"); // 광역시 option
const state = document.getElementById("state"); // 시군구 option 
const searchVal3 = document.getElementById("searchVal3"); // 테마 option
const searchBox2 = document.getElementById("searchBox2");  // 검색결과 뽑아내는 div
const searchVal = document.getElementById("searchVal"); // 목록 div
const campResult = document.getElementById("campResult");  // "위치+갯수" 알려주는 h2태그

selectCampBtn.addEventListener("click", function () {

  searchBox2.innerHTML = "";

  $.ajax({
    url: "https://apis.data.go.kr/B551011/GoCamping/basedList",
    data: {
      numOfRows: 3467,
      pageNo: 1,
      MobileOS: "ETC",
      MobileApp: "AppTest",
      serviceKey: "",
      _type: "json"
    },
    dataType: "json",
    
    success: function (result) {
      console.log("API 호출 성공");
      console.log(result);


      
      var items = result.response.body.items.item;
      var searchVal2_1 = "";
      var currentPage = 1;
      var itemsPerPage = 10;

      if (searchVal2.value == "충청북도") {
        searchVal2_1 = "충북";
      } else if (searchVal2.value == "충청남도") {
        searchVal2_1 = "충남";
      } else if (searchVal2.value == "전라북도") {
        searchVal2_1 = "전북";
      } else if (searchVal2.value == "전라남도") {
        searchVal2_1 = "전남";
      } else if (searchVal2.value == "경상북도") {
        searchVal2_1 = "경북";
      } else if (searchVal2.value == "경상남도") {
        searchVal2_1 = "경남";
      } else {
        searchVal2_1 = "";
      }

      function displayItems(page) {
        var startIndex = (page - 1) * itemsPerPage;
        var endIndex = startIndex + itemsPerPage;
        var filteredItems = items.filter(item => {
          return (
            (searchVal2.value == "충청북도" || searchVal2.value == "충청남도" || searchVal2.value == "전라북도" ||
              searchVal2.value == "전라남도" || searchVal2.value == "경상북도" || searchVal2.value == "경상남도")
            && (item.homepage != ""     // 홈페이지가 null 이 아닌 것
              && item.firstImageUrl != ""   // 이미지가 ''
              && item.tel != ""             // 전화번호가 ''
              && item.lineIntro != ""       // 한줄소개가 ''
              && item.addr1 != ""          // 주소가 ''
              && (item.facltNm.replace(" ","").includes(searchVal1.value) // 캠핑장이름과 일치
              || item.facltNm.includes(searchVal1.value))
              && (item.addr1.includes(searchVal2.value)   // 시,도 일치
                || item.addr1.includes(searchVal2_1))     // 시,도 줄임말 일치
              && item.addr1.includes(state.value)   // 시, 군, 구 일치
              && item.induty.includes(searchVal3.value)
            )
          )
            ||

            (
              (item.homepage != ""     // 홈페이지가 null 이 아닌 것
                && item.firstImageUrl != ""   // 이미지가 ''
                && item.tel != ""             // 전화번호가 ''
                && item.lineIntro != ""       // 한줄소개가 ''
                && item.addr1 != ""          // 주소가 ''
                && (item.facltNm.replace(" ","").includes(searchVal1.value) // 캠핑장이름과 일치
                || item.facltNm.includes(searchVal1.value))
                && item.addr1.includes(searchVal2.value)   // 시,도 일치
                && item.addr1.includes(state.value)   // 시, 군, 구 일치
                && item.induty.includes(searchVal3.value)
              )
            );
        }); 

        console.log("캠핑장수 : " + filteredItems.length);
        console.log("필터링" + filteredItems);

        if ( searchVal2.value==""){
          campResult.innerHTML= "캠핑장 총 <span style='color:#22c730;'>" + filteredItems.length + "</span>개 검색 되었습니다.";
          }else {
          campResult.innerHTML= "<span style='color:#22c730;'>" + searchVal2.value + "</span>지역 캠핑장 총 <span style='color:#22c730;'>" + filteredItems.length + "</span>개 검색 되었습니다.";
          };


        // 데이터 수에 맞게 페이지네이션 생성
        var totalPages = Math.ceil(filteredItems.length / itemsPerPage);
        var paginatedItems = filteredItems.slice(startIndex, endIndex);

        searchBox2.innerHTML = "";

        paginatedItems.forEach(item => {
          console.log("아이템" + item);

          var htmlCode =
            '<ul>' +
            '<li>' +
            '<div class="camp_info_box">' +
            '<div class="img_box">' +
            '<a href="/camp/campList/detailList?campName='+item.facltNm.replaceAll(" ","")+'&viewType=1">'+
            '<img src=' + item.firstImageUrl + ' alt="이미지가 존재하지 않습니다." class="imgSize"></a>' +
            '</div>' +
            '<div class="camp_info_text">' +
            '<h3 class="camp_info01">' +
            '<a href="/camp/campList/detailList?campName='+item.facltNm.replaceAll(" ","")+'&viewType=1">' + item.facltNm + '</a>' +
            '</h3>' +
            '<h5 id="lineIntro">' + item.lineIntro + '</h5>' +
            '<span class="camp_info03">' +
            '<a href="/camp/campList/detailList?campName='+item.facltNm.replaceAll(" ","")+'&viewType=1"">'+(item.intro).substr(0,60)+'.....</a>' +
            '</span><br>' +
            '<span>테마 &nbsp;&nbsp;&nbsp;&nbsp;: ' + item.induty + '</span><br>' +
            '<span class="camp_add">주소 &nbsp;&nbsp;&nbsp;&nbsp;: ' + item.addr1 + '</span><br>' +
            '<span class="camp_phone">연락처 &nbsp;: ' + item.tel + '</span><br>' +
            '<span class="camp_reserve">예약방법 : ' + item.resveCl + '</span>' +
            '<a href="/camp/campList/detailList?campName='+item.facltNm.replaceAll(" ","")+'&viewType=1" class="reservation_button">상세보기</a>'+
            '</div>' +
            '</div>' +
            '</li>' +
            '</ul><br><br>';

          searchBox2.innerHTML += htmlCode;
        });

        // 페이지네이션 부분 
        var pagination = document.getElementById("pagination");
        pagination.innerHTML = "";

        var startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
        var endPage = Math.min(startPage + 4, totalPages);
        
        if (startPage > 1) {
          var prevButton = document.createElement("button");
          prevButton.textContent = "이전";
          prevButton.classList.add("pagination-previous");
          prevButton.addEventListener("click", function () {
            currentPage = startPage - 5;
            displayItems(currentPage);
            window.scrollTo(0, 0);

          });
          pagination.appendChild(prevButton);
        }
        for (var i = startPage; i <= endPage; i++) {
          var pageButton = document.createElement("button");
          pageButton.textContent = i;
          pageButton.classList.add("page-button");
          if (i === currentPage) {
            pageButton.classList.add("active");
          }
          pageButton.addEventListener("click", function () {
            currentPage = parseInt(this.textContent);
            displayItems(currentPage);
            window.scrollTo(0, 0);
          });
          pagination.appendChild(pageButton);
        }
        if (endPage < totalPages) {
          var nextButton = document.createElement("button");
          nextButton.textContent = "다음";
          nextButton.classList.add("pagination-next");
          nextButton.addEventListener("click", function () {
            currentPage = endPage + 1;
            displayItems(currentPage);
            window.scrollTo(0, 0);
          });
          pagination.appendChild(nextButton);
        }
        
      }
      displayItems(currentPage);
    },
    beforeSend:function(){

    $('.wrap-loading').removeClass('display-none');

  }
  ,complete:function(){
    $('.wrap-loading').addClass('display-none');
}
    ,error: function (error) {
      console.log("API 호출 실패");
      console.log(error);
    }
  });

});


  
  //  메인페이지에서 "loc" 값을 받아왔을때 
  //  "loc" 지역정보 즉시출력 . onload 
if( (loc != "" && theme != "" && campName != "") || (loc != "" || theme != "" || campName != "" ) 
          || ( loc == "" &&  theme == "" && campName == "") 
) {
window.onload = function() {

  if( loc != "" && theme != "" && campName != "") {
    searchVal1.value = campName;
    searchVal2.value = loc;
    searchVal3.value = theme;
  } else if( loc != "" && theme != "") {
    searchVal2.value = loc;
    searchVal3.value = theme;
  } else if( theme != "" && campName != "") {
    searchVal1.value = campName;
    searchVal3.value = theme;
  } else if ( loc != "" && campName != "") {
    searchVal1.value = campName;
    searchVal2.value = loc;
  } else if(loc != "") {
    searchVal2.value = loc;
  } else if(theme != "") {
    searchVal3.value = theme;
  } else if(campName != "") {
    searchVal1.value = campName;
  }

  searchBox2.innerHTML = "";

  $.ajax({
    url: "https://apis.data.go.kr/B551011/GoCamping/basedList",
    data: {
      numOfRows: 3467,
      pageNo: 1,
      MobileOS: "ETC",
      MobileApp: "AppTest",
      serviceKey: "",
      _type: "json"
    },
    dataType: "json",

    
    success: function (result) {
      console.log("API 호출 성공");
      // console.log(result);
      
      var items = result.response.body.items.item;
      var searchVal2_1 = "";
      var currentPage = 1;
      var itemsPerPage = 10;

      if (searchVal2.value == "충청북도") {
        searchVal2_1 = "충북";
      } else if (searchVal2.value == "충청남도") {
        searchVal2_1 = "충남";
      } else if (searchVal2.value == "전라북도") {
        searchVal2_1 = "전북";
      } else if (searchVal2.value == "전라남도") {
        searchVal2_1 = "전남";
      } else if (searchVal2.value == "경상북도") {
        searchVal2_1 = "경북";
      } else if (searchVal2.value == "경상남도") {
        searchVal2_1 = "경남";
      } else {
        searchVal2_1 = "";
      }


      function displayItems(page) {
        var startIndex = (page - 1) * itemsPerPage;
        var endIndex = startIndex + itemsPerPage;
        var filteredItems = items.filter(item => {
          return (
            (searchVal2.value == "충청북도" || searchVal2.value == "충청남도" || searchVal2.value == "전라북도" ||
              searchVal2.value == "전라남도" || searchVal2.value == "경상북도" || searchVal2.value == "경상남도")
            && (item.homepage != ""     // 홈페이지가 null 이 아닌 것
              && item.firstImageUrl != ""   // 이미지가 ''
              && item.tel != ""             // 전화번호가 ''
              && item.lineIntro != ""       // 한줄소개가 ''
              && item.addr1 != ""          // 주소가 ''
              && (item.facltNm.replace(" ","").includes(searchVal1.value) // 캠핑장이름과 일치
              || item.facltNm.includes(searchVal1.value))
              && (item.addr1.includes(searchVal2.value)   // 시,도 일치
                || item.addr1.includes(searchVal2_1))     // 시,도 줄임말 일치
              && item.addr1.includes(state.value)   // 시, 군, 구 일치
              && item.induty.includes(searchVal3.value)
            )
          )
            ||
            (
              (item.homepage != ""     // 홈페이지가 null 이 아닌 것
                && item.firstImageUrl != ""   // 이미지가 ''
                && item.tel != ""             // 전화번호가 ''
                && item.lineIntro != ""       // 한줄소개가 ''
                && item.addr1 != ""          // 주소가 ''
                && (item.facltNm.replace(" ","").includes(searchVal1.value) // 캠핑장이름과 일치
                || item.facltNm.includes(searchVal1.value))
                && item.addr1.includes(searchVal2.value)   // 시,도 일치
                && item.addr1.includes(state.value)   // 시, 군, 구 일치
                && item.induty.includes(searchVal3.value)
              )
            );
        });

 
        if ( searchVal2.value==""){
          campResult.innerHTML= "캠핑장 총 <span style='color:#22c730;'>" + filteredItems.length + "</span>개 검색 되었습니다.";
          }else {
          campResult.innerHTML= "<span style='color: #22c730;'>" + searchVal2.value + "</span>지역 캠핑장 총 <span style='color:#22c730;'>" + filteredItems.length + "</span>개 검색 되었습니다.";
          };
        // 데이터 수에 맞게 페이지네이션 생성
        var totalPages = Math.ceil(filteredItems.length / itemsPerPage);
        var paginatedItems = filteredItems.slice(startIndex, endIndex);

        searchBox2.innerHTML = "";


        paginatedItems.forEach(item => {

          // console.log(item);
          // 전체데이터 뽑는대신, 이미지없으면 기본이미지 넣어주기.
  /*         if ( item.firstImageUrl == "" || item.firstImageUrl==null){
            item.firstImageUrl = contextPath+"/resources/images/cloud.jpg";
          } */

          var htmlCode =
          '<ul>' +
          '<li>' +
          '<div class="camp_info_box">' +
          '<div class="img_box">' +
          '<a href="/camp/campList/detailList?campName='+item.facltNm.replaceAll(" ","")+'&viewType=1">'+
          '<img src=' + item.firstImageUrl + ' alt="이미지가 존재하지 않습니다." class="imgSize"></a>' +
          '</div>' +
          '<div class="camp_info_text">' +
          '<h3 class="camp_info01">' +
          '<a href="/camp/campList/detailList?campName='+item.facltNm.replaceAll(" ","")+'&viewType=1">' + item.facltNm + '</a>' +
          '</h3>' +
          '<h5 id="lineIntro">' + item.lineIntro + '</h5>' +
          '<span class="camp_info03">' +
          '<a href="/camp/campList/detailList?campName='+item.facltNm.replaceAll(" ","")+'&viewType=1"">'+(item.intro).substr(0,60)+'.....</a>' +
          '</span><br>' +
          '<span>테마 &nbsp;&nbsp;&nbsp;&nbsp;: ' + item.induty + '</span><br>' +
          '<span class="camp_add">주소 &nbsp;&nbsp;&nbsp;&nbsp;: ' + item.addr1 + '</span><br>' +
          '<span class="camp_phone">연락처 &nbsp;: ' + item.tel + '</span><br>' +
          '<span class="camp_reserve">예약방법 : ' + item.resveCl + '</span>' +
          '<a href="/camp/campList/detailList?campName='+item.facltNm.replaceAll(" ","")+'&viewType=1" class="reservation_button">상세보기</a>'+
          '</div>' +
          '</div>' +
          '</li>' +
          '</ul><br><br>';
          
          searchBox2.innerHTML += htmlCode;
          
        });

        var pagination = document.getElementById("pagination");
        pagination.innerHTML = "";
        
        var startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
        var endPage = Math.min(startPage + 4, totalPages);
        
        if (startPage > 1) {
          var prevButton = document.createElement("button");
          prevButton.textContent = "이전";
          prevButton.classList.add("pagination-previous");
          prevButton.addEventListener("click", function () {
            currentPage = startPage - 5;
            displayItems(currentPage);
            window.scrollTo(0, 0);

          });
          pagination.appendChild(prevButton);
        }
        
        for (var i = startPage; i <= endPage; i++) {
          var pageButton = document.createElement("button");
          pageButton.textContent = i;
          pageButton.classList.add("page-button");
          if (i === currentPage) {
            pageButton.classList.add("active");
          }
          pageButton.addEventListener("click", function () {
            currentPage = parseInt(this.textContent);
            displayItems(currentPage);
            window.scrollTo(0, 0);

          });
          pagination.appendChild(pageButton);
        }
        
        if (endPage < totalPages) {
          var nextButton = document.createElement("button");
          nextButton.textContent = "다음";
          nextButton.classList.add("pagination-next");
          nextButton.addEventListener("click", function () {
            currentPage = endPage + 1;
            displayItems(currentPage);
            window.scrollTo(0, 0);

          });
          pagination.appendChild(nextButton);
        }
      }

      displayItems(currentPage);
    },
    error: function (error) {
      console.log("API 호출 실패");
      console.log(error);
    }
  });

};
}

function updateQueryString() {      //  주소 , 분류 쿼리파라미터 전달 .
  var inputValue = searchVal2.value;
  var inputValue2 = searchVal3.value;
  var inputValue1 = searchVal1.value;
  var queryString 
  = "?loc=" + encodeURIComponent(inputValue)+"&theme="+ encodeURIComponent(inputValue2) 
    + "&campName="+encodeURIComponent(inputValue1);

  // 현재 URL에 쿼리스트링을 추가하거나 변경합니다.
  history.pushState(null, null, queryString);
}

