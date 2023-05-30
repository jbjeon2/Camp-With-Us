package team.project.camp.login.model.controller;

import java.util.List;
import java.util.Random;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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
@RequestMapping("/member")
@SessionAttributes({"loginMember"}) // Model에 추가된 값의 key와 어노테이션에 작성된 값이 같으면
							// 해당 값을 session scope 이동시키는 역할*/
public class MemberController {
	
	
	Logger logger = LoggerFactory.getLogger(MemberController.class);
	@Autowired // bean으로 등록된 객체 중 타입이 같거나, 상속 관계인 bean을 주입 해주는 역할
	private LoginService service;   // -> 의존성 주입(DI, Dependency Injection)
	
	
	@GetMapping("/login")
	public String loginPage() {
		return "login/loginPage";
	}
	
	@GetMapping("/signUp")
	public String signUpPage() {
		return "login/signUpPage";
	}
	
	//----------------------------
	@PostMapping("/login")
	public String login( @ModelAttribute Member inputMember 
						, Model model
						, RedirectAttributes ra
						, HttpServletResponse resp 
						, HttpServletRequest req
						, @RequestParam(value="saveId", required = false) String saveId ) {
												
		// @ModelAttribute 생략 가능 
		// -> 커맨드 객체 (@ModelAttribute가 생략된 상태에서 파라미터가 필드에 세팅된 객체)
		
		logger.info("로그인 기능 수행됨");
		
		
		// 아이디, 비밀번호가 일치하는 회원 정보를 조회하는 Service 호출 후 결과 반환 받기
		Member loginMember = service.login(inputMember);
		
		
		/* Model : 데이터를 맵 형식(K:V) 형태로 담아 전달하는 용도의 객체
		 * -> request, session을 대체하는 객체
		 * 
		 * - 기본 scope : request
		 * - session scope로 변환하고 싶은 경우
		 *   클래스 레벨로 @SessionAttributes를 작성되면 된다.
		 * */
		
		// @SessionAttributes 미작성 -> request scope
		
		if(loginMember != null) { // 로그인 성공 시
			model.addAttribute("loginMember", loginMember); // == req.setAttribute("loginMember", loginMember);
	
			
			// 로그인 성공 시 무조건 쿠키 생성
			// 단, 아이디 저장 체크 여부에 따라서 쿠기의 유지 시간을 조정
			Cookie cookie = new Cookie("saveId", loginMember.getMemberEmail());
			
			if(saveId != null) { // 아이디 저장이 체크 되었을 때
				
				cookie.setMaxAge(60 * 60 * 24 * 365); // 초 단위로 지정 (1년)
				
			} else { // 체크 되지 않았을 때
				cookie.setMaxAge(0); // 0초 -> 생성 되자마자 사라짐 == 쿠키 삭제
			}
			
			
			// 쿠키가 적용될 범위(경로) 지정
			cookie.setPath(req.getContextPath());
			
			// 쿠키를 응답 시 클라이언트에게 전달
			resp.addCookie(cookie);
			
		} else {
			//model.addAttribute("message", "아이디 또는 비밀번호가 일치하지 않습니다.");
		
			ra.addFlashAttribute("message", "아이디 또는 비밀번호가 일치하지 않습니다.");
			// -> redirect 시 잠깐 Session scope로 이동후
			//    redirect가 완료되면 다시 Request scope로 이동
			
			// redirect 시에도 request scope로 세팅된 데이터가 유지될 수 있도록 하는 방법을
			// Spring에서 제공해줌
			// -> RedirectAttributes 객체  (컨트롤러 매개변수에 작성하면 사용 가능)
		}
		
		//session.setAttribute("loginMember", loginMember);
		
		return "redirect:/";
	}
	
	
	
