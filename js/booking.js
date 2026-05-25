// ============================================================
//  SevaLink — Booking Logic (booking.js)
// ============================================================

let selectedService = null;
let selectedPrice = 0;
let currentStep = 1;
let activePayMethod = 'upi';

// ---- Select a Service ----
function selectService(el) {
  document.querySelectorAll('.svc-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  selectedService = el.dataset.service;
  selectedPrice = parseInt(el.dataset.price);
  const btn = document.getElementById('nextBtn1');
  btn.style.opacity = '1';
  btn.style.cursor = 'pointer';
  btn.disabled = false;
}

// ---- Navigate Steps ----
function goStep(n) {
  if (n === 2 && !selectedService) {
    alert('Please select a service first.');
    return;
  }
  if (n === 3) {
    const name = document.getElementById('userName').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const pin = document.getElementById('userPin').value.trim();
    if (!name || !phone || !pin) {
      alert('Please fill in all required fields (Name, Mobile, Pincode).');
      return;
    }
  }

  // Hide all steps
  [1, 2, 3].forEach(i => {
    const el = document.getElementById('step' + i);
    if (el) el.style.display = 'none';
    const dot = document.getElementById('dot' + i);
    if (dot) dot.classList.remove('active');
  });

  // Show target step
  document.getElementById('step' + n).style.display = 'block';
  document.getElementById('dot' + n).classList.add('active');
  currentStep = n;

  if (n === 3) populateConfirm();

  window.scrollTo({ top: 120, behavior: 'smooth' });
}

// ---- Populate Confirmation Summary ----
function populateConfirm() {
  const total = selectedPrice + 10;
  document.getElementById('confirmService').textContent = selectedService;
  document.getElementById('confirmFee').textContent = '₹' + selectedPrice;
  document.getElementById('confirmTotal').textContent = '₹' + total;
  document.getElementById('payBtn').textContent = '🔒 Pay ₹' + total + ' & Confirm';
}

// ---- Switch Payment Tab ----
function switchPayTab(method, tabEl) {
  activePayMethod = method;
  document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.pay-panel').forEach(p => p.classList.remove('active'));
  tabEl.classList.add('active');
  document.getElementById('panel-' + method).classList.add('active');
}

// ---- Format Card Number ----
function formatCard(el) {
  let val = el.value.replace(/\D/g, '').substring(0, 16);
  el.value = val.match(/.{1,4}/g)?.join(' ') || val;
}

// ---- Format Expiry ----
function formatExpiry(el) {
  let val = el.value.replace(/\D/g, '').substring(0, 4);
  if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2);
  el.value = val;
}

// ---- Process Payment (Demo) ----
function processPayment() {
  if (activePayMethod === 'upi') {
    const upi = document.getElementById('upiId').value.trim();
    if (!upi || !upi.includes('@')) {
      alert('Please enter a valid UPI ID (e.g. name@upi).');
      return;
    }
  }
  if (activePayMethod === 'card') {
    const card = document.getElementById('cardNum').value.replace(/\s/g, '');
    if (card.length < 16) {
      alert('Please enter a valid 16-digit card number.');
      return;
    }
  }

  // Simulate payment processing
  const payBtn = document.getElementById('payBtn');
  payBtn.textContent = '⏳ Processing...';
  payBtn.disabled = true;

  setTimeout(() => {
    // Generate tracking ID
    const trackId = 'SL' + Date.now().toString().slice(-8).toUpperCase();

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('sevaOrders') || '[]');
    orders.push({
      id: trackId,
      service: selectedService,
      price: selectedPrice + 10,
      name: document.getElementById('userName').value,
      phone: document.getElementById('userPhone').value,
      address: document.getElementById('userAddress').value,
      notes: document.getElementById('userNotes').value,
      payMethod: activePayMethod,
      status: 'Pending',
      date: new Date().toLocaleString('en-IN'),
    });
    localStorage.setItem('sevaOrders', JSON.stringify(orders));

    // Show success modal
    document.getElementById('trackingIdDisplay').textContent = '🔖 Tracking ID: ' + trackId;
    document.getElementById('successModal').classList.add('open');
    payBtn.textContent = '🔒 Pay & Confirm';
    payBtn.disabled = false;
  }, 2000);
}

// ---- Close Modal ----
function closeModal() {
  document.getElementById('successModal').classList.remove('open');
}
