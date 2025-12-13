import Horse from "./class/Horse.js";

( async () => {
    const hero = document.body.querySelector('#hero');
    const wrapper = hero.querySelector('.wrapper');
    const carousel = hero.querySelector('.carousel');

    // locks the height based on 100dvh with searchbar (for mobile)
    let currentWidth = 0, elHeight = 0;
    async function lockHeight() {
        if (currentWidth != window.innerWidth) {
            Object.assign(wrapper.style, {
                minHeight: "100svh",
                height: "auto",
            });
            elHeight = wrapper.offsetHeight;
            currentWidth = window.innerWidth;
            Object.assign(wrapper.style, {
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
    
    // adds video
    const background = hero.querySelector('video');
    background.playbackRate = 0.3;
    background.src = assets.get[background.dataset.badge];

    // fills the carousel
    for (let i = 20, max = 20, width = window.innerWidth; i > 0; i-- ){
	const horse = new Horse((i/(max+1.0))*width);
	horse.appendTo(carousel);
        horse.play();
    };
    
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=200vh",
            scrub: true,
            pin: true,
        }
    })

    timeline.fromTo(wrapper, {
        // scale: 1,
        opacity: 1,
        position: "absolute",
        minHeight: elHeight + "px",
        width: window.innerWidth + "px",
        transform: "translate(0,0)",
        borderRadius: 0,
    }, {
        // scale: 0.4,
        opacity: 0,
        position: "absolute",
        width: 0.4*window.innerWidth,
        minHeight: 0.4*window.innerWidth*1080/1920 + "px",
        bottom: window.innerHeight/2,
        left: window.innerWidth/2,
        transform: "translate(-50%, -50%)",
        borderRadius: "15px",
        ease: "ease-in",
    })
})();