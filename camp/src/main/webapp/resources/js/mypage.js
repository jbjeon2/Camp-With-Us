const listGroup = document.getElementsByClassName("list-group")[0];
const myPageList = document.getElementsByClassName("myPage-list");
const contextPath2 = contextPath;


var currentURL = window.location.href;
if(myPageList.length == 6) {
    
    if(currentURL.endsWith(contextPath2+"/member/myPage/myReservation")) {
        myPageList[0].style.backgroundColor = "#e9ecef";
    } else if(currentURL.endsWith(ontextPath2+"/member/myPage/myBoard")) {
        myPageList[1].style.backgroundColor = "#e9ecef";
    } else if(currentURL.endsWith(contextPath2+"/member/myPage/myReview")) {
        myPageList[2].style.backgroundColor = "#e9ecef";
    } else if(currentURL.endsWith(contextPath2+"/member/myPage/profile")) {
        myPageList[3].style.backgroundColor = "#e9ecef";
    } else if(currentURL.endsWith(contextPath2+"/member/myPage/changePw")) {
        myPageList[4].style.backgroundColor = "#e9ecef";
    }  else if(currentURL.endsWith(contextPath2+"/member/myPage/secession")) {
        myPageList[5].style.backgroundColor = "#e9ecef";
    }
} else {
    
    if(currentURL.endsWith(contextPath2+"/member/myPage/myReservation")) {
        myPageList[0].style.backgroundColor = "#e9ecef";
    } else if(currentURL.endsWith(contextPath2+"/member/myPage/myBoard")) {
        myPageList[1].style.backgroundColor = "#e9ecef";
    } else if(currentURL.endsWith(contextPath2+"/member/myPage/myReview")) {
        myPageList[2].style.backgroundColor = "#e9ecef";
    } else if(currentURL.endsWith(contextPath2+"/member/myPage/profile") ){
        myPageList[3].style.backgroundColor = "#e9ecef";
    } else if(currentURL.endsWith(contextPath2+"/member/myPage/secession")) {
        myPageList[4].style.backgroundColor = "#e9ecef";
    }
}

/* if (myPageList.length == 5) {
    var currentURL = window.location.href;
    if (currentURL.endsWith(contextPath2 + "/board/list/1")) {
        myPageList[0].style.backgroundColor = "#e9ecef";
    } else if (currentURL.endsWith(contextPath2 + "/board/list/2")) {
        myPageList[1].style.backgroundColor = "#e9ecef";
    } else if (currentURL.endsWith(contextPath2 + "/board/list/3")) {
        myPageList[2].style.backgroundColor = "#e9ecef";
    } else if (currentURL.endsWith(contextPath2 + "/board/list/4")) {
        myPageList[3].style.backgroundColor = "#e9ecef";
    } else if (currentURL.endsWith(contextPath2 + "/board/list/5")) {
        myPageList[4].style.backgroundColor = "#e9ecef";
    }
} */





// 회원 정보 변경 유효성 검사
function infoValidate(){

    const memberNickname = document.getElementById("memberNickname");
    const memberTel = document.getElementById("memberTel");

    const regExp1 = /^[a-zA-Z0-9가-힣]{2,10}$/;        // 닉네임 정규식
    const regExp2 = /^0(1[01679]|2|[3-6][1-5]|70)\d{3,4}\d{4}$/; // 전화번호 정규식

    // 닉네임 유효성 검사
    if(memberNickname.value.length == 0){ // 미작성 시 : 닉네임을 입력해주세요.
        alert("닉네임을 입력해주세요.");
        memberNickname.focus();
        return false;
    }

    if(!regExp1.test(memberNickname.value)){ // 유효하지 않은 경우
        alert("닉네임은 영어/숫자/한글 2~10 글자 사이로 작성해주세요.");
        memberNickname.focus();
        return false;
    }

    // 전화번호 유효성 검사
    if(memberTel.value.length == 0){ // 미작성 시
        alert("전화번호를 입력해주세요.(- 제외)");
        memberTel.focus();
        return false;
    }

    if(!regExp2.test(memberTel.value)){ // 유효하지 않은 경우
        return printAlert(memberTel, "전화번호 형식이 올바르지 않습니다.");
    }

    return true;
}

// 회원 프로필 이미지 변경(미리보기)
const inputImage = document.getElementById("input-image");

if(inputImage) {
    inputImage.addEventListener("change", function(){

        if(this.files[0] != undefined){ // 파일이 선택되었을 때

            const reader = new FileReader();
            
            reader.readAsDataURL(this.files[0]);

            reader.onload = function(e){
                const profileImage = document.getElementById("profile-image");

                profileImage.setAttribute("src", e.target.result);

                document.getElementById("delete").value = 0;
            }

        }
    });
}

// 프로필 이미지 옆 x버튼 클릭 시
if( document.getElementById("delete-image") ) {
    document.getElementById("delete-image").addEventListener("click", function(){
        // 0 : 안눌러짐
        // 1 : 눌러짐

        const del = document.getElementById("delete");

        if(del.value == 0){ // 눌러지지 않은 경우

            // 1) 프로필 이미지를 기본 이미지로 변경
            document.getElementById("profile-image").setAttribute("src", contextPath + "/resources/images/user.png");                     

            // 2) input type="file"에 저장된 값(value)에 "" 대입 
            document.getElementById("input-image").value = "";

            del.value = 1; // 눌러진걸로 인식
        }

    });
}

