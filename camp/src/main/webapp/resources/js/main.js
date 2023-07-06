
//const selLoc = document.getElementById("selLoc");
const login = document.getElementById("login");
var selLoc = document.getElementById("loc");
var selTheme = document.getElementById("theme");
var inputCampName = document.getElementsByName("campName")[0];

var plugins = {
    bootstrapTooltip: $("[data-toggle='tooltip']"),
    rdInputLabel: $(".form-label"),
};
// 스크롤
window.addEventListener('scroll', function () {
    var scrollTop = document.documentElement.scrollTop;

    var parallaxElement = document.querySelector('.content2');
    var mainImage = document.querySelector('#main-image');

    parallaxElement.style.backgroundPositionY = scrollTop * 0.1 + 'px'; // 조절할 움직임의 속도를 조정합니다.
    mainImage.style.backgroundPositionY = (scrollTop-1000) * 0.1 + 'px'; // 조절할 움직임의 속도를 조정합니다.


});






// 검색 버튼 클릭 시 캠프 리스트 페이지 이동
// function searchCamp() {

//     location.href = "/camp/campList/?loc=" + selLoc.value + "&theme=" + selTheme.value + "&campName=" + inputCampName.value;
//     // location.href="camp/campList";

//     selLoc.value = "";
//     selTheme.value = "";
//     inputCampName.value = "";
// }


if (login) {
    login.addEventListener("click", function () {
        location.href = "/login";
    });
}

/**
 * @module       RDInputLabel
 * @author       Evgeniy Gusarov
 * @license      MIT
 */
(function () {
    ! function (t, e, i) {
        var s, n;
        return n = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), isWebkit = /safari|chrome/i.test(navigator.userAgent), s = function () {
            function s(s, n) {
                this.options = t.extend(!0, {}, this.Defaults, n), this.$element = t(s).addClass("rd-input-label"), this.$target = t("#" + this.$element.attr("for")), this.$win = t(i), this.$doc = t(e), this.initialize()
            }
            return s.prototype.Defaults = {
                callbacks: null
            }, s.prototype.initialize = function () {
                return this.$target.on("input", t.proxy(this.change, this)).on("focus", t.proxy(this.focus, this)).on("blur", t.proxy(this.blur, this)).on("hover", t.proxy(this.hover, this)).parents("form").on("reset", t.proxy(this.reset, this)), this.change(), this.hover(), this
            }, s.prototype.hover = function () {
                return isWebkit && (this.$target.is(":-webkit-autofill") ? this.$element.addClass("auto-fill") : this.$element.removeClass("auto-fill")), this
            }, s.prototype.change = function () {
                return isWebkit && (this.$target.is(":-webkit-autofill") ? this.$element.addClass("auto-fill") : this.$element.removeClass("auto-fill")), "" !== this.$target.val() ? (this.$element.hasClass("focus") || this.focus(), this.$element.addClass("not-empty")) : this.$element.removeClass("not-empty"), this
            }, s.prototype.focus = function () {
                return this.$element.addClass("focus"), this
            }, s.prototype.reset = function () {
                return setTimeout(t.proxy(this.blur, this)), this
            }, s.prototype.blur = function (t) {
                return "" === this.$target.val() && this.$element.removeClass("focus").removeClass("not-empty"), this
            }, s
        }(), t.fn.extend({
            RDInputLabel: function (e) {
                return this.each(function () {
                    var i;
                    return i = t(this), i.data("RDInputLabel") ? void 0 : i.data("RDInputLabel", new s(this, e))
                })
            }
        }), i.RDInputLabel = s
    }(window.jQuery, document, window), "undefined" != typeof module && null !== module ? module.exports = window.RDInputLabel : "function" == typeof define && define.amd && define(["jquery"], function () {
        "use strict";
        return window.RDInputLabel
    })
}).call(this);

