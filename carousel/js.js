// source slide
const arSlider = [{
        url: "1.jpg",
        title: "Âu Dương Tu",
        subTitle: "Túy ông ý chẳng say vì rượu, say vì đâu núi thảo với non cao."
    },
    {
        url: "2.jpg",
        title: "Lâm Tắc Tử",
        subTitle: "Biển rộng mênh mông lấy chân trời làm bờ, leo lên đỉnh núi ta mới chính là đỉnh cao."
    },
    {
        url: "3.jpg",
        title: "Cao Tiệm Ly",
        subTitle: "Gió sầu hiu hắt đưa xuôi, sóng đâu lớp lớp từng nơi lạnh lùng."
    },
    {
        url: "4.jpg",
        title: "Chu Bồi Công",
        subTitle: "Bao giờ được gặp lại người, mượn gió cùng lên động tiếng lòng."
    }
]


//          var 

let counter = 1;
let timeChange = 5000;

//          input slide

const shows = document.getElementById('demo');
const innerFisrtImg = () => {
    n = arSlider.length;
    let fisrtImg = `<img src="${arSlider[n-1].url}" id="lastClone">
                        <div class="captionText">${arSlider[n-1].subTitle}</div>
                        <div class="titleCap">${arSlider[n-1].title}</div>`;
    shows.insertAdjacentHTML("afterbegin", fisrtImg);
    for (let i = 0; i < arSlider.length; i++) {
        let itemImg = ` <img src="${arSlider[i].url}">
                        <div class="captionText">${arSlider[i].subTitle}</div>
                        <div class="titleCap">${arSlider[i].title}</div>`;
        shows.insertAdjacentHTML("beforeend", itemImg);
    }
    let lastImg = ` <img src="${arSlider[0].url}" id="fisrtClone">
                        <div class="captionText">${arSlider[0].subTitle}</div>
                        <div class="titleCap">${arSlider[0].title}</div>`
    shows.insertAdjacentHTML("beforeend", lastImg);

};
innerFisrtImg();

//          array slide

const container = document.querySelector('.container');
const track = document.querySelector(".carousel-slide");
const slides = Array.from(track.getElementsByTagName('img'));
console.log(slides);

//          translate to slide 1

let s = slides[0].clientWidth;
console.log(slides[0]);
console.log(s);
const size = 1000;
track.style.transform = 'translateX(' + (-size * counter) + 'px)';

//          cap-title

const subs = Array.from(track.getElementsByClassName('captionText'));
const titles = Array.from(track.getElementsByClassName('titleCap'));
let textCap = document.querySelector(".sub-container .textSub");
let titleCap = document.querySelector(".title-container .textTitle");
titleCap.innerText = titles[counter].innerText;
textCap.innerText = subs[counter].innerText;

//          button left- right

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

//          creat dots element

const nav = document.querySelector(".nav");
const dots = Array.from(nav.children);
const innerDot = () => {

    for (let i = 0; i < slides.length - 2; i++) {
        let dot = document.createElement("button");
        dot.classList.add("dots");
        nav.append(dot);
        dots.push(dot);
    }
    dots[0].classList.add("current");
}
innerDot();



//          function

const moveToSlide = (counter) => {
    track.style.transform = 'translateX(' + (-size * counter) + 'px)';
}

nextBtn.addEventListener('click', () => {
    if (counter >= slides.length - 1) {
        return
    }
    track.style.transition = 'transform 1s ease-in-out';
    counter++;
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('current')
    }
    if (counter > dots.length) {
        dots[0].classList.add('current');
    } else {
        dots[counter - 1].classList.add('current');
    }
    titleCap.innerText = titles[counter].innerText;
    textCap.innerText = subs[counter].innerText;
    moveToSlide(counter);
});

prevBtn.addEventListener('click', () => {
    if (counter <= 0) {
        return
    }
    track.style.transition = 'transform 1s ease-in-out';
    counter--;
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('current')
    }
    textCap.innerText = subs[counter].innerText;
    if (counter <= 0) {
        dots[dots.length - 1].classList.add('current');
    } else if (counter > dots.length) {
        dots[counter - 1].classList.add('current');
    } else {
        dots[counter - 1].classList.add('current');
    }
    titleCap.innerText = titles[counter].innerText;
    textCap.innerText = subs[counter].innerText;
    moveToSlide(counter);


});

track.addEventListener("transitionend", () => {
    if (slides[counter].id === "lastClone") {
        track.style.transition = "none";
        counter = slides.length - 2;
        moveToSlide(counter);
    }
    if (slides[counter].id === "fisrtClone") {
        track.style.transition = "none";
        counter = slides.length - counter;
        moveToSlide(counter);
    }

});

nav.addEventListener('click', a => {
    const targetDot = a.target.closest('button');
    if (!targetDot) return;
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    counter = targetIndex + 1;
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('current')

    }

    dots[targetIndex].classList.add('current');
    track.style.transition = "transform 1s ease-in";
    titleCap.innerText = titles[counter].innerText;
    textCap.innerText = subs[counter].innerText;
    moveToSlide(counter);

});

//          auto play

const autoPlay = () => {
    if (counter >= slides.length - 1) {
        return
    }
    track.style.transition = 'transform 1s ease-in-out';
    counter++;
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('current')
    }
    if (counter > dots.length) {
        dots[0].classList.add('current');
    } else {
        dots[counter - 1].classList.add('current');
    }
    titleCap.innerText = titles[counter].innerText;
    textCap.innerText = subs[counter].innerText;
    moveToSlide(counter);

}

let timer;
const setTimer = () => {
    timer = setInterval(() => {
        autoPlay();
    }, timeChange);
}
const clearTimer = () => {
    clearInterval(timer);
}
setTimer();
container.addEventListener('mouseout', () => {
    setTimer();
})
container.addEventListener('mouseover', () => {
    clearTimer();
});