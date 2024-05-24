const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');

let img = new Image();
img.src = 'C:/Users/israe/OneDrive/Pictures/Melanoma/1.jpeg';
img.onload = function() {
    drawImage(img, 0, 0, canvas.width, canvas.height);
};

let zoom = 1;
let offsetX = 0;
let offsetY = 0;

function drawImage(img, x, y, width, height) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, width, height);
}

function zoomImage() {
    zoom = zoomRange.value;
    drawImage(img, -offsetX, -offsetY, img.width * zoom, img.height * zoom);
}


const panLeftXInput = document.getElementById('panLeftX');
const panUpYInput = document.getElementById('panUpY');

function panLeftX(event) {
    offsetX = (parseFloat(event.target.value) - 50) * (img.width * zoom) / 100;
    drawImage(img, -offsetX, -offsetY, img.width * zoom, img.height * zoom);
}

function panUpY(event) {
    offsetY = (parseFloat(event.target.value) - 50) * (img.height * zoom) / 100;
    drawImage(img, -offsetX, -offsetY, img.width * zoom, img.height * zoom);
}