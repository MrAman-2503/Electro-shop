// Profile picture upload preview
const uploadPicInput = document.getElementById('upload-pic');
const profilePic = document.getElementById('profile-pic');

uploadPicInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePic.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Save about text to localStorage (placeholder for backend integration)
const aboutText = document.getElementById('about-text');
aboutText.value = localStorage.getItem('userAbout') || '';

aboutText.addEventListener('input', () => {
    localStorage.setItem('userAbout', aboutText.value);
});

// Address form submission (placeholder for backend integration)
const addressForm = document.getElementById('address-form');
addressForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const addressData = {
        line1: document.getElementById('address-line1').value,
        line2: document.getElementById('address-line2').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
    };
    // For now, just log the address data and show alert
    console.log('Address saved:', addressData);
    alert('Address saved successfully!');
    addressForm.reset();
});

// Placeholder for cart and orders data loading
const userCart = document.getElementById('user-cart');
const userOrders = document.getElementById('user-orders');

// TODO: Load cart and orders from backend or localStorage
userCart.innerHTML = '<p>Your cart is currently empty.</p>';
userOrders.innerHTML = '<p>You have no orders yet.</p>';
