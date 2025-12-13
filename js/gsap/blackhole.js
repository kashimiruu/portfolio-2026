(async () => {
    function generateStarPointsArray(points, inner = 100, outer = 120) {
        const angle = Math.PI / points;
        const coords = [];

        for (let i = 0; i < 2 * points; i++) {
            const r = i % 2 === 0 ? outer : inner;
            const a = i * angle;
            const x = 50 + r * Math.cos(a);
            const y = 50 + r * Math.sin(a);
            coords.push({ x, y });
        }
        return coords;
    }

    const hero = document.querySelector('#hero');

    // star-mask
    let starPoints = generateStarPointsArray(100);
    function updateStarClip(pointsArray) {
        const clip = pointsArray.map(p => `${p.x}% ${p.y}%`).join(", ");
        hero.style.setProperty('--star', clip);
        hero.querySelector('.star-mask').style.clipPath = `polygon(${clip})`; // update blurred mask
    }
    updateStarClip(starPoints);
    // single render ticker (much smoother than many onUpdate calls)
    const render = () => updateStarClip(starPoints);
    gsap.ticker.add(render);
    starPoints.forEach((point, i) => {
        const duration = 0.8 + Math.random() * 1.2;

        gsap.to(point, {
            x: 50,
            y: 50,
            duration,
            delay: Math.random() * 0.8,
            ease: "power3.inOut"
        });
    });
    // stop rendering after animation ends
    gsap.delayedCall(2.5, () => {
        gsap.ticker.remove(render);
    });


    // vignette
    gsap.fromTo('#hero .vignette', {
        background: "radial-gradient(circle at 50% 50%, rgba(34,36,38,0) 0%, rgba(34,36,38,1) 150%)", // fade in the vignette
    },{
        duration: 3,
        background: "radial-gradient(circle at 50% 50%, rgba(34,36,38,0) 0%, rgba(34,36,38,1) 0%)", // fade in the vignette
    });

    // sucked-in
    hero.querySelectorAll(".arcade-container").forEach(arcade => {
        gsap.fromTo(arcade, {
            scale: 1,
            transform: "rotate(0deg)",
            transformOrigin: "center right",
        }, {
            duration: 2,
            scale: 0.01,
            transform: `rotate(${90}deg)`,
        });
    });
})();