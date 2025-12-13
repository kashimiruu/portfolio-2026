(async () => {
    // Cursor popper displaying the badges and logos
    const certifications = document.querySelector('#certifications')
    certifications.querySelectorAll('.item').forEach(item => {
        item.popper = document.createElement('img');
        item.popper.src = item.dataset.badge;
        item.popper.style.position = 'fixed';
        item.popper.style.width = "15vmin";
        item.popper.style.background = "white";
        item.popper.style.border = "10px solid white";
        item.popper.style.borderRadius = "5px";

        item.addEventListener('pointerenter', () => {
            document.body.appendChild(item.popper);
        });
        item.addEventListener('mousemove', ({clientX, clientY}) => {
            const offset = 10;
            item.popper.style.top = (clientY + item.popper.offsetHeight + offset > window.innerHeight) ? clientY - item.popper.offsetHeight - offset + "px" : clientY + offset + "px"; 
            item.popper.style.left = (clientX + item.popper.offsetWidth + offset > window.innerWidth) ? clientX - item.popper.offsetWidth - offset + "px" : clientX + offset + "px"; 
        });
        item.addEventListener('pointerleave', () => {
            item.popper.remove();
        });
    });
    
    // fade-out animation
    gsap.fromTo(certifications, {
        opacity: 1,
    },{
        opacity: 0,
        scrollTrigger: {
            trigger: '#footer',
            start: "top center",
            end: "top top",
            scrub: true,
        }
    });
})();