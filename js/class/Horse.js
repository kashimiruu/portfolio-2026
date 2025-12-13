export default class Horse {
	constructor(xCoordinate): {
	  const duration = 5;
    const assets = Object.keys(window.assets.list).filter(key => key !== "ocean_eyes");
    const assetName = assets[Math.floor(Math.random() * assets.length)];
    console.log(assetName);
    const asset = (window.assets.type[assetName].includes('image')) ? document.createElement("img") : document.createElement("video");
    Object.assign(asset.style, {
          height: "100%",
          width: "auto",
          position: "absolute",
          top: 0,
          left: xCoordinate + "px",
        opacity: "30%",
    });
    asset.src = window.assets.get[assetName];
    if (asset instanceof HTMLVideoElement) {
          asset.autoplay = true;
          asset.loop = true;
        asset.muted = true;
          asset.play();
    }

	}
}
