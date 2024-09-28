$(document).ready(function () {
  const profileData = JSON.parse(sessionStorage.getItem("user"));

  const location = JSON.parse(localStorage.getItem("location"));

  if (profileData) {
    $("#firstName").text(profileData.firstName);
    $("#lastName").text(profileData.lastName);
    $("#phone").text(profileData.phone);
    $("#email").text(profileData.email);
    $("#address").text(profileData.address);
    $("#suburb").text(profileData.suburb);
    $("#postalCode").text(profileData.postalCode);
  }
});

document
  .getElementById("viewBookingsLink")
  .addEventListener("click", function (event) {
    const profileData = JSON.parse(sessionStorage.getItem("user"));
    event.preventDefault();
    window.location.href = `http://localhost:3040/user?userid=${profileData._id}`;
  });
