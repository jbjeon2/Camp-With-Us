<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <title>로그인</title>

        <link rel="stylesheet" href="${contextPath}/resources/css/login.css">
        <link rel="stylesheet" href="${contextPath}/resources/css/boxicons.css">

      <!--   <link rel="stylesheet" href="${contextPath}/resources/css/main.css"> -->

        <link rel="stylesheet" href="${contextPath}/resources/css/bootstrap-icons.css">
    </head>

    <body>

        <!-- hedaer include -->
        <jsp:include page="/WEB-INF/views/common/header.jsp" />

        <main>

            <!-- 회원가입  -->

          
            <div class="signUp-content bg-light px-md-5">


                <div class="mb-5"> 
                    <div class="logo">
                        <a href="${contextPath}"><img src="${contextPath}/resources/images/CWUlogo2.png" id="home-logo"></a>
                    </div>                   
                    <h1 class="fw-bolder">LOGIN</h1>
                </div>


                <div class="row gx-5 justify-content-center">
                    <form class="col-lg-8 col-xl-6" action="login" method="POST" name="login-form" onsubmit="return loginValidate()">
                        

                                <!-- id input-->
                                <div class="signUp-input-area form-floating mb-3">
                                    <input class="form-control" id="memberEmail" type="text" name="memberEmail" 
                                     placeholder="아이디(이메일)" maxlength="50"/>
                                    <label for="memberEmail">ID(Email)</label>
                                </div>


                                <!-- password input-->
                                <div class="signUp-input-area form-floating mb-3">
                                    <input class="form-control" id="memberPw" type="password" name="memberPw"
                                    placeholder="비밀번호" maxlength="30"/>
                                    <label for="memberPw">PassWord</label>
                                </div>
                                
                                <!-- Submit Button-->
                                <div class="d-grid"><button type="submit" id="login-btn" class="btn btn-primary btn-lg">로그인</button></div>
                        
                        
                    </form>
                    
                </div>


                <div class="findSignupBtn">
                    <a class="signUpBtn" href="${contextPath}/member/signUpCheck">회원가입</a>
                    &ensp;|&ensp;
                    <a class="findIdPwBtn" href="${contextPath}/member/findIdPw">아이디/비밀번호 찾기</a>
                </div>


                <div class="socialLogin">

                    <!-- 네이버 로그인 -->
                    <div>
                        <a href="javascript:;" id="naver_id_login" onclick="showLoginPopup();">
                            <img width="200" src="${contextPath}/resources/images/Nbtn.png"></a>
                    </div>

                    &ensp;&ensp;&ensp;&ensp;&ensp;

                    <!-- 구글 로그인 -->
                    <div id="google_id_login" style="text-align:center">
                        <a href="${contextPath}/member/login/getGoogleAuthUrl">
                            <img width="200" src="${contextPath}/resources/images/googleBtn.png">
                        </a>
                    </div>


                    <!-- 카카오 로그인 -->
                    <ul>
                        <li class="kakaoLg" onclick="kakaoLogin();">
                            <a href="javascript:void(0)">
                                <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                                    width="222" alt="카카오 로그인 버튼" />
                            </a>
                        </li>
                    </ul>

                </div>

                 



            </div>


            </section>


        </main>



        <!-- footer include -->
        <jsp:include page="/WEB-INF/views/common/footer.jsp" />
        <!-- jQuery 라이브러리 추가(CDN) -->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"
            integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

        <script src="${contextPath}/resources/js/login.js"></script>

        <!-- 네이버 로그인 -->
        <script type="text/javascript" src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js"
            charset="utf-8"></script>

        <!-- 구글 로그인 -->
        <script src="https://accounts.google.com/gsi/client" async defer></script>


        <script type="text/javascript">
            const contextPath = "${contextPath}";

            function showLoginPopup() {
                let uri = 'https://nid.naver.com/oauth2.0/authorize?' +
                    'response_type=code' +                  // 인증과정에 대한 내부 구분값 code 로 전공 (고정값)
                    '&client_id=키' +     // 발급받은 client_id 를 입력  ( 개인이 직접받아야해요 )
                    '&state=NAVER_LOGIN_TEST' +             // CORS 를 방지하기 위한 특정 토큰값(임의값 사용)
                    '&redirect_uri=http://ec2-3-37-254-218.ap-northeast-2.compute.amazonaws.com:8080/camp/login/naverLoginSuccess';   // 어플케이션에서 등록했던 CallBack URL를 입력

                // 사용자가 사용하기 편하게끔 팝업창으로 띄어준다.
                window.open(uri, "_self", "Naver Login Test PopupScreen", "width=450, height=600");
            }
        </script>

        <!-- 카카오 로그인 -->
        <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.2.0/kakao.min.js"
            integrity="키"
            crossorigin="anonymous"></script>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>

        <script>
            //카카오로그인
            Kakao.init('키'); //발급받은 키 중 javascript키를 사용해준다.
            console.log("Kakao.isInitialized : " + Kakao.isInitialized()); // sdk초기화여부판단

            function kakaoLogin() {
                Kakao.Auth.login({
                    success: function (response) {
                        Kakao.API.request({
                            url: '/v2/user/me',
                            success: function (response) {

                                console.log(response)
                                console.log("properties : " + response.properties);
                                console.log(response.properties);

                                const prop = response.properties;
                                const account = response.kakao_account;
                                console.log("prop.nickname : " + prop.nickname);
                                $.ajax({
                                    url: "kakaoLoginInfo",
                                    type: "POST",
                                    data: {
                                        "memberNickname": prop.nickname,
                                        "memberEmail": account.email
                                    },

                                    success: function (result) {
                                        if (result == 2) {
                                            alert("이미 가입된 아이디입니다.");
                                            window.location.href = '${contextPath}/member/login';
                                        } else if(result == 0) {
                                            // window.location.href = history.go(-1);
                                            alert("환영합니다. 회원가입이 완료되었습니다.");
                                            location.href = document.referrer;
                                            //window.location.reload();
                                        } else{
                                            location.href = document.referrer;
                                        }                                    

                                        if (Kakao.Auth.getAccessToken()) {
                                            Kakao.API.request({
                                                url: '/v1/user/unlink',
                                                success: function (response) {
                                                    console.log(response)

                                                },
                                                fail: function (error) {
                                                    console.log(error)
                                                },
                                            })
                                            Kakao.Auth.setAccessToken(undefined)
                                        }

                                    },
                                    error: function () {

                                    }
                                });


                            },
                            fail: function (error) {
                                console.log(error)
                            },
                        })
                    },
                    fail: function (error) {
                        console.log(error)
                    },
                })
            }



        </script>

    </body>

    </html>