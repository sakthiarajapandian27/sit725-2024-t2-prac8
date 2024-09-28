$(document).ready(function () {
  const reviewButton = document.getElementById("review");
  const contactButton = document.getElementById("contact");

  const profileData = JSON.parse(sessionStorage.getItem("user"));
  const sitterData = JSON.parse(localStorage.getItem("selectedSitter"));
  console.log(sitterData);
  let isVisible = sitterData != null || profileData.type == "WALKER";

  if (!isVisible) {
    reviewButton.style.display = "none"; // Hide the button
    contactButton.style.display = "none";
  }

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

  // Click event for Leave a Review button
  $("#review").click(function () {
    window.location.href = "review.html"; // Redirect to review.html
  });

  // Click event for Contact button
  $("#contact").click(function () {
    const ownerData = profileData;

    const booking = {
      ownerId: ownerData._id,
      sitterId: sitterData._id,
      ownerName: ownerData.firstName + " " + ownerData.lastName,
      sitterName: sitterData.firstName + " " + sitterData.lastName,
      date: new Date(),
      address: location,
      services:
        sitterData.services && sitterData.services.length > 0
          ? sitterData.services[0]
          : "Dog Walking",
    };
    saveBooking(booking);
  });
});

const saveBooking = (obj) => {
  const profileData = JSON.parse(sessionStorage.getItem("user"));
  $.ajax({
    type: "POST",
    url: "/user/bookings/save",
    data: JSON.stringify(obj),
    contentType: "application/json",
    success: function (response) {
      console.log(response);
      // Redirect to the profile page
      window.location.href = `http://localhost:3040/user?userid=${profileData._id}`;
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
};
