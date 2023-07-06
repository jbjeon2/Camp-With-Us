// 미리보기 관련 요소 모두 얻어오기
// -> 동일한 개수의 요소가 존재함 == 인덱스가 일치함
const inputImage = document.getElementsByClassName("inputImage");
const preview = document.getElementsByClassName("preview");
const deleteImage = document.getElementsByClassName("delete-image");

// 게시글 수정 시 삭제된 이미지의 레벨(위치)를 저장할 input 요소
const deleteList = document.getElementById("deleteList");

// 게시글 수정 시 삭제된 이미지의 레벨(위치)를 기록해둘 Set 생성
const deleteSet = new Set(); // 순서 X, 중복 허용 X (여러번 클릭 시 중복 값 저장 방지)

//
const file = document.getElementById("btnAtt");



for(let i=0 ; i<inputImage.length ; i++){

    // 파일이 선택 되었을 때의 동작
    inputImage[i].addEventListener("change", function(){

        if(this.files[0] != undefined){ // 파일이 선택 되었을 때
            const reader = new FileReader(); // 선택된 파일을 읽을 객체 생성
            reader.readAsDataURL(this.files[0]);
            // 지정된 파일을 읽음 -> result에 저장(URL 포함) -> URL을 이용해서 이미지 볼 수 있음

            reader.onload = function(e){ // reader가 파일을 다 읽어온 경우
                // e.tartget == redaer
                // e.target.result == 읽어들인 이미지의 URL
                // preview[i] == 파일이 선택된 input태그와 인접한 preview 이미지 태그
                preview[i].setAttribute("src", e.target.result);

                // 이미지가 성공적으로 불러와졌을 때
                // deleteSet에서 해당 레벨을 제거(삭제 목록에서 제외)
                deleteSet.delete(i);
            }
      
        } else { // 파일이 선택되지 않았을 때 (취소)
            preview[i].removeAttribute("src"); // src 속성 제거
        }
    });



    // 미리보기 삭제 버튼(x)이 클릭 되었을 때의 동작
    deleteImage[i].addEventListener("click", function(){
        console.log("file : " +file.value);
        // 미리보기가 존재하는 경우에만 (이전에 추가된 이미지가 있을 때만 X버튼 동작)
        if( preview[i].getAttribute("src")  !=  "" ){

            // 미리보기 삭제
            preview[i].removeAttribute("src");

            // input의 값을 "" 만들기
            inputImage[i].value = "";

            // deleteSet에 삭제된 이미지 레벨(i) 추가
            deleteSet.add(i);
        }

    });

}


// 게시글 작성 유효성 검사
function writeValidate(){
    const boardTitle = document.getElementsByName("boardTitle")[0];
    const boardContent = document.querySelector("[name='boardContent']");

    if(boardTitle.value.trim().length == 0){
        alert("제목을 입력해주세요!!!");
        boardTitle.value = "";
        boardTitle.focus();
        return false;
    }

    if(boardContent.value.trim().length == 0){
        alert("내용을 입력해주세요!!!");
        boardContent.value = "";
        boardContent.focus();
        return false;
    }

    // 제목, 내용이 유효한 경우
    // deleteList(input 태그)에 deleteSet(삭제된 이미지 레벨)을 추가
    // -> JS 배열 특징 사용
    //  --> JS 배열을 HTML요소 또는 console 에 출력하게 되는 경우 1,2,3 같은 문자열로 출력됨
    //      (배열 기호가 벗겨짐)

    // * Set -> Array로 변경 -> deleteList.value에 대입

    // Array.from(유사배열 | 컬렉션) : 유사배열 | 컬렉션을 배열로 변환해서 반환
    // deleteList.value = Array.from(deleteSet);


    return true;
}



