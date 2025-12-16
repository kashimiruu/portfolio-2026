import Assets from "./class/Assets.js";

(async () => {
    window.assets = new Assets();
    await assets.set("ocean_eyes", "./vid/ocean-eyes_yt.mp4");
    await assets.set("design_thinking", "./vid/design-thinking_yt.mp4");
    await assets.set("intro", "./vid/intro_yt.mp4");
    await assets.set("tamframe", "./vid/tamframe_yt.mp4");
    await assets.set("ticap", "./vid/ticap_yt.mp4");
    await assets.set("saint", "./img/all-saints-day.png");
    await assets.set("debbie", "./img/birthday_debbie.png");
    await assets.set("jabez", "./img/birthday_jabez.png");
    await assets.set("miting", "./img/miting-de-avance.png");
    await assets.set("paraverse", "./img/paraverse.png");
    await assets.set("welcome", "./img/welcome-celeb_banner.png");
    window.assetsLoaded = true;
})();