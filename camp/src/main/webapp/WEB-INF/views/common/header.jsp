<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>


<header>

	<section>
	    <a href="${contextPath}">
	        <img src="${contextPath}/resources/images/camp_logo.jpg" id="home-logo">
			<!-- 로고 교체 예정 -->
	    </a>
		<h3 class="title">캠프 보내조</h3>
	</section>
	
	<section></section>

	<section>
		<ul class="menu">
			<li>
				<h4 id="board">게시판</h4>
				<ul class="submenu">
					<li>캠핑장 추천</li>
					<li>캠핑 나눔</li>
					<li>캠핑 꿀팁</li>
					<li>공지사항</li>
					<li>문의사항</li>
					<!-- <c:forEach var="boardType" items="${boardTypeList}">
						<li><a href="${contextPath}/board/list/${boardType.boardCode}">${boardType.boardName}</a></li>
					</c:forEach> -->
				</ul>
			</li>
			<li>
				<h4 id="myPage">마이페이지</h4>
				
				<ul class="submenu">
					<li><a href="${contextPath}/member/myPage/myReservation">예약 확인</a></li>
					<li><a href="${contextPath}/member/myPage/myBoard">내 게시글</a></li>
					<li><a href="${contextPath}/member/myPage/myReview">내 리뷰</a></li>
					<li><a href="${contextPath}/member/myPage/profile">회원 정보 변경</a></li>
					<li><a href="${contextPath}/member/myPage/changePw">비밀번호 변경</a></li>
					<li><a href="${contextPath}/member/myPage/secession">회원 탈퇴</a></li>
				</ul>
				
			</li>
			<%-- 로그인이 되어있지 않은 경우 --%>
			<c:choose>
			
				<c:when test="${ empty sessionScope.loginMember }">
					<li>
						<h4 id="login">로그인</h4>
						
						<ul class="submenu">
							<li><a href="${contextPath}/login/loginPage">로그인</a></li>
							<li><a href="${contextPath}/login/signUpPage">회원가입</a></li>
							<li>아이디/비밀번호<br>찾기</li>
						</ul>
					</li>
				</c:when>
				
				<c:otherwise>
					<li><h4>${loginMember.memberNick}님</h4></li>
					<li><h4 id="logout">로그아웃</h4></li>
				</c:otherwise>
				
			</c:choose>
			
		</ul>
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
		<script>
			jQuery(document).ready(function(){
				$('.menu>li').mouseover(function(){
					$(this).find('.submenu').stop().slideDown(250);
				}).mouseout(function(){
					$(this).find('.submenu').stop().slideUp(250);
				});
			});
		</script>

	</section>
	
</header>
