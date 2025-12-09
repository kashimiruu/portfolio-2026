( async () => {
    const timer = document.body.querySelector('.timer');

    let time = 0;
    const second = 1000, minute = 60000, hour = 3600000;
    setInterval(() => {
        function pad(unit) {
            let num = Math.floor(time/unit);
            time %= unit;
            return num.toString().padStart(2, "0");
        }
        
        const now = time;
        timer.innerHTML = `${pad(hour)}:${pad(minute)}:${pad(second)}`;
        time = now + second;
    }, 1000);
    console.log("hero");
})();