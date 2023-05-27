package team.project.camp.login.model;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import org.springframework.util.StringUtils;
import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.message.BasicHeader;
import org.apache.http.util.EntityUtils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public interface CommonLoginService {
   HttpClient getHttpClient();
   
    /**
     * 요청에 대한 응답을 문자열로 변환하여 반환. 응답 상태가 실패({@code 200 != code}일 경우 예외 발생.
     *
     * @param response 응답
     *
     * @return 문자열로 변환단 응답 데이터
     * @throws IOException        문자열 변환 실패
     * @throws NGProcessException 응답 상태가 성공(200)이 아닐 경우 발생
     */
    default String getResponseBody(HttpResponse response) throws Exception {
        if (200 == response.getStatusLine().getStatusCode()) {
            return EntityUtils.toString(response.getEntity());
        } else {
            throw new Exception("응답오류");
        }
    }
   
    /**
     * Access token과 Refresh token을 배열로 반환
     *
     * @param accessToken Access token
     * @param values      기타 값
     *
     * @return 토큰 배열
     */
    default String[] makeTokens(String accessToken, String... values) {
        String[] _tokens;

        if (accessToken != null && !accessToken.equals("")) {
        	
            List<String> tempList = new ArrayList<>();

            tempList.add(accessToken);

            if (Optional.ofNullable(values).isPresent()) {
                tempList.addAll(Arrays.asList(values));
            }
            _tokens = tempList.toArray(new String[0]);
        } else {
            throw new RuntimeException();
        }

        return _tokens;
    }
    
    /**
     * 문자열에서 root node를 추출하여 반환
     *
     * @param body json 문자열
     *
     * @return root node
     * @throws IOException json 파싱 오류
     */
    default JsonNode getRootNodeFromResponse(final String body) throws IOException {
        ObjectMapper mapper = new ObjectMapper();

        return mapper.readTree(body);
    }
    
    /**
     * 프로필 정보 요청을 하여 해당 결과를 반환. 네이버, 카카오, 페이스북은 공용으로 사용하며 트위터는 overriding 하여 처리함.
     * 트위터의 경우는 반화된 access token이 아닌 app에 등록되어 있는 <strong>oauth_token</strong>과 <strong>oauth_token_secret</strong>을
     * 이용하여 처리한다.
     *
     * @param request {@link HttpServletRequest}
     * @param tokens  Access token {@link #makeTokens(String, String...)}에서 생성한 토큰 정보
     *
     * @return 응답 결과
     * @throws NGProcessException 요청 실패
     */
    default HttpResponse executeProfileRequest(HttpServletRequest request, String socialType, String profileUri, String... tokens) throws Exception {
        try {
            String _url;

            if ("facebook".equals(socialType)) {
                _url = String.format(profileUri, tokens[0]);
            } else {
                _url = profileUri;
            }

            HttpGet get = new HttpGet(_url);
            Header header = new BasicHeader("Authorization", String.format("Bearer %s", tokens[0]));

            get.setHeader(header);

            return getHttpClient().execute(get);
        } catch (Exception e) {
            e.printStackTrace();

            throw new Exception("프로필 요청 오류");
        }
    }
}