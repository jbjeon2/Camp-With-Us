package team.project.camp.member.model.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;
import team.project.camp.detail.model.service.ReservationService;
import team.project.camp.detail.model.vo.Reservation;
@Slf4j
@Controller
@RequestMapping("/member/myPage")
public class MyPageController {

	@Autowired
	private ReservationService service;

	//예약조회
	@GetMapping("/myReservation")
	public String reservation(Model model) {

		List<Reservation> reservationList = service.reservationSelect();

		model.addAttribute("reservationList", reservationList);

		return "member/myReservation";
	}

	@GetMapping("/myBoard")
	public String myBoard() {
		return "member/myBoard";
	}

	@GetMapping("/myReview")
	public String myReview() {
		return "member/myReview";
	}

	@GetMapping("/profile")
	public String profile() {
		return "member/profile";
	}

	@GetMapping("/changePw")
	public String changePw() {
		return "member/changePw";
	}


	@GetMapping("/secession")
	public String secession() {
		return "member/secession";

	}

	//예약취소
	@ResponseBody
	@PostMapping("/reservationState")
	public int reservationState(int reservNo) {

		System.out.println("예약번호 : " + reservNo);

		int result = service.reservationState(reservNo);

		return result;
	}



}
