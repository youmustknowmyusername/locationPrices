const auctionSelect = document.getElementById('auction');
const locationSelect = document.getElementById('location');
const resultEl = document.getElementById('result');
const priceButtons = document.querySelectorAll('#price-buttons button');
const showBtn = document.getElementById('show');

let selectedRange = null;

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

// save selected range when clicked
priceButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedRange = button.dataset.range;
    priceButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
  });
});

// calculate only when "Show" button is clicked
showBtn.addEventListener('click', () => {
  if (!selectedRange) {
    alert("Please select a car price range.");
    return;
  }

  const auction = auctionSelect.value;
  const location = locationSelect.value;
  const [min, max] = selectedRange.split('-').map(Number);

  if (!auction || !location) {
    alert("Please select auction and location first.");
    return;
  }

  // Pick midpoint of range for now
  const price = (min + max) / 2;

  // Example fee logic
  let auctionFee = auction === "copart" ? price * 0.12 : price * 0.1;
  let locationFee = location === "AK-Anchorage" ? 75 : 0;

  let total = price + auctionFee + locationFee;

  resultEl.innerText = `Range: $${min} - $${max} → Total: $${total.toFixed(2)}`;
});
