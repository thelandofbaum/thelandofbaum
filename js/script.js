const backgroundImage = document.querySelector(".backgroundImage");
const backgroundList = ["background0.jpg", "background1.jpg", "background2.png", "background3.jpg", "background4.png", "background5.png", "background6.jpg"];
const pageWidth = document.querySelector(".width");
const pageHeight = document.querySelector(".height");

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