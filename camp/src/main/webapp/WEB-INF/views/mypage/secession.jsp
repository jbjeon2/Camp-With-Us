<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>캠프보내조</title>
    <link rel="stylesheet" href="${contextPath}/resources/css/main.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/mypage.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/bootstrap-icons.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/bootstrap_main_header.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/boxicons.css">
    <script src="https://kit.fontawesome.com/a2e8ca0ae3.js" crossorigin="anonymous"></script>

</head>
<body>
    <jsp:include page="/WEB-INF/views/common/header.jsp" />

    <main class="myPage-content">
        
        <jsp:include page="/WEB-INF/views/mypage/sideMenu.jsp"/>

        <section class="myPage-main">
            <div class = "myPageHeadFlex">
                <div class = "myPageHead">
            <h1 class="myPage-title">회원 탈퇴</h1>
            
            <span class="myPage-explanation">현재 비밀번호가 일치하는 경우 회원 탈퇴할 수 있습니다.</span>
        </div>
    </div>


    <div class="secessionborder">
            <form action="secession" method="POST" name="myPage-form" onsubmit="return secessionValidate()" >

                <div class="myPage-row">
                    <label id="secessionPw">비밀번호</label>
                    <input type="password" name="memberPw" id="memberPw" maxlength="30" class="form-control">              
                </div>
                <div class="campwithus"> ※소셜회원인 경우 '<span id="campwithus">campwithus</span>'를 입력하세요. </div>

                
                <div class="myPage-row info-title">
                    <label>회원 탈퇴 약관</label>
                </div>

                <div class = "secessionContent">
                    <h3>제1조(목적)</h3> 
                    이 약관은 캠핑보내조가 운영하는 Camp With Us(이하 "CWU”라 한다)에서 제공하는 인터넷 관련 서비스(이하 “서비스”라 한다)를 이용함에 있어 사이버 CWU과 이용자의 권리․의무 및 책임사항을 규정함을 목적으로 합니다.
                    <br>
                    ※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.」<br>

                    <h3>제7조(회원 탈퇴 및 자격 상실 등)</h3>

                    ① 회원은 “CWU”에 언제든지 탈퇴를 요청할 수 있으며 “CWU”은 즉시 회원탈퇴를 처리합니다. <br>
                  
                    ② 회원이 다음 각 호의 사유에 해당하는 경우, “CWU”은 회원자격을 제한 및 정지시킬 수 있습니다. <br>
                  <br>
                      1. 가입 신청 시에 허위 내용을 등록한 경우 <br>
                      2. “CWU”을 이용하여 구입한 재화 등의 대금, 기타 “CWU”이용에 관련하여 회원이 부담하는 채무를 기일에 지급하지 않는 경우 <br>
                      3. 다른 사람의 “CWU” 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우 <br>
                      4. “CWU”을 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우<br>
                  <br>
                    ③ “CWU”이 회원 자격을 제한․정지 시킨 후, 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 “CWU”은 회원자격을 상실시킬 수 있습니다.<br>
                  
                    ④ “CWU”이 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 회원에게 이를 통지하고, 회원등록 말소 전에 최소한 30일 이상의 기간을 정하여 소명할 기회를 부여합니다.<br>

                </div>


               
                <div id = "checkBoxdiv">
                    <input type="checkbox" name="agree" id="agree">
                    <label for="agree" ><div> 위 약관에 동의합니다.</div></label>
                </div>


                <button id="info-update-btn">탈퇴</button>
                
            </form>
        </div>
        </section>

    </main>

    <jsp:include page="/WEB-INF/views/common/footer.jsp" />
    <script>
        const contextPath = "${contextPath}";
    </script>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

    <script src="${contextPath}/resources/js/mypage.js"></script>

</body>
</html>