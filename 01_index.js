// 처음 프로젝트 만들었으면, 


// 1️⃣ npm init-y 
    // pack jason 만드는 것 
    // pack jason에는 프로젝트를 설명하는 메타 데이터가 있음 (dpenency 등)
    // 

    // {
    //     "name": "230504", 
    //     "version": "1.0.0",
    //     "description": "",
    //     "main": "01_index.js", // 실행 시킬 때 메인 파일 
    //     "scripts": {
    //       "test": "echo \"Error: no test specified\" && exit 1", 
    //       "start" : "node index.js"
    //     },
    //     "keywords": [],
                // 검색했을 대 검색 키워드
    //     "author": "",
                // 제작자
    //     "license": "ISC"
                // 라이센스 관련 설정
    //   }


// 🔷 오늘 사용할 모듈 
    // express 
    // ejs 
    // mysql
    // path
    // body - parser : express 에서 지원
    // port 8080


// 🔷 목표 : 안 보고 해보기 
    // 숫자가 있는건 정기적인 것 
    // 그냥 별표는 임시적인 것, 추가 된 것


// 2️⃣ express 가져오기 
    const express = require("express")
        // 내장 모듈이 아니니까 설치 해야 함. 😥 이걸 잊어버렸음. 😥😥😥 
        // npm i express 
        // 그러면, 뭔가 생김. 의존성이 생김 > 같이 설치 된 것 




// 🔷 ejs 설치 
    // 터미널에서 설치
    // npm i ejs
    // express 에서 지원하기 때문에 설치만 하면 됨.


// 🔷 mysql2 설치 및 연결  
    // npm i mysql2 
    const mysql2 = require("mysql2");

    // 연결해주기
    const _mysql = mysql2.createConnection( {
        user : "root",  // 별일 없으면 root 임 
        password : "mysqlpwdj",  // pw
        database : "test2"  // 스키마 이름 기재 

        // 다중 쿼리문 사용할 수 있는 옵션 ⭐⭐⭐ 
            // 그러면, 쿼리문을 여러개 실행 시킬 수 있게 됨. 
        // multipleStatements : true
        multipleStatements : true

    })


// 🔷path 
    const path = require("path");

// 3️⃣ 서버 인스턴스 만들기 
    const app = express();

    console.log(app);
        // [해석] 기본 경로를 안 하면 views 
        // ❓❓❓ 어떻게 실행?



        
    app.set("views" , path.join(__dirname , "page"))
        // [해석]
            // set 메소드, express 의 view 속성을 설정 (파일들의 경로)
            // express 에서 서버사이드 렌더링을 지원하기 위해, 'view 엔진'을 사용한다.
            // 'view 엔진' : 템플릿 파일을 보여주는 역할을 해줌 | view 엔진이 뭐지? 
            //views 기본값은       views: 'C:\\Users\\user11\\Desktop\\kga\\week01\\230504\\views',
            // 파라미터 추가를 해서 > 이 기본값을 변경할 수 있음 

        // 원래 views 폴더 인데 page 폴더로 바꾼 것 임 ⭐⭐⭐ 
        // path.join(__dir) : 폴더 경로 
        // page : 내가 만든 page 폴더 


    // view 엔진으로 ejs 사용할 수 있게 설정
    app.set("view engine" , "ejs");


    // epxress 에서 bodyparser 를 지원한다. 
    app.use(express.urlencoded({extended : false}))
        // extended : false 
            // 깊은 객체를 지원할지, 안 할지. 
            // 확장된 모듈 사용할지 여부 : false 는 기본만 사용하기 
            // 권장은 false ! 
            // 즉, 검색, 이 달라지나❓❓❓ 

    
    // 페이지 보여주기 
    app.get('/' , (req, res) => {
        res.render("main");
            // render 메소드로 view 엔진이, '문자열' 을 html 로 브라우저에 전달, 렌더링 해준다. 
            // 첫 번째 매개변수 : 파일의 이름을 전달 
            // 두 번째 매개변수 : ejs 자바스크립트가 포함되니까, 전달할 데이터
            // 여기 잘 모르겠음 😥😥😥😥😥😥😥 
    })


// 요청을 보냄. 다만 받아줄 라우터가 없음. 받아줄 걸 만들어야 함 시작 
    // ❓❓❓❓❓❓ 라우터가 없다구 ❓❓❓❓❓❓❓❓❓❓❓ 
    // app.get("/list" , (req, res) => {
    //     // res 로 요청받으면 -> render 시켜줘
    //     res.render("list") 
    //         // list 의 확장자는 ejs? 생략? 
    // })


// 로그인 url 로 요청을 받으면 -> render 해준다. 
app.get("/signup" , ( req, res) => {
    res.render("signup");
})


// 로그인 url 로 요청을 받으면 -> render 해준다. 
app.get("/login" , (req, res) => {
    res.render("login")
})

// post 방식에 대한 요청이 login 에서 들어온다면 > 요청에 대한 내용은 req 객체에 들어있다.
app.post('/login', (req, res) => {

    // 미들웨어는 요청 - 응답 사이에서 해주는 것 

    // 요청한 내용은 body 객체 안에 들어있다. 
    // app.use(express.urlencoded({extended : false})) 이거에 의해서? 
    // req.body === {uesr_id , user_pw 가 들어있어 }

    const {user_id, user_pw} = req.body;
    console.log(user_id, user_pw);

    // 전달받은 데이터 베이스에, 아이디와, 비밀번호가, 동일한 내용이 있는지 확인하고,
    // 동일한 (등답받은) 데이터가 있다면,
    // 사용자가 회원가입을, 진행 했다는, 내용이니, 
    // 로그인 시켜준다. 

    // [처음 작성한 것] res.send("user_id : " + user_id + "user_pw : " + user_pw);
        // 😥😥😥 안 나오네 

    // [2차 작성]
        // user_id 와, user_pw 를 가지고, 데이터를 조회 -> 조회 결과가 나오면 로그인
        const sql = "SELECT * FROM users WHERE user_id = ? AND user_pw = ?"

        _mysql.query(sql , [user_id, user_pw] , (err, result) => {
            if(err) {
                // 로그인 실패 
                res.render("mypage");

            } else { 
                // 로그인 성공! 
                console.log(result);    // 콘솔로 확인

                res.render("mypage" , {data : result[0]})
                    // 데이터를 넘겼으니가, mypage 에서 ejs 문법으로 받아야 ⭐⭐⭐⭐⭐ 

                    // [앞으로 추가하게 되는 것]
                        // 헤더 값으로 쿠키, 세션으로 로그인 유지 시킬 건데, 데이터 베이스 에, 사용자가 있는지, 없는지 보고 
                        // 클라이언트에 로그인 정보로 쿠키 정보 주고, 
                        // 데이터 베이스에 사용자가 있는지 

            }
        })
}) 

// 회원가입 
    app.post('/signup' , (req, res) => {
        const {user_id, user_pw} = req.body;
        console.log(user_id, user_pw);

        // 테이블에 값을 추가         
        const sql = "INSERT INTO users (user_id, user_pw)VALUES(?,?)"
            // 워크 벤치의 column 이고 
            // ? 에 value 가 들어간다 
            // 연결 시켜 놓기 시각적으로 ⭐⭐⭐⭐⭐⭐ 
        _mysql.query(sql, [user_id, user_pw] , (err) => {
            // err 나면, error 내용이 들어오는 객체 

            if(err) {
                res.render("signUpErr");
                    // 에러가 날 경우 
                    // 
            }else {
                // 브라우저 url 을 login 페이지 url 로 변경
                res.redirect("login");
            }
        }) 

        // user_id, user_pw,  이건 컬럼들
        // (?,?,? 이 물음표 부분에, 값이 들어가게 됨 
        // _mysql.query(sql, [ // 여기 뒤에 들어가는 건 value

        // res.send();
    })

// 🔷 워크벤치 켜서, user table 만들기  



