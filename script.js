document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const drawButton = document.getElementById('draw-btn');
    const clearButton = document.getElementById('clear-btn');
    const zoomInButton = document.getElementById('zoom-in-btn');
    const zoomOutButton = document.getElementById('zoom-out-btn');
    const algorithmSelect = document.getElementById('algorithm-select');

    const x0Input = document.getElementById('x0');
    const y0Input = document.getElementById('y0');
    const x1Input = document.getElementById('x1');
    const y1Input = document.getElementById('y1');

    let zoomLevel = 10;
    const minZoom = 1;
    const maxZoom = 100;

    const width = canvas.width;
    const height = canvas.height;

    let centerX = width / 2;
    let centerY = height / 2;

    function drawPixel(x, y) {
        ctx.fillStyle = '#000';
        ctx.fillRect(x * zoomLevel + centerX, -y * zoomLevel + centerY, zoomLevel, zoomLevel);
    }

    function drawAxes() {
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.strokeStyle = '#000';
        ctx.stroke();

        ctx.font = "16px Arial";
        ctx.fillText("X", width - 30, centerY - 10);
        ctx.fillText("Y", centerX + 10, 30);

        ctx.fillText("0", centerX + 5, centerY - 5);

        for (let x = centerX + zoomLevel * 10; x < width; x += zoomLevel * 10) {
            ctx.fillText(Math.floor((x - centerX) / zoomLevel), x + 10, centerY + 20);
        }

        for (let x = centerX - zoomLevel * 10; x > 0; x -= zoomLevel * 10) {
            ctx.fillText(Math.floor((x - centerX) / zoomLevel), x - 20, centerY + 20);
        }

        for (let y = centerY + zoomLevel * 10; y < height; y += zoomLevel * 10) {
            ctx.fillText(Math.floor((centerY - y) / zoomLevel), centerX + 10, y + 10);
        }

        for (let y = centerY - zoomLevel * 10; y > 0; y -= zoomLevel * 10) {
            ctx.fillText(Math.floor((centerY - y) / zoomLevel), centerX + 10, y - 5);
        }
    }

    function drawGrid() {
        ctx.clearRect(0, 0, width, height);
        drawAxes();

        ctx.strokeStyle = '#e0e0e0';
        for (let x = 0; x < width; x += zoomLevel) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        for (let y = 0; y < height; y += zoomLevel) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }

    function dda(x0, y0, x1, y1) {
        let dx = x1 - x0;
        let dy = y1 - y0;
        let steps = Math.max(Math.abs(dx), Math.abs(dy));
        let xIncrement = dx / steps;
        let yIncrement = dy / steps;

        let x = x0;
        let y = y0;

        for (let i = 0; i <= steps; i++) {
            drawPixel(Math.round(x), Math.round(y));
            x += xIncrement;
            y += yIncrement;
        }
    }

    function bresenhamLine(x0, y0, x1, y1) {
        let dx = Math.abs(x1 - x0);
        let dy = Math.abs(y1 - y0);
        let sx = (x0 < x1) ? 1 : -1;
        let sy = (y0 < y1) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            drawPixel(x0, y0);
            if (x0 === x1 && y0 === y1) break;
            let e2 = 2 * err;
            if (e2 > -dy) { err -= dy; x0 += sx; }
            if (e2 < dx) { err += dx; y0 += sy; }
        }
    }

    function bresenhamCircle(x0, y0, r) {
        let x = 0;
        let y = r;
        let p = 3 - 2 * r;

        while (x <= y) {
            drawPixel(x0 + x, y0 + y);
            drawPixel(x0 - x, y0 + y);
            drawPixel(x0 + x, y0 - y);
            drawPixel(x0 - x, y0 - y);
            drawPixel(x0 + y, y0 + x);
            drawPixel(x0 - y, y0 + x);
            drawPixel(x0 + y, y0 - x);
            drawPixel(x0 - y, y0 - x);

            if (p < 0) {
                p += 4 * x + 6;
            } else {
                p += 4 * (x - y) + 10;
                y--;
            }
            x++;
        }
    }

    function casteljau(points, t) {
        let newPoints = [...points];
        while (newPoints.length > 1) {
            let temp = [];
            for (let i = 0; i < newPoints.length - 1; i++) {
                let x = (1 - t) * newPoints[i][0] + t * newPoints[i + 1][0];
                let y = (1 - t) * newPoints[i][1] + t * newPoints[i + 1][1];
                temp.push([x, y]);
            }
            newPoints = temp;
        }
        return newPoints[0];
    }

    function drawBezierCurve(points) {
        let step = 0.01;
        for (let t = 0; t <= 1; t += step) {
            let p = casteljau(points, t);
            drawPixel(p[0], p[1]);
        }
    }

    function stepByStepLine(x0, y0, x1, y1) {
        let dx = Math.abs(x1 - x0);
        let dy = Math.abs(y1 - y0);
        let steps = Math.max(dx, dy);
        let xIncrement = dx / steps;
        let yIncrement = dy / steps;

        let x = x0;
        let y = y0;

        let stepCount = 0;


        function drawStep() {
            if (stepCount <= steps) {

                drawPixel(Math.round(x), Math.round(y));


                x += xIncrement;
                y += yIncrement;

                stepCount++;


                if (stepCount <= steps) {
                    setTimeout(drawStep, 100);
                }
            }
        }


        drawStep();
    }


    function handleDraw() {
        const x0 = parseInt(x0Input.value);
        const y0 = parseInt(y0Input.value);
        const x1 = parseInt(x1Input.value);
        const y1 = parseInt(y1Input.value);
        const algorithm = algorithmSelect.value;

        drawGrid();

        switch (algorithm) {
            case 'step-by-step':
                stepByStepLine(x0, y0, x1, y1);
                break;
            case 'dda':
                dda(x0, y0, x1, y1);
                break;
            case 'bresenham-line':
                bresenhamLine(x0, y0, x1, y1);
                break;
            case 'bresenham-circle':
                const radius = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
                bresenhamCircle(x0, y0, radius);
                break;
            case 'casteljau':
                const controlPoints = [
                    [x0, y0],
                    [(x0 + x1) / 2, (y0 + y1) / 2],
                    [x1, y1]
                ];
                drawBezierCurve(controlPoints);
                break;
            default:
                break;
        }
    }


    // Масштабирование
    function zoomIn() {
        if (zoomLevel < maxZoom) {
            zoomLevel++;
            drawGrid();
            handleDraw();
        }
    }

    function zoomOut() {
        if (zoomLevel > minZoom) {
            zoomLevel--;
            drawGrid();
            handleDraw();
        }
    }


    drawButton.addEventListener('click', handleDraw);
    clearButton.addEventListener('click', () => drawGrid());

    zoomInButton.addEventListener('click', () => {
        if (zoomLevel < maxZoom) {
            zoomLevel += 1;
            drawGrid();
        }
    });

    zoomOutButton.addEventListener('click', () => {
        if (zoomLevel > minZoom) {
            zoomLevel -= 1;
            drawGrid();
        }
    });

    zoomInButton.addEventListener('click', zoomIn);
    zoomOutButton.addEventListener('click', zoomOut);

    drawGrid();
});