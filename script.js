const container = document.querySelector(".container")
const prompt = document.querySelector("#prompt");
const btn = document.querySelector("#btn")
const chatCointainer = document.querySelector(".chat-container")
let userMessage = null;
let ApiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAVUaiRcv9Pu1CKmgLuJ3VvwFLjK_o2odc"




const createChatBox = (html, className) => {
    let div = document.createElement("div");
    div.classList.add(className);
    div.innerHTML = html;
    return div
}

// use google Api 

async function getApiResponse(AiChatBox) {
    let textElement = AiChatBox.querySelector(".text")
    try {
        let response = await fetch(ApiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ "parts": [{ text: userMessage }] }] })
        })
        let data = await response.json();

        let ApiResponse = data?.candidates[0].content.parts[0].text;
        textElement.innerText = ApiResponse;
    }
    catch (error) {
        console.log(error)
    }

    finally {
        AiChatBox.querySelector(".loading").style.display = "none"
    }
}

// showLoading function


const showLoading = () => {
    let html = `    <div class="img">
                <img src="img/ChatAi.png" alt="" width="50px">
            </div>
            <p class="text"></p>
            <img src="img/LoadingChat.gif" class="loading" alt="loading" height="50">
        </div>`
    let AiChatBox = createChatBox(html, "ai-chat-box");
    chatCointainer.appendChild(AiChatBox)

    getApiResponse(AiChatBox)

}





btn.addEventListener("click", () => {
    userMessage = prompt.value;
    if (userMessage === "") {
        container.style.display = "flex";
    } else {

        container.style.display = "none";
    }


    if (!userMessage) return;
    let html = `<div class="img">
               <img src="img/userimg.png" alt="" width="50px">  
            </div>
            <p class ="text"></p>`

    let userChatBox = createChatBox(html, "user-chat-box");
    userChatBox.querySelector(".text").innerText = userMessage;
    chatCointainer.appendChild(userChatBox)
    prompt.value = "";
    setTimeout(showLoading, 500)


})