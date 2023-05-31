package team.project.camp.detail.model.vo;

import java.sql.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@NoArgsConstructor
@ToString
public class Reservation {

	private int reservNo;
	private String campingName;
	private String buyerName;
	private int amount;
	private int people;
	private String reservSelDate;
	private Date reservDate;
	private char reservSt;
	private String month;
}
