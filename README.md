Project 7 Shop
---
  고객의 원하는 상품을 쉽고 편리하게 구매할 수 있는 서비스입니다.

<br>

Team 7
---
- [김승일](https://github.com/kingseungil)
- [우태현](https://github.com/wth2052)
- [성민섭](https://github.com/Seop0728)



<br>

개발 관련 사항
---
- `Node 18.12.1` 에서 개발되었습니다.
- [코드 규칙](https://github.com/sparta-7shop/7shop/wiki/Convention)을 따릅니다.
- [핵심 요구사항](https://github.com/sparta-7shop/7shop/wiki/%ED%95%B5%EC%8B%AC-%EA%B8%B0%EC%88%A0%EC%9A%94%EA%B5%AC%EC%82%AC%ED%95%AD)을 준수합니다.

<br>

사용된 기술
---

  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/Axsios-5A29E4?style=for-the-badge&logo=axsios&logoColor=white"> <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
  
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">


<br>

✅ 다이어그램
---

<br>
메인페이지<br>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F5sWgT%2FbtrYDeUfTv3%2F2hX9ncK3CtaTxYNY2z5Qpk%2Fimg.png" width="600px" height="500px">

장바구니<br>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FSR4EU%2FbtrYITVS8BA%2FBd92bOmTMjxrVqAhNrC8gK%2Fimg.png" width="600px" height="500px">

상품(shop)<br>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F4xwcx%2FbtrYKuOx2pQ%2FkrBC3LLgQ9E43eEoBDKuF0%2Fimg.png" width="600px" height="500px">

마이페이지<br>
<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F14f62e9d-0e5d-40cd-9003-363609ad9ff1%2FUntitled.png?id=100a4633-ebfa-4c50-8cf4-6b6d7e0f1613&table=block&spaceId=469240fb-3871-42f8-9b6a-c82a7d3441bc&width=1590&userId=77a63536-521c-4e7e-907a-32a6504ed56d&cache=v2" width="600px" height="500px">

관리자페이지(회원관리)<br>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdimzAf%2FbtrYJZ9b9eI%2FXsk5H6fVSBzfYZ6UFOh7s0%2Fimg.png" width="600px" height="500px">

관리자페이지(상품관리)<br>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FJxzVm%2FbtrYEj2tdgY%2Fe2orhahYWsaaIlyUcgBmM0%2Fimg.png" width="600px" height="500px">

로그인/회원가입<br>
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FBQtVm%2FbtrYByeHnr0%2FSVePrmpreDUKJN39pHTk21%2Fimg.png" width="600px" height="500px">




<br><br>

DB 설계
---

🎈 User
| 컬럼 | 데이터타입 | 제약조건 | 설명 |
| --- | --- | --- | --- |
| userId | INT | PRIMARY KEY, AUTO_INCREMENT | 고객 번호 |
| email | VARCHAR(100) | NOT NULL, UNIQUE | 고객 이메일 |
| password | VARCHAR(100) | NOT NULL | 고객 비밀번호 |
| name | VARCHAR(100) | NOT NULL | 고객 실명 |
| createdAt | TIMESTAMP |  |  |
| updatedAt | TIMESTAMP |  |  |
| phone | VARCHAR(25) | NOT NULL | 고객 전화번호 |
<br>

🎈 admin
| 컬럼 | 데이터타입 | 제약조건 | 설명 |
| --- | --- | --- | --- |
| id | INT | PRIMARY KEY, AUTO_INCREMENT | 관리자 번호 |
| name | VARCHAR(100) | NOT NULL, UNIQUE | 관리자 실명 |
| email | VARCHAR(100) | NOT NULL | 관리자 이메일 |
| password | VARCHAR(100) | NOT NULL | 관리자 비밀번호 |
| phone | VARCHAR(100) | NOT NULL | 관리자 전화번호 |
<br>

🎈 address
| 컬럼 | 데이터타입 | 제약조건 | 설명 |
| --- | --- | --- | --- |
| id | INT | PRIMARY KEY, AUTO_INCREMENT | 주소 번호 |
| name | VARCHAR(100) | NOT NULL, UNIQUE | 유저 주소 |
| user_id | int | FOREIGN KEY, NOT NULL | 고객 번호 |

🎈 cart
| 컬럼 | 데이터타입 | 제약조건 | 설명 |
| --- | --- | --- | --- |
| id | INT | PRIMARY KEY, AUTO_INCREMENT | 장바구니 번호 |
| count | INT | NOT NULL | 장바구니  갯수 |
| product_id | INT | FOREIGN KEY, NOT NULL | 장바구니 번호 |
| user_id | INT | FOREIGN KEY, NOT NULL | 고객 번호 |
<br>

🎈 category
| 컬럼 | 데이터타입 | 제약조건 | 설명 |
| --- | --- | --- | --- |
| id | INT | PRIMARY KEY, AUTO_INCREMENT | 카테고리 번호 |
| name | VARCHAR(100) | NOT NULL, UNIQUE | 카테고리 명 |
<br>

🎈 product
| 컬럼 | 데이터타입 | 제약조건 | 설명 |
| --- | --- | --- | --- |
| id | INT | PRIMARY KEY, AUTO_INCREMENT | 상품 번호 |
| name | VARCHAR(100) | NOT NULL | 상품명 |
| price | INT | NOT NULL | 상품 가격 |
| stock | INT | NOT NULL | 상품 재고 |
| img_path | VARCHAR(100) | NOT NULL | 상품 이미지 |
| description | VARCHAR(100) | NOT NULL | 상품 설명 |
| category_id | INT | FOREIGN KEY, NOT NULL | 카테고리 번호 |
| admin_id | INT | FOREIGN KEY, NOT NULL | 관리자 번호 |
<br>

🎈 order_product
| 컬럼 | 데이터타입 | 제약조건 | 설명 |
| --- | --- | --- | --- |
| id | INT | PRIMARY KEY, AUTO_INCREMENT | 주문상품 번호 |
| product_num | INT | NOT NULL | 상품 수?
주문 수? |
| order_id | INT | FOREIGN KEY | 주문 번호 |
| product_id | INT | FOREIGN KEY | 상품 번호 |
<br>

🎈 order
| 컬럼 | 데이터타입 | 제약조건 | 설명 |
| --- | --- | --- | --- |
| orderId | INT | PRIMARY KEY, AUTO_INCREMENT | 주문 번호 |
| address | VARCHAR(100) | NOT NULL | 유저 주소 |
| status | INT | FOREIGN KEY | 주문 진행상황
(0-진행 중, 1-주문 완료) |
| payment_id | INT | FOREIGN KEY | 결제 번호 |
| user_id | INT | FOREIGN KEY, NOT NULL | 유저 번호 |






<br><br>

ERD
---
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FczIHli%2FbtrYI6npWRK%2F5ySpJMWhxw1oKaSQxJXUNK%2Fimg.png" width="600px" height="500px">



<br><br>


