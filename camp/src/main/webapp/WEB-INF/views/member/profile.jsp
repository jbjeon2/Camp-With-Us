<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>

<%-- 문자열 관련 함수(메서드) 제공 JSTL (EL형식으로 작성) --%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<c:set var="confirm" value="${localStorage.confirm}"/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>캠프보내조</title>
    <link rel="stylesheet" href="${contextPath}/resources/css/main.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/mypage.css">
    <script src="https://kit.fontawesome.com/a2e8ca0ae3.js" crossorigin="anonymous"></script>

</head>
<body>
    <jsp:include page="/WEB-INF/views/common/header.jsp" />

    <main class="myPage-content">
        
        <jsp:include page="/WEB-INF/views/member/sideMenu.jsp"/>

        <section class="myPage-main">

            <h1 class="myPage-title">회원 정보 수정</h1>
            
            <span class="myPage-explanation">현재 회원님의 프로필을 변경할 수 있습니다.</span>
            

            <form action="updateProfile" method="POST" name="myPage-form" 
                    enctype="multipart/form-data" onsubmit="return profileValidate()">


                <div class="profile-image-area">

                    <c:if test="${empty loginMember.profileImage}">
                        <img src="${contextPath}/resources/images/user.png" id="profile-image">
                    </c:if>

                    <c:if test="${!empty loginMember.profileImage}">
                        <img src="${contextPath}${loginMember.profileImage}" id="profile-image">
                    </c:if>

                    <!-- 프로필 이미지 삭제 버튼 -->
                    <span id="delete-image">x</span>

                </div>


                <div class="profile-btn-area">
                    <label for="input-image">이미지 선택</label>
                    <input type="file" name="uploadImage" id="input-image" accept="image/*">
                    <button type="submit">변경하기</button>
                </div>


                <div class="myPage-row">
                    <label>이메일</label>
                    <span>${loginMember.memberEmail}</span>
                </div>

                <div class="myPage-row">
                    <label>닉네임</label>
                    <input type="text" name="updateNickname"  id="memberNickname"  value="${loginMember.memberNickname}" maxlength="10">              
                </div>

                <div class="myPage-row">
                    <label>전화번호</label>
                    <input type="text" name="updateTel"  id="updateTel" value="${loginMember.memberTel}" maxlength="11"/>
                </div>
                
                <c:set var="addr"  value="${fn:split(loginMember.memberAddress, ',,')}"  />                    
                
                
                <div class="myPage-row info-title">
                    <span>주소</span>
                </div>

                <div class="myPage-row info-address">
                    <input type="text" name="updateAddress" id="postcode" value="${addr[0]}"  maxlength="6">

                    <button type="button" id="info-address-btn" onclick="return execDaumPostcode()">검색</button>
                </div>

                <div class="myPage-row info-address">
                    <input type="text" name="updateAddress" id="address" value="${addr[1]}">
                </div>
                
                <div class="myPage-row info-address">
                    <input type="text" name="updateAddress" id="detailAddress" value="${addr[2]}">
                </div>



                <div class="myPage-row">
                    <label>가입일</label>
                    <span>${loginMember.enrollDate}</span>
                </div>

                <button id="info-update-btn">수정하기</button>

                <!-- 삭제버튼(x)이 눌러짐을 기록하는 숨겨진 input 태그 -->
                <!-- 0 : 안눌러짐   /   1: 눌러짐 -->
                <input type="hidden" name="delete" id="delete" value="0">
            </form>

        </section>

    </main>

    <jsp:include page="/WEB-INF/views/common/footer.jsp" />

    <%-- 다음 주소 API --%>
    <div id="layer" style="display:none;position:fixed;overflow:hidden;z-index:11;-webkit-overflow-scrolling:touch;">
        <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" onclick="closeDaumPostcode()" alt="닫기 버튼">
    </div>

    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

    <script>
        // 다음 주소 API

        // 우편번호 찾기 화면을 넣을 element
        var element_layer = document.getElementById('layer');

        function closeDaumPostcode() {
            // iframe을 넣은 element를 안보이게 한다.
            element_layer.style.display = 'none';
        }

        function execDaumPostcode() {
            new daum.Postcode({
                oncomplete: function(data) {
                    // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var addr = ''; // 주소 변수
                    var extraAddr = ''; // 참고항목 변수

                    //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        addr = data.roadAddress;
                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        addr = data.jibunAddress;
                    }

                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    document.getElementById('postcode').value = data.zonecode;
                    document.getElementById("address").value = addr;
                    // 커서를 상세주소 필드로 이동한다.
                    document.getElementById("detailAddress").focus();

                    // iframe을 넣은 element를 안보이게 한다.
                    // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
                    element_layer.style.display = 'none';
                },
                width : '100%',
                height : '100%',
                maxSuggestItems : 5
            }).embed(element_layer);

            // iframe을 넣은 element를 보이게 한다.
            element_layer.style.display = 'block';

            // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
            initLayerPosition();
        }

        // 브라우저의 크기 변경에 따라 레이어를 가운데로 이동시키고자 하실때에는
        // resize이벤트나, orientationchange이벤트를 이용하여 값이 변경될때마다 아래 함수를 실행 시켜 주시거나,
        // 직접 element_layer의 top,left값을 수정해 주시면 됩니다.
        function initLayerPosition(){
            var width = 500; //우편번호서비스가 들어갈 element의 width
            var height = 400; //우편번호서비스가 들어갈 element의 height
            var borderWidth = 5; //샘플에서 사용하는 border의 두께

            // 위에서 선언한 값들을 실제 element에 넣는다.
            element_layer.style.width = width + 'px';
            element_layer.style.height = height + 'px';
            element_layer.style.border = borderWidth + 'px solid';
            // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
            element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px';
            element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';
        }
    </script>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

    <script src="${contextPath}/resources/js/mypage.js"></script>
</body>
</html>
