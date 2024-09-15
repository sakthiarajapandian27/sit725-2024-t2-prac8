const updateBookingsLayout = (bookings) => {
  const cardsContainer = document.getElementById("cardsContainer");
  bookings.forEach((item) => {
    const card = document.createElement("div");
    console.log(card);

    card.classList.add("card");

    const isSitter = item.type === "sitter";

    // Create card content
    card.innerHTML = `
    <div class="card-title">${item._id}</div>
    <div class="card-info">Username: ${item.name}</div>
    <div class="card-info">Date: ${item.date}</div>
    <div class="card-info">Time: ${item.time}</div>
    <div class="card-buttons">
        <button class="confirm-button" id="confirm" onclick="handleConfirm('${item._id}')">Action 1</button>
        <button class="decline-button" id="decline" onclick="handleDecline('${item._id}')">Action 2</button>
    </div>
`;
    cardsContainer.appendChild(card);
  });
};

// Function to handle Confirm button click
function handleConfirm(bookingId) {
  updateBookingConfirmation(1, bookingId, true);
}

// Function to handle Decline button click
function handleDecline(cardTitle) {
  alert(`Declined: ${cardTitle}`);
  // Additional logic like API call can go here
}

const fetchAndDisplayBookings = (userId) => {
  $.ajax({
    url: `api2/bookings/${userId}`,
    method: "GET",
    success: function (data) {
      updateBookingsLayout(data);
    },
    error: function (error) {
      console.error("Error fetching bookings:", error);
    },
  });
};

const updateBookingConfirmation = (userId, bookingId, confirmation) => {
  $.ajax({
    url: `api2/bookings/${userId}`,
    method: "PUT",
    data: {
      bookingId: bookingId,
      confirmation: confirmation,
    },
    success: function (data) {
      updateBookingsLayout(data);
    },
    error: function (error) {
      console.error("Error fetching bookings:", error);
    },
  });
};

$(document).ready(() => {
  fetchAndDisplayBookings(1);
});