function attachFormValidator(elements) {
    // Custom validator - phone number
    regula.custom({
        name: 'PhoneNumber',
        defaultMessage: 'Invalid phone number format',
        validator: function () {
            if (this.value === '') return true;
            else return /^(\+\d)?[0-9\-\(\) ]{5,}$/i.test(this.value);
        }
    });

    for (var i = 0; i < elements.length; i++) {
        var o = $(elements[i]), v;
        o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
        v = o.parent().find(".form-validation");
        if (v.is(":last-child")) o.addClass("form-control-last-child");
    }

    elements.on('input change propertychange blur', function (e) {
        var $this = $(this), results;

        if (e.type !== "blur") if (!$this.parent().hasClass("has-error")) return;
        if ($this.parents('.rd-mailform').hasClass('success')) return;

        if ((results = $this.regula('validate')).length) {
            for (i = 0; i < results.length; i++) {
                $this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error");
            }
        } else {
            $this.siblings(".form-validation").text("").parent().removeClass("has-error")
        }
    }).regula('bind');

    var regularConstraintsMessages = [
        {
            type: regula.Constraint.Required,
            newMessage: "The text field is required."
        },
        {
            type: regula.Constraint.Email,
            newMessage: "The email is not a valid email."
        },
        {
            type: regula.Constraint.Numeric,
            newMessage: "Only numbers are required"
        },
        {
            type: regula.Constraint.Selected,
            newMessage: "Please choose an option."
        }
    ];


    /**
     * @desc Initialize Bootstrap tooltip with required placement
     * @param {string} tooltipPlacement
     */
    function initBootstrapTooltip(tooltipPlacement) {
        plugins.bootstrapTooltip.tooltip('dispose');

        if (window.innerWidth < 576) {
            plugins.bootstrapTooltip.tooltip({ placement: 'bottom' });
        } else {
            plugins.bootstrapTooltip.tooltip({ placement: tooltipPlacement });
        }
    }

    // Bootstrap Tooltips
    if (plugins.bootstrapTooltip.length) {
        var tooltipPlacement = plugins.bootstrapTooltip.attr('data-placement');
        initBootstrapTooltip(tooltipPlacement);

        $window.on('resize orientationchange', function () {
            initBootstrapTooltip(tooltipPlacement);
        })
    }



    // RD Input Label
    if (plugins.rdInputLabel.length) {
        plugins.rdInputLabel.RDInputLabel();
    }

    for (var i = 0; i < regularConstraintsMessages.length; i++) {
        var regularConstraint = regularConstraintsMessages[i];

        regula.override({
            constraintType: regularConstraint.type,
            defaultMessage: regularConstraint.newMessage
        });
    }
}

/**
 * @desc Initialize Bootstrap tooltip with required placement
 * @param {string} tooltipPlacement
 */
function initBootstrapTooltip(tooltipPlacement) {
    plugins.bootstrapTooltip.tooltip('dispose');

    if (window.innerWidth < 576) {
        plugins.bootstrapTooltip.tooltip({ placement: 'bottom' });
    } else {
        plugins.bootstrapTooltip.tooltip({ placement: tooltipPlacement });
    }
}

// Bootstrap Tooltips
if (plugins.bootstrapTooltip.length) {
    var tooltipPlacement = plugins.bootstrapTooltip.attr('data-placement');
    initBootstrapTooltip(tooltipPlacement);

    $window.on('resize orientationchange', function () {
        initBootstrapTooltip(tooltipPlacement);
    })
}

// RD Input Label
if (plugins.rdInputLabel.length) {
    plugins.rdInputLabel.RDInputLabel();
}

