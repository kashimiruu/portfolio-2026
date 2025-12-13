(async() => {
    window.importJS = (src) => {
        return new Promise((resolve, reject) => {
            const js = document.createElement('script');
            document.head.appendChild(js);
            js.src = src;
            js.onload = resolve;
            js.onerror = reject;
        });
    }

    const plugins = {
        ScrollTrigger: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js",
        DrawSVGPlugin: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/DrawSVGPlugin.min.js",
    }
    const gsapHasLoaded = await importJS("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js");

    if (!gsapHasLoaded) throw new Error("GSAP hasn't loaded");
    for (const plugin in plugins) {
        const loaded = await importJS(plugins[plugin]);
        if (!loaded) throw new Error(plugin + " hasn't loaded");
        if (window[plugin]) gsap.registerPlugin(window[plugin])
        else throw new Erorr (plugin + " isn't attached");
    }
    window.gsap = gsap;
    window.gsapPlugins = true;
})();