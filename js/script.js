// import "./hero.js";

(async () => {
    window.importJS = (src) => {
        return new Promise((resolve, reject) => {
            const js = document.createElement('script');
            document.head.appendChild(js);
            js.src = src;
            js.onload = resolve;
            js.onerror = reject;
        });
    }

    const gsapHasLoaded = await importJS("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js");
    const scrollTriggerHasLoaded =  await importJS("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js");
    const drawSVGHasLoaded = await importJS("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/DrawSVGPlugin.min.js");

    if (!gsapHasLoaded) {
        console.error("GSAP hasn't loaded");
    } else {
        if (!scrollTriggerHasLoaded) 
            console.error("Scroll Trigger Plugin hasn't loaded");
        else if (!drawSVGHasLoaded) 
            console.error("Draw SVG Plugin hasn't loaded.");
        else 
            window.gsap = gsap;
            gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
    }

    await import("./gallery.js");
    await import("./certs.js");
    await import("./footer.js");

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(async (entry) => {
            entry.target.muted = true;
            entry.target.autoplay= true;
            entry.target.playsInline= true;
            entry.target.loop = true;
            if (entry.isIntersecting) {
                entry.target.play()?.catch(() => {}); // catch() is to ignore errors when autoplay is blocked
            } else {
                entry.target.pause();
            }
        });
    });
    document.querySelectorAll('video').forEach(video => { videoObserver.observe(video)});
})();