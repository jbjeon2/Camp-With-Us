<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="${contextPath}/resources/css/main.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/campList.css">
    <script src="https://kit.fontawesome.com/a2e8ca0ae3.js" crossorigin="anonymous"></script>
</head>

<body>
    <main>
        <jsp:include page="/WEB-INF/views/common/header.jsp" />

        <div class="search">
            <section class="layer_search">

                <div class="divv">
                    <h2>
                        <span class="skip" >검색 레이어박스 </span>
                        
                    </h2>
                </div>
                <div class="search_box">

                    <form id="campSearchForm" action="" method="get">
                        <!--검색박스-->
                        <div class="search_box_form">
                            <div class="keywordDiv">
                                <p class="tt">캠핑장이름 검색</p>
                                <input type="text" id="searchVal1"  class="keyword2" title="검색어를 입력하세요.">
                            </div>


                            <div class="form1_2">
                                <p class="tt">지역별</p>
                                <label class="skip">지역별 검색</label>
                                 <select onchange="categoryChange(this)" class="select_01"  id="searchVal2" title="검색할 지역을 선택하세요.">
                                    <option value="">전체/도</option>
                                    <option value="서울">서울시</option>
                                    <option value="부산">부산시</option>
                                    <option value="대구">대구시</option>
                                    <option value="인천">인천시</option>
                                    <option value="광주">광주시</option>
                                    <option value="대전">대전시</option>
                                    <option value="울산">울산시</option>
                                    <option value="경기">경기도</option>
                                    <option value="강원">강원도</option>
                                    <option value="충청북도">충청북도</option>   <!-- 충청북도/충북-->                           
                                    <option value="충청남도">충청남도</option>  <!-- 충청남도/충남-->  
                                    <option value="전라북도">전라북도</option>  <!-- 전라북도/전북-->  
                                    <option value="전라남도">전라남도</option>  <!-- 전라남도/전남-->  
                                    <option value="경상북도">경상북도</option>  <!-- 경상북도/경북-->  
                                    <option value="경상남도">경상남도</option>  <!-- 경상남도/경남-->  
                                    <option value="제주">제주도</option>
                                </select> 
                                <label class="skip">시군별 검색</label> 
                                <select class="select_02" id="state" title="검색할 지역을 선택하세요.">
                                    <option value="">전체/시/군</option>
                                </select>
                            </div>
                            <div class="form1_2">
                                <p class="tt">테마별</p>
                                <label class="skip" for="searchLctCl">테마별 검색</label>
                                <select class="select_03" id="searchVal3" title="검색할 테마를 선택하세요.">
                                    <option value="">분류</option>
                                    <option value="일반야영장">일반야영장</option>
                                    <option value="자동차야영장">자동차야영장</option>
                                    <option value="글램핑">글램핑</option>
                                    <option value="카라반">카라반</option>
                                </select>
                                <button type="button" class="searchBtn" id="selectCampBtn" onclick="updateQueryString()">검색</button>

                            </div>
                        </div>
                        <!--//검색박스-->
                    </form>
                </div>
            </section>
        </div> <!-- 검색영역 끝 -->


        <div class="searchVal" id="searchVal">

            <div><h2 id="campResult"></h2></div>
            <section class="searchBox" id ="searchBox" >

               
                <div class="camp_search_list" id="searchBox2">
                    <h2>캠핑장을 검색해주세요.</h2>
<!--                     <ul>
                        <li>
                            <div class="camp_info_box">
                                <div class="img_box">
                                    <img src="" alt="김영진" class="imgSize">
                                </div>
                                <div class="camp_info_text">
                                    <h3 class="camp_info01">
                                      <h3> <a href="">캠핑장 이름이 들어갑니다.</a></h3>
                                    </h3>
                                    <span class="camp_info02">캠핑장 소개글이 들어갑니다.</span><br>
                                    <span class="camp_info03">
                                        <a href="">캠핑장 디테일 소개글이 들어갑니다.</a>
                                    </span><br>
                                    <span class="camp_add">주소 &nbsp;&nbsp;&nbsp;:  서울광역시 서울구 서울동 서울</span><br>
                                    <span class="camp_phone">연락처 : 010-6857-6333</span>
                                </div>
                            </div>
                        </li>
                    </ul>  -->      
                </div>
            </section>


           <div id="pagination" class="pagination">
          </div>
        </div>
    
    </main>
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />

    <script>
        const loc = "${loc}";
        const theme = "${theme}";
    </script>


    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="${contextPath}/resources/js/main.js"></script>
    <script src="${contextPath}/resources/js/campList.js"></script>
</body>

</html>