// 서머노트
$(document).ready(function() {

    var toolbar = [
            // 글꼴 설정
            ['fontname', ['fontname']]
            // 글자 크기 설정
            ['fontsize', ['fontsize']],
            // 굵기, 기울임꼴, 밑줄,취소 선, 서식지우기
            ['style', ['bold', 'italic', 'underline','strikethrough', 'clear']],
            // 글자색
            ['color', ['forecolor','color']],
            // 글머리 기호, 번호매기기, 문단정렬
            ['para', ['ul', 'ol', 'paragraph']],
            // 줄간격
            ['height', ['height']],
            // 그림첨부, 링크만들기, 동영상첨부
            ['insert',['picture','link','video']],
            // 코드보기, 확대해서보기('fullscreen'), 도움말
            ['view', ['codeview', 'help']]
        ];


    var filesLength = null;  // summernote 위에 업로드 된 '모든' 이미지의 갯수를 담을 변수

    var setting = {
        placeholder: '내용을 작성해주세요!',
        disableResizeEditor: true,
        // height : 300,
        minHeight : 300,
        maxHeight : null,
        lang : 'ko-KR',
        toolbar : toolbar,
        callbacks : { //여기 부분이 이미지를 첨부하는 부분

            onImageUpload: function(files, editor, welEditable) { /* upload start */
                
                var imageFiles = []; // onImageUpload가 돌 때마다 업로드 할 이미지 파일을 담을 배열
                var maxFiles = []; // 용량 제한에 걸린 파일이름을 담을 배열(alert 띄우려고 담음)

                var maxSize = 2 * 1024 * 1024; // limit = 2MB
                var isMaxSize = false;
                var maxFile = null;

                if (filesLength > 5) { // 업로드 이미지 갯수 제한
                    alert('이미지는 최대 5개까지 등록할 수 있습니다.');
                    console.log(filesLength);

                } else { // 업로드 된 이미지가 5개 이하인 경우
                    for (var i = 0; i < files.length; i++) { // 업로드 된 이미지 파일의 수만큼 for문을 돌림
                        if (files[i].size > maxSize) { // 용량 제한에 걸린 파일 이름을 배열(maxFiles)에 담음
                            isMaxSize = true;
                            maxFile = files[i].name;
                            maxFiles.push(maxFile);                         
                        }
                    }
                    // console.log(filesLength);

                    if (isMaxSize) { // 용량 제한에 걸렸을 때 (isMaxSize = true;)
                        for (var i = 0; i < maxFiles.length; i++){ // 용량 제한에 걸린 파일의 수만큼 for문을 돌려서 alert을 띄움
                            alert('[' + maxFiles[i] + '] 파일이 업로드 용량(2MB)을 초과하였습니다.');
                            filesLength = filesLength; // filesLength의 값을 증가시키지 않는다
                            // console.log(filesLength);
                        }
                    } else { // 용량 제한에 걸리지 않았을 때 (isMaxSize = false;)
                        for (var i = 0; i < files.length; i++) { // 업로드 된 이미지 파일의 수만큼 for문을 돌림
                            imageFiles.push(files[i]); // 이미지 파일을 배열(imageFiles)에 담음
                        }
                        filesLength += files.length; // onImageUpload가 돌 때마다 업로드 된 이미지의 갯수를 filesLength에 누적함
                        // console.log(filesLength);

                        if (filesLength > 5) { // (ex)summernote 위에 이미 이미지 3개가 업로드 되있는 경우에 3개를 더 업로드하려고 시도하면
                            alert('이미지는 최대 5개까지 등록할 수 있습니다.');
                            filesLength -= files.length; // 결과적으론 이미지 업로드가 안됬으니 위에서 증가된 files.length(==3) 만큼 filesLength(==3) 을 차감함(원상복구시킴)
                            // console.log(files.length);
                            // console.log(filesLength);
                        } else { // (ex)summernote 위에 이미 이미지 3개가 업로드 되있는 경우에 이미지를 최대 2개 업로드하려고 시도하면 filesLength가 딱 5개가 됨

                            // 이미지 업로드 함수 호출
                            uploadSummernoteImageFile(imageFiles, this);
                        }                      
                    }
                }
            } /* upload end */
        }                 
    };



    $('.summernote').summernote(setting);
    
    const jsonArray = [];
    
    function uploadSummernoteImageFile(imageFiles, el) {
        var formData = new FormData();

            
        // 이미지 파일들을 formData에 추가
        for (var i = 0; i < imageFiles.length; i++) {

            if(i == 0) {
                formData.append('thumbnail', imageFiles[i]);
            } else if(i != 0) {
                formData.append('file', imageFiles[i]);
            }
    
        }
        console.log(formData.get("thumbnail"));

        console.log(formData.get("file.index[0]"));
        console.log(formData.get("file.index[1]"));
        // Ajax를 통해 서버로 이미지 업로드

        $.ajax({
            data : formData,
            type : "POST",
            url : contextPath + '/board/upload',
            contentType : false,
            enctype : 'multipart/form-data',
            processData : false,
            dataType : "JSON",
            success : function(data) {
    
                console.log(data);

                for(let i=0; i<data.length; i++) {
                    $(el).summernote('editor.insertImage', data[i]);
                    jsonArray.push(data[i]["url"]);
                    
                }
                
            },
            error : function(){
                // 비동기 통신(ajax) 중 오류가 발생한 경우
                console.log("에러 발생");
            }
        });
                
    }   
        // console.log(jsonArray.length);  
});