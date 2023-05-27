<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"  %>


<!DOCTYPE html>
<html>
<!-- jstl에서 태그라이브러리 c:set 쓰는 경우, var변수명, js에서 쓰는 var와는 다름. -->
<!-- contextPath 선언 및 초기화는 보통 common에, ↓ contextPath 선언 및 초기화 따로 재설정할 예정(jsp->필터나 common으로) -->
<head>
<meta charset="UTF-8">
<title>Camping Reservation Website LoginPage</title>
<link rel="stylesheet" href="/resources/css/loginPage.css" >
<!-- 네이버 로그인과 관련된 기능을 사용하기 위해 필요한  "naverLogin_implicit-1.0.3.js" 파일을 불러옵니다. -->

<!-- jquery를 사용하기 위해 제이쿼리 라이브러리를 불러옵니다. -->
<!-- jquery는 HTML문서에서 자바스크립트 코드를 더 쉽게 작성하고,
다양한 기능을 구현하기 위해 사용되는 인기있는 자바스크립트 라이브러리중 하나다.  -->
</head>
<body>
	<!-- 
	헤더파일 추가하기
	directive(지시어->%@스크립틀릿)는 헤더파일을 포함시킨 후 컴파일을 실시,
	active(액션->jsp:inclue page="헤더파일경로")는 실행시점에 해당 파일을 수행하여 결과를 포함시킨다. 
	나중에 jsp:include page='헤더파일경로' 로 추가할 예정이다.
	 -->
	 <!-- 헤더 파일 경로 추가 -->	
	 <jsp:include page="/WEB-INF/views/common/header.jsp" />
	 <main>

	 <div class="login-wrapper">
		<h1>캠프 보내조</h1>
		<form action="/login/login" method="post" id="login-form">
			
			
			<input type="email" name="memberEmail" placeholder="이메일을 입력하세요.">
			<input type="password" name="memberPw" placeholder="비밀번호를 입력하세요.">


			<div class="email-checkbox-wrapper">
				<input type="checkbox" id="remember-user-email" name="saveId">
				<label for="remember-user-email">이메일 저장</label>
			</div>
			<div class="login-btn">
				<input type="submit" value="로그인" />
			</div>
		</form>
		<!--선 사이에 글자 넣는 것은 css로 설정하면 된다.-->
			<div class="hr-section">또는</div>

			<div class="social-loginbtns">

				<div>
					<a href="javascript:;" id="naver_id_login" onclick="showLoginPopup();">
					<img width="200" src="${contextPath}/resources/images/Nbtn.png"></a>
				</div>
				
				<div></div>
			</div>
	<!-- 
	＊꺽쇠표시 조심, 주석이라도 꺽쇠가 포함되어 있으면, 서버 에러가 난다.
	푸터파일 추가하기
	나중에 jsp:include page='푸터파일경로' 로 추가할 예정이다.
	 -->
	</main>
	
	<!-- 푸터 파일 경로 추가 -->
  	<jsp:include page="/WEB-INF/views/common/footer.jsp" />
		<script type="text/javascript" src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js" charset="utf-8"></script>
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
	<!-- (2) LoginWithNaverId Javscript SDK -->

		<script type="text/javascript">
// 			var naver_id_login = new naver_id_login("IDz2f9V7KDUGFQtrc5dB", "{contextPath}/naverLoginSuccess");
// 			var state = naver_id_login.getUniqState();
// 			naver_id_login.setButton("white", 2,40);
// 			naver_id_login.setDomain("{contextPath}/loginPage");
// 			naver_id_login.setState(state);
// 			naver_id_login.setPopup();
// 			naver_id_login.init_naver_id_login();
			function showLoginPopup(){
		        let uri = 'https://nid.naver.com/oauth2.0/authorize?' +
		            'response_type=code' +                  // 인증과정에 대한 내부 구분값 code 로 전공 (고정값)
		            '&client_id=IDz2f9V7KDUGFQtrc5dB' +     // 발급받은 client_id 를 입력
		            '&state=NAVER_LOGIN_TEST' +             // CORS 를 방지하기 위한 특정 토큰값(임의값 사용)
		            '&redirect_uri=http://localhost:8080/login/naverLoginSuccess';   // 어플케이션에서 등록했던 CallBack URL를 입력
		
		        // 사용자가 사용하기 편하게끔 팝업창으로 띄어준다.
		        window.open(uri, "Naver Login Test PopupScreen", "width=450, height=600");
		    }
		</script>

</body>
</html>