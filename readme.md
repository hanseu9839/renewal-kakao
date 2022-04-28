# DoongTalk
카카오톡 리뉴얼 기능입니다. 기존에 있는 카카오톡에 MongoDB, Nodejs, vaillaJS를 사용해서 기능을 추가해서 만들어 주었습니다. 

# 사용한 기술 스택 

# 채팅 어플 라우터 URL 구성 
### globalRouter
/login -> 로그인 
/join -> 회원가입 
/search -> 친구 찾기 
/logout -> 로그 아웃 
<br>

### chatRouter 
/chat/:user_id/:friend_id -> 채팅방
/chat/rooms -> 채팅방들 
<br>

### userRouter
/users/eidt -> 유저 정보 변경 
/users/change-password -> 유저 비밀번호 

### apiRouter 
/search/add -> 유저검색 