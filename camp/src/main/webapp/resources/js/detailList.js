
// ????????????????  
// detailList.jsp 에서 예약 버튼 눌렀을때
// 그인상태면 오류안뜨고
// 로그인상태가 아니면 오류가 뜸.
// session 의 loginMember.. 때문인데 ..   해결완료 .!!!
var reservationBtn = document.getElementById("reservationBtn");

reservationBtn.addEventListener("click", function (e) {

    if (loginMember == null || loginMember == "") {
        alert("먼저 로그인을 해주세요");
        window.location.href = '/camp/member/login';
        e.preventDefault();

    } else {
        location.href = "/camp/campDetail/reservation?campName=" + campName;
    }
});



// 맨뒤 캠핑장 이름 / 소개글
var introCampName = document.getElementsByClassName("lineIntro1")[0];
var introLine = document.getElementsByClassName("camp_s_tt")[0];
var introLine2 = document.getElementsByClassName("lineIntro1")[1];

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
var postWrapper = document.getElementsByClassName("post-wrapper")[0];


//기타주요시설 table 
var indutyli = document.getElementsByClassName("table_ul05")[0]; // 주요시설
var animalCmgClli = document.getElementsByClassName("table_ul05")[1];// 반려동물 
var siteMg = document.getElementsByClassName("table_ul05")[2]; // 사이트 크기
var glampInnerFcltyli = document.getElementsByClassName("table_ul05")[3];  // 글램핑 ul
var caravInnerFcltyli = document.getElementsByClassName("table_ul05")[4];  // 카라반 ul
var brazierClli = document.getElementsByClassName("table_ul05")[5]; // 화로대
var sobangli = document.getElementsByClassName("table_ul05")[6];  // 안전시설
var sbrsClli = document.getElementsByClassName("table_ul05")[7]; // 부가정보

