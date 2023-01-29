async function handleLogin(e)
{
    e.preventDefault();
    const userName = e.target.userName.value;
    const password = document.getElementById('password').value;
    const res = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: userName,
            password: password
        })
    });
    const data = await res.json();
    if (res.status === 200) {
        window.location.href = '/'
    }
    else {
        if(data.errorMessage)
        {
            document.getElementById('error-message').innerHTML = data.errorMessage;
        }
    }
}


async function handleSignUp(e)
{
    e.preventDefault();
    const userName = e.target.userName.value;
    const password = e.target.password.value;
    const res = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: userName,
            password: password
        })
    });
    console.log(res);
    const data = await res.json();
    if (res.status === 201) {
        window.location.href = '/login'
    }
    else {
        if(data.errorMessage)
        {
            document.getElementById('error-message').innerHTML = data.errorMessage;
        }
    }
}

async function postLogout(e)
{
    e.preventDefault();
    const res = await fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(res);
    if (res.status === 200) {
        window.location.href = '/'
    }
}