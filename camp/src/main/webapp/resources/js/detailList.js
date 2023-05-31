
// 캠핑장정보 table
var addr = document.getElementById("addr");              // 주소
var tel = document.getElementById("tel");               // 문의처 (전화번호)
var lctCl = document.getElementById("lctCl");           // 캠핑장환경
var induty = document.getElementById("induty");         // 캠핑장유형
var operPdCl = document.getElementById("operPdCl");     // 운영시간
var operDeCl = document.getElementById("operDeCl");     // 운영일
var resveCl = document.getElementById("resveCl");       // 예약방법
var posblFcltyCl = document.getElementById("posblFcltyCl");    // 주변이용가능시설
var imgB = document.getElementById("img_b");
var intro = document.getElementById("intro");  // intro div 
var homePage = document.getElementById("homePage"); // 홈페이지
var boxphoto = document.getElementById("box_photo");   // 이미지 컨테이너

//기타주요시설 table 
var indutyli = document.getElementsByClassName("table_ul05")[0]; // 주요시설
var animalCmgClli = document.getElementsByClassName("table_ul05")[1];// 반려동물 
var siteMg = document.getElementsByClassName("table_ul05")[2]; // 사이트 크기
var glampInnerFcltyli = document.getElementsByClassName("table_ul05")[3];  // 글램핑 ul
var caravInnerFcltyli = document.getElementsByClassName("table_ul05")[4];  // 카라반 ul
var brazierClli = document.getElementsByClassName("table_ul05")[5]; // 화로대
var sobangli = document.getElementsByClassName("table_ul05")[6];  // 안전시설
var sbrsClli = document.getElementsByClassName("table_ul05")[7]; // 부가정보


// 캠핑장 정보 저장용 변수 ( json데이터 item[]에 복사 )
let item = {};

var items; //  Parse(localStorage(item)) 저장할 변수 

var caravInnerFclty = [];  // 카라반 내부시설
var glampInnerFclty = [];  // 글램핑 내부시설
var sbrsCl = []; // 부가정보

let contentId;    //  캠프 이미지 뽑아오기위한 contentId .


