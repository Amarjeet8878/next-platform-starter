function trackShipment() {
  const trackingID = document.getElementById("trackingInput").value.trim();
  const result = document.getElementById("trackingResult");

  if (!trackingID) {
    result.innerHTML = "<span style='color:red;'>Please enter a Tracking ID.</span>";
    return;
  }

  const apiUrl = "https://script.google.com/macros/s/AKfycbzPG73_493cP_6_L0BmTs5O_DwPpS8kQa9GfUc-KUKeYleIFX6pxoQnB0ANzVvv9dKO/exec?id=" + trackingID;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        result.innerHTML = "<span style='color:red;'>Tracking ID not found.</span>";
      } else {
        result.innerHTML = `
          <div style="text-align: left; margin-top: 10px;">
            <strong>Customer:</strong> ${data["Customer Name"]}<br>
            <strong>From:</strong> ${data["From"]}<br>
            <strong>To:</strong> ${data["To"]}<br>
            <strong>Status:</strong> ${data["Status"]}<br>
            <strong>Date Booked:</strong> ${data["Date Booked"]}<br>
            <strong>Delivered On:</strong> ${data["Delivered On"] || "In transit"}
          </div>`;
      }
    })
    .catch(error => {
      result.innerHTML = "<span style='color:red;'>Error fetching tracking info. Please try again later.</span>";
      console.error("Tracking error:", error);
    });
}

document.getElementById("trackButton").addEventListener("click", trackShipment);
// Toggle Menu for Mobile
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}