	// 로그아웃
	@GetMapping("/logout")
	public String logout( /*HttpSession session,*/
						SessionStatus status) {
		
		// 로그아웃 == 세션을 없애는 것
		
		// * @SessionAttributes을 이용해서 session scope에 배치된 데이터는
		//   SessionStatus라는 별도 객체를 이용해야만 없앨 수 있다.
		logger.info("로그아웃 수행됨");
		
		// session.invalidate(); // 기존 세션 무효화 방식으로는 안된다!
		
		status.setComplete(); // 세센이 할 일이 완료됨 -> 없앰
		
		return "redirect:/"; // 메인페이지 리다이렉트
		
	}
	
	
	
	
	/*//->로그인 페이지에 회원가입 버튼 넣기-> 회원 가입 화면 전환
	@GetMapping("/signUp")  // Get방식 : /comm/member/signUp 요청
	public String signUp() {
		return "login/signUpPage";
	}*/
	
	
	
	// 이메일 중복 검사
	@ResponseBody  // ajax 응답 시 사용!
	@GetMapping("/emailDupCheck")
	public int emailDupCheck(String memberEmail) {
		int result = service.emailDupCheck(memberEmail);
		
		// 컨트롤러에서 반환되는 값은 forward 또는 redirect를 위한 경로인 경우가 일반적
		// -> 반환되는 값은 경로로 인식됨
		
		// -> 이를 해결하기위한 어노테이션 @ResponseBody 가 존재함
		
		// @ResponseBody : 반환되는 값을 응답의 몸통(body)에 추가하여 
		//				   이전 요청 주소로 돌아감
		// -> 컨트롤러에서 반환되는 값이 경로가 아닌  "값 자체"로 인식됨.
		
		return result;
		
	}
	
	
	//이메일 인증 번호 보내기
	@Autowired
	private JavaMailSender mailSender;
	/*@Autowired
	private EmailSendService emailService;*/


	// mailSending 코드
	@GetMapping("/sendEmail")
	@ResponseBody
	public String mailSending(String inputEmail) {
		//뷰에서 넘어왔는지 확인
		System.out.println("이메일 전송 시험");
		
		//난수 생성(인증번호)
		Random r = new Random();
		int num = r.nextInt(888888) + 111111;  //111111 ~ 999999
		System.out.println("인증번호:" + num);
		
		/* 이메일 보내기 */
        String setFrom = "ilypsj@gmail.com"; //보내는 이메일
        String toMail = inputEmail; //받는 사람 이메일
        String title = "박성문씨 안녕하세요. 저는 박성주입니다";//"캠핑보내조 회원가입 인증 이메일 입니다.";
        String content = 
        		"지금 자바로 보낸 메시지 입니다.";
                /*"캠핑보내조 홈페이지를 방문해주셔서 감사합니다." +
                "<br><br>" + 
                "인증 번호는 " + num + "입니다." + 
                "<br>" + 
                "해당 인증번호를 인증번호 확인란에 기입하여 주세요.";*/
        
        try {
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
            helper.setFrom(setFrom);
            helper.setTo(toMail);
            helper.setSubject(title);
            helper.setText(content,true);
            mailSender.send(message);
            
        }catch(Exception e) {
            e.printStackTrace();
        }
        
        String rnum = Integer.toString(num);  //view로 다시 반환할 때 String만 가능
        
        return rnum;
	}
	
	
	//이메일로 인증번호 확인작업
    /*@GetMapping("/checkNumber")
    public String checkNumber(@RequestParam String cNumber, @RequestParam String inputEmail) {
        // 인증번호 확인 로직 작성
    	 if (isValidNumber(cNumber, inputEmail)) {
             return "인증번호 확인 성공";
         } else {
             return "인증번호 확인 실패";
         }
     }*/

     /*private boolean isValidNumber(String cNumber, String inputEmail) {
         // 실제로 인증번호 확인하는 로직을 작성
    	 // 메일로 보낸 cNumber와 inputMail확인을 통해
    	 // 인증번호 확인란에 쓴 인증번호가 맞는지 확인한다.
         return emailService.isValidNumber(cNumber, inputEmail);
     }*/
	
	
	
	
	
	
	
