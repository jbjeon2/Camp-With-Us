<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"  %>

 <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>회원가입</title>

     <link rel="stylesheet" href="${contextPath}/resources/css/signUp.css">
    
     <link rel="stylesheet" href="${contextPath}/resources/css/boxicons.css">
<!--      <link rel="stylesheet" href="${contextPath}/resources/css/main.css">
     <link rel="stylesheet" href="${contextPath}/resources/css/bootstrap-icons.css">
     <link rel="stylesheet" href="${contextPath}/resources/css/bootstrap_main_header.css">
      -->
 </head>
 <body>

    <jsp:include page="/WEB-INF/views/common/header.jsp" />

     <main>
	 	
        <div class="signUpAll">

            <div class="signUpLeft bg-light px-md-5">
                
            </div>

             <!-- 회원가입  -->
            <div class="signUpRight bg-light px-md-5">
                
                    <form class="col-lg-8 col-xl-6" action="signUp" method="POST" name="signUp-form" onsubmit="return signUpValidate()">
        
                        
                            <div class="signName">* 아이디(이메일)</div>
                       
                            <div class="signUp-input-area form-floating mb-3">

                                <input type="text" class="form-control"  id="memberEmail" name="memberEmail"
                                   placeholder="이메일" maxlength="50" autocomplete="off" required>
                                    <label for="memberEmail">Id(Email)</label>
                    
                                <button type="button" id="sendBtn" class="btn btn2 btn-primary btn-lg">인증번호 받기</button>

                            </div>
                            <div class="signUp-message" id="emailMessage">메일을 받을 수 있는 이메일을 입력해주세요.</div>
                        
                       
                        

                        
                        <div class="signName">* 인증번호</div>
                        <div class="signUp-input-area form-floating mb-3">
                            <!-- cNumber -->
                            <input type="text" class="form-control" id="cNumber"  
                                    placeholder="인증번호 입력" maxlength="6"
                                    autocomplete="off">
                                <label for="emailCheck">Certification Number</label>
                            <button type="button" id="cBtn" class="btn btn2 btn-primary btn-lg">인증하기</button>
                            
                        </div>
                        <div class="signUp-message" id="cMessage" ></div>
                             <!-- 5:00 타이머 / 인증되었습니다(녹색) / 인증 시간이 만료되었습니다.(빨간색) -->
                       
                        


                        <div class="signName">* 비밀번호</div>
                        <div class="signUp-input-area form-floating mb-3">
                            <input  type="password" class="form-control" id="memberPw" name="memberPw"
                                    placeholder="비밀번호" maxlength="30">
                            <label for="memberPw">PassWord</label>
                         </div>
        
                        <div class="signUp-input-area form-floating mb-3">
                            <input type="password" class="form-control" id="memberPwConfirm" name="memberPwConfirm"
                                    placeholder="비밀번호 확인" maxlength="30">
                                    <label for="memberPwConfirm">PassWord Confirm</label> 
                        </div>
                        <div class="signUp-message" id="pwMessage">영어, 숫자, 특수문자(!,@,#,-,_) 6~30글자 사이로 작성해주세요.</div>
                        
        
                        
        
                        <div class="signName">* 닉네임</div>
                        <div class="signUp-input-area form-floating mb-3">
                            <input type="text" class="form-control" id="memberNickname" name="memberNickname"
                                    placeholder="닉네임" maxlength="10">
                                    <label for="memberNickname">Nickname</label>
                        </div>
                        <div class="signUp-message" id="nicknameMessage">영어/숫자/한글 2~10글자 사이로 작성해주세요.</div>
                        
        
                        
        
                        
                         
                        <div class="signName">* 전화번호</div>
                        <div class="signUp-input-area form-floating mb-3">
                            <input type="text" class="form-control" id="memberTel" name="memberTel"
                                    placeholder="(- 없이 숫자만 입력)" maxlength="11">
                            <label for="memberTel">Telephone</label>
                        </div>
                        <div class="signUp-message" id="telMessage">전화번호를 입력해주세요.(- 제외)</div>
                        
                    
                        
                    
                        
                        <div class="signName">* 주소</div>
                        <div class="signUp-input-area form-floating mb-3">
                            <input type="text" class="form-control" id="sample4_postcode" name="memberAddress"
                                    placeholder="우편번호" maxlength="6">
                            <label for="memberAddress"> 우편번호</label>     
                            <button type="button" class="btn btn2 btn-primary btn-lg" onclick="sample4_execDaumPostcode()">주소검색</button>
                        </div>
        
                        <div class="signUp-input-area form-floating mb-3">
                            <input type="text" class="form-control" id="sample4_roadAddress" name="memberAddress" placeholder="도로명주소">
                            <label for="memberAddress"> 도로명주소</label>
                        </div>
        
                        <div class="signUp-input-area form-floating mb-3">
                            <input type="text" class="form-control" id="sample4_detailAddress" name="memberAddress" placeholder="상세주소">
                            <label for="memberAddress"> 상세주소</label>
                        </div>
        
                        <button type="submit" id="signUp-btn" class="btn btn-primary btn-lg">가입하기</button>
        
                    </form>

            </div>

        </div>

         
 
 
     </main>
 
    <!-- footer include -->
  	<jsp:include page="/WEB-INF/views/common/footer.jsp" />
    <!-- jQuery 라이브러리 추가(CDN) -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <!-- 다음 주소 API -->
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <!-- signUp.js 연결 -->
    <script src="${contextPath}/resources/js/signUp.js"></script>

    
 </body>
 </html>