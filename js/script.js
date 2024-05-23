const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let font_family = 'Poppins';

let container = {
    x: canvas.width * 0.55, // Positioned at 15% of the width from the left
    y: canvas.height * 0.27, // Positioned at 20% of the height from the top
    width: canvas.width * 0.4, // 70% of the canvas width
    height: canvas.height * 0.7 // 70% of the canvas height
};

let circleTemplates = [
    { "type": 0, "text": "Hi, I'm Tony", "color": 'white', "textColor": 'black'},
    { "type": 0, "text": "3rd Year\nUNSW", "color": 'white', "textColor": 'black'},
    { "type": 0, "text": "B' Computer\nScience", "color": 'white', "textColor": 'black'},

    { "type": 1, "text": "NFT", "color": "#59B512", "textColor": "black"},
    { "type": 1, "text": "Project", "color": "#59B512", "textColor": "black"},
    { "type": 1, "text": "Website", "color": "#59B512", "textColor": "black"},

    { "type": 10, "text": "Worked w\nMulgaTheArtist", "color": "#59B512", "textColor": "black"},
    { "type": 10, "text": "Coding Site &\nMarketing", "color": "#59B512", "textColor": "black"},
    { "type": 10, "text": "NFT Collection\n'MULGAKONGZ'", "color": "#59B512", "textColor": "black"},

    { "type": 2, "text": "Conway", "color": "#ee3239", "textColor": "black"},
    { "type": 2, "text": "Game", "color": "#ee3239", "textColor": "black"},
    { "type": 2, "text": "of Life", "color": "#ee3239", "textColor": "black"},

    { "type": 3, "text": "BFS", "color": "#6CE4E7", "textColor": "black"},
    { "type": 3, "text": "Maze", "color": "#6CE4E7", "textColor": "black"},
    { "type": 3, "text": "Solver", "color": "#6CE4E7", "textColor": "black"},

    { "type": 4, "text": "Shopping", "color": "#924B9C", "textColor": "black"},
    { "type": 4, "text": "Automation", "color": "#924B9C", "textColor": "black"},
    { "type": 4, "text": "SAAS", "color": "#924B9C", "textColor": "black"},

    { "type": 8, "text": "Hosted 30 Users\nOver 1 Year", "color": "#924B9C", "textColor": "black"},
    { "type": 8, "text": "Python,\nAuth,\nReversing\nRequests", "color": "#924B9C", "textColor": "black"},
    { "type": 8, "text": "Generated\n15k Revenue", "color": "#924B9C", "textColor": "black"},

    { "type": 5, "text": "Represented\nUNSW", "color": "#3E5B8F", "textColor": "black"},
    { "type": 5, "text": "UniGames\nEuro\nHandball", "color": "#3E5B8F", "textColor": "black"},

    { "type": 6, "text": "Love\nBasketball", "color": "#AB5B84", "textColor": "black"},
    { "type": 6, "text": "Poker", "color": "#AB5B84", "textColor": "black"},

    { "type": 7, "text": "Marketing\nDirector", "color": "#FFC559", "textColor": "black"},
    { "type": 7, "text": "UNIT\nUNSW", "color": "#FFC559", "textColor": "black"}

];
let circleIndex = 0;
let circles = [];

function createCircle(x, y) {
    if (circleIndex < circleTemplates.length) {
        circles.push({
            type: circleTemplates[circleIndex].type,
            x: x,
            y: y,
            radius: 52,
            mass: 52,
            vx: 0,
            vy: 0,
            dragging: false,
            text: circleTemplates[circleIndex].text,
            color: circleTemplates[circleIndex].color,
            textColor: circleTemplates[circleIndex].textColor
        });
        circleIndex++;
    }
}

canvas.addEventListener('mousedown', function(e) {
    const mouseX = e.offsetX;
    if (!(container.x <= mouseX && mouseX <= container.x + container.width)) {
        console.log('Invalid mouse click for circle drop zone');
        return;
    }
    const mouseY = e.offsetY;
    let circleFound = false;
    if (!circleFound && circleIndex < circleTemplates.length) {
        createCircle(mouseX, 100);
    }
    updateCanvas();
});