// 캠핑장 가격테이블에 캠핑장이름 넣어주기
var campNamePrice = document.getElementById("campNamePrice");
var campNameMap = document.getElementById("campNameMap");
var campNameReview = document.getElementById("campNameReview");

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
            serviceKey: "",
            _type: "json"
        },
        dataType: "json",
        success: function (result) {
            console.log("캠핑장정보 ajax 성공");

            var items = result.response.body.items.item;

            for (let i = 0; i < items.length; i++) {

                // 쿼리스트링 '&' 읽지못해서 앞글자만 짤라서 비교.
                if ( campName.substring(0,5) == (items[i].facltNm.replaceAll(" ", "")).substring(0,5) ) {

                    Object.assign(item, items[i]);
                    // item 에 캠핑장 정보 복사
                }
            }
            localStorage.setItem("item", JSON.stringify(item)); // 캠핑장 정보 페이지 로컬에 저장
            items = JSON.parse(localStorage.getItem("item"));
            contentId = items.contentId;


            introCampName.innerText = items.facltNm;
            introLine.innerText = items.lineIntro;
            introLine2.innerText = items.facltNm;
            if (campNamePrice) {
                campNamePrice.innerText = items.facltNm + " 이용 요금";
            }
            if (campNameMap) {
                campNameMap.innerText = items.facltNm + " 위치 정보";
            }
            if (campNameReview) {
                campNameReview.innerText = items.facltNm + " 리뷰";
            }
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

                console.log(items.caravInnerFclty);
                console.log(items.glampInnerFclty);
                console.log(items.sbrsCl);
                console.log(items);

                // 배열로 따로저장 ( , ) 
                if ( items.caravInnerFclty != null){
                    caravInnerFclty = ( items.caravInnerFclty).split(",");
                    // 카라반 내부시설
                    for (let i = 0; i < caravInnerFclty.length; i++) {
                        caravInnerFcltyli.innerHTML +=
                            '<li>' + caravInnerFclty[i] + '</li>';
                    }
                }

                if ( items.glampInnerFclty != null){
                    glampInnerFclty = (items.glampInnerFclty).split(",");
                    // 글램핑 내부시설
                    for (let i = 0; i < glampInnerFclty.length; i++) {
                        glampInnerFcltyli.innerHTML +=
                            '<li>' + glampInnerFclty[i] + '</li>';
                    }
                }
                if ( items.sbrsCl != null ){
                    sbrsCl = (items.sbrsCl).split(",");
                    // 카라반 내부시설

                    // 부가 정보
                    for (let i = 0; i < sbrsCl.length; i++) {
                        sbrsClli.innerHTML +=
                            '<li>' + sbrsCl[i] + '</li>';
                    }
                }
                // 소개글
                if (items.intro == null || items.intro == "") {
                    intro.innerText = "정보가 없습니다.";
                } else {
                    intro.innerText = items.intro;
                }
            }

            /* ************** 캠핑장 이미지 출력 ************** */
            $.ajax({
                url: "https://apis.data.go.kr/B551011/GoCamping/imageList",
                data: {
                    numOfRows: 100,
                    pageNo: 1,
                    MobileOS: "ETC",
                    MobileApp: "AppTest",
                    serviceKey: "",
                    _type: "json",
                    contentId: contentId
                },
                dataType: "json",
                success: function (result) {


                    console.log("이미지정보 ajax->ajax 성공");
                    console.log(result);

                    imageUrlItem = result.response.body.items.item;



                    if (postWrapper) {
                        for (let i = 0; i < imageUrlItem.length; i++) {
                            postWrapper.innerHTML +=
                                '<div class="post">' +
                                "<img src=" + imageUrlItem[i].imageUrl + " class='modalTest'>"
                                + "</div>";
                        }

                        $(document).ready(function () {
                            // 슬라이더 초기화 코드
                            $('.post-wrapper').slick({
                                arrows: true,
                                // prevArrow: '<button class="slide-arrow prev-arrow"><</button>',
                                // nextArrow: '<button class="slide-arrow next-arrow">></button>',
                                slidesToShow: 4,
                                slidesToScroll: 4,
                                autoplay: true,
                                autoplaySpeed: 3000,
                                draggable: true,
                                dots: true,


                            });
                        });
                    }



                    // 즉시 실행 함수 이미지눌렀을때 모달창 띄웁니다. 
                    (function () {
                        const modalTest = document.getElementsByClassName("modalTest");

                        if (modalTest.length > 0) { // 목록에 썸네일 이미지가 있을 경우에만 이벤트 추가

                            const modal = document.querySelector('.modal');
                            const modalImage = document.getElementById("modal-image");

                            for (let th of modalTest) {
                                th.addEventListener("click", function () {
                                    modalImage.setAttribute("src", th.getAttribute("src"));

                                    /* on/off 스위치 */
                                    // classList.toggle("클래스명") : 클래스가 없으면 추가(add) 
                                    //                                클래스가 있으면 제거(remove)

                                    modal.classList.toggle('show'); // add
                                });
                            }
                            // X버튼
                            modalImage.addEventListener("click", function () {

                                modal.classList.toggle('hide'); // hide 클래스 추가

                                setTimeout(function () { // 0.45초 후 동작
                                    modal.classList.toggle('hide'); // hide 클래스 제거

                                    modal.classList.toggle('show'); // remove
                                }, 450);
                            });

                        }

                    })();
                },
                error: function (error) {
                    console.log("API 호출 실패");
                    console.log(error);
                }
            }); // 이미지 목록 ajax
        }, // 캠핑장 정보 ajax 성공 끝
        beforeSend: function () {

            $('.wrap-loading').removeClass('display-none');

        }
        , complete: function () {
            $('.wrap-loading').addClass('display-none');
        }
        , error: function (error) {
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





var doNmVal = document.getElementById("doNmVal");  // 날씨제목
if (doNmVal) {
    var doNm = items.doNm;
    localStorage.setItem("loca", JSON.stringify(doNm))
    doNmVal.innerText = doNm + " 지역 날씨";
};





///  목록 (li) 누를때 , li 배경색 유지 .

function changeBackgroundColor(event) {
    // 이벤트 발생한 요소의 부모 요소인 li 선택
    var liElement = event.target.parentNode;

    // 모든 li 요소의 클래스 제거
    var liElements = document.getElementsByClassName("campListli");
    for (var i = 0; i < liElements.length; i++) {
        liElements[i].classList.remove("selected");
    }

    // 클릭한 li 요소에 선택된 클래스 추가
    liElement.classList.add("selected");

}

document.addEventListener("DOMContentLoaded", function () {
    // 현재 페이지 URL에서 viewType 파라미터 값 추출
    var viewType = getParameterByName("viewType");

    // viewType에 해당하는 li 요소에 selected 클래스 추가
    var liElements = document.getElementsByClassName("campListli");
    for (var i = 0; i < liElements.length; i++) {
        var link = liElements[i].getElementsByTagName("a")[0];
        var linkViewType = getParameterByName("viewType", link.href);
        if (linkViewType === viewType) {
            liElements[i].classList.remove("campListA");
            liElements[i].classList.add("selected");

            break;
        }
    }
});

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}







