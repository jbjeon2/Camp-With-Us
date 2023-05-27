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
}










