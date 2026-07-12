const API_BASE = "https://carpool-0c58.onrender.com/api";

function toggleForm(){
    const login = document.getElementById("login");
    const register = document.getElementById("register");
}

function message(text,isError = false){
    const msg = document.getElementById("message");
}

async function register() {
    const name = document.getElementById("regName").value ; 
    const email = document.getElementById("regEmail").value ; 
    const password = document.getElementById("regPassword").value ; 
    if(!name || !email || !password){
        return message("Please fill all fields", true );
    }

    try {
        const res = await fetch (`${API_BASE}/auth/register`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            credentials:"include",
            body:JSON.stringify({name , email , password})
        });
        console.log(res.status);
        const data = await res.json();
        console.log(data)
        if(!res.ok) return message(data.message || "Registration failed" ,true );
        setTimeout(() => { window.location.href = "index.html"; }, 1000);
    }catch(err){
        message("Network error" + err.message,true);
    }
}

async function login() { 
    const email = document.getElementById("loginEmail").value ; 
    const password = document.getElementById("loginPassword").value ; 
    if( !email || !password){
        return message("Please fill all fields", true );
    }

    try {
        const res = await fetch (`${API_BASE}/auth/login`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            credentials:"include",
            body:JSON.stringify({ email , password})
        });
        const data = await res.json();
        if(!res.ok) return message(data.message || "Login failed" ,true );
        localStorage.setItem("userEmail", email);
        window.location.href = "trips.html";
    }catch(err){
        message("Network error" + err.message,true);
    }
}