function drawContainer() {
    ctx.beginPath();
    // Drawing the left side
    ctx.moveTo(container.x, container.y);
    ctx.lineTo(container.x, container.y + container.height);

    // Drawing the right side
    ctx.moveTo(container.x + container.width, container.y);
    ctx.lineTo(container.x + container.width, container.y + container.height);

    // Drawing the bottom
    ctx.moveTo(container.x, container.y + container.height);
    ctx.lineTo(container.x + container.width, container.y + container.height);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawCircle(circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = circle.color;
    ctx.fill();

    let fontSize = calculateFontSize(circle.text, circle.radius, ctx);
    ctx.fillStyle = circle.textColor;
    ctx.font = `${fontSize}px '${font_family}'`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const lines = circle.text.split('\n');
    const lineHeight = fontSize * 1.2;
    const totalHeight = lineHeight * lines.length;
    let startY = circle.y - (totalHeight / 2) + (lineHeight / 2);
    lines.forEach(line => {
        ctx.fillText(line, circle.x, startY);
        startY += lineHeight;
    });
}

function calculateFontSize(text, radius, context) {
    let fontSize = radius;
    context.font = `${fontSize}px Arial`;
    let maxWidth = 0;
    let lines = text.split('\n');
    lines.forEach(line => {
        let lineWidth = context.measureText(line).width;
        if (lineWidth > maxWidth) {
            maxWidth = lineWidth;
        }
    });

    let lineHeight = fontSize * 1.2;
    let totalHeight = lineHeight * lines.length;

    while ((maxWidth > radius * 2 || totalHeight > radius * 2) && fontSize > 5) {
        fontSize -= 1;
        context.font = `${fontSize}px '${font_family}'`;
        maxWidth = 0;
        lines.forEach(line => {
            let lineWidth = context.measureText(line).width;
            if (lineWidth > maxWidth) {
                maxWidth = lineWidth;
            }
        });
        lineHeight = fontSize * 1.2;
        totalHeight = lineHeight * lines.length;
    }
    return fontSize * 0.7;
}

function distance(c1, c2) {
    return Math.sqrt((c1.x - c2.x) ** 2 + (c1.y - c2.y) ** 2);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function applyPhysics() {
    circles.forEach(circle => {
        if (!circle.dragging) {
            circle.vy += 0.05; // Gravity
            circle.vx *= 0.99; // Friction
            circle.x += circle.vx;
            circle.y += circle.vy;

            adjustForCanvasBorders(circle);
            // Collision with the canvas borders
            if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
                circle.vx *= -0.7; // Reversing direction
                circle.x = Math.max(circle.radius, Math.min(circle.x, canvas.width - circle.radius));
            }
            if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
                circle.vy *= -0.7; // Reversing direction
                circle.y = Math.max(circle.radius, Math.min(circle.y, canvas.height - circle.radius));
            }

            // Collision with the container's visible sides and bottom
            if (circle.x + circle.radius > container.x + container.width) {
                circle.vx *= -0.7;
                circle.x = container.x + container.width - circle.radius;
            } else if (circle.x - circle.radius < container.x) {
                circle.vx *= -0.7;
                circle.x = container.x + circle.radius;
            }
            // Collision with the container's bottom
            if (circle.y + circle.radius > container.y + container.height) {
                circle.vy *= -0.7;
                circle.y = container.y + container.height - circle.radius;
            }
        }
    });
}

function adjustForCanvasBorders(circle) {
    if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
        circle.vx *= -0.7; // Elastic collision
        circle.x = Math.max(circle.radius, Math.min(circle.x, canvas.width - circle.radius));
    }
    if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
        circle.vy *= -0.7;
        circle.y = Math.max(circle.radius, Math.min(circle.y, canvas.height - circle.radius));
    }
}

function checkAndMergeCircles() {
    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            if (distance(circles[i], circles[j]) <= circles[i].radius + circles[j].radius) {
                if (circles[i].type === circles[j].type) {
                    mergeCircles(i, j);
                    j--; // Adjust index to check new circle position
                } else {
                    preventOverlap(circles[i], circles[j]);
                }
            }
        }
    }
}

function preventOverlap(circle1, circle2) {
    const dx = circle2.x - circle1.x;
    const dy = circle2.y - circle1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const overlap = (circle1.radius + circle2.radius - distance) / 2;

    if (distance > 0) { // Avoid division by zero
        const moveX = (dx / distance) * overlap;
        const moveY = (dy / distance) * overlap;

        // Adjust based on mass
        const totalMass = circle1.mass + circle2.mass;
        const moveRatio1 = circle2.mass / totalMass;
        const moveRatio2 = circle1.mass / totalMass;

        circle1.x -= moveX * moveRatio1;
        circle1.y -= moveY * moveRatio1;
        circle2.x += moveX * moveRatio2;
        circle2.y += moveY * moveRatio2;
    }
}

function mergeCircles(index1, index2) {
    const circle1 = circles[index1];
    const circle2 = circles[index2];
    if (circle1.type === circle2.type) {
        // Calculate total area and new radius using correct formula for combining two areas
        const totalArea = Math.PI * Math.pow(circle1.radius, 2) + Math.PI * Math.pow(circle2.radius, 2);
        const newRadius = Math.sqrt(totalArea / Math.PI);

        // New text might be too long, needs layout adjustment
        const newText = circle1.text + "\n" + circle2.text;

        // Ensure the new position is correctly calculated
        const newX = (circle1.x * circle1.mass + circle2.x * circle2.mass) / (circle1.mass + circle2.mass);
        const newY = (circle1.y * circle1.mass + circle2.y * circle2.mass) / (circle1.mass + circle2.mass);

        // Ensure velocities are combined based on mass
        const newVx = (circle1.vx * circle1.mass + circle2.vx * circle2.mass) / (circle1.mass + circle2.mass);
        const newVy = (circle1.vy * circle1.mass + circle2.vy * circle2.mass) / (circle1.mass + circle2.mass);

        // Update circle1 with new properties
        circles[index1] = {
            type: circle1.type,
            x: newX,
            y: newY,
            radius: newRadius,
            mass: circle1.mass + circle2.mass, // Combine mass
            vx: newVx,
            vy: newVy,
            dragging: false,
            text: newText,
            color: circle1.color,
            textColor: circle1.textColor
        };

        // Remove circle2
        circles.splice(index2, 1);
    }
}

function bounceCircles(circle1, circle2) {
    // Apply a simple bounce effect by reversing their velocities
    const dampingFactor = 0.1; // Reduce the velocity by 10% upon each bounce
    const tempVx1 = circle1.vx * dampingFactor;
    const tempVy1 = circle1.vy * dampingFactor;
    const tempVx2 = circle2.vx * dampingFactor;
    const tempVy2 = circle2.vy * dampingFactor;

    // Exchange velocities and apply damping
    circle1.vx = tempVx2;
    circle1.vy = tempVy2;
    circle2.vx = tempVx1;
    circle2.vy = tempVy1;
}

function updateCanvas() {
    clearCanvas();
    drawContainer();
    applyPhysics();
    checkAndMergeCircles();
    circles.forEach(circle => drawCircle(circle));
}

function animate() {
    requestAnimationFrame(animate);
    updateCanvas();
}

animate();