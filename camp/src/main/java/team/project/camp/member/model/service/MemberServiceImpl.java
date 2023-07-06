package team.project.camp.member.model.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import team.project.camp.member.model.dao.MemberDAO;
import team.project.camp.member.model.vo.Member;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	private MemberDAO dao;

	@Autowired // 암호화를 위한 bcrypt 객체 의존성 주입(DI)
	private BCryptPasswordEncoder bcrypt;

	private Logger logger = LoggerFactory.getLogger(MemberServiceImpl.class);

	// 로그인 서비스 구현
	@Override
	public Member login(Member inputMember) {


		logger.info( inputMember.getMemberPw() + " / " +  bcrypt.encode(inputMember.getMemberPw()) );

		Member loginMember = dao.login(inputMember);

		if(loginMember != null) { // 일치하는 이메일을 가진 회원 정보가 있을 경우

			// 입력된 비밀번호(평문) , 조회된 비밀번호(암호화) 비교 (같으면 true)

			if( bcrypt.matches(  inputMember.getMemberPw()   ,  loginMember.getMemberPw() ) ) {
				// 비밀번호가 일치할 경우

				loginMember.setMemberPw(null); // 비교 끝났으면 비밀번호 지우기

			} else { // 비밀번호가 일치하지 않은 경우
				loginMember = null; // 로그인을 실패한 형태로 바꿔줌

			}
		}

		return loginMember;

	}

	// 아이디 찾기 서비스 구현
	@Override
	public List<String> findId(String memberTel) {
		return dao.findId(memberTel);
	}

	// 이메일 중복 검사 서비스 구현
	@Override
	public int emailDupCheck(String memberEmail) {
		return dao.emailDupCheck(memberEmail);
	}


	// 닉네임 중복 검사 서비스 구현
	@Override
	public int nicknameDupCheck(String memberNickname) {
		return dao.nicknameDupCheck(memberNickname);
	}


	// 회원 가입 서비스 구현
	@Override
	public int signUp(Member inputMember) {

		// 비밀번호 암호화(bcrypt)
		String encPw = bcrypt.encode( inputMember.getMemberPw() );

		// 암호화된 비밀번호로 다시 세팅
		inputMember.setMemberPw(encPw);

		// DAO 호출
		int result = dao.signUp(inputMember);

		// 트랜잭션 제어 처리를 하는 이유
		// -> 1개의 서비스에서 n개의 dao를 호출
		//    -> dao 하나라도 예외 발생 시 전체 rollback

		return result;
	}

	// 임시 비밀번호 설정 서비스 구현
	@Override
	public int setTempPassword(Member member) {

		// 임시 비밀번호도 암호화
		member.setMemberPw(bcrypt.encode(member.getMemberPw()) );

		return dao.setTempPassword(member);
	}


	// 네이버 이메일 중복검사 서비스
	@Override
	public int naverEmailDupCheck(String memberEmail) {
		return dao.naverEmailDupCheck(memberEmail);
	}

	// 네이버 로그인정보 저장 서비스
	@Override
	public int naverLoginInsert(Member loginMember) {

		loginMember.setMemberPw(bcrypt.encode("campwithus"));

		return dao.naverLoginInsert(loginMember);
	}

	// 네이버 회원정보 뽑아오기
	@Override
	public Member naverMember(Member loginMember) {
		return dao.naverMember(loginMember);
	}



	//구글 로그인 회원정보 조회
	@Override
	public Member googleKakaoLogin(Member googleKakaoMember) {
		Member googleLoginMember = dao.googleKakaoLogin(googleKakaoMember);
		return googleLoginMember;
	}

	//구글 첫 로그인 시 DB 삽입
	@Override
	public int googleKakaoInsert(Member member) {

		member.setMemberPw(bcrypt.encode("campwithus"));

		return dao.googleKakaoInsert(member);
	}


	//구글 카카오 중복이메일 방지 이메일,닉네임 selece문
	@Override
	public int googleKakaoEmailCheck(Member googleKakaoMember) {
		return dao.googleKakaoEmailCheck(googleKakaoMember);
	}

	//구글 로그인
	@Override
	public Member googleLogin(Member member) {
		Member googleLoginMember = dao.googleLogin(member);
		return googleLoginMember;
	}

	@Override
	public int googleEmailCheck(Member member) {
		return dao.googleEmailCheck(member);
	}


}

