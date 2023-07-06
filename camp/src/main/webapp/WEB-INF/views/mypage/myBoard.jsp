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
    <link rel="stylesheet" href="${contextPath}/resources/css/boardList-style.css">
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
                <c:choose>
                    <c:when test="${loginMember.manager == 'Y'}">
                        <h1 class="myPage-title">전체 게시글 조회</h1>
                        <span class="myPage-explanation">전체 게시글을 볼 수 있습니다.</span>
                    </c:when>
                    <c:otherwise>
                <h1 class="myPage-title">내 게시글</h1>
                <span class="myPage-explanation">현재 회원님이 작성한 게시글을 확인할 수 있습니다.</span>
                </c:otherwise>
            </c:choose>

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
                    </tbody>

                </table>

                
                
            </div>

            <div id="pagination" class="pagination"></div>
        </section>

    </main>

    <jsp:include page="/WEB-INF/views/common/footer.jsp" />
    
    <script>
        const boardList = '${boardList}';
        const contextPath = "${contextPath}";

        // 내 게시글 조회 + 페이지네이션
        var currentPage = 1;
        var itemsPerPage = 10;
        var myBoardList = document.getElementById("myBoardList");

        function displayItems(page) {
            var startIndex = (page - 1) * itemsPerPage;
            var endIndex = startIndex + itemsPerPage;
            // var filteredItems = ; // -> boardList

            //console.log(boardList);
            var bList = JSON.parse(boardList);
            // console.log("parse " + bList);
            
            var totalPages = Math.ceil(bList.length / itemsPerPage);
            var paginatedItems = bList.slice(startIndex, endIndex);

            myBoardList.innerHTML = "";

            if(paginatedItems.length == 0) {
                myBoardList.innerHTML = 
                    "<tr>" +
                        "<th colspan='5'>게시글이 존재하지 않습니다.</th>" +
                    "</tr>";
            } else {
                paginatedItems.forEach(item => {
                    // console.log(item);
                    
                    if(item.thumbnail != null) {
                        var htmlCode =
                            // '<tbody>' + 
                                '<tr>' +
                                    '<td>' + item.boardNo +'</td>' +
                                    '<td>'+
                                        "<img class='list-thumbnail' src='" + contextPath + item.thumbnail + "'>" + 
                                        // http://localhost:8080/camp/board/detail/3/561?cp=1
                                        "<a href='${contextPath}/board/detail/" + item.boardCode + "/" + item.boardNo + "?cp=" + currentPage + "'>" + item.boardTitle + "</a>" +                                                             
                                    '</td>' + 
                                    '<td>' + item.memberNickname + '</td>' + 
                                    '<td>' + item.createDate + '</td>' + 
                                    '<td>' + item.readCount + '</td>' + 
                                '</tr>';
                            // '</tbody>';
            
                        myBoardList.innerHTML += htmlCode;
                    } else {
                        var htmlCode =
                            // '<tbody>' + 
                                '<tr>' +
                                    '<td>' + item.boardNo +'</td>' +
                                    '<td>'+
                                        // http://localhost:8080/camp/board/detail/3/561?cp=1
                                        "<a href='${contextPath}/board/detail/" + item.boardCode + "/" + item.boardNo + "?cp=" + currentPage + "'>" + item.boardTitle + "</a>" +                                                             
                                    '</td>' + 
                                    '<td>' + item.memberNickname + '</td>' + 
                                    '<td>' + item.createDate + '</td>' + 
                                    '<td>' + item.readCount + '</td>' + 
                                '</tr>';
                            // '</tbody>';
            
                        myBoardList.innerHTML += htmlCode;
                    }
        
                }); 
            }
            
        
            // 페이지네이션 부분 
            var pagination = document.getElementById("pagination");
            pagination.innerHTML = "";
        
            var startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
            var endPage = Math.min(startPage + 4, totalPages);
            
            if (startPage > 1) {
            var prevButton = document.createElement("button");
            prevButton.textContent = "이전";
            prevButton.classList.add("pagination-previous");
            prevButton.addEventListener("click", function () {
                currentPage = startPage - 5;
                displayItems(currentPage);
                window.scrollTo(0, 0);
        
            });
            pagination.appendChild(prevButton);
            }
            for (var i = startPage; i <= endPage; i++) {
            var pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.classList.add("page-button");
            if (i === currentPage) {
                pageButton.classList.add("active");
            }
            pageButton.addEventListener("click", function () {
                currentPage = parseInt(this.textContent);
                displayItems(currentPage);
                window.scrollTo(0, 0);
            });
            pagination.appendChild(pageButton);
            }
            if (endPage < totalPages) {
            var nextButton = document.createElement("button");
            nextButton.textContent = "다음";
            nextButton.classList.add("pagination-next");
            nextButton.addEventListener("click", function () {
                currentPage = endPage + 1;
                displayItems(currentPage);
                window.scrollTo(0, 0);
            });
            pagination.appendChild(nextButton);
            }
        }
        
        displayItems(currentPage);

    </script>


    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

    <script src="${contextPath}/resources/js/mypage.js"></script>

</body>
</html>