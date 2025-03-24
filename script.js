// Countdown Timer
const weddingDate = new Date("May 10, 2025 16:00:00").getTime();

const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update days, hours, and minutes
  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");

  // Sliding animation for seconds
  const secondsElement = document.getElementById("seconds");
  const currentSeconds = secondsElement.textContent;
  if (currentSeconds !== String(seconds).padStart(2, "0")) {
    secondsElement.style.transform = "translateY(-100%)";
    setTimeout(() => {
      secondsElement.textContent = String(seconds).padStart(2, "0");
      secondsElement.style.transform = "translateY(0)";
    }, 250); // Half of the transition duration
  }

  if (distance < 0) {
    clearInterval(countdown);
    document.getElementById("countdown").innerHTML = "The wedding has begun!";
  }
}, 1000);

// RSVP Form
document.getElementById('rsvpForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const guests = document.getElementById('guests').value;

  document.getElementById('responseMessage').innerText = `Thank you, ${name}! We look forward to celebrating with you and your ${guests} guest(s).`;
  document.getElementById('rsvpForm').reset();
});

