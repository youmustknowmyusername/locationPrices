const auctionSelect = document.getElementById('auction');
const locationSelect = document.getElementById('location');
const resultEl = document.getElementById('result');
const priceButtons = document.querySelectorAll('#price-buttons button');
const showBtn = document.getElementById('show');

let selectedRange = null;

// update locations when auction changes
function updateLocations() {
  locationSelect.innerHTML = '<option value="">--Choose--</option>';

  if (auctionSelect.value === 'copart') {
    const opt = document.createElement('option');
    opt.value = 'AK-Anchorage';
    opt.textContent = 'AK-Anchorage';
    locationSelect.appendChild(opt);
  }
}

auctionSelect.addEventListener('change', updateLocations);

// handle selecting a price range
priceButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedRange = btn.dataset.range;

    // reset all, then highlight selected
    priceButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

showBtn.addEventListener('click', () => {
  if (!selectedRange) {
    alert('Please select a car price range.');
    return;
  }

  const auction = auctionSelect.value;
  const location = locationSelect.value;

  if (!auction || !location) {
    alert('Please select auction and location first.');
    return;
  }

  // ✅ Special rule: Copart + AK-Anchorage + 1–3000$
  if (
    auction === 'copart' &&
    location === 'AK-Anchorage' &&
    selectedRange === '1-3000'
  ) {
    resultEl.textContent = 'Total: $5,340';
    return;
  }

  // Default calculation (for all other cases)
  const [min, max] = selectedRange.split('-').map(Number);
  const price = (min + max) / 2; // midpoint for now

  const auctionFee = auction === 'copart' ? price * 0.12 : price * 0.10;
  const locationFee = location === 'AK-Anchorage' ? 75 : 0;

  const total = price + auctionFee + locationFee;
  resultEl.textContent = `Range: $${min} - $${max} → Total: $${total.toFixed(2)}`;
});

// initialize
updateLocations();
