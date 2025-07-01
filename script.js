let inp = document.querySelector("#qrText");
let parent = document.querySelector(".genqr");
let text  = document.querySelector("#text");
const timerElement = document.getElementById('timer');
async function fetchPost(qr) {
    try {
        let data = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qr}`);
        console.log("Fetched Data:", data);
        const newElem = document.createElement("div")
        newElem.classList.add("qrCode");
        text.innerHTML = `Your Content is "${qr}"`;
        newElem.style.backgroundImage =  `url(${data.url})`;
        parent.appendChild(newElem);
    } catch (error) {
        console.log("Error:", error);
    }
}
let inputData='';
document.querySelector("#button").addEventListener("click",(e)=>{
    e.preventDefault();
    if(inp.value!==''){
        let inputData = inp.value;
        fetchPost(inputData);
        inp.value='';
        let timeLeft = 11;
        const countdown = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Scan Your QR in ${timeLeft} Seconds`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerElement.textContent = "Time's up!";
        }
    }, 1000);
    setInterval(() => {
        location.reload();
    }, 12000);
    }
    else{
        alert("Enter Something In Text Area")
    }
})

