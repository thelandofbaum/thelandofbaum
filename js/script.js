const backgroundImage = document.querySelector(".backgroundImage");
const backgroundList = ["background0.jpg", "background1.jpg", "background2.png", "background3.jpg", "background4.png", "background5.png", "background6.jpg"];
const pageWidth = document.querySelector(".width");
const pageHeight = document.querySelector(".height");
const serverStatus = document.querySelector(".serverStatus");
const serverName = "torch.serv.nu";
const copied = document.querySelector(".copied");

pageWidth.innerHTML = window.innerWidth;
pageHeight.innerHTML = window.innerHeight;

const setWidthHeight = (event) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    pageWidth.innerHTML = windowWidth;
    pageHeight.innerHTML = windowHeight;
};

window.addEventListener("resize", setWidthHeight);

let backgroundIteration = 0;
const backgroundSlide = () => {
    backgroundImage.style.backgroundImage = `url("img/${backgroundList[backgroundIteration]}")`;
    backgroundIteration++;

    if (backgroundIteration == backgroundList.length) {
        backgroundIteration = 0;
    };
};

setInterval(backgroundSlide, 5000);

const getServerStatus = () => {
    fetch("https://api.mcsrvstat.us/2/torch.serv.nu")
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (data.online == true) {
                return (
                    serverStatus.innerHTML = `
        <div class="statusOnline">Status: Online!</div>
        <div class="serverUrl" value="${serverName}">Server: ${serverName}</div>
        <div class="players">Players: ${data.players.online}/${data.players.max}</div>
        <div class="version">Version: ${data.version}</div>
      `)
            } else {
                return (serverStatus.innerHTML = `
        <div class="statusOffline">Status: Offline!</div>
        <div class="serverUrl" value="${serverName}">Server: ${serverName}</div>
        <div class="players">Players: N/A</div>
        <div class="version">Version: N/A</div>
        `)
            };
        })
        .catch(error => console.log(error))
};

getServerStatus();
setInterval(getServerStatus, 120000);

const copyToClipBoard = (str) => {
    const textarea = document.createElement('textarea');
    textarea.value = str;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
};

const copyServerName = event => {
    copyToClipBoard(serverName);
    copied.style.visibility = "visible";
    setTimeout(() => copied.style.visibility = "hidden", 3000);
};

serverStatus.addEventListener("click", copyServerName);
