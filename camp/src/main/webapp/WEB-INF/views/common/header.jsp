<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top d-flex align-items-center">
    <div class="container d-flex align-items-center justify-content-between">

      <div class="logo">
        <a href="${contextPath}"><img src="${contextPath}/resources/images/camp_logo.jpg" id="home-logo"></a>
        <h1 class="text-light">캠핑보내조</h1>
      </div>

      <nav id="navbar" class="navbar">
        <ul>
          <li><a href = "/camp/campList/?loc=&theme=">캠핑장조회</a></li>
          <li class="dropdown"><a href="#">게시판</a>
            <ul>
              <c:forEach var="boardType" items="${boardTypeList}">
							  <li><a href="${contextPath}/board/list/${boardType.boardCode}">${boardType.boardName}</a></li>
			  </c:forEach>	
            </ul>
          </li>
          <li class="dropdown"><a class="nav-link scrollto" id="myPage">마이페이지</a>
            <ul>
              <c:choose>
                <c:when test="${loginMember.loginST=='Y'}">
                  <li><a href="${contextPath}/member/myPage/myReservation">예약 확인</a></li>
                  <li><a href="${contextPath}/member/myPage/myBoard">내 게시글</a></li>
                  <li><a href="${contextPath}/member/myPage/myReview">내 리뷰</a></li>
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
                  <li><a href="${contextPath}/member/signUp">회원가입</a></li>
                  <li><a href="${contextPath}/member/findIdPw">아이디/비밀번호<br>찾기</a></li>
                </ul>
              </li>
            </c:when>
            
            <c:otherwise>
              <li>
                <a href="${contextPath}/member/myPage/profile">${loginMember.memberNickname}님</a>
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
					var liList = document.querySelectorAll(".myPage_1 .submenu li");

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
