const updatePendingBookingsLayout = (bookings) => {
  const cardsContainer = document.getElementById("cardsContainer");
  bookings.forEach((item) => {
    if (!item.confirmed) {
      const card = document.createElement("div");

      card.classList.add("card");

      const isSitter = item.type === "sitter";

      // Create card content
      card.innerHTML = `
    <div class="card-title">${item._id}</div>
    <div class="card-info">OwnerName: ${item.ownerName}</div>
    <div class="card-info">Date: ${item.date}</div>
    <div class="card-info">Time: ${item.time}</div>
    <div class="card-buttons">
        <button class="confirm-button" id="confirm" onclick="handleConfirm('${item}', this.closest('.card'))">Confirm</button>
        <button class="decline-button" id="decline" onclick="handleDecline('${item}', this.closest('.card'))">Decline</button>
    </div>
`;
      cardsContainer.appendChild(card);
    } else {
      addToHistory(item);
    }
  });
};

const handleConfirm = (booking, cardElement) => {
  console.log(booking);
  addToHistory(booking);
  updateBookingConfirmation(1, booking.bookingId, true);
  cardElement.remove();
};

function handleDecline(booking, cardElement) {
  updateBookingConfirmation(1, booking.bookingId, false);
  cardElement.remove();
}

const fetchAndDisplayBookings = (userId) => {
  $.ajax({
    url: `api2/bookings/${userId}`,
    method: "GET",
    success: function (data) {
      updatePendingBookingsLayout(data);
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
      console.error("Error updating bookings:", error);
    },
  });
};

function addToHistory(item) {
  const historyContainer = document.getElementById("historyContainer");

  // Create a new history card element
  const historyCard = document.createElement("div");
  historyCard.classList.add("history");

  // Create the content for the history card
  historyCard.innerHTML = `
      <div class="history-title">${item._id}</div>
      <div class="card-info">Action: ${item.date}</div>
  `;

  // Append the new history card to the history container
  historyContainer.appendChild(historyCard);
}

$(document).ready(() => {
  fetchAndDisplayBookings("S001");
});
