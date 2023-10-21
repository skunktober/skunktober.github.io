fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(data =>
        fetch('http://api.weatherapi.com/v1/current.json?key=92aedc7941c44d7ac73300848cdd1ade&q=' + data.ip)
    )
    .then(res => res.json())
    .then(data => {
        document.querySelector('#weather_img').src = data.current.condition.icon;
        document.querySelector('#date').textContent = new Date().toLocaleDateString();
        document.querySelector('#temperature').textContent = `${data.current.temp_c} °C`;
    })
    .catch(err => console.log(err));