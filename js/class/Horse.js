export default class Horse {
	constructor(xCoordinate) {
	  this.duration = 5;
    const assets = Object.keys(window.assets.list).filter(key => key !== "ocean_eyes");
    const assetName = assets[Math.floor(Math.random() * assets.length)];
    console.log(assetName);
    this.asset = (window.assets.type[assetName].includes('image')) ? document.createElement("img") : document.createElement("video");
    Object.assign(this.asset.style, {
          height: "100%",
          width: "auto",
          position: "absolute",
          top: 0,
          left: xCoordinate + "px",
        opacity: "30%",
    });
    this.asset.src = window.assets.get[assetName];
    if (this.asset instanceof HTMLVideoElement) {
          this.asset.autoplay = true;
          this.asset.loop = true;
        this.asset.muted = true;
          this.asset.play();
    }

	}

    appendTo(parent) {
        parent.appendChild(this.asset)
    }

    play() {
        // walk
        const firstRun = this.duration*this.asset.offsetLeft/this.asset.parentElement.offsetWidth;
        this.tween = gsap.to(this.asset, {
            duration: firstRun,
            x: "-" + this.asset.offsetLeft + "px",
        });
        setTimeout(() => {
            this.playState = setInterval(
            this.tween.kill();
            this.tween = gsap.from(this.asset, {
                duration: this.duration,
                x: this.asset.parentElement.offsetWidth + "px",
            });
        }, firstRun * 1000);
        console.log("-" + this.asset.offsetLeft + "px");
    }
}
