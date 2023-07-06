<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<c:forEach var="boardTypeList" items="${boardTypeList}">
    <c:if test="${boardCode == boardTypeList.boardCode}">
        <c:set var="boardName" value="${boardTypeList.boardName}" />
    </c:if>
</c:forEach>

<c:set var="pagination" value="${map.pagination}" />
<c:set var="boardList" value="${map.boardList}" />


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>${boardName}</title>

    <link rel="stylesheet" href="${contextPath}/resources/css/main.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/boxicons.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/bootstrap_main_header.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/bootstrap-icons.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/mypage.css">

    <link rel="stylesheet" href="${contextPath}/resources/css/boardList-style2.css">

    <script src="https://kit.fontawesome.com/a2e8ca0ae3.js" crossorigin="anonymous"></script>

</head>

<body>

    <jsp:include page="/WEB-INF/views/common/header.jsp" />
    <main>
        <div class="myPage-content">
        <jsp:include page="/WEB-INF/views/board/boardSideMenu.jsp"/>

        <%-- 검색을 진행한 경우 key, query를 쿼리스트링 형태로 저장한 변수 생성 --%>
            <c:if test="${!empty param.key}">
                <c:set var="sURL" value="&key=${param.key}&query=${param.query}" />
            </c:if>


            <section class="board-list">

                <div class = "myPageHeadFlex" id="myPageHeadFlexImg">
                    <div class = "myPageHead">
                        <h1 class="myPage-title">${boardName}</h1>
                    
                    <span class="myPage-explanation"><span class="CWUspan">Camp With Us</span> 에서 캠핑용품을 나눠보세요!</span>
                    </div>
                </div>
<!--                 <c:if test="${!empty param.key}">
                    <div class="list1-5">
                        <h3 style="margin-left:30px;"> "${param.query}" 검색 결과 </h3>
                    </div>
                </c:if> -->



                <div class="list-wrapper">
                    <c:choose>
                        <c:when test="${empty boardList}">
                            <!-- 게시글 목록 조회 결과가 비어있다면 -->
                            <div class="list1-6">게시글이 존재하지 않습니다.</div>
                        </c:when>

                        <c:otherwise>
                            <!-- 게시글 목록 조회 결과가 비어있지 않다면 -->

                            <!-- 향상된 for문처럼 사용 -->
                            <c:forEach var="board" items="${boardList}">

                                    <div class="list1">
                                        <div class="list1-1"> 
                                            <c:if test="${!empty board.thumbnailImg}">
                                                <img class="list-thumbnail" src="${board.thumbnailImg}">
                                            </c:if>
                                            <c:if test="${empty board.thumbnailImg}">
                                                <img class="list-thumbnail" src="${contextPath}/resources/images/CWUlogo3.png">
                                            </c:if>
                                        </div>

                                    <div class="list1-2">
                                        <div class="list1-3">
                                            <p> No.${board.boardNo} &nbsp;|&nbsp; </p>
                                            <a href="../detail/${boardCode}/${board.boardNo}?cp=${pagination.currentPage}${sURL}" class="boardTitle">
                                                <p id = "boardTitleP">${board.boardTitle}</p>
                                            </a>
                                        </div>

                                        <hr>

                                            <div class="list1-4">
                                                
                                                <a href="../detail/${boardCode}/${board.boardNo}?cp=${pagination.currentPage}${sURL}" class="board_Content">
                                                    <p class="boardContent">${board.boardContent}</p></a>   
                                            </div>
                                            <div class="memberInfoBox">
                                                <p id="memberInfo">작성자 : ${board.memberNickname} &nbsp;|&nbsp; 작성일 : ${board.createDate} &nbsp;|&nbsp; 조회수 : ${board.readCount}</p>
                                            </div>
                                                                 
                                    </div>


                                </div>
                            </c:forEach>

                        </c:otherwise>
                    </c:choose>

                </div>

                <div class="btn-area">

                    <c:if test="${!empty loginMember}">
                        <!-- /camp/board/write -->
                        <button id="insertBtn"
                            onclick="location.href='../write/${boardCode}?mode=insert&cp=${pagination.currentPage}'">글쓰기</button>
                    </c:if>

                </div>


                <div class="pagination-area">

                    <!-- 페이지네이션 a태그에 사용될 공통 주소를 저장한 변수 선언 -->
                    <c:set var="url" value="${boardCode}?cp=" />


                    <ul class="pagination">
                        <!-- 첫 페이지로 이동 -->
                        <li><a href="${url}1${sURL}"><i class="fa-solid fa-angles-left"></i></a></li>

                        <!-- 이전 목록 마지막 번호로 이동 -->
                        <li><a href="${url}${pagination.prevPage}${sURL}"><i class="fa-solid fa-angle-left"></i></a></li>

                        <!-- 범위가 정해진 일반 for문 사용 -->
                        <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">

                            <c:choose>
                                <c:when test="${i == pagination.currentPage}">
                                    <li><a class="current">${i}</a></li>
                                </c:when>

                                <c:otherwise>
                                    <li><a href="${url}${i}${sURL}">${i}</a></li>
                                </c:otherwise>
                            </c:choose>

                        </c:forEach>

                        <!-- 다음 목록 시작 번호로 이동 -->
                        <li><a href="${url}${pagination.nextPage}${sURL}"><i class="fa-solid fa-angle-right"></i></a></li>

                        <!-- 끝 페이지로 이동 -->
                        <li><a href="${url}${pagination.maxPage}${sURL}"><i class="fa-solid fa-angles-right"></i></a></li>

                    </ul>
                </div>

                <!-- /board/list?type=1&cp=3 -->

                <!-- /board/list?type=1&cp=10 &key=t&query=안녕 -->
                <form action="${boardCode}" method="get" id="boardSearch" onsubmit="return searchValidate()">
                    <input type="hidden" name="type" value="${param.type}">

                    <select name="key" id="search-key">
                        <option value="t">제목</option>
                        <option value="c">내용</option>
                        <option value="tc">제목+내용</option>
                        <option value="w">작성자</option>
                    </select>

                    <input type="text" name="query" id="search-query" placeholder="검색어를 입력해주세요.">

                    <button><i class="fa-solid fa-magnifying-glass"></i></button>
                </form>

            </section>

        </div>
    </main>


    <div class="modal">
        <span id="modal-close">&times;</span>
        <img id="modal-image" src="${contextPath}/resources/images/user.png">
    </div>


    <script>
        const contextPath="${contextPath}";
    </script>


    <jsp:include page="/WEB-INF/views/common/footer.jsp" />

    <script src="${contextPath}/resources/js/board/board.js"></script>

    <script>
        const boardList = "${boardList}";
    </script>
</body>

</html>