// 이미지 선택 확인
function profileValidate(){
    const inputImage = document.getElementById("input-image");

    const del = document.getElementById("delete"); // hidden 타입


    if( inputImage.value == ""  &&  del.value == 0 ){ 
        // 빈문자열 == 파일 선택 X / del의 값이 0 == x를 누르지도 않았다
        // --> 아무것도 안하고 변경버튼을 클릭한 경우

        alert("이미지를 선택한 후 변경 버튼을 클릭해주세요.");
        return false;
    }

    return true;
}

// 경고 출력 + 포커스 + false 반환  함수
function printAlert(el, message){ // 매개변수 el은 요소
    alert(message);
    el.focus();
    return false;
}

// 비밀번호 변경 제출 시 유효성 검사
function changePwValidate(){

    // 비밀번호 변경 관련 input 요소 얻어오기
    const currentPw = document.getElementsByName("currentPw")[0];
    
    //const currentPw = document.getElementById("currentPw");

    const newPw = document.getElementsByName("newPw")[0];
    const newPwConfirm = document.getElementsByName("newPwConfirm")[0];

    // 비밀번호 정규표현식
    const regEx = /^[\w!@#_-]{6,30}$/;

    // 현재 비밀번호 미작성
    if(currentPw.value.trim().length == 0){
        /*alert("현재 비밀번호를 입력해주세요.");
        currentPw.focus();
        return false;*/

        return printAlert(currentPw, "현재 비밀번호를 입력해주세요.");
    }

    // 새 비밀번호
    // 미작성
    if(newPw.value.trim().length == 0){
        alert("새 비밀번호를 입력해주세요.");
        newPw.focus();
        return false;
    }

    // 유효하지 않은 경우
    if(!regEx.test(newPw.value)){
        alert("영어, 숫자, 특수문자(!,@,#,-,_) 6~30 글자 사이로 작성해주세요.");
        newPw.focus();
        return false;
    }


    // 새 비밀번호 확인
    // 미작성
    if(newPwConfirm.value.trim().length == 0){
        return printAlert(newPwConfirm, "새 비밀번호 확인을 입력해주세요.");
    }


    // 새 비밀번호 != 새 비밀번호 확인
    if(newPw.value != newPwConfirm.value){
        return printAlert(newPwConfirm, "새 비밀번호가 일치하지 않습니다.");
    }

    return true; // 위 조건을 모두 수행하지 않은 경우 true 반환
}




// 회원 탈퇴 유효성 검사
function secessionValidate(){

    const memberPw = document.getElementById("memberPw");
    const agree = document.getElementById("agree");

    // 비밀번호 미작성
    if(memberPw.value.trim().length == 0){
        alert("비밀번호를 입력해주세요.");
        memberPw.focus();
        return false;
    }

    // 약관 동의 체크 여부
    // - 체크박스요소.checked  : 체크 시 true, 해제 시 false 반환

    if( !agree.checked ){ // 체크를 안했을 때
        alert("약관 동의 후 탈퇴 버튼을 클릭해주세요.");
        agree.focus();
        return false;
    }

    // 정말 탈퇴할지 확인
    // - window.confirm("내용") : 대화 상자에 확인/취소 생성
    //      확인 클릭 시 true / 취소 클릭 시 false
    //      window는 생략 가능
    
    if( !confirm("정말 탈퇴 하시겠습니까?") ){ //  취소를 누른 경우
        return false;
    }

    return true;
}


//예약 취소
function reservCancel(reservNo) {

    console.log("예약번호 : " + reservNo);
    console.log("예약취소(reservCancel) 함수 실행");

    var cf = window.confirm("정말 예약을 취소하시겠습니까?\n취소시 결제금액은 영업일 기준 2~3일내에 자동 환불 됩니다.");

    if(cf) {

        $.ajax({
            url: "reservationState", 
            type: "POST",
            data: {"reservNo" : reservNo},
        
            success: function(result) {
               
                if(result > 0) {
                    console.log("예약정보 전송완료");
                    alert("예약이 취소되었습니다.");
                    location.reload();
                }else {
                    console.log("예약정보 전송실패");
                    alert("예약 취소에 실패하였습니다.");
                }
            },
            error: function() {
                console.log("예약취소 ajax 에러발생");
            }
        });
        
        
    } else {
        console.log("예약취소 기능 취소");
    }
                            
}

// 예약 확정
function reservConfirm(reservNo){

    console.log("예약번호 : " + reservNo);
    console.log("예약취소(reservCancel) 함수 실행");

    let cf = window.confirm("예약을 확정하겠습니까?");

    if(cf) {

        $.ajax({
            url: "reservationConfirm", 
            type: "POST",
            data: {"reservNo" : reservNo},
        
            success: function(result) {
               
                if(result > 0) {
                    console.log("예약확정완료");
                    alert("예약이 확정되었습니다..");
                    location.reload();
                }else {
                    console.log("예약확정 실패");
                    alert("예약 확정에 실패하였습니다.");
                }
            },
            error: function() {
                console.log("예약취소 ajax 에러발생");
            }
        });
        
        
    } else {
        console.log("예약취소 기능 취소");
    }
}
