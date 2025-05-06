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
// document.getElementById('rsvpForm').addEventListener('submit', function (e) {
//   e.preventDefault();

//   const name = document.getElementById('name').value;
//   const guests = document.getElementById('guests').value;

//   document.getElementById('responseMessage').innerText = `Thank you, ${name}! We look forward to celebrating with you and your ${guests} guest(s).`;
//   document.getElementById('rsvpForm').reset();
// });


// Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyBw5z73PUAqQFP0Bp1Rgi-vctFlmK9Zk5c",
//   authDomain: "sravangroom.firebaseapp.com",
//   projectId: "sravangroom",
//   storageBucket: "sravangroom.firebasestorage.app",
//   messagingSenderId: "1075557669512",
//   appId: "1:1075557669512:web:3d54b102d92356919b5d3d",
//   measurementId: "G-KL1K0QB0QR"
// };

// Wait for Firebase to load
document.addEventListener('DOMContentLoaded', function() {
  // Your Firebase config (replace with yours)
  const firebaseConfig = {
    apiKey: "AIzaSyBw5z73PUAqQFP0Bp1Rgi-vctFlmK9Zk5c",
    authDomain: "sravangroom.firebaseapp.com",
    projectId: "sravangroom",
    storageBucket: "sravangroom.firebasestorage.app",
    messagingSenderId: "1075557669512",
    appId: "1:1075557669512:web:3d54b102d92356919b5d3d",
    measurementId: "G-KL1K0QB0QR"
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();

  const rsvpForm = document.getElementById('rsvpForm');
  
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name')?.value.trim();
      const guests = document.getElementById('guests')?.value;
      
      if (!name || !guests) {
        document.getElementById('responseMessage').textContent = 
          "Please fill all required fields";
        return;
      }

      try {
        await db.collection("rsvps").add({
          name: name,
          guests: parseInt(guests),
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        document.getElementById('responseMessage').textContent = 
          `Thank you, ${name}! We'll see you with ${guests} guest(s).`;
        rsvpForm.reset();
      } catch (error) {
        console.error("Error:", error);
        document.getElementById('responseMessage').textContent = 
          "Error submitting. Please try again later.";
      }
    });
  }

});