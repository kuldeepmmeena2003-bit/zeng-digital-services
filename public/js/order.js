document.addEventListener("DOMContentLoaded", () => {
  const select = document.querySelector("select[name='service']");
  const summary = document.querySelector(".order-summary");

  if (!select || !summary) return;

  const prices = {
    logo: 999,
    website: 4999,
    seo: 2999,
    social: 1999
  };

  function update() {
    const slug = select.value;
    const price = prices[slug] || 0;

    summary.innerHTML = `
      <h3>Order Summary</h3>
      <p>Service: ${slug}</p>
      <p>Price: ₹${price}</p>
      <hr>
      <p class="total">Total: ₹${price}</p>
    `;
  }

  select.addEventListener("change", update);
  update();
});