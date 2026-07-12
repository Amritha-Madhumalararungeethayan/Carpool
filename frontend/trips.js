const API_BASE = "http://localhost:5000/api";

document.addEventListener("DOMContentLoaded",()=>{
    const email = localStorage.getItem("userEmail");
    document.getElementById("userInfo").textContent = email ? `Logged in as ${email}` : "";
    loadTrips(); 
});

function message(text,isError = false){
    const msg = document.getElementById("message");
    msg.textContent = text ; 
    msg.style.color = isError ? "red" : "green";
}

async function logout() {
    try {
        await fetch (`${API_BASE}/auth/logout`,{
            method :"POST",
            credentials:"include"
        });

    }   
    catch(err){
        console.error("Logout error:" , err);
    }
    finally{
        localStorage.removeItem("userEmail");
        window.location.href = "index.html";
    } 
}


async function createTrip(){
    const name = document.getElementById("tripName").value ;
    const from = document.getElementById("tripFrom").value ; 
    const to = document.getElementById("tripTo").value ; 
    const time = document.getElementById("tripTime").value ; 
    const total = document.getElementById("tripSeats").value ; 
    const cost = document.getElementById("tripCost").value ; 
    const notes = document.getElementById("tripNotes").value ; 

    if(!name || !from || !to || !time || !total){
        return message("PLease fill name , from to time and seats",true );
    }

    try {
        const res = await fetch (`${API_BASE}/trips`,{
            method :"POST",
            credentials:"include",
            headers:{"Content-Type":"application/json"},
            body : JSON.stringify({
                name,
                from , 
                to , 
                time : new Date(time).toISOString(),
                total :Number(total),
                cost : cost ? Number(cost) :undefined,
                notes
            })
        })

        const data = await res.json() ;
        if(!res.ok)return message(data.message || "failed to make trip",true);


        message("The trip has been successfully created ");
    document.getElementById("tripName").value ="" ;
    document.getElementById("tripFrom").value =""; 
    document.getElementById("tripTo").value ="" ; 
    document.getElementById("tripTime").value ="" ; 
    document.getElementById("tripSeats").value ="" ; 
    document.getElementById("tripCost").value =""; 
    document.getElementById("tripNotes").value ="" ; 
    loadTrips() ; 

    }catch(err){
        message(err.message,true);
    }

}


async function loadTrips() {
    const list = document.getElementById("tripsList");
    list.innerHTML = "Loading ";
    try {
        const res = await fetch(`${API_BASE}/trips`,{credentials:"include"});
        const data = await res.json() ; 

        if(!res.ok){
            list.innerHTML = "COuld not load the trips";
            return ; 
        }
        if(!data.trips.length){list.innerHTML = "No trips found right now ";
            return ; 

        }

        list.innerHTML = data.trips.map(trip=> `
            <div class = "Tripcard">
                <h3>${trip.name}</h3>
                <p>${trip.from} --- ${trip.to}</p>
                <p>${new Date(trip.time).toLocaleString()}</p>
                <p>Seats available: ${trip.available}</p>
                ${trip.cost ? `<p>Cost per seat: ${trip.cost}</p>` : ""}
                ${trip.notes ? `<p>${trip.notes}</p>` : ""}
                <p>Posted by: ${trip.user?.name || "Unknown"}</p>
                <div id = "buttons">
                <button onclick="joinTrip('${trip._id}')">Join</button>
                <button onclick="leaveTrip('${trip._id}')">Leave</button>
                </div>




            </div>`).join("");

        
    }catch(err){
        list.innerText = err.message;
    }
}

async function joinTrip(id) {
    try {
        const res = await fetch(`${API_BASE}/trips/${id}/join`,{method : "POST" ,credentials:"include"});
        const data = await res.json() ; 
        alert(data.message);
        loadTrips() ; 
    }catch(err){
        alert(err.message);
    }
}

async function leaveTrip(id) {
    try {
        const res = await fetch(`${API_BASE}/trips/${id}/leave`,{method : "POST" ,credentials:"include"});
        const data = await res.json() ; 
        alert(data.message);
        loadTrips() ; 
    }catch(err){
        alert(err.message);
    }
}


