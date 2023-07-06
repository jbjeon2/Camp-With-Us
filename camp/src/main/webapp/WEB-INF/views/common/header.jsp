<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
  
    <!-- ======= Header ======= -->
    <header id="header" class="fixed-top d-flex align-items-center">
      <div class="header-container justify-content-between">

        <div class="logo">
          <a href="${contextPath}"><img src="${contextPath}/resources/images/CWUlogo2.png" id="home-logo"></a>
          &nbsp;<h1>C</h1>
          <h4>amp</h4>
          <h1>&nbsp;W</h1>
          <h4>ith</h4>
          <h1>&nbsp;U</h1>  
          <h4>s</h4>
        </div>

        <nav id="navbar" class="navbar">
          <ul>
            <li><a href="/camp/campList/?loc=&theme=&campName=">캠핑장조회</a></li>
            <li class="dropdown"><a href="${contextPath}/board/list/1">게시판</a>
              <ul>
                <c:forEach var="boardType" items="${boardTypeList}">
                  <li><a href="${contextPath}/board/list/${boardType.boardCode}">${boardType.boardName}</a></li>
                </c:forEach>
              </ul>
            </li>
            <c:choose>
              <c:when test="${loginMember.manager =='Y'}">
                <li class="dropdown myPage1"><a id="myPage" href="#">관리 페이지</a>
              </c:when>
              <c:otherwise>
                <li class="dropdown myPage1"><a id="myPage" href="#">마이페이지</a>
              </c:otherwise>
            </c:choose>
              <ul>
                <c:choose>
                  <c:when test="${loginMember.loginST=='Y'}">
                    <li><a href="${contextPath}/member/myPage/myReservation">예약 확인</a></li>
                    <li><a href="${contextPath}/member/myPage/myBoard">내 게시글</a></li>
                    <li><a href="${contextPath}/member/myPage/myReview">내 리뷰</a></li>
                    <li><a href="${contextPath}/member/myPage/profile">회원 정보 변경</a></li>
                    <li><a href="${contextPath}/member/myPage/secession">회원 탈퇴</a></li>
                  </c:when>
                  <c:when test="${loginMember.manager == 'Y'}">
                    <li><a href="${contextPath}/member/myPage/myReservation">전체 예약 확인</a></li>
                    <li><a href="${contextPath}/member/myPage/myBoard">전체 게시글</a></li>
                    <li><a href="${contextPath}/member/myPage/myReview">전체 리뷰</a></li>
                  </c:when>
                  <c:otherwise>
                    <li><a href="${contextPath}/member/myPage/myReservation">예약 확인</a></li>
                    <li><a href="${contextPath}/member/myPage/myBoard">내 게시글</a></li>
                    <li><a href="${contextPath}/member/myPage/myReview">내 리뷰</a></li>
                    <li><a href="${contextPath}/member/myPage/profile">회원 정보 변경</a></li>
                    <li><a href="${contextPath}/member/myPage/changePw">비밀번호 변경</a></li>
                    <li><a href="${contextPath}/member/myPage/secession">회원 탈퇴</a></li>
                  </c:otherwise>
                </c:choose>
              </ul>
            </li>
            <%-- 로그인이 되어있지 않은 경우 --%>
              <c:choose>

                <c:when test="${ empty sessionScope.loginMember}">
                  <li class="dropdown"><a href="${contextPath}/member/login">로그인</a>
                    <ul>
                      <li><a href="${contextPath}/member/login">로그인</a></li>
                      <li><a href="${contextPath}/member/signUpCheck">회원가입</a></li>
                      <li><a href="${contextPath}/member/findIdPw?findType=id">아이디/비밀번호<br>찾기</a></li>
                    </ul>
                  </li>
                </c:when>

                <c:otherwise>
                  <li>
                    <!-- 회원 프로필 이미지 -->
                    <a href="${contextPath}/member/myPage/profile">

                      <c:if test="${empty loginMember.profileImage}">
                        <img src="${contextPath}/resources/images/user.png" id="member-profile1">
                      </c:if>

                      <c:if test="${!empty loginMember.profileImage}">
                        <img src="${contextPath}${loginMember.profileImage}" id="member-profile1">
                      </c:if>

                    </a>
                    <a href="${contextPath}/member/myPage/profile" id="memberId">${loginMember.memberNickname}님</a>
                  </li>
                  <li>
                    <a href="${contextPath}/member/logout"><span>로그아웃</span></a>
                  </li>
                </c:otherwise>

              </c:choose>
          </ul>
        </nav><!-- .navbar -->

      </div>


      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
      <script>

        var loginMember = "${loginMember}";

        // 헤더 캠프목록조회로 이동함수
        function campList() {
          location.href = "/camp/campList/?loc=&theme=";
        }

        jQuery(document).ready(function () {
          $('.menu>li').mouseover(function () {
            $(this).find('.submenu').stop().slideDown(250);
          }).mouseout(function () {
            $(this).find('.submenu').stop().slideUp(250);
          });
        });

        // 네이버 로그아웃 
        /* 			var testPopUp;
              function openPopUp() {
                testPopUp = window.open("https://nid.naver.com/nidlogin.logout", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=450, height=450");
              }
              function closePopUp() {
                testPopUp.close();
              }
      	
              function naverLogout() {
                openPopUp();
                setTimeout(function () {
                  closePopUp();
                }, 5000);
              }
          */

        myPage.addEventListener("click", function () {
          console.log(loginMember);
          if (loginMember == null || loginMember == "") {
            alert("먼저 로그인을 해주세요");

          } else {
            location.href = "/camp/member/myPage/myReservation";
          }
        });

        var liList = document.querySelectorAll(".myPage1 ul li");

        for (var i = 0; i < liList.length; i++) {         /// header 마이페이지 list클릭시
          liList[i].addEventListener("click", function (e) {
            if (loginMember == "" || loginMember == null) {
              alert("먼저 로그인을 해주세요");
              e.preventDefault();                  // a 태그 주소이동을 막는다 . 
            } else {
              var linkUrl = this.querySelector("a").getAttribute("href");
              location.href = linkUrl;
            }
          });
        }
      </script>

      </section>

    </header>