window.onload = function () {

    ///////////////  캠핑장 정보 ajax 
    $.ajax({
        url: "https://apis.data.go.kr/B551011/GoCamping/basedList",
        data: {
            numOfRows: 3500,
            pageNo: 1,
            MobileOS: "ETC",
            MobileApp: "AppTest",
            serviceKey: "4k7REi0gs6TKyjakIRV6zHIg3a1NcXwJPRTezijLCYvx0leNrqvtRwayHuc1AslN9pksU9rGRorGGOTZwMEu9Q==",
            _type: "json"
        },
        dataType: "json",
        success: function (result) {
            console.log("캠핑장정보 ajax 성공");

            var items = result.response.body.items.item;

            for (let i = 0; i < items.length; i++) {
                if (campName == items[i].facltNm.replaceAll(" ", "")) {

                    Object.assign(item, items[i]);
                    // item 에 캠핑장 정보 복사
                }
            }
            localStorage.setItem("item", JSON.stringify(item)); // 캠핑장 정보 페이지 로컬에 저장
            items = JSON.parse(localStorage.getItem("item"));
            contentId = items.contentId;

            /* ************** 캠핑장 정보 출력 ************** */
            addr.innerText = items.addr1;               // 주소
            tel.innerText = items.tel;                  //문의처
            lctCl.innerText = items.lctCl;              //캠핑장환경
            induty.innerText = items.induty;            //캠핑장유형
            operPdCl.innerText = items.operPdCl;        //운영기간
            operDeCl.innerText = items.operDeCl;        //운영일
            resveCl.innerText = items.resveCl;          //예약방법
            posblFcltyCl.innerText = items.posblFcltyCl; //이용가능시설
            imgB.innerHTML = '<img src="' + items.firstImageUrl + '" alt="대표이미지"  />';
            homePage.innerHTML =
                '<a href="' + items.homepage + '" target="_blank" >홈페이지 바로가기</a>';

            if (intro) {   ///  viewType =1,2,3 넘어갈때 오류방지 if조건문 
                // 기타 주요시설 table 
                // 주요시설
                indutyli.innerHTML =
                    '<li>일반야영장(' + items.frprvtWrppCo + '면)</li>' +
                    '<li>글램핑시설(' + items.glampSiteCo + '면)</li>' +
                    '<li>카라반(' + items.gnrlSiteCo + '면)</li>'
                // 기타정보 (반려동물)
                animalCmgClli.innerHTML =
                    '<li>반려동물 동반 ' + items.animalCmgCl + '</li>'
                // 사이트 크기
                siteMg.innerHTML =
                    '<li>' + items.siteMg1Width + ' X ' + items.siteMg1Vrticl + ' : ' + items.siteMg1Co + '개</li>' +
                    '<li>' + items.siteMg2Width + ' X ' + items.siteMg2Vrticl + ' : ' + items.siteMg2Co + '개</li>'

                // 화로대
                brazierClli.innerHTML = items.brazierCl;

                // 안전시설 현황
                sobangli.innerHTML =
                    '<li>소화기 (' + items.extshrCo + ')</li>' +
                    '<li>방화수 (' + items.frprvtWrppCo + ')</li>' +
                    '<li>방화사 (' + items.frprvtSandCo + ')</li>' +
                    '<li>화재감지기 (' + items.fireSensorCo + ')</li>';

                // 배열로 따로저장 ( , ) 
                caravInnerFclty = (items.caravInnerFclty).split(",");
                glampInnerFclty = (items.glampInnerFclty).split(",");
                sbrsCl = (items.sbrsCl).split(",");

                // 글램핑 내부시설
                for (let i = 0; i < glampInnerFclty.length; i++) {
                    glampInnerFcltyli.innerHTML +=
                        '<li>' + glampInnerFclty[i] + '</li>';
                }
                // 카라반 내부시설
                for (let i = 0; i < caravInnerFclty.length; i++) {
                    caravInnerFcltyli.innerHTML +=
                        '<li>' + caravInnerFclty[i] + '</li>';
                }
                // 부가 정보
                for (let i = 0; i < sbrsCl.length; i++) {
                    sbrsClli.innerHTML +=
                        '<li>' + sbrsCl[i] + '</li>';
                }
                // 소개글
                intro.innerText = items.intro;
            }

            /* ************** 캠핑장 이미지 출력 ************** */
            $.ajax({
                url: "https://apis.data.go.kr/B551011/GoCamping/imageList",
                data: {
                    numOfRows: 100,
                    pageNo: 1,
                    MobileOS: "ETC",
                    MobileApp: "AppTest",
                    serviceKey: "4k7REi0gs6TKyjakIRV6zHIg3a1NcXwJPRTezijLCYvx0leNrqvtRwayHuc1AslN9pksU9rGRorGGOTZwMEu9Q==",
                    _type: "json",
                    contentId: contentId
                },
                dataType: "json",
                success: function (result) {
                    console.log("이미지정보 ajax->ajax 성공");
                    imageUrlItem = result.response.body.items.item;

                    if (boxphoto) {
                        for (let i = 0; i < imageUrlItem.length; i++) {
                            boxphoto.innerHTML +=
                                "<div class='box_photo3'>" +
                                "<img class='lazyload' data-src=" + imageUrlItem[i].imageUrl + " width=226 height=220>"
                                + "</div>";
                        }
                    }
                },
                error: function (error) {
                    console.log("API 호출 실패");
                    console.log(error);
                }
            }); // 이미지 목록 ajax
        }, // 캠핑장 정보 ajax 성공 끝
        error: function (error) {
            console.log("API 호출 실패");
            console.log(error);
        }
    });

};












/// 카카오 맵
items = JSON.parse(localStorage.getItem("item"));
var mapContainer = document.getElementById('map');

if (mapContainer) {
    mapContainer, // 지도의 중심좌표
        mapOption = {
            center: new kakao.maps.LatLng(items.mapY, items.mapX), // 지도의 중심좌표
            level: 3                                    // 지도의 확대 레벨
        };
    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    var marker = new kakao.maps.Marker({                // 지도에 마커를 표시합니다 
        map: map,
        position: new kakao.maps.LatLng(items.mapY, items.mapX)
    });
    // 커스텀 오버레이에 표시할 컨텐츠 입니다 
    var content = '<div class="wrap">' +
        '    <div class="info">' +
        '        <div class="title">' +
        items.facltNm +
        '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
        '        </div>' +
        '        <div class="body">' +
        '            <div class="img">' +
        '                <img src=' + items.firstImageUrl + ' width="73" height="70">' +
        '           </div>' +
        '            <div class="desc">' +
        '                <div class="ellipsis">' + items.addr1 + '</div>' +
        '                <div class="jibun ellipsis">' + items.induty + '</div>' +
        '                <div><a href=' + items.homepage + ' target="_blank" class="link">홈페이지</a></div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';
    // 마커 위에 커스텀오버레이를 표시합니다
    // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
    var overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition()
    });
    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
    kakao.maps.event.addListener(marker, 'click', function () {
        overlay.setMap(map);
    });
    // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
    function closeOverlay() {
        overlay.setMap(null);
    }
}





