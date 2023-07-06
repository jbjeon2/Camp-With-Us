<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<!-- <c:set var="boardName" value="${map.boardName}" /> -->

<c:set var="pagination" value="${map.pagination}" />
<c:set var="boardList" value="${map.boardList}" />

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    

    <c:forEach var="boardTypeList" items="${boardTypeList}">
        <c:if test="${boardCode == boardTypeList.boardCode}">
            <c:set var="boardName" value="${boardTypeList.boardName}"/>
        </c:if>
    </c:forEach>
   

    <title>${boardName}</title>

    <link rel="stylesheet" href="${contextPath}/resources/css/boxicons.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/bootstrap_main_header.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/bootstrap-icons.css">

    <link rel="stylesheet" href="${contextPath}/resources/css/boardList-style+버전.css">
    <!-- <link rel="stylesheet" href="${contextPath}/resources/css/boardList-style3.css"> -->
    <!-- <link rel="stylesheet" href="${contextPath}/resources/css/boardList-style.css"> -->
    
    <link rel="stylesheet" href="${contextPath}/resources/css/main.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/mypage.css">
    

    <!-- 게시판Table 공통화를위해 CSS 추가 . -->
    <script src="https://kit.fontawesome.com/a2e8ca0ae3.js" crossorigin="anonymous"></script>
</head>
<body>

    <jsp:include page="/WEB-INF/views/common/header.jsp"/>
    <main>
        <div class="myPage-content">
        <jsp:include page="/WEB-INF/views/board/boardSideMenu.jsp"/>
        
        <%-- 검색을 진행한 경우 key, query를 쿼리스트링 형태로 저장한 변수 생성 --%>
        <c:if test="${!empty param.key}">
            <c:set var="sURL" value="&key=${param.key}&query=${param.query}" />
        </c:if>


        <section class="board-list">

         

<!--             <c:if test="${!empty param.key}">
                <h3 style="margin-left:30px;"> "${param.query}" 검색 결과  </h3>
            </c:if> -->
            <div class = "myPageHeadFlex" id="myPageHeadFlexImg">
                <div class = "myPageHead">
                    <h1 class="myPage-title">${boardName}</h1>
                
                <span class="myPage-explanation"><span class="CWUspan">Camp With Us</span> 의 문의사항을 확인할 수 있습니다.</span>
                </div>
            </div>


            <div class="list-wrapper">
                <table class="list-table table table-hover">
                    
                    <thead>
                        <tr>
                            <th>글번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>

                    <tbody id="myBoardList">

                        <c:choose>
                            <c:when test="${empty boardList}">
                                <!-- 게시글 목록 조회 결과가 비어있다면 -->
                                <tr>
                                    <th colspan="5">게시글이 존재하지 않습니다.</th>
                                </tr>
                            </c:when>

                            <c:otherwise>
                                <!-- 게시글 목록 조회 결과가 비어있지 않다면 -->

                                <!-- 향상된 for문처럼 사용 -->
                                <c:forEach var="board" items="${boardList}">
                                    <tr>
                                        <td>${board.boardNo}</td>
                                        <td> 
                                            <c:if test="${!empty board.thumbnailImg}">
                                                <img class="list-thumbnail" src="${board.thumbnailImg}">
                                            </c:if>
                                            <c:if test="${empty board.thumbnailImg}">
                                                <img class="list-thumbnail" src="${contextPath}/resources/images/CWUlogo3.png">
                                            </c:if>     
                                            <c:choose>
                                                <c:when test="${loginMember.manager == 'Y'}">
                                                    <a href="../detail/${boardCode}/${board.boardNo}?cp=${pagination.currentPage}${sURL}">${board.boardTitle}</a>
                                                </c:when>
                                                <c:when test="${loginMember.memberNickname == board.memberNickname}">
                                                    <a href="../detail/${boardCode}/${board.boardNo}?cp=${pagination.currentPage}${sURL}">${board.boardTitle}</a>
                                                </c:when>
                                                <c:otherwise>
                                                    <p id ="boardListP"> <i class="fa-solid fa-lock"></i> 비밀글 입니다.</p>
                                                </c:otherwise>
                                            </c:choose>  
                                                <%-- detail?no=${board.boardNo}&cp=${pagination.currentPage}&type=${param.type}${sURL} --%>
                                       		    <%-- 현재 페이지 주소 : /board/list/1?cp=1
                                        		상세 조회 주소   : /board/detail/1/300?cp= --%>
                                        </td>
                                        <td>${board.memberNickname}</td>
                                        <td>${board.createDate}</td>
                                        <td>${board.readCount}</td>
                                    </tr>
                                </c:forEach>

                            </c:otherwise>
                        </c:choose>
                    </tbody>
                </table>
            </div>

            <div class="btn-area">

                <c:if test="${!empty loginMember}">
                    <!-- /camp/board/write -->
                    <button id="insertBtn" onclick="location.href='../write/${boardCode}?mode=insert&cp=${pagination.currentPage}'">글쓰기</button>                     
                </c:if>

            </div>

            
            <div class="pagination-area">

                <!-- 페이지네이션 a태그에 사용될 공통 주소를 저장한 변수 선언 -->
                <c:set var="url" value="${boardCode}?cp="/>


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

            <!-- <form action="list" method="get" id="boardSearch" onsubmit="return searchValidate()"> -->
            <form action="${boardCode}" method="get" id="boardSearch" onsubmit="return searchValidate()">
                <input type="hidden" name="type" value="${param.type}">

                <select name="key" id="search-key">
                    <option value="t">제목</option>
                 	<option value="c">내용</option>
                    <option value="tc">제목+내용</option>
                    <option value="w">작성자</option>
                </select>

                <input type="text" name="query"  id="search-query" placeholder="검색어를 입력해주세요.">

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

    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>

    <script src="${contextPath}/resources/js/board/board.js"></script>

</body>
</html>