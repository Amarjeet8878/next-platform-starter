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
        return;
      }

      // Build progress stages
      const stages = [
        { name: "Dispatched", active: true },
        { name: "Station 1", active: !!data["Station 1"] },
        { name: "Station 2", active: !!data["Station 2"] },
        { name: "Station 3", active: !!data["Station 3"] },
        { name: "Delivered", active: data["Status"] === "Delivered" }
      ];

      // Build progress bar HTML
      const progressHTML = `
        <div class="progress-container">
          ${stages.map((stage, index) => `
            <div class="progress-step ${stage.active ? "active" : ""}">
              <div class="circle">${index + 1}</div>
              <p>${stage.name}</p>
            </div>
          `).join("")}
        </div>
      `;

      // Build info table
      const infoTable = `
        <table style="width:100%; border-collapse: collapse; margin-top: 20px;">
          <tr><th style="text-align:left; padding: 5px;">Customer</th><td>${data["Customer Name"]}</td></tr>
          <tr><th style="text-align:left; padding: 5px;">From</th><td>${data["From"]}</td></tr>
          ${data["Station 1"] ? `<tr><th style="text-align:left; padding: 5px;">Station 1</th><td>${data["Station 1"]}</td></tr>` : ""}
          ${data["Station 2"] ? `<tr><th style="text-align:left; padding: 5px;">Station 2</th><td>${data["Station 2"]}</td></tr>` : ""}
          ${data["Station 3"] ? `<tr><th style="text-align:left; padding: 5px;">Station 3</th><td>${data["Station 3"]}</td></tr>` : ""}
          <tr><th style="text-align:left; padding: 5px;">To</th><td>${data["To"]}</td></tr>
          <tr><th style="text-align:left; padding: 5px;">Status</th><td>${data["Status"]}</td></tr>
          <tr><th style="text-align:left; padding: 5px;">Date Booked</th><td>${data["Date Booked"]}</td></tr>
          <tr><th style="text-align:left; padding: 5px;">Delivered On</th><td>${data["Delivered On"] || "In Transit"}</td></tr>
        </table>
        ${data["POD Link"] ? `<div style="margin-top: 15px;"><a class="pod-button" href="${data["POD Link"]}" target="_blank">📄 View / Download POD</a></div>` : ""}
      `;

      result.innerHTML = progressHTML + infoTable;
    })
    .catch(error => {
      result.innerHTML = "<span style='color:red;'>Error fetching tracking info. Please try again later.</span>";
      console.error("Tracking error:", error);
    });
}
