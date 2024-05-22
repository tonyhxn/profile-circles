const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let circles = [
  { x: 100, y: 100, radius: 50, vx: 0, vy: 0, dragging: false },
  { x: 400, y: 300, radius: 50, vx: 0, vy: 0, dragging: false },
  { x: 400, y: 300, radius: 50, vx: 0, vy: 0, dragging: false },
  { x: 500, y: 300, radius: 50, vx: 0, vy: 0, dragging: false },
  { x: 600, y: 300, radius: 50, vx: 0, vy: 0, dragging: false },
  { x: 700, y: 300, radius: 50, vx: 0, vy: 0, dragging: false }
];

function drawCircle(circle) {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
  ctx.fill();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function applyPhysics() {
  circles.forEach(circle => {
    if (!circle.dragging) {
      circle.vy += 0.4; // Gravity effect
      circle.x += circle.vx;
      circle.y += circle.vy;

      // Boundary collision detection (canvas edges)
      if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
        circle.vx *= -0.7; // Reversing direction and damping velocity
        circle.x = circle.x + circle.radius > canvas.width ? canvas.width - circle.radius : circle.radius;
      }
      if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
        circle.vy *= -0.7; // Reversing direction and damping velocity
        circle.y = circle.y + circle.radius > canvas.height ? canvas.height - circle.radius : circle.radius;
      }
    }
  });
}

function checkAndMergeCircles() {
  let i = 0;
  while (i < circles.length) {
    let j = i + 1;
    while (j < circles.length) {
      if (distance(circles[i], circles[j]) <= circles[i].radius + circles[j].radius) {
        const totalArea = Math.PI * circles[i].radius ** 2 + Math.PI * circles[j].radius ** 2;
        const newRadius = Math.sqrt(totalArea / Math.PI);
        circles[i] = {
          x: (circles[i].x + circles[j].x) / 2,
          y: (circles[i].y + circles[j].y) / 2,
          radius: newRadius,
          vx: (circles[i].vx + circles[j].vx) / 2,
          vy: (circles[i].vy + circles[j].vy) / 2,
          dragging: false
        };
        circles.splice(j, 1); // Remove the merged circle
      } else {
        j++;
      }
    }
    i++;
  }
}

let lastX, lastY;

canvas.addEventListener('mousedown', function(e) {
  lastX = e.offsetX;
  lastY = e.offsetY;
  circles.forEach(circle => {
    if (distance(circle, { x: e.offsetX, y: e.offsetY }) < circle.radius) {
      circle.dragging = true;
    }
  });
});

canvas.addEventListener('mousemove', function(e) {
  circles.forEach(circle => {
    if (circle.dragging) {
      circle.vx = e.offsetX - lastX;
      circle.vy = e.offsetY - lastY;
      circle.x = e.offsetX;
      circle.y = e.offsetY;
    }
  });
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener('mouseup', function() {
  circles.forEach(circle => {
    circle.dragging = false;
  });
});

function distance(c1, c2) {
  return Math.sqrt((c1.x - c2.x) ** 2 + (c1.y - c2.y) ** 2);
}

function updateCanvas() {
  clearCanvas();
  applyPhysics();
  checkAndMergeCircles();
  circles.forEach(circle => drawCircle(circle));
}

function animate() {
  requestAnimationFrame(animate);
  updateCanvas();
}

animate();
