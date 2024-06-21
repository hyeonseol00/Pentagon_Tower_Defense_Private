# 웹소켓 타워 디펜스 게임 만들기
Node.js 서버를 구축해 제공받은 타워 디펜스 게임 클라이언트의 동작을 완성하는 프로젝트입니다.
`socket.io`, `express`, `MongoDB`와 `mongoose` 등을 사용했습니다.

<br><br>

## 개발한 주요 기능

<br>

### 회원가입 / 로그인 기능
https://github.com/hyeonseol00/Pentagon_Tower_Defense_Private/blob/039d1e8c248ba00c444ee068b186a656d918a806/src/routes/accounts.router.js#L38-L64
회원가입 / 로그인 기능은 RESTful API 형식으로 진행합니다.

https://github.com/hyeonseol00/Pentagon_Tower_Defense_Private/blob/039d1e8c248ba00c444ee068b186a656d918a806/src/middlewares/auth.middleware.js#L4-L40
https://github.com/hyeonseol00/Pentagon_Tower_Defense_Private/blob/039d1e8c248ba00c444ee068b186a656d918a806/src/handlers/register.handler.js#L12-L17
그리고 미들웨어 형식으로 소켓 통신 시 쿠키로 토큰을 받아 검증합니다.


<br>

### 유저 별 데이터 관리
https://github.com/hyeonseol00/Pentagon_Tower_Defense_Private/blob/039d1e8c248ba00c444ee068b186a656d918a806/tower_defense_client/src/game.js#L323-L331
https://github.com/hyeonseol00/Pentagon_Tower_Defense_Private/blob/c30f820ee14188c3b7af805f3d936e6632b936d6/tower_defense_client/src/game.js#L363-L374
유저별로 점수, 몬스터 레벨 등 진행상황을 관리합니다.

<br>

### 서버가 클라이언트로 보내는 이벤트 종류 정의 및 구현
https://github.com/hyeonseol00/Pentagon_Tower_Defense_Private/blob/c30f820ee14188c3b7af805f3d936e6632b936d6/src/handlers/monster.handler.js#L22-L45
위 코드는 예시로 몬스터를 처치했을 때 클라이언트의 요청을 받고 서버에서 동작하는 코드입니다.

https://github.com/hyeonseol00/Pentagon_Tower_Defense_Private/blob/c30f820ee14188c3b7af805f3d936e6632b936d6/src/handlers/helper.js#L63-L65
반환값에 `data`가 포함되어 있다면 클라이언트에 데이터 동기화를 요청합니다.

<br>

### 클라이언트가 서버로 보내는 이벤트 종류 정의 및 구현
https://github.com/hyeonseol00/Pentagon_Tower_Defense_Private/blob/c30f820ee14188c3b7af805f3d936e6632b936d6/tower_defense_client/src/game.js#L268-L277
위 코드는 예시로 몬스터가 사망했을 때 클라이언트에서 동작하는 코드입니다. 몬스터가 사망했다고 서버에 메시지를 보냅니다.

<br>

### 유저 별 최고 기록 스코어 저장
https://github.com/hyeonseol00/Pentagon_Tower_Defense_Private/blob/c30f820ee14188c3b7af805f3d936e6632b936d6/src/handlers/game.handler.js#L9-L36
게임이 종료되었을 때 동작하는 코드입니다.
최고기록이 갱신되었을 때 유저별로 최고기록을 저장하고 만약 서버 최고기록이라면 전체 유저에게 해당 사실을`broadcast`로 보냅니다.

<br>

### 설치된 타워 환불 기능
https://github.com/hyeonseol00/Pentagon_Tower_Defense_Private/blob/c30f820ee14188c3b7af805f3d936e6632b936d6/src/handlers/tower.handler.js#L41-L62
https://github.com/hyeonseol00/Pentagon_Tower_Defense_Private/blob/c30f820ee14188c3b7af805f3d936e6632b936d6/tower_defense_client/src/game.js#L344-L348
마지막으로 설치된 타워를 환불하는 기능을 추가했습니다.
만약 업그레이드 된 타워라면 업그레이드 비용까지 환불됩니다.
환불할 수 있는 타워가 없다면 실패 메시지를 전달합니다.

<br>

### 타워 업그레이드 기능
https://github.com/hyeonseol00/Pentagon_Tower_Defense_Private/blob/c30f820ee14188c3b7af805f3d936e6632b936d6/src/handlers/tower.handler.js#L64-L97
https://github.com/hyeonseol00/Pentagon_Tower_Defense_Private/blob/c30f820ee14188c3b7af805f3d936e6632b936d6/tower_defense_client/src/game.js#L350-L355
업그레이드 되지 않은 랜덤한 타워 하나를 비용을 지불하고 업그레이드 하는 기능을 추가했습니다.
만약 모든 타워가 업그레이드 되었다면 실패 메시지를 전달합니다.

<br>

### 보물 고블린 몬스터 출연 기능
https://github.com/hyeonseol00/Pentagon_Tower_Defense_Private/blob/c30f820ee14188c3b7af805f3d936e6632b936d6/tower_defense_client/src/game.js#L228-L230
https://github.com/hyeonseol00/Pentagon_Tower_Defense_Private/blob/c30f820ee14188c3b7af805f3d936e6632b936d6/src/handlers/monster.handler.js#L47-L79
확률적으로 등장하는 보물 고블린을 처치하면 특별한 보상을 받는 기능을 추가했습니다.
보물 고블린은 다른 몬스터와 다른 스탯(더 높은 이동속도, 더 높은 체력) 등을 가지며 처치하지 못하더라도 기지에 데미지를 가하지는 못합니다.

<br>

### 데이터베이스 연동
https://github.com/hyeonseol00/Pentagon_Tower_Defense_Private/blob/c30f820ee14188c3b7af805f3d936e6632b936d6/src/mongodb/index.js#L1-L17
https://github.com/hyeonseol00/Pentagon_Tower_Defense_Private/blob/c30f820ee14188c3b7af805f3d936e6632b936d6/src/mongodb/schemas/account.schema.js#L1-L14
https://github.com/hyeonseol00/Pentagon_Tower_Defense_Private/blob/c30f820ee14188c3b7af805f3d936e6632b936d6/src/models/account.model.js#L1-L13
https://github.com/hyeonseol00/Pentagon_Tower_Defense_Private/blob/c30f820ee14188c3b7af805f3d936e6632b936d6/src/routes/accounts.router.js#L43-L44
`MongoDB`와 `mongoose`를 사용했습니다.
`schema`와 `model`을 정의해두고 필요에 따라 호출하며 활용했습니다.

<br><br>

## ERD Diagram
![](https://velog.velcdn.com/images/hyeonseol22/post/e57409c8-b583-4c4a-9086-06c38a1a719b/image.png)
