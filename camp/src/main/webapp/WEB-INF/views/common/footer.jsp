<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- ======= Footer ======= -->
<footer id="footer">
    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

    <div class="footer-top">
        <div class="container">
            <div class="row">

<!--             <div class="col-lg-3 col-md-6 footer-contact">
            <h3>캠핑보내조</h3>
            <p>
                A108 Adam Street <br>
                New York, NY 535022<br>
                United States <br><br>
                <strong>Phone:</strong> 010 0000 0000<br>
                <strong>Email:</strong> camp@camp.com<br>
            </p>
            </div> -->

            <div class="col-lg-3 col-md-6 footer-links">
                <h4>CampWithUs</h4>
                <ul>
                    <li><i class="bx bx-chevron-right"></i> <a href="#">Home</a></li>
                    <li><i class="bx bx-chevron-right"></i> <a href="https://github.com/jbjeon2/Final_Camp">github</a></li>
                </ul>
            </div>

            <div class="col-lg-3 col-md-6 footer-links">
            <h4>Our Services</h4>
            <ul>
                <li><i class="bx bx-chevron-right"></i> <a href="${contextPath}/campList/?loc=&theme=&campName=">캠핑장 조회</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="${contextPath}/board/list/1">여행지 추천</a></li>
            </ul>
            </div>

            <div class="col-lg-3 col-md-6 footer-links">
            <h4>Our Social </h4>
            <ul>
                <c:choose>
                    <c:when test="${loginMember == null}">
                        <li><i class="bx bx-chevron-right"></i> <a href="${contextPath}/member/login">로그인</a></li>
                        <li><i class="bx bx-chevron-right"></i> <a href="${contextPath}/member/signUpCheck">회원가입</a></li>
                    </c:when>
                    <c:otherwise>
                        <li><i class="bx bx-chevron-right"></i> <a href="${contextPath}/member/myPage/myReservation">예약 확인</a></li>
                        <li><i class="bx bx-chevron-right"></i> <a href="${contextPath}/member/myPage/myReview">내 리뷰</a></li>
                    </c:otherwise>
                </c:choose>
            </ul>
            </div>
            
            <div class="col-lg-3 col-md-6 footer-links">
                <h4>Our Bank </h4>
                <ul>
                    <li><i class="bx bx-chevron-right"></i> <a href="" onclick="return false;">국민 659402-01-442603</a></li>
                    <li><i class="bx bx-chevron-right"></i> <a href="" onclick="return false;">신한 110-396-554220</a></li>
                </ul>
                </div>
            

            </div>
        </div>
    </div>


    <div id = "projectBy"> <span id="projectBySpan">Project By </span>&nbsp; 순일ㅣ진복ㅣ은주ㅣ규동ㅣ영진 &nbsp;&nbsp;&nbsp;&nbsp;예금주 : (주)캠프위드어스</div>
    <div class="container py-4">
        
        <div class="copyright">
        &copy; Copyright <strong><span>CWU</span></strong>. All Rights Reserved Designed by <a href="#"> Camp With Us</a>
        &nbsp; &nbsp;
        </div>
        <div class="credits">
        <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
        <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
        <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
        <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
        <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a> 
        </div>
        
    </div>


</footer><!-- End Footer -->



<%-- session에 message 속성이 존재하는 경우 alert창으로 해당 내용을 출력 --%>
<c:if test="${ !empty message }">
    <script>
    	console.log("${message}");
        alert("${message}");
        // EL 작성 시 scope를 지정하지 않으면
        // page -> request -> session -> application 순서로 검색하여
        // 일치하는 속성이 있으면 출력
    </script>
</c:if> 