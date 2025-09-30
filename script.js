document.getElementById('calculate').addEventListener('click', () => {
  const auction = document.getElementById('auction').value;
  const location = document.getElementById('location').value;
  const price = parseFloat(document.getElementById('price').value);

  if (!auction || !location || isNaN(price)) {
    alert("Please select auction, location, and enter price.");
    return;
  }

  // Example fees (temporary)
  let auctionFee = auction === "copart" ? price * 0.12 : price * 0.1;
  let locationFee = location === "NY" ? 100 : 50;

  let total = price + auctionFee + locationFee;

  document.getElementById('result').innerText = `Total: $${total.toFixed(2)}`;
});
