(async () => {
    const about = document.body.querySelector('#about');
    const strong = about.querySelector('b');
    const star = strong.innerHTML;   
 
    strong.innerHTML = "";
    star.split('').forEach((char) => {
	const rock = document.createElement('div');
        Object.assign(rock.style, {
            display: "inline",
            position: "relative",
        });
        rock.innerHTML = char;
        strong.appendChild(rock);

        const frag = document.createElement('div');
        Object.assign(frag.style, {
            display: "inline",
        });
        frag.innerHTML = char;
        rock.appendChild(frag);
    });
})();