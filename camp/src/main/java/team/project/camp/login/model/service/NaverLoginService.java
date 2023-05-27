package team.project.camp.login.model.service;

import java.io.UnsupportedEncodingException;
import java.net.http.HttpResponse;
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

import team.project.camp.login.model.CommonLoginService;
import team.project.camp.login.model.vo.LoginVo;

@Service
public class NaverLoginService implements CommonLoginService{
	
	private static CloseableHttpClient httpClient = HttpClientBuilder.create().build();

	   protected final String socialType = "naver";
	   
	   protected final String clientId = "IDz2f9V7KDUGFQtrc5dB";
	   protected final String clientSecret = "a7IYMm19U3";
	   protected final String authUri = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=%s&client_secret=%s&redirect_uri=%s&code=%s&state=%s";
	   protected final String callbackUri = "/login/naverLoginSuccess";
	   protected final String profileUri = "https://openapi.naver.com/v1/nid/me";
	   
	   public LoginVo doAuth(HttpServletRequest request, HttpServletResponse response) throws Exception {
	      // 토큰 추출 처리
	      String[] _tokens = extractTokens(request);
	      LoginVo loginVO = assignUserData(request, response, _tokens);
	   
	      return loginVO;
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
	      
	    public LoginVo assignUserData(HttpServletRequest request, HttpServletResponse response, String[] tokens) throws Exception {
	    	org.apache.http.HttpResponse _response = null;
	        LoginVo loginVO = new LoginVo();
	        
	        try {
	            _response =  executeProfileRequest(request, socialType, profileUri, tokens[0]);
	            String _body = getResponseBody((org.apache.http.HttpResponse) _response);
	            JsonNode node = getRootNodeFromResponse(_body);

	            // 일련번호, 닉네임, 이메일 주소 저장
	            String sequence = node.get("response").get("id").asText();
//	            String _name = node.get("response").get("name") == null ? _vendorSequence : node.get("response").get("name").asText();
//	            String _nickname = node.get("response").get("nickname") == null ? _name : node.get("response").get("nickname").asText();
//	            String _email = node.get("response").get("email") == null ? _vendorSequence + "@naver.com" : node.get("response").get("email").asText();

	            if(sequence != null) {
	               loginVO.setSnsType("NAVER");
	               loginVO.setSnsUniqueId(sequence);
	               loginVO.setUserId("NAVER_" + sequence);
	            }
	            
	            return loginVO;
	        } catch (Exception e) {
	            throw new Exception();
	        } finally {
	            HttpClientUtils.closeQuietly( _response);
	        }
	    }

		@Override
		public HttpClient getHttpClient() {
			// TODO Auto-generated method stub
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
