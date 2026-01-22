const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");

const disposableDomains = ["tempmail.com", "mailinator.com"];

const states = {
    India: ["AP", "TS"],
    USA: ["California", "Texas"]
};

const cities = {
    AP: ["Vijayawada", "Guntur"],
    TS: ["Hyderabad", "Warangal"],
    California: ["LA", "San Diego"],
    Texas: ["Dallas", "Austin"]
};

document.getElementById("country").addEventListener("change", function () {
    const stateSelect = document.getElementById("state");
    stateSelect.innerHTML = "<option value=''>Select State</option>";
    states[this.value]?.forEach(state => {
        stateSelect.innerHTML += `<option value="${state}">${state}</option>`;
    });
});

document.getElementById("state").addEventListener("change", function () {
    const citySelect = document.getElementById("city");
    citySelect.innerHTML = "<option value=''>Select City</option>";
    cities[this.value]?.forEach(city => {
        citySelect.innerHTML += `<option value="${city}">${city}</option>`;
    });
});

document.getElementById("password").addEventListener("input", function () {
    const strength = document.getElementById("strength");
    if (this.value.length < 6) strength.textContent = "Weak";
    else if (this.value.length < 10) strength.textContent = "Medium";
    else strength.textContent = "Strong";
});

form.addEventListener("input", validateForm);

function validateForm() {
    let valid = true;
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
    document.querySelectorAll("input").forEach(i => i.classList.remove("error-field"));

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const terms = document.getElementById("terms");

    if (!firstName.value) {
        valid = false;
        firstName.classList.add("error-field");
        document.getElementById("firstNameError").textContent = "Required";
    }

    if (!lastName.value) {
        valid = false;
        lastName.classList.add("error-field");
        document.getElementById("lastNameError").textContent = "Required";
    }

    const domain = email.value.split("@")[1];
    if (!email.value || disposableDomains.includes(domain)) {
        valid = false;
        document.getElementById("emailError").textContent = "Invalid email";
    }

    if (!phone.value.startsWith("+")) {
        valid = false;
        document.getElementById("phoneError").textContent = "Include country code";
    }

    if (password.value !== confirmPassword.value) {
        valid = false;
        document.getElementById("passwordError").textContent = "Passwords do not match";
    }

    if (!terms.checked) {
        valid = false;
        document.getElementById("termsError").textContent = "Required";
    }

    submitBtn.disabled = !valid;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("successMessage").textContent =
        "Registration Successful! Your profile has been submitted successfully.";
    form.reset();
    submitBtn.disabled = true;
});
