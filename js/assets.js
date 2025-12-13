import Assets from "./class/Assets.js";

(async () => {
    window.assets = new Assets();
    await assets.set("ocean_eyes", "./vid/ocean-eyes_yt.mp4");
    await assets.set("design_thinking", "./vid/design-thinking_yt.mp4");
    await assets.set("intro", "./vid/intro_yt.mp4");
    await assets.set("tamframe", "./vid/tamframe_yt.mp4");
    await assets.set("ticap", "./vid/ticap_yt.mp4");
    window.assetsLoaded = true;
})();
