const alt = window.alt;

let hasAccount = false;

function showLogin(isRegistered) {
    hasAccount = isRegistered;
    document.querySelector(`#welcome_msg span[data-isLoggedIn=${hasAccount}]`).classList.remove('d-none');
    if (!hasAccount) {
        document.getElementById('passwordRepeatInputDiv').classList.remove('d-none');
    }
}

function showError(error) {
    document.getElementById('errormsg').innerHTML = error;
    document.getElementById('login-btn').disabled = false;
}

alt.on('Client:Login:IsLoggedIn', showLogin);
alt.on('Client:Login:Error', showError);


document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    const loginBtn = document.getElementById('login-btn');
    if(loginBtn.disabled) return;
    loginBtn.disabled = true;

    const password = document.getElementById('passwordInput').value;
    const passwordRepeat = document.getElementById('passwordRepeatInput').value;

    hasAccount ? 
        alt.emit('Client:Login:Login', password) : 
        alt.emit('Client:Login:Register', password, passwordRepeat);
});