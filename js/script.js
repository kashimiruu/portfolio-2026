(async () => {
    await import("./gsap.js");
    await import("./assets.js");
    const imports = setInterval( async () => {
        if (window.gsap && window.gsapPlugins && window.assetsLoaded) {
            await import("./hero.js");
            await import("./about.js");
            await import("./gallery.js");
            await import("./certs.js");
            await import("./footer.js");
            clearInterval(imports);
            main();
        }
    }, 1023);
    
    async function main() {
        // play and pause the videos when in-view and out-view
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(async (entry) => {
                entry.target.src = window.assets.get[entry.target.dataset.badge];
                entry.target.muted = true;
                entry.target.autoplay = true;
                entry.target.playsInline = true;
                entry.target.loop = true;
                if (entry.isIntersecting) {
                    entry.target.play()?.catch(() => {}); // catch() is to ignore errors when autoplay is blocked
                } else {
                    entry.target.pause();
                }
            });
        });
        document.querySelectorAll('video').forEach(video => { videoObserver.observe(video)});
    }
        
})();