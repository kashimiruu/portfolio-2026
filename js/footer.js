(async () => {
    function addDepth(div, depth) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('3d-wrapper');
        wrapper.style.position = "relative";
        div.parentElement.appendChild(wrapper);
        wrapper.appendChild(div);
        for (let i = 1; i <= depth; i++) {
            const clone = div.cloneNode(true);
            clone.style.position = "absolute";
            clone.style.top = 0;
            clone.style.left = 0;
            clone.style.transform = `translateZ(${-i}px)`;
            clone.style.filter = "brightness(40%)";
            wrapper.appendChild(clone);
        }
        return wrapper;
    }

    const wrapper = addDepth(document.querySelector('#footer .header'), 36);
    // wrapper.style.transform = "rotateX(45deg)";
    wrapper.style.transformStyle = "preserve-3d";

    const footer = document.querySelector('#footer');
    const maxTiltMouse = 45;
    const maxTiltGyro = 30;

    const monitor = document.createElement('div');
    monitor.style.position = "fixed";
    monitor.style.top = 0;
    monitor.style.right = 0;
    document.body.appendChild(monitor);

    function clamp(num) {
        return Math.max(-1, Math.min(1, num));
    }

    function handleMouseMove(e) {
        const midX = window.innerWidth / 2;
        const midY = window.innerHeight / 2;
        const x = clamp((e.clientX - midX) / midX) * maxTiltMouse;
        const y = clamp((e.clientY - midY) / midY) * maxTiltMouse;
        wrapper.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
    }

    function handleGyro(e) {
        const x = clamp(e.gamma / 45) * maxTiltGyro - 30;
        const y = clamp(e.beta / 45) * maxTiltGyro + 2;
        wrapper.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
        monitor.innerHTML = `y: ${e.beta}deg, x:${e.gamma}deg <br>cx: ${clamp(e.gamma / 45)}, cy: ${clamp(e.beta / 45)} <br>tx: ${x}, ty: ${y}`;
    }

    const footerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.addEventListener('mousemove', handleMouseMove);
                window.addEventListener('deviceorientation', handleGyro);
            } else {
                footer.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('deviceorientation', handleGyro);
            }
        });
    });
    footerObserver.observe(footer);

})();
