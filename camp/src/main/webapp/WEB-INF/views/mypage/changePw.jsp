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
            <h1 class="myPage-title">비밀번호 변경</h1>
            
            <span class="myPage-explanation">현재 회원님의 비밀번호를 변경할 수 있습니다.</span>
        </div>
    </div>


    <div class="changePwborder">
            <form action="changePw" method="POST" name="myPage-form" onsubmit="return changePwValidate()">

                <div class="myPage-row">
                    <label>현재 비밀번호</label>
                    <input type="password" name="currentPw" id="currentPw" maxlength="30" class="form-control">              
                </div>

                <div class="myPage-row">
                    <label>새 비밀번호</label>
                    <input type="password" name="newPw" maxlength="30" class="form-control">              
                </div>

                <div class="myPage-row">
                    <label>새 비밀번호 확인</label>
                    <input type="password" name="newPwConfirm" maxlength="30" class="form-control">              
                </div>

                <button id="info-update-btn" type="submit">변경하기</button>

            </form>
        </div>
        </section>

    </main>

    <script>

        const contextPath = "${contextPath}";

    </script>
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />

    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

    <script src="${contextPath}/resources/js/mypage.js"></script>

</body>
</html>