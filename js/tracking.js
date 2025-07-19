function trackShipment() {
  const trackingID = document.getElementById("trackingInput").value.trim();
  const result = document.getElementById("trackingResult");

  if (!trackingID) {
    result.innerHTML = "<span style='color:red;'>Please enter a Tracking ID.</span>";
    return;
  }

  // Simulated dummy result
  if (trackingID === "123456") {
    result.innerHTML = `
      <div style="text-align: left; margin-top: 10px;">
        <strong>Status:</strong> Dispatched<br>
        <strong>Location:</strong> Pune<br>
        <strong>Last Updated:</strong> 19 July 2025
      </div>`;
  } else {
    result.innerHTML = "<span style='color:red;'>Tracking ID not found.</span>";
  }
}
