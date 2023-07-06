package team.project.camp.board.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Board {

	private int boardNo;
	private String boardTitle;
	private String memberNickname;
	private String createDate;
	private int readCount;
//	private String thumbnail;
	private String boardContent;
	private int boardCode;
	private String thumbnailImg;

}
