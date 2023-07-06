package team.project.camp.member.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import team.project.camp.member.model.vo.Member;

/**
 * @author user
 *
 */
@Repository
public class MemberDAO {

	@Autowired // root-context.xml 에서 생성된 SqlSessionTemplate bean 을 의존성 주입(DI)
	private SqlSessionTemplate sqlSession;

	private Logger logger = LoggerFactory.getLogger(MemberDAO.class);

	public Member login(Member inputMember) {

		// 1행 조회(파라미터 VO, 반환되는 결과 VO)
		Member loginMember = sqlSession.selectOne("memberMapper.login", inputMember);

		return loginMember;
	}


	/** 이메일 중복 검사 DAO
	 * @param memberEmail
	 * @return
	 */
	public int emailDupCheck(String memberEmail) {

		return sqlSession.selectOne("memberMapper.emailDupCheck", memberEmail);
	}


	/** 닉네임 중복 검사 DAO
	 * @param memberNickname
	 * @return
	 */
	public int nicknameDupCheck(String memberNickname) {
		return sqlSession.selectOne("memberMapper.nicknameDupCheck", memberNickname);
	}


	/** 회원가입 DAO
	 * @param signUpMember
	 * @return
	 */
	public int signUp(Member signUpMember) {

		// INSERT, UPDATE, DELETE 반환값 int 형으로 고정
		// -> mapper 에서도 resultType 항상 _int 고정
		// -> resultType 생략 가능(묵시적으로 _int)

		return sqlSession.insert("memberMapper.signUp", signUpMember);
	}


	/** 아이디 찾기 DAO
	 * @param memberTel
	 * @return
	 */
	public List<String> findId(String memberTel) {
		return sqlSession.selectList("memberMapper.findId" ,memberTel);
	}


	/** 임시 비밀번호 설정 DAO
	 * @param memberEmail
	 * @param randomPassword
	 * @return
	 */
	public int setTempPassword(Member member) {
		return sqlSession.update("memberMapper.setTempPassword", member);
	}



	/** 네이버 이메일 중복검사 DAO
	 * @param memberEmail
	 * @return
	 */
	public int naverEmailDupCheck(String memberEmail) {
		return sqlSession.selectOne("memberMapper.naverEmailDupCheck", memberEmail);
	}


	/** 네이버 로그인시 DB 에 정보 저장
	 * @param loginMember
	 * @return
	 */
	public int naverLoginInsert(Member loginMember) {
		return sqlSession.insert("memberMapper.naverLoginInsert", loginMember);
	}

	/** 네이버 회원정보 뽑아오기
	 * @param loginMember
	 * @return
	 */
	public Member naverMember(Member loginMember) {
		return sqlSession.selectOne("memberMapper.naverMember",loginMember);
	}



	/**구글 카카오 로그인 회원정보 조회
	 * @param googleMember
	 * @return
	 */
	public Member googleKakaoLogin(Member googleKakaoMember) {

		Member googleKakaoLoginMember = sqlSession.selectOne("memberMapper.googleKakaoLogin", googleKakaoMember);
		return googleKakaoLoginMember;
	}

	/**구글 카카오 첫 로그인 시 DB 삽입
	 * @param member
	 * @return
	 */
	public int googleKakaoInsert(Member member) {
		return sqlSession.insert("memberMapper.googleKakaoInsert", member);
	}


	/** 구글 카카오 중복이메일 방지 이메일,닉네임 selece문
	 * @param kakaoMember
	 * @return
	 */
	public int googleKakaoEmailCheck(Member googleKakaoMember) {
		return sqlSession.selectOne("memberMapper.googleKakaoEmailCheck", googleKakaoMember);
	}


	public Member googleLogin(Member member) {
		Member googleLoginMember = sqlSession.selectOne("memberMapper.googleKakaoLogin", member);
		return googleLoginMember;
	}


	public int googleEmailCheck(Member member) {
		return sqlSession.selectOne("memberMapper.googleKakaoEmailCheck", member);
	}


}