	//인증번호 입력 확인
	/*@GetMapping("/checkNumber")
	public String checkNumber(int cNumber,String inputEmail) {
		
	}*/

	
	// 닉네임 중복 검사
	@ResponseBody
	@GetMapping("/nicknameDupCheck")
	public int nicknameDupCheck(String memberNickname) {
		int result = service.nicknameDupCheck(memberNickname);
		
		return result;
		
	}
	
	
	// 회원 가입
	@PostMapping("/signUp")
	public String signUp( Member inputMember
						, String[] memberAddress
						, RedirectAttributes ra) {
		
		// 커맨드 객체를 이용해서 입력된 회원 정보를 잘 받아옴
		// 단, 같은 name을 가진 주소가 하나의 문자열로 합쳐서 세팅되어있음.
		// -> 도로명 주소에 " , " 기호가 포함되는 경우가 있어 이를 구분자로 사용할 수 없음.
		
		
		//  String[] memberAddress : 
		//    name이 memberAddress인 파라미터의 값을 모두 배열에 담아서 반환
		
		inputMember.setMemberAddress(  String.join(",,", memberAddress)  );
		// String.join("구분자", 배열)
		// 배열을 하나의 문자열로 합치는 메서드
		// 중간에 들어가 구분자를 지정할 수 있다.
		// [a, b, c]  - join 진행 ->  "a,,b,,c"
		
		if( inputMember.getMemberAddress().equals(",,,,") ) { // 주소가 입력되지 않은 경우
			
			inputMember.setMemberAddress(null); // null로 변환
		}
		
		// 회원 가입 서비스 호출
		int result = service.signUp(inputMember);
		
		String message = null;
		String path = null;
		
		if(result > 0) { // 회원 가입 성공
			message = "회원 가입 성공!!";
			path = "redirect:/"; // 메인페이지
			
		}else { // 실패
			message = "회원 가입 실패ㅠㅠ";
			path = "redirect:/member/signUp"; // 회원 가입 페이지
		}
		
		ra.addFlashAttribute("message", message);
		return path;
	}
	
	
	// 회원 1명 정보 조회(ajax)
	@ResponseBody // 반환되는 값이 forward/redirect 경로가 아닌 값 자체임을 인식(ajax시 사용)
	@PostMapping("/selectOne")
	public String selectOne(@RequestParam("memberEmail") String memberEmail) {
		
		Member mem = service.selectOne(memberEmail);
		
		// JSON : 자바스크립트 객체 표기법으로 작성된 문자열(String)
		
		// GSON 라이브러리 : JSON을 쉽게 다루기 위한 Google에서 제공하는 라이브러리
		
		// Gson().toJson(object) : 객체를 JSON 형태로 변환
		return new Gson().toJson(mem); 
		// "{'memberEmail':'test01@naver.com', 'memberNickname' : '테스트1', ....}"
		
	}
	
	
	// 회원 목록 조회(ajax)
	@ResponseBody
	@GetMapping("/selectAll")
	public String selectAll() {
		
		List<Member> list = service.selectAll();
		
		return new Gson().toJson(list);
	}
	
	
	
	
	
	
	
	
	
	
	
	/* 스프링 예외 처리 방법(3가지, 중복 사용 가능)
	 * 
	 * 1 순위 : 메서드 별로 예외처리 (try-catch / throws)
	 * 
	 * 2 순위 : 하나의 컨트롤러에 발생하는 예외를 모아서 처리 
	 * 			-> @ExceptionHandler (메서드에 작성)
	 * 
	 * 3 순위 : 전역(웹 애플리케이션)에서 발생하는 예외를 모아서 처리
	 * 			-> @ControllerAdvice (클래스에 작성)
	 * */
	
	
	// 회원 컨트롤러에서 발생하는 모든 예외를 모아서 처리
	
//	@ExceptionHandler(Exception.class)
//	public String exceptionHandler(Exception e, Model model) {
//		e.printStackTrace();
//		
//		model.addAttribute("errorMessage", "서비스 이용 중 문제가 발생했습니다.");
//		model.addAttribute("e", e);
//		
//		return "common/error";
//	}
	
}










