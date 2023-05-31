const selLoc = document.getElementById("selLoc");
const login = document.getElementById("login");
const myPage = document.getElementById("myPage");
const searchOption = document.getElementsByClassName("searchOption");

var loginMember = sessionStorage.getItem("loginMember");


// 지역 선택 팝업창
function selectLoc() {
    const options = "width=480, height=600, top=50, left=400";

    window.open("selectLoc", "지역 선택", options);
}

// 테마 선택 팝업창
function selectTheme() {
    const options = "width=480, height=600, top=50, left=400";

    window.open("selectTheme", "테마 선택", options);
}

// 검색 버튼 클릭 시 캠프 리스트 페이지 이동
function searchCamp() { 

    location.href="/camp/campList/?loc="+ searchOption[0].innerHTML + "&theme=" + searchOption[1].innerHTML;
    // location.href="camp/campList";

}

login.addEventListener("click", function() {
    location.href = "/login";
});

myPage.addEventListener("click", function() {

    if(loginMember == null) {
        alert("먼저 로그인을 해주세요");
    } else {

        location.href = "/myPage/" + loginMember.memberNo;

    }

});