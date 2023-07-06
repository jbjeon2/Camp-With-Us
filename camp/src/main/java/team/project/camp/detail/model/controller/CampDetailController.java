package team.project.camp.detail.model.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.extern.slf4j.Slf4j;
import team.project.camp.detail.model.service.CampDetailService;
import team.project.camp.detail.model.vo.Reservation;
import team.project.camp.member.model.vo.Member;

@Slf4j
@Controller
@RequestMapping("/campDetail")
public class CampDetailController {

	@Autowired
	private CampDetailService service;

	// 예약하기 페이지 조회  detailList--> reservation
	// href='${contextPath}/campDetail/reservation?campName=${campName}'>예약페이지</a></button>
	@GetMapping("/reservation")
	public String ReservationSelect(
									@RequestParam(value = "campName", required = false, defaultValue = "") String campName,
									RedirectAttributes ra,
									Model model) {

		model.addAttribute("campName", campName);

		return "camp/reservation";
	}

	// 결제페이지
	@PostMapping("/payment/{campName}")
	public String PaymentInfo( @PathVariable("campName") String campName,
//								@ModelAttribute Member loginMember,
							   Member member,
//							   int memberNo,
							   Model model) {
		model.addAttribute("campName", campName);
		log.info("캠핌장 " + campName);
		log.info("예약정보 " + member);
//		member.setMemberNo(loginMember.getMemberNo());
		model.addAttribute("member", member);


		return "camp/payment";
	}

	//가격계산
	//***@ResponseBody -> (비동기)ajax TYPE="GET"일때
	//*****(ajax 통신을 위해 JSON 형식의 데이터를 주고는 경우 사용)*****
	@ResponseBody
	@GetMapping("/selectPrice")
	public int selectPrice(String month) {

		log.info("몇월 달? " + month);

		int price = 0;

		if(month.equals("6") || month.equals("7") || month.equals("8")) {	//성수기인 경우
			price = service.selectPriceP(month);
			log.info("성수기");
		}else {	//비성수기인 경우
			price = service.selectPriceNp(month);
			log.info("비성수기");
		}

		return price;

	}


	//예약정보 삽입(Cash)
	@ResponseBody
	@PostMapping("/payment/reservationInfoCash")
	public int reservationInfo(Reservation reservation) {

		log.info("예약 DB 삽입 " + reservation);

		int result = service.reservationInfoCash(reservation);

		if(result>0) {
			log.info("ajax로 result값 전송 성공");
		}else {
			log.info("ajax로 result값 전송 실패");
		}

		return result;
	}

	// 예약정보 삽입(Card)
	@ResponseBody
	@PostMapping("/payment/reservationInfoCard")
	public int reservationInfo2(Reservation reservation) {

		log.info("예약 DB 삽입 " + reservation);

		int result = service.reservationInfoCard(reservation);

		if(result>0) {
			log.info("ajax로 result값 전송 성공");
		}else {
			log.info("ajax로 result값 전송 실패");
		}

		return result;
	}

}
