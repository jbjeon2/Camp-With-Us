package team.project.camp.login.model.controller;

import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.google.gson.Gson;

import team.project.camp.login.model.service.LoginService;
import team.project.camp.login.model.vo.Member;

// POJO 기반 프레임워크 : 외부 라이브러리 상속 X

// class : 객체를 만들기위한 설계도
// -> 객체로 생성 되어야기 기능 수행이 가능하다.
// --> IOC(제어의 역전, 객체 생명주기를 스프링이 관리)를 이용하여 객체 생성
//   ** 이 때, 스프링이 생성한 객체를 [bean] 이라고 한다 **  

// bean 등록 == 스프링이 객체로 만들어서 가지고 있어라

//@Component // 해당 클래스를 bean으로 등록하라는 프로그램에게 알려주는 주석(Annotation)

@Controller // 생성된 bean이 Contorller임을 명시 + bean 등록
@RequestMapping("/login") // localhost:8080/comm/member 이하의 요청을 처리하는 컨트롤러
@SessionAttributes({"loginMember" }) // Model에 추가된 값의 key와 어노테이션에 작성된 값이 같으면
								// 해당 값을 session scope 이동시키는 역할
public class LoginController {
	
	
	
	private Logger logger = LoggerFactory.getLogger(LoginController.class);
	@Autowired // bean으로 등록된 객체 중 타입이 같거나, 상속 관계인 bean을 주입 해주는 역할
	private LoginService service;   // -> 의존성 주입(DI, Dependency Injection)
	
	@GetMapping("/loginPage")
	public String loginPage() {
		return "login/loginPage";
	}
	
	@GetMapping("/signUpPage")
	public String signUpPage() {
		return "login/signUpPage";
	}
	
	//회원가입 페이지 POST방법
	/*@PostMapping("/signUpPage")
	public String signUpPage() {
		return "redirect:/";
	}*/
	//-----------------------------
	@PostMapping("/signUp")
	public String login( @ModelAttribute Member inputMember 
						, Model model
						, RedirectAttributes ra
						, HttpServletResponse resp 
						, HttpServletRequest req
						, @RequestParam(value="saveId", required = false) String saveId ) {

		logger.info("濡쒓렇�씤 湲곕뒫 �닔�뻾�맖");

		Member loginMember = service.login(inputMember);

		if(loginMember != null) {
			model.addAttribute("loginMember", loginMember);

			Cookie cookie = new Cookie("saveId", loginMember.getMemberEmail());
			
			if(saveId != null) {
				
				cookie.setMaxAge(60 * 60 * 24 * 365);
				
			} else {
				cookie.setMaxAge(0);
			}

			cookie.setPath(req.getContextPath());

			resp.addCookie(cookie);
			
		} else {

			ra.addFlashAttribute("message", "�븘�씠�뵒 �삉�뒗 鍮꾨�踰덊샇媛� �씪移섑븯吏� �븡�뒿�땲�떎.");

		}

		return "redirect:/";
	}

	// 濡쒓렇�븘�썐
	@GetMapping("/logout")
	public String logout(
						SessionStatus status) {
		
		// 濡쒓렇�븘�썐 == �꽭�뀡�쓣 �뾾�븷�뒗 寃�

		logger.info("濡쒓렇�븘�썐 �닔�뻾�맖");

		status.setComplete();
		
		return "redirect:/";
		
	}

	// �쉶�썝 媛��엯 �솕硫� �쟾�솚
	@GetMapping("/signUp")
	public String signUp() {
		return "member/signUp";
	}

	// �씠硫붿씪 以묐났 寃��궗
	@ResponseBody  // ajax �쓳�떟 �떆 �궗�슜!
	@GetMapping("/emailDupCheck")
	public int emailDupCheck(String memberEmail) {
		int result = service.emailDupCheck(memberEmail);

		return result;
		
	}
	
	// �땳�꽕�엫 以묐났 寃��궗
	@ResponseBody  
	@GetMapping("/nicknameDupCheck")
	public int nicknameDupCheck(String memberNickname) {
		int result = service.nicknameDupCheck(memberNickname);
		
		return result;
		
	}
	
	
	// �쉶�썝 媛��엯
	@PostMapping("/signUp")
	public String signUp( Member inputMember
						, String[] memberAddress
						, RedirectAttributes ra) {

		inputMember.setMemberAddress(  String.join(",,", memberAddress)  );

		if( inputMember.getMemberAddress().equals(",,,,") ) { // 二쇱냼媛� �엯�젰�릺吏� �븡�� 寃쎌슦
			
			inputMember.setMemberAddress(null); // null濡� 蹂��솚
		}
		
		// �쉶�썝 媛��엯 �꽌鍮꾩뒪 �샇異�
		int result = service.signUp(inputMember);
		
		String message = null;
		String path = null;
		
		if(result > 0) { // �쉶�썝 媛��엯 �꽦怨�
			message = "�쉶�썝 媛��엯�릺�뿀�뒿�땲�떎.";
			path = "redirect:/"; // 硫붿씤�럹�씠吏�
			
		}else { // �떎�뙣
			message = "�쉶�썝 媛��엯�뿉 �떎�뙣�븯�뀲�뒿�땲�떎.";
			path = "redirect:/member/signUp"; // �쉶�썝 媛��엯 �럹�씠吏�
		}
		
		ra.addFlashAttribute("message", message);
		return path;
	}
}










