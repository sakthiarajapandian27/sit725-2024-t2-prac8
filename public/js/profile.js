$(document).ready(function () {
  // Example data, replace with actual values as needed
  $("#firstName").text("John");
  $("#lastName").text("Doe");
  $("#phone").text("+1234567890");
  $("#email").text("john.doe@example.com");
  $("#address").text("123 Main St");
  $("#suburb").text("Springfield");
  $("#postalCode").text("12345");
  $("#password").text("********"); // mask password

  // Click event for Leave a Review button
  $("#review").click(function () {
    window.location.href = "review.html"; // Redirect to review.html
  });

  // Click event for Contact button
  $("#contact").click(function () {
    const booking = {
      ownerId: "O001",
      sitterId: "S001",
      ownerName: "XX",
      sitterName: "YY",
      date: "2024-02-09",
      address: "Clayton",
    };
    saveBooking(booking);
  });
});

const saveBooking = (obj) => {
  $.ajax({
    type: "POST",
    url: "/user/bookings/save",
    data: JSON.stringify(obj),
    contentType: "application/json",
    success: function (response) {
      console.log(response);
      // Redirect to the profile page
      window.location.href = "http://localhost:3040/user?userid=S001";
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
};
