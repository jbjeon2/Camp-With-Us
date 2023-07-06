<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

            <c:set var="combinedCondition" value="${empty reservationList && empty AllreservationList}" />
            <c:set var="reservationList" value="${reservationList}" />
            <c:set var="AllreservationList" value="${AllreservationList}" />
            <c:set var="MANAGER" value="${loginMember.manager}" />
            <c:set var="paymethod_Cash" value="${Allreservation.paymethod == 'cash'}" />
            <!-- 현재 c:set으로는 paymethod가 나오지 않아 false반환중 -->

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

                    <jsp:include page="/WEB-INF/views/mypage/sideMenu.jsp" />

                    <section class="myPage-main">
                        <div class="myPageHeadFlex">
                            <div class="myPageHead">
                                <c:choose>
                                    <c:when test="${loginMember.manager == 'Y'}">
                                        <h1 class="myPage-title">전체 예약 확인</h1>
                                        <span class="myPage-explanation">전체 예약현황을 볼 수 있습니다.</span>
                                    </c:when>
                                    <c:otherwise>
                                <h1 class="myPage-title">예약 확인</h1>
                                <span class="myPage-explanation">현재 회원님의 예약 정보를 확인할 수 있습니다.</span>
                                </c:otherwise>
                            </c:choose>
                            </div>
                        </div>
                        <div class="list-wrapper">
                            <table class="list-table table table-hover">

                                <thead>
                                    <tr>
                                        <th>예약번호</th>
                                        <th>캠핑장 이름</th>
                                        <th>예약자</th>
                                        <th>결제일</th>
                                        <th>인원수</th>
                                        <th>결제 금액</th>
                                        <th>예약일</th>
                                        <th>예약상태</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <c:choose>

                                        <c:when test="${!empty reservationList}">
                                            <!-- 게시글 목록 조회 결과가 비어있지 않다면 -->

                                            <!-- 향상된 for문처럼 사용 -->
                                            <c:forEach var="reservation" items="${reservationList}">
                                                <tr>
                                                    <td>${reservation.reservNo}</td>

                                                    <td><a
                                                            href="${contextPath}/campList/detailList?campName=${reservation.campingName}&viewType=1">${reservation.campingName}</a>
                                                    </td>

                                                    <td>${reservation.buyerName}</td>
                                                    <td>${reservation.reservDate}</td>
                                                    <td>${reservation.people}</td>

                                                    <td>
                                                        <fmt:formatNumber value="${reservation.amount}"
                                                            pattern="###,###" />
                                                    </td>
                                                    <td>${reservation.reservSelDate}</td>

                                                    <c:choose>
                                                        <c:when test="${reservation.reservSt == '87'}">
                                                            <td style="color: green;">예약대기</td>
                                                            <td><button type="button" class = "reserveCheckBtn"
                                                                    onclick="reservCancel('${reservation.reservNo}')">예약취소</button>
                                                            </td>
                                                        </c:when>
                                                        <c:when test="${reservation.reservSt == '89'}">
                                                            <td style="color: blue;">예약</td>
                                                            <td><button type="button" id="reserveBtn" class = "reserveCheckBtn"
                                                                    onclick="reservCancel('${reservation.reservNo}')">예약취소</button>
                                                            </td>
                                                        </c:when>
                                                        <c:when test="${reservation.reservSt == '78'}">
                                                            <td style="color: red;">취소</td>
                                                            <td></td>
                                                        </c:when>
                                                    </c:choose>
                                                </tr>

                                            </c:forEach>

                                        </c:when>

                                        <c:when test="${!empty AllreservationList}">

                                            <c:forEach var="Allreservation" items="${AllreservationList}">
                                                <tr>
                                                    <td>${Allreservation.reservNo}</td>
                                                    <td><a
                                                        href="${contextPath}/campList/detailList?campName=${Allreservation.campingName}&viewType=1">${Allreservation.campingName}</a>
                                                </td>
                                                    <td>${Allreservation.buyerName}</td>
                                                    <td>${Allreservation.reservDate}</td>
                                                    <td>${Allreservation.people}</td>
                                                    <td>
                                                        <fmt:formatNumber value="${Allreservation.amount}"
                                                            pattern="###,###" />
                                                    </td>
                                                    <td>${Allreservation.reservSelDate}</td>
                                                    <c:choose>

                                                        <c:when test="${Allreservation.reservSt == '87'}">
                                                            <td style="color: green;">예약대기</td>
                                                            <td><button type="button" class = "reserveCheckBtn"
                                                                    onclick="reservConfirm('${Allreservation.reservNo}')">예약확정</button>
                                                            </td>
                                                        </c:when>
                                                        <c:when test="${Allreservation.reservSt == '89'}">
                                                            <td style="color: blue;">예약</td>
                                                            <td><button type="button" class = "reserveCheckBtn"
                                                                    onclick="reservCancel('${Allreservation.reservNo}')">예약취소</button>
                                                            </td>
                                                        </c:when>
                                                        <c:when test="${Allreservation.reservSt == '78'}">
                                                            <td style="color: red;">취소</td>
                                                            <td></td>
                                                        </c:when>
                                                    </c:choose>
                                                </tr>

                                            </c:forEach>

                                        </c:when>
                                        <c:when test="${combinedCondition}">
                                            <!-- 게시글 목록 조회 결과가 비어있다면 -->
                                            <tr>
                                                <th colspan="9">예약 내역이 존재하지 않습니다.</th>
                                            </tr>
                                        </c:when>

                                    </c:choose>


                                </tbody>
                            </table>
                        </div>

                    </section>

                </main>

                <jsp:include page="/WEB-INF/views/common/footer.jsp" />



                <script>
                    var reservNos = [];
                 

                    const contextPath = "${contextPath}";


                    <c:forEach var="reservation" items="${reservationList}">
                        reservNos.push("${reservation.reservNo}");
                    </c:forEach>

                </script>

                <script src="https://code.jquery.com/jquery-3.6.0.min.js"
                    integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>


                <script src="${contextPath}/resources/js/mypage.js"></script>



            </body>

            </html>