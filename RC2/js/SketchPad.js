var canvas = document.getElementById("drawingCanvas");
var ctx = canvas.getContext("2d");

canvas.width=canvas.offsetWidth;
canvas.height=canvas.offsetHeight;

var painting = false;

canvas.onmousedown = function(e){
    painting = true;
    draw(e);
}

canvas.onmouseup = function(){
    painting = false;
    ctx.beginPath();
}

canvas.onmousemove = function(e){
    if (!painting) return;
    draw(e);
}

function draw(e){
    var rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

var clearButton = document.getElementById('clearButton')

clearButton.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

var saveButton = document.getElementById('saveButton')

saveButton.addEventListener('click', function() {
    var dataUrl = canvas.toDataURL();
        
    let hiddenCanvas = document.createElement('canvas');
    let hiddenCtx = hiddenCanvas.getContext('2d');
    var img = new Image();
    img.onload = function(){
        hiddenCanvas.width = this.width;
        hiddenCanvas.height = this.height;
        hiddenCtx.fillStyle = "white";
        hiddenCtx.fillRect(0,0,this.width,this.height);
        hiddenCtx.drawImage(img,0,0);
        var link = document.createElement('a');
        link.download = 'canvas.png';
        link.href = hiddenCanvas.toDataURL();
        link.click();
    }
    img.src = dataUrl;
});