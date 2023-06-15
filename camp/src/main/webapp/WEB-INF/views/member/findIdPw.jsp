<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"  %>

 <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>아이디/비밀번호 찾기</title>

     
<!--      <link rel="stylesheet" href="${contextPath}/resources/css/bootstrap-icons.css">
     <link rel="stylesheet" href="${contextPath}/resources/css/bootstrap_main_header.css"> -->
     <!-- <link rel="stylesheet" href="${contextPath}/resources/css/signUpPage.css"> -->
     <link rel="stylesheet" href="${contextPath}/resources/css/findIdPw.css">
     <link rel="stylesheet" href="${contextPath}/resources/css/boxicons.css">
 </head>
 <body>

    <!-- hedaer include -->
    <jsp:include page="/WEB-INF/views/common/header.jsp" />

     <main>
        
        <!-- 아이디 찾기  -->
         <div class="find-content bg-light px-md-5">
            
            <div class="mb-5">                    
                <h1 class="fw-bolder">아이디(이메일) 찾기</h1>
            </div>
             
            <div class="gx-5 ">

                <form class="col-lg-8 col-xl-6" action="findId" method="POST" name="findId-form" onsubmit="return findIdValidate()">
 
                    
                    <span class="msg">해당 아이디에 등록된 전화번호를 입력해 주세요.<br>(' - ' 없이 숫자만 입력)</span> 
                    
                    
                    <div class="idPw-input-area form-floating mb-3">
                        <input type="text" class="form-control" id="memberTel" name="memberTel" type="text"
                          maxlength="11">
                        <label for="memberTel">Tel</label>
                    </div>
     
                     <button type="submit" id="findId-btn" class="btn btn-primary btn-lg">아이디(이메일) 찾기</button>
     
                 </form>

            </div>
        </div>   

            

            <!-- 비밀번호 찾기  -->
        <div class="find-content bg-light px-md-5">
            <div class="mb-5">                    
                <h1 class="fw-bolder">비밀번호 찾기</h1>
            </div>

            <div class="pwDiv">

                <form class="col-lg-8 col-xl-6" action="findPw" method="POST" name="findPw-form" onsubmit="return findPwInvalidate()">
 
                    
                    <span class="msg">가입된 아이디를 입력해 주세요.</span> 
                   
                    <div class="idPw-input-area form-floating mb-3">
                        <input type="text" class="form-control" id="memberEmail" name="memberEmail"
                        maxlength="50">
                        <label for="memberEmail">Id(Email)</label>
                    </div>
                   
                    <span class="msg">해당 아이디에 등록된 전화번호를 입력해 주세요.<br>(' - ' 없이 숫자만 입력)</span> 
                 
                    <div class="idPw-input-area form-floating mb-3">
                        <input type="text" class="form-control" id="memberTel" name="memberTel"
                         maxlength="11"autocomplete="off">
                        <label for="memberTel">Tel</label>
                    </div>
                    
    
                    <button type="submit" id="findPw-btn" class="btn btn-primary btn-lg">비밀번호 찾기</button>
     
                 </form>

            </div>
        </div>



     </main>
 
    <!-- footer include -->
  	<jsp:include page="/WEB-INF/views/common/footer.jsp" />
    <!-- jQuery 라이브러리 추가(CDN) -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

    <!-- signUp.js 연결 -->
    <script src="${contextPath}/resources/js/findIdPw.js"></script>

    
 </body>
 </html>