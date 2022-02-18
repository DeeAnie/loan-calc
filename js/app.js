document.getElementById("loan-form").addEventListener("submit", function (e) {
  document.getElementById("output").style.display = "none";
  document.getElementById("loader").style.display = "block";

  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

function calculateResults() {
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");

  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    document.getElementById("output").style.display = "block";
    document.getElementById("loader").style.display = "none";
  } else {
    errorBlc("Заполните все поля!");
  }
};

function errorBlc(error) {
  document.getElementById("output").style.display = "none";
  document.getElementById("loader").style.display = "none";
  const errorMessage = document.createElement("div");
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  errorMessage.className = "alert alert-danger";
  errorMessage.appendChild(document.createTextNode(error));
  card.appendChild(errorMessage);
  card.appendChild(heading);
  setTimeout(clearError, 2500);
};

function clearError() {
  document.querySelector('.alert').remove();
};