package team.project.camp.member.model.service;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.HttpClientUtils;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriUtils;

import com.fasterxml.jackson.databind.JsonNode;

import lombok.extern.slf4j.Slf4j;
import team.project.camp.member.model.CommonLoginService;
import team.project.camp.member.model.vo.Member;

@Slf4j
@Service
public class NaverLoginService implements CommonLoginService{

	private static CloseableHttpClient httpClient = HttpClientBuilder.create().build();

	   protected final String socialType = "naver";

	   //clientId, clientSecret ->네이버 개발자 센터에서 발급 받고, 기재
	   //콜백url와 서비스 url(->여기서 말고, jsp페이지에서 수정해야함)도 수정해야함. 입력한 거 복붙하면됨.
	   protected final String clientId = "";
	   // 아이디 영진꺼입니다, 각자가 받아서 입력해야해요
	   // clientId , clientSecret 두개 .
	   protected final String clientSecret = "";
	   protected final String authUri = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=%s&client_secret=%s&redirect_uri=%s&code=%s&state=%s";
	   protected final String callbackUri = "http://ec2-3-37-254-218.ap-northeast-2.compute.amazonaws.com:8080/camp/login/naverLoginSuccess";
	   protected final String profileUri = "https://openapi.naver.com/v1/nid/me";

	   public Member doAuth(HttpServletRequest request, HttpServletResponse response) throws Exception {
	      // 토큰 추출 처리
	      String[] _tokens = extractTokens(request);
	      Member loginMember = assignUserData(request, response, _tokens);

	      return loginMember;
	   }

	    public String[] extractTokens(HttpServletRequest request) throws Exception {
	        CloseableHttpResponse _response = null;


	        try {
	            String _callbackUri = encodeCallbackUri(callbackUri, request, false);
	            String _apiUri = String.format(authUri,
	                                           clientId,
	                                           clientSecret,
	                                           _callbackUri,
	                                           request.getParameter("code"),
	                                           request.getParameter("state"));

	            String _accessToken, _refreshToken;

	            _response = httpClient.execute(new HttpGet(_apiUri));
	            String _body = getResponseBody(_response);

	            JsonNode node = getRootNodeFromResponse(_body);

	            _accessToken = node.get("access_token").asText();
	            _refreshToken = node.get("refresh_token").asText();

	            return makeTokens(_accessToken, _refreshToken);
	        } catch (Exception e) {
	            throw new Exception("access token 요청 오류");
	        } finally {
	            HttpClientUtils.closeQuietly(_response);
	        }
	    }

	    public Member assignUserData(HttpServletRequest request, HttpServletResponse response, String[] tokens) throws Exception {
	    	org.apache.http.HttpResponse _response = null;
	    	 Member loginMember = new Member();

	        try {
	            _response =  executeProfileRequest(request, socialType, profileUri, tokens[0]);
	            String _body = getResponseBody(_response);
	            JsonNode node = getRootNodeFromResponse(_body);

	            log.info(node+"");

	            // 일련번호, 닉네임, 이메일 주소 저장
	            String nickname = node.get("response").get("nickname") == null ? "닉네임 없음" : node.get("response").get("nickname").asText();
	            String email = node.get("response").get("email")  == null ? "이메일 없음" : node.get("response").get("email").asText();
    			String _mobile = node.get("response").get("mobile") == null ? "전화번호 없음" : node.get("response").get("mobile").asText();
				String name = node.get("response").get("name") == null ? "이름 없음" : node.get("response").get("name").asText();

	          String mobile = _mobile.replaceAll("-", "");

	            if(nickname != null) {
	            	loginMember.setMemberNickname(nickname);
	            	loginMember.setMemberEmail(email);
	            	loginMember.setMemberTel(mobile);
	            }

	            return loginMember;
	        } catch (Exception e) {
	            throw new Exception();
	        } finally {
	            HttpClientUtils.closeQuietly( _response);
	        }
	    }

		@Override
		public HttpClient getHttpClient() {
			return httpClient;
		}


	   public static String encodeCallbackUri(String callbackUri,HttpServletRequest request, boolean isEncode) throws UnsupportedEncodingException {
	      String protocol = (request.isSecure())? "https://": "http://";
	      String host = request.getServerName();
	      String port = (80 == request.getServerPort() || 443 == request.getServerPort())? "": ":" + request.getServerPort();
	      String completeCallbackUri = protocol + host + port + callbackUri;

	      return (isEncode)? UriUtils.encode(completeCallbackUri, StandardCharsets.UTF_8.name()): completeCallbackUri;
	   }
}
