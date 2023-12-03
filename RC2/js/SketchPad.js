var canvas = document.getElementById("drawingCanvas");
var ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

var painting = false;
var brushColor = '#000000'; // Default brush color is black
var brushSize = 5; // Default brush size

function updateBrushSize(newSize) {
    brushSize = newSize;
    ctx.lineWidth = brushSize;
}

canvas.addEventListener('mousedown', function(e){
    painting = true;
    draw(e);
});

canvas.addEventListener('mouseup', function(){
    painting = false;
    ctx.beginPath();
});

canvas.addEventListener('mousemove', function(e){
    if (painting) {
        draw(e);
    }
});

function draw(e){
    if (!painting) return;
    var rect = canvas.getBoundingClientRect();
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

var clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

var saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', function() {
    var dataUrl = canvas.toDataURL("image/png");
    var img = new Image();
    img.onload = function(){
        var hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.width = this.naturalWidth;
        hiddenCanvas.height = this.naturalHeight;
        var hiddenCtx = hiddenCanvas.getContext('2d');
        hiddenCtx.fillStyle = 'white';
        hiddenCtx.fillRect(0, 0, hiddenCanvas.width, hiddenCanvas.height);
        hiddenCtx.drawImage(img, 0, 0);
        var link = document.createElement('a');
        link.download = 'sketchpad.png';
        link.href = hiddenCanvas.toDataURL("image/png");
        link.click();
    };
    img.src = dataUrl;
});

var colorPicker = document.getElementById('colorPicker');
colorPicker.value = brushColor;
colorPicker.addEventListener('change', function(e) {
    brushColor = e.target.value;
});

// Brush size buttons
var brushIncreaseButton = document.getElementById('brushIncrease');
var brushDecreaseButton = document.getElementById('brushDecrease');

brushIncreaseButton.addEventListener('click', function() {
    updateBrushSize(Math.min(50, brushSize + 1));
});

brushDecreaseButton.addEventListener('click', function() {
    updateBrushSize(Math.max(1, brushSize - 1));
});