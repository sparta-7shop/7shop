console.clear();

const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');

loginBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode.parentNode;
    Array.from(e.target.parentNode.parentNode.classList).find((element) => {
        if (element !== 'slide-up') {
            parent.classList.add('slide-up');
        } else {
            signupBtn.parentNode.classList.add('slide-up');
            parent.classList.remove('slide-up');
        }
    });
});

signupBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode;
    Array.from(e.target.parentNode.classList).find((element) => {
        if (element !== 'slide-up') {
            parent.classList.add('slide-up');
        } else {
            loginBtn.parentNode.parentNode.classList.add('slide-up');
            parent.classList.remove('slide-up');
        }
    });
});

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    axios
        .post('http://localhost:3000/users/login',
            { email: email, password: password }
        )
        .then((res) => {
            // 응답처리
            alert(res.data.message)
            window.location.href = "/"
        })
        .catch((error) => {
            // 예외처리
            alert(error.response?.data?.message || error.response.data.errorMessage.details[0].message);
        });
}

function sendMail() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email_signup').value;
    console.log(name,email);
       axios
        .post('http://localhost:3000/users/sendMail',
            { name: name, email: email }
        )
        .then((res) => {
            // 응답처리
            alert(res.data.message)
        })
        .catch((error) => {
            // 예외처리
            alert(error.response?.data?.message);
        });
}

function signup() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email_signup').value;
    const CN = document.getElementById('CN').value;
    const password = document.getElementById('password_signup').value;
    const confirmPw = document.getElementById('confirmPw').value;
    const phone = document.getElementById('phone').value;

    axios
        .post('http://localhost:3000/users/signup',
            { name: name, email: email, emailConfirm: CN, password: password, passwordConfirm: confirmPw, phone: phone }
        )
        .then((res) => {
            // 응답처리
            alert(res.data.message)
            window.location.href = "/"
        })
        .catch((error) => {
            // 예외처리
            alert(error.response?.data?.message);
        });
}
