import Horse from "./class/Horse.js";

( async () => {
    const hero = document.body.querySelector('#hero');
    const wrapper = hero.querySelector('.wrapper');
    const carousel = hero.querySelector('.carousel');
    const header = hero.querySelector('svg');

    // locks the height based on 100dvh with searchbar (for mobile)
    let currentWidth = 0, elHeight = 0;
    async function lockHeight() {
        if (currentWidth != window.innerWidth) {
            Object.assign(wrapper.style, {
                minHeight: "100svh",
                height: "auto",
            });
            Object.assign(carousel.style, {
                minHeight: "100svh",
                height: "auto",
            });
            elHeight = wrapper.offsetHeight;
            currentWidth = window.innerWidth;
            Object.assign(wrapper.style, {
                maxHeight: elHeight + "px",
            });
            Object.assign(carousel.style, {
                maxHeight: elHeight + "px",
            });
        }
    }
    window.addEventListener('resize', lockHeight);
    await lockHeight();

    // plays the timer
    const timer = hero.querySelector('.timer');
    let time = 0;
    const second = 1000, minute = 60000, hour = 3600000;
    setInterval(() => {
        function pad(unit) {
            let num = Math.floor(time/unit);
            time %= unit;
            return num.toString().padStart(2, "0");
        }
        
        const now = time;
        timer.innerHTML = `${pad(hour)}:${pad(minute)}:${pad(second)}`;
        time = now + second;
    }, 1000);

    // fills the carousel
    const COUNTS = Math.floor(window.innerWidth/80);
    let discarded = [];
    for (let i = COUNTS, width = window.innerWidth; i > 0; i-- ){
        
	const horse = new Horse((i/(COUNTS))*width);
	horse.appendTo(carousel);
        horse.play();
    };
    
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=400vh",
            scrub: true,
            pin: true,
        }
    })
    Array.from(carousel.children).forEach((horse) => {
        timeline.fromTo(horse, {
            y: 0,
        }, {
            y: `${80*Math.random()-50}vh`,
            ease: "ease-out",
        }, "<");
    });    
})();