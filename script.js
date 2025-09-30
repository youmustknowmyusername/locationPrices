const auctionSelect = document.getElementById('auction');
const locationSelect = document.getElementById('location');
const resultEl = document.getElementById('result');
const priceButtons = document.querySelectorAll('#price-buttons button');

function updateLocations() {
  locationSelect.innerHTML = '<option value="">--Choose--</option>'; // reset

  if (auctionSelect.value === 'copart') {
    let option = document.createElement('option');
    option.value = "AK-Anchorage";
    option.textContent = "AK-Anchorage";
    locationSelect.appendChild(option);
  }
}

auctionSelect.addEventListener('change', updateLocations);

// Handle price button clicks
priceButtons.forEach(button => {
  button.addEventListener('click', () => {
    const auction = auctionSelect.value;
    const location = locationSelect.value;
    const [min, max] = button.dataset.range.split('-').map(Number);

    if (!auction || !location) {
      alert("Please select auction and location first.");
      return;
    }

    // Pick a midpoint of the range for fee calculation (you can adjust logic later)
    const price = (min + max) / 2;

    // Example fee logic
    let auctionFee = auction === "copart" ? price * 0.12 : price * 0.1;
    let locationFee = location === "AK-Anchorage" ? 75 : 0;

    let total = price + auctionFee + locationFee;

    resultEl.innerText = `Range: $${min} - $${max} → Total: $${total.toFixed(2)}`;
  });
});
