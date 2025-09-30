const auctionSelect = document.getElementById('auction');
const locationSelect = document.getElementById('location');
const calculateBtn = document.getElementById('calculate');
const resultEl = document.getElementById('result');

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

calculateBtn.addEventListener('click', () => {
  const auction = auctionSelect.value;
  const location = locationSelect.value;
  const price = parseFloat(document.getElementById('price').value);

  if (!auction || !location || isNaN(price)) {
    alert("Please select auction, location, and enter price.");
    return;
  }

  // Example fee logic
  let auctionFee = auction === "copart" ? price * 0.12 : price * 0.1;
  let locationFee = location === "AK-Anchorage" ? 75 : 0;

  let total = price + auctionFee + locationFee;

  resultEl.innerText = `Total: $${total.toFixed(2)}`;
});
