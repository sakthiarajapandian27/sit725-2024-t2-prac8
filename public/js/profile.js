$(document).ready(function () {
  const profileData = JSON.parse(sessionStorage.getItem("user"));
console.log(profileData,"profileData")
  const location = JSON.parse(localStorage.getItem("location"));

  if (profileData) {
    $("#firstName").text(profileData.result.firstName);
    $("#lastName").text(profileData.result.lastName);
    $("#phone").text(profileData.result.phone);
    $("#email").text(profileData.result.email);
    $("#address").text(profileData.result.address);
    $("#suburb").text(profileData.result.suburb);
    $("#postalCode").text(profileData.result.postalCode);
  }
});

document
  .getElementById("viewBookingsLink")
  .addEventListener("click", function (event) {
    const profileData = JSON.parse(sessionStorage.getItem("user"));
    event.preventDefault();
    window.location.href = `http://localhost:1/user?userid=${profileData._id}`;
  });
