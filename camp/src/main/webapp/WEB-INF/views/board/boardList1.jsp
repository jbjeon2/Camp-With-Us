<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>

<!DOCTYPE html>
<html lang="en">
    <head>
        
        <!-- 파비콘 오류 해결 : GET http://localhost:8080/favicon.ico 404 -->
        <link rel="icon" href="data:;base64,iVBORw0KGgo=">
        
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css">
        
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        
        <c:forEach var="boardTypeList" items="${boardTypeList}">
            <c:if test="${boardCode == boardTypeList.boardCode}">
                <c:set var="boardName" value="${boardTypeList.boardName}"/>
            </c:if>
        </c:forEach>
        
        <c:set var="rdList" value="${placeRecommendList}"/>

    
    <title>${boardName}</title>
    
    <link rel="stylesheet" href="${contextPath}/resources/css/main.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/boxicons.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/bootstrap-icons.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/bootstrap_main_header.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/mypage.css">

    <link rel="stylesheet" href="${contextPath}/resources/css/boardList-style1.css">
    <!-- <link rel="stylesheet" href="${contextPath}/resources/css/boardList-style.css"> -->
    
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"/>

    <script src="https://kit.fontawesome.com/a2e8ca0ae3.js" crossorigin="anonymous"></script>
</head>
<body>
    <!-- JavaScript용 Facebook SDK 정규식 추가 -->

    <div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="" nonce="Ch1e3BJs"></script>

<jsp:include page="/WEB-INF/views/common/header.jsp"/>


    <main>     
        <!-- sideBar 넣기위한 div 추가 !!!  boardList 1,2,3,4,5 다들어가있습니다. -->
        <div class="myPage-content">
            <jsp:include page="/WEB-INF/views/board/boardSideMenu.jsp"/>
        
            <section class="contain">

                <div class="board1">
                    
                    <div class="headline1">
                        <div class="headline1-1">
                            <h1 class="color1-1">C</h1>
                            <h1 class="color1-11">amp</h1>&nbsp;&nbsp;
                            <h1 class="color1-1">W</h1>
                            <h1 class="color1-11">ith</h1>&nbsp;&nbsp;
                            <h1 class="color1-1">U</h1>
                            <h1 class="color1-11">s</h1>&nbsp;&nbsp;&nbsp;
                            <h1 class="color1-12">7월</h1>&nbsp;&nbsp;
                            <h1 class="color1-2">PICK</h1>
                        </div>
                        <div class="headline1-2">
                            <h2>여행지 </h2>&nbsp;
                            <h2 >추천</h2>
                        </div>
                    </div>

                    <div class="multiple-items">

                        <!-- 향상된 for문처럼 사용 -->
                        <c:forEach var="rdList" items="${placeRecommendList}">
                            <div class="slide-content">
                                <div class="slide-img">
                                    <a><img src="${contextPath}${rdList.recommendImg}"></a>
                                    <div class="hover-text" onclick="window.open('${rdList.recommendDetailpg}')">자세히 보기</div>
                                </div>
                                <div class="slide-text">
                                    <div>
                                    <p class="slide-title">${rdList.recommendTitle}</p>
                                    </div>
                                    <!-- <hr> -->
                                    <div class="slide-content">
                                        ${rdList.recommendContent}
                                    </div>
                                    <button class="slide-btn" style="margin-top: 15px; cursor: pointer;" onclick="window.open('${rdList.recommendHomepg}')">
                                        홈페이지로 이동&nbsp;<i class="xi-home-o xi-x xi-fw"></i>
                                    </button>
                                </div>
                            </div>
                        </c:forEach>
                    </div>

                </div>

                <div class="board-empty"></div>

                <div class="board2">

                    <div class="headline2">
                        <h1>캠핑 소식</h1>
                        <div class="headline2-1">
                            <h2>캠핑 </h2>&nbsp;
                            <h2 class="color2"> 이모저모</h2>
                            <h2>,  유익한  </h2>&nbsp;&nbsp;
                            <h2 class="color2"> 정보 </h2>
                            <h2>를 한눈에!</h2>
                        </div>
                    </div>
                    
                    <div class="board-list">
                        
                        <div class="board2-1">
                            <!-- 고캠핑 플러그인 -->
                            <!-- 페이스북 개발자 로그인 된 상태에서만 화면이 제대로 나옴 -->
                            <div class="fb-page" data-href="https://www.facebook.com/go2thecamping/" data-tabs="timeline" data-width="500" data-height="380" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true"><blockquote cite="https://www.facebook.com/go2thecamping/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/go2thecamping/">한국관광공사 고캠핑</a></blockquote></div>
                        </div>

                        <!-- 슬라이드 광고 링크 -->
                        <div class="multiple-items2 slide_div2">
                            <div class="slide-content2">
                                <a><img src="${contextPath}/resources/images/board/ohcamall.png" onclick="window.open('https://www.ocamall.com/')"></a>
                            </div>
                            <div class="slide-content2">
                                <a><img src="${contextPath}/resources/images/board/goossteoee.png" onclick="window.open('https://smartstore.naver.com/goossmall')"></a>
                            </div>
                            <div class="slide-content2">
                                <a><img src="${contextPath}/resources/images/board/funshop.jpg" onclick="window.open('https://www.funshop.co.kr/goods/category/5716')"></a>
                            </div>
                            <div class="slide-content2">
                                <a><img src="${contextPath}/resources/images/board/idoogen.jpg" onclick="window.open('https://idoogen.com/')"></a>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                
            </section>
        </div> <!-- sideBar 넣기위한 div 끝부분 !!!  -->
    </main>
    
 
    
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>


    <script>
        const contextPath="${contextPath}";
    </script>
    <script src="https://kit.fontawesome.com/a2e8ca0ae3.js" crossorigin="anonymous"></script>

    <script src="${contextPath}/resources/js/board/board.js"></script>

    <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>

    
    <!-- 여행지 추천 슬라이더를 초기화 -->
    <script type="text/javascript">
        $(document).ready(function(){
            $(".slide").slick();
        });

        $('.multiple-items').slick({
        infinite: true,
        dots: true,
        dotsClass: 'custom-dots',
        adaptiveHeight: 300,
        focusOnSelect: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false
    });

    </script>



    <!-- 광고 슬라이더를 초기화 -->
    <script type="text/javascript">
        $(document).ready(function(){
            $(".slide").slick();
        });

        $('.multiple-items2').slick({
        infinite: true,
        dots: false,
        adaptiveHeight: 300,
        focusOnSelect: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false
        });
    </script>
    
    <!-- 슬라이더를 초기화 -->
    <!-- <script type="text/javascript">
        $(document).ready(function(){
            $(".slide").slick();
        });

        $('.multiple-items').slick({
        infinite: true,
        dots: true,
        adaptiveHeight: 300,
        focusOnSelect: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false
        });
    </script> -->

    
</body>


</html>