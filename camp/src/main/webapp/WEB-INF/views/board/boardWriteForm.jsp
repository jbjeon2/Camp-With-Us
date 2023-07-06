<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>게시글 등록</title>
    
    <link rel="stylesheet" href="${contextPath}/resources/css/boxicons.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/main.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/boardWriteForm-style.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/bootstrap-icons.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/bootstrap_main_header.css">


    <script src="https://kit.fontawesome.com/a2e8ca0ae3.js" crossorigin="anonymous"></script>


    <!-- 서머노트를 위해 추가해야할 부분 -->
    <script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/summernote/summernote-lite.css">	


    <c:set var="boardCode" value="${boardCode}" />
    <c:set var="cp" value="${cp}" />

</head>
<body>

    <jsp:include page="/WEB-INF/views/common/header.jsp"/>
    <main>
       

        <form action="${boardCode}" enctype="multipart/form-data" method="POST" class="board-write"
            onsubmit="return writeValidate()">

            <!-- 제목 -->
            <h1 class="board-title">
                <input type="text" name="boardTitle" placeholder="제목을 입력해주세요." value="${detail.boardTitle}">         
            </h1>


            <!-- 내용 -->
            <div class="container board-content">
                <textarea class="summernote" name="boardContent">${detail.boardContent}</textarea>
            </div>


            <!-- 버튼 영역 -->
            <div class="board-btn-area">
                <button type="submit" id="writebtn">등록</button>

                <!-- insert 모드 -->
                <c:if test="${param.mode == 'insert'}">
                    <button type="button" id="goToListBtn">목록으로</button>
                </c:if>
                
                <!-- update 모드 -->
                <c:if test="${param.mode == 'update'}">
                    <button type="button" onclick="location.href='${header.referer}'">이전으로</button>                           
                </c:if>

            </div>


            <!-- 숨겨진 값(hidden) -->
            <!-- 동작 구분 -->
            <input type="hidden" name="mode" value="${param.mode}">

            <!-- 게시글 번호 (커맨드객체인 BoardDeteil.boardNo 세팅하기)-->
            <input type="hidden" name="boardNo" value="${empty param.no ? 0 : param.no}">
            
            <!-- 현재 페이지 -->
            <input type="hidden" name="cp" value="${param.cp}">

        </form>

        
    </main>

    
        <!-- <script src="http://code.jquery.com/jquery-3.5.1.min.js"></script> -->

        <jsp:include page="/WEB-INF/views/common/footer.jsp"/>

        <script src="${pageContext.request.contextPath}/resources/summernote/summernote-lite.js"></script>
        <script src="${pageContext.request.contextPath}/resources/summernote/lang/summernote-ko-KR.js"></script>



        <script>
            const boardCode = "${boardCode}"; // 게시판코드를 전역변수로 생성해주기
            const cp = "${cp}";
            const contextPath = "${contextPath}";
        </script>
    
     
        <script src="${contextPath}/resources/js/board/board.js"></script>
        <script src="${contextPath}/resources/js/board/boardWriteForm.js"></script>


</body>
</html>