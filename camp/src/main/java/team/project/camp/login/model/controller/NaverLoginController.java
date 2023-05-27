package team.project.camp.login.model.controller;


import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import team.project.camp.login.model.service.NaverLoginService;
import team.project.camp.login.model.vo.LoginVo;

@Controller
public class NaverLoginController {

    @Autowired
    private NaverLoginService service;

    @RequestMapping(value = "/login/naverLoginSuccess")
    public String oauth(@RequestParam Map<String, Object> requestMap, ModelMap model, HttpServletRequest request,  HttpServletResponse response, HttpSession session) throws Exception {
       Map<String, String> userSession = new HashMap<String, String>();
       LoginVo loginVO = new LoginVo();

       try {
          System.out.println("-------------------- oauth - start --------------------");
         
            loginVO = service.doAuth(request, response);
             
             if(loginVO.getUserId() != null && !"".equals(loginVO.getUserId())) {
                userSession.put("snsType", loginVO.getSnsType());
                userSession.put("snsUniqueId", loginVO.getSnsUniqueId());
	            userSession.put("userId", loginVO.getUserId());
	            session.setAttribute("loginMember", userSession);
             }else {
            	 return "redirect:/";
             }
          
          System.out.println("-------------------- oauth - end --------------------");
          
          return "redirect:/";
       } catch(Exception e){
          e.printStackTrace();
          throw e;
       } 
    }

}
