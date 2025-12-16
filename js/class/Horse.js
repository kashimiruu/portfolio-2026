export default class Horse {
    constructor(xCoordinate) {
        this.x = xCoordinate;
        this.duration = 15;
        const list = Object.keys(window.assets.list).filter(key => key !== "ocean_eyes");
        const assetName = list[Math.floor(Math.random() * list.length)];    
        this.asset = (window.assets.type[assetName].includes('image')) ? document.createElement("img") : document.createElement("video");
        Object.assign(this.asset.style, {
            height: "300px",
            width: "auto",
            position: "absolute",
            top: "calc(50% - 150px)",
            left: this.x + "px",
            opacity: "100%",
        });
        this.asset.src = window.assets.get[assetName];
        if (this.asset instanceof HTMLVideoElement) {
            this.asset.autoplay = true;
            this.asset.loop = true;
            this.asset.muted = true;
            this.asset.play();
        }

       //gsap animation
       this.animation = gsap.timeline();
       this.animation.fromTo(this.asset, { 
           left: window.innerWidth,
           transform: "rotateY(0deg)",
       },{
           left: 0,
           ease: "none",
           duration: this.duration,
           transform: "rotateY(180deg)",
           transformOrigin: "center left",
           repeat: -1,
           keyframes: {
               scale: [1, 0.3, 1],
               opacity: [1, 0.3, 1],
               zIndex: [-1, -20, -1],
           },
       });
       this.animation.seek(this.duration * this.x/window.innerWidth);
       this.animation.pause();
    }

    appendTo(parent) {
        parent.appendChild(this.asset)
    }

    pause() {
       this.animation.pause();
    }

    play() {
       this.animation.play();
    }
}