var count = 0;
window.onload = function () {

    $.ajax({
        url: "https://apis.data.go.kr/B551011/GoCamping/basedList",
        data: {
            numOfRows: 3467,
            pageNo: 1,
            MobileOS: "ETC",
            MobileApp: "AppTest",
            serviceKey: "",
            _type: "json"
        },
        dataType: "json",

        success: function (result) {
            console.log("API 호출 성공");

            var items = result.response.body.items.item;

            var randomIndexes = [];
            var randomItems = [];

            // 랜덤한 인덱스 선택
            for (let i = 0; i < items.length; i++) {
                if (items[i].homepage != "" &&
                    items[i].firstImageUrl != "" &&
                    items[i].tel != "" &&
                    items[i].lineIntro != "" &&
                    items[i].addr1 != "") {
                    count++;
                    randomIndexes.push(i); // 조건문을 통과한 인덱스 저장
                }
            }

            // 랜덤하게 선택된 인덱스를 섞습니다.
            for (let i = randomIndexes.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [randomIndexes[i], randomIndexes[j]] = [randomIndexes[j], randomIndexes[i]];
            }

            // 랜덤하게 선택된 인덱스에 해당하는 항목을 선택합니다.
            for (let i = 0; i < Math.min(randomIndexes.length, 18); i++) {
                const index = randomIndexes[i];
                randomItems.push(items[index]);
            }

            // 랜덤하게 선택된 항목에 대해 InnerHtml 값을 할당합니다.
            for (let i = 0; i < randomItems.length; i++) {
                const randomItem = randomItems[i];
                const ranBoardImg = 'ranBoardImg' + (i + 1);
                const ranBoardContent = 'ranBoardContent' + (i + 1);
                const randomImageElement = document.getElementById(ranBoardImg);
                const randomContentElement = document.getElementById(ranBoardContent)
                if (randomImageElement) {
                    randomImageElement.innerHTML =
                        '<a href="/camp/campList/detailList?campName=' + randomItem.facltNm.replaceAll(" ", "") + '&viewType=1">' +
                        '<img src=' + randomItem.firstImageUrl + ' alt="이미지가 존재하지 않습니다." ' +
                        ' id="' + ranBoardImg + '"></a>';

                    randomContentElement.innerHTML =
                        '<div class="cont_tb1">' +
                        '     <table class="table">' +
                        '       <colgroup>' +
                        '           <col style="width: 25%;" />' +
                        '           <col style="width: 75%;" />' +
                        '       </colgroup>' +
                        '       <tbody>' +
                        '           <tr>' +
                        '               <th scope="col">캠핑장 이름</th>' +
                        '               <td>' + randomItem.facltNm + '</td>' +
                        '           </tr>' +
                        '           <tr class="camp_call_pcVer">' +
                        '               <th scope="col">주소</th>' +
                        '               <td>' + randomItem.addr1 + '</td>' +
                        '           </tr>' +
                        '           <tr>' +
                        '               <th scope="col">연락처</th>' +
                        '               <td>' + randomItem.tel + '</td>' +
                        '           </tr>' +
                        '           <tr>' +
                        '               <th scope="col">캠핑장 유형</th>' +
                        '               <td>' + randomItem.induty + '</td>' +
                        '           </tr>' +
                        '       </tbody>' +
                        '   </table>' +
                        '</div>';

                }
            }
            

            // Intersection Observer 설정
            var observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.5 // 요소가 화면의 50% 이상 보일 때 작동
            };

            var countElement = document.getElementById("titleCount");
            var count = 1;

            var observer = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        // 요소가 화면에 보일 때 작동
                        updateCount();
                        observer.unobserve(entry.target); // 한 번 작동한 후 관찰 종료
                    }
                });
            }, observerOptions);

            // 요소를 관찰
            var targetElement = document.getElementById("middleLineDiv");
            observer.observe(targetElement);

            function updateCount() {
                countElement.textContent = count;
                
                count+=2;

                if (count <= 977) {
                    setTimeout(updateCount,1);
                }
            }
        },
        error: function (request, status, error) {
            console.log("API 호출 실패");
            console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);

        }
    });
};






const sliderWrap = document.querySelector(".slider__wrap");
const sliderImg = document.querySelector(".slider__img"); // 보여지는 영역

//const sliderInner = document.querySelector("slider__inner");
const sliderInner = document.getElementsByClassName("slider__inner");
const slider = document.querySelectorAll(".slider"); // 개별적 이미지
const sliderDot = document.querySelector(".slider__dot"); // dot

let currentIndex = 0;  // 현재 이미지
let sliderCount = slider.length;  // 이미지 개수
let sliderWidth = sliderImg.offsetWidth;  // 이미지 가로값
let dotIndex = "";

function init() {
    // dot 만들어주기!
    slider.forEach(() => { dotIndex += "<a class='dot'>이미지1</a>" })
    sliderDot.innerHTML = dotIndex;
    // 첫번째 닷에 활성화 표시
    sliderDot.firstChild.classList.add("active");
}
init();

// 이미지 이동
function gotoSlider(num) {

    for (let i = 0; i < sliderInner.length; i++) {

        sliderInner[i].style.transition = "all 400ms";
        sliderInner[i].style.transform = "translateX(" + -sliderWidth * num + "px)";
        currentIndex = num;

    }
    const dotActive = document.querySelectorAll(".slider__dot .dot");


    // 두번째 이미지 ==> 두번째 닷 클래스 추가
    // 1. 닷 메뉴의 클래스 모두 삭제
    dotActive.forEach(el => el.classList.remove("active"));
    // 2. 해당 이미지의 닷 메뉴 클래스 추가
    dotActive[num].classList.add("active");
}

// 버튼 클릭했을 때
document.querySelectorAll(".slider__btn a").forEach((btn, index) => {
    btn.addEventListener("click", () => {
        let prevIndex = (currentIndex + (sliderCount - 1)) % sliderCount;
        let nextIndex = (currentIndex + 1) % sliderCount;

        if (btn.classList.contains("prev")) {
            gotoSlider(prevIndex);
        } else {
            gotoSlider(nextIndex);
        }
    })
})

// 닷 클릭했을 때 이미지 이동
document.querySelectorAll(".slider__dot .dot").forEach((dot, index) => {
    dot.addEventListener("click", () => {
        gotoSlider(index);
    })
})



