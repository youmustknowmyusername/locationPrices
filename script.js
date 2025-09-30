const auctionSelect = document.getElementById('auction');
const locationSelect = document.getElementById('location');
const resultEl = document.getElementById('result');
const priceButtons = document.querySelectorAll('#price-buttons button');
const showBtn = document.getElementById('show');

let selectedRange = null;

function updateLocations() {
  // reset locations
  locationSelect.innerHTML = '<option value="">--Choose--</option>';

  if (auctionSelect.value === 'copart') {
    const opt = document.createElement('option');
    opt.value = 'AK-Anchorage';
    opt.textContent = 'AK-Anchorage';
    locationSelect.appendChild(opt);
  }
}

auctionSelect.addEventListener('change', () => {
  updateLocations();
  // also reset selection on auction change
  locationSelect.value = '';
});

// handle selecting a price range
priceButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedRange = btn.dataset.range;
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

  const [min, max] = selectedRange.split('-').map(Number);
  // temporary calculation uses midpoint of the chosen range
  const price = (min + max) / 2;

  // placeholder fee logic
  const auctionFee = auction === 'copart' ? price * 0.12 : price * 0.10;
  const locationFee = location === 'AK-Anchorage' ? 75 : 0;

  const total = price + auct