// 🔷 게시판 글 등록 페이지 
    app.get('/list', (req, res) => {
        const sql = "SELECT * FROM products";   // 아직, products 를 안 만들었음. 
        _mysql.query( sql, (err, result) => {
            res.render("list" , {data : [{id : 4, name : "sadafa", number : "asdfsafsd", series : "asdfawef"}]) // list 파일을 보여주고, // 글 목록을 가져와서, 넘기고 보여준다/
            // 배열로 한개 씩 담겨 있고, 그게 넘겨진다. 
        })
        // res.render("list" , {data : [{id : 4, name : "sadafa", number : "asdfsafsd", series : "asdfawef"}]) // list 파일을 보여주고, // 글 목록을 가져와서, 넘기고 보여준다/
    })
    // 😥😥😥😥😥😥😥😥😥 안 된다. 
    

// 🔷 게시판 등록 페이지
app.get('/insert' , (res, req) => {
    
    res.render("insert");


})

// insert
app.post('/insert' , (req, res) => {
    const {name, number, series} = req.body;
    const sql = "INSERT INTO products (name, number, series)VALUES(?,?,?)";
    _mysql.query(sql, [name, number, series] , () => {
            // 쿼리 명령어를 날리는데, 
            // 문자열을 전달하는걸 받아서, 
            // 물음표를 다 찾아 -> 첫 번째 물음표에, name 변수에 있는 걸 가져와서 > ? 에 넣는다. (교체)
            res.redirect("/list");

    })

})


// 삭제 
app.get("/delete/:id" , (req, res) => {

    const sql = "DELETE FROM products WHERE id = ?; SET @CNT = 0; UPDATE products SET products.id = @CNT:=@CNT + 1 ; ALTER TABLE products AUTO_INCREMENT = 0;";
        // 삭제 버튼을 누르면 > id 가 7번 인 글을 지워
        // const sql = "DELETE FROM products WHERE id = ?; SET @CNT = 0; UPDATE products SET products.id = @CNT:=@CNT+1; ALTER TABLE products AUTO_INCREMENT = 0;";
        
        // products 의 행에서, ? 에 값을 넣어 줄 거고, 
        // 우리가 넘겨준, id 값, 을 갖고 있는 '행' 을 찾아서, '제거' 한다. 

        // SET 값 수정
            // '@CNT = 0' 구문으로 카운트 0 으로 초기화
            // UPDATE 는 '수정' 
                // products table 안에 있는 id 

            // UPDATE products.id = @CNT:@CNT+1 : products 테이블의 행의 아이디를 다시 갱신 시켜줌. 
            // ALTER TABLE products AUTO_INCREMENT = 0; : AUTO_INCREMENT 속성을 자동으로 1씩 증가 시키는 속성을 0으로 변경
                // 자동으로 증가시키는 포맷 ❓❓❓❓❓❓❓❓❓❓ 

        // CRUD 만 우선 숙련!


        // 삭제 했을 때, id 가 재정렬 될 수 있게 하려면, query 문 가져올 때, 속성 하나 더 추가해줘야 함.

        // ; 
            // 이건 구문이 끝났다는 의미. 이걸 써야 함. 

        // 0으로 초기화 시켜놓고, 업데이트! 
        // @CNT:=@CNT + 1 : 0으로 해놓고 1로! 

        // ALTER TABLE products AUTO_INCREMENT = 0; 
            // 자동으로 증가하는거 0 으로


    _mysql.query(sq , [req.params.id])
        res.redirect("/list");

})

// params 쓰임 
    // delete/:id 
        // url 위에 입력된 id : 파라미터 값
        // ex) delete/2 === req.params = {id : 2} -> id 는 내가 적는 것. 원하는걸 적으면, 원하는 key 값이 됨
            // req.params.id === 1 이 값을 가지고, DB 에 글 조회해서 보여줄 수 있어 ⭐⭐⭐⭐⭐ 
            // 글 목록이 있고 1번글, 2번글, 3번글. 
                // 1번글이 누르면 > 1번글 요청을 보내고 > 1번 ID 를 조회 > 그 글 내용을 보여준다 ⭐⭐⭐⭐⭐  
                // 아이디를 조회해서, 글의 내용을 페이지에 보여줄 수 있다! 
            
            // 삭제 할 때도, 글의 id 활용 
            // ex) id 6 을 넣으면 > 해당 id 를 삭제해줘 라고 보내는 것 

        // 이렇게 하면, params 값을 뽑을 수 있음. 


// 요청 수청
app.post('/edit/:id' , (req, res) => {
    const {name , number, series } = req.body
        // edit.ejs 에서 input 속성으로 id, name, numer, serires 로 썼고, 그래서, 구조배열할당이 가능해짐. 

    const sql = "UPDATE products SET name = ?, number = ?, series = ?, WHERE id = ?";
    
    const id = req.params.id;
    
    _mysql.query(sql , [name, number, series, req.params.id], () => {
        res.redirect("/list");
    }) 
        // 업데이트 해주는 쿼리문
})



// 수정하는 페이지 
    app.get('/edit/:id' , (req, res) => {
        const sql = "SELECT * FROM products WHERE id = ?" // id 로 찾을건데, 그 id 는? 
        const id = req.params.id;
        _mysql.query(sql, [id], (err, result) => {
            // 값 성공 조회의 결과 값이 담김
            res.render("edit" , {data : result[0]})
        })
    })




// 🔷 포트 지정 
    const PORT = 8080;


// 4️⃣ 서버 대기 상태
    app.listen(PORT, () => {
        console.log("서버 열림 🙆‍♂️")
    })


// 🔷 터미널에서 열어보기 
    // npm start 



// 🔷 오늘 
    // CRUD 우선 해보게?

