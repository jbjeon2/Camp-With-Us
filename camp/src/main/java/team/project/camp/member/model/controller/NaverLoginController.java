package team.project.camp.member.model.controller;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.extern.slf4j.Slf4j;
import team.project.camp.member.model.service.MemberService;
import team.project.camp.member.model.service.NaverLoginService;
import team.project.camp.member.model.vo.Member;

@Slf4j
@Controller
@RequestMapping("/login")
@SessionAttributes({"loginMember"})
public class NaverLoginController {

    @Autowired
    private NaverLoginService naverService;
    @Autowired
    private MemberService service;

    @GetMapping("/naverLoginSuccess")
    public String oauth( HttpServletRequest request,  HttpServletResponse response, Model model, RedirectAttributes ra) throws Exception {

       Member loginMember = new Member();

       try {
          System.out.println("-------------------- naverLogin - start --------------------");
          loginMember = naverService.doAuth(request, response);  // 네이버 로그인정보 loginMember로 넣어오기.

          int result = service.naverEmailDupCheck(loginMember.getMemberEmail());   // DB에 네이버이메일 저장되어있나 체크

          if ( result == 0 ) {                                // DB 저장된 값이 없을때 .
        	 result = service.naverLoginInsert(loginMember);  // DB 에 저장.
        	 ra.addFlashAttribute("message", "환영합니다. 회원가입이 완료되었습니다.");
          }

          Member naverMember = service.naverMember(loginMember);

          String prevPage = (String) request.getSession().getAttribute("prevPage");

	      if (prevPage != null) {
	    	  request.getSession().removeAttribute("prevPage");
	      }

          model.addAttribute("loginMember",naverMember);   // session 에 올림.

          System.out.println("-------------------- naverLogin - end --------------------");

          return "redirect:" + prevPage;

       } catch(Exception e){
          e.printStackTrace();
          throw e;
       }
    }
    
    

}
