//socket io
const socket = io();
socket.on("connection", () => {
  console.log("Connected to Socket io");
});

socket.on("Transaction", (data) => {
  console.log(data.message);
  showNotification();
});

const updateBookingsLayout = (bookings) => {
  const cardsContainer = document.getElementById("cardsContainer");
  let userId = window.location.search.replace("?", "").split("=")?.[1] || 1;
  bookings.forEach((item) => {
    if (!item.confirmed && userId.startsWith("S")) {
      const card = document.createElement("div");

      card.classList.add("card");

      const time = convertTo24Hour(item.date);
      const date = getDate(item.date);
      let user = null;

      // Create card content
      card.innerHTML = `
    <div class="card-title">${item.service} on ${date}</div>
    <div class="card-info">Owner Name: ${item.ownerName}</div>
    <div class="card-info">Date: ${date}</div>
    <div class="card-info">Time: ${time}</div>
    <div class="card-info">Location: ${item.address}</div>
    <div class="card-buttons">
        <button class="confirm-button" id="confirm"> <span class="material-icons">check_circle</span>Confirm</button>
        <button class="decline-button" id="decline"> <span class="material-icons">remove_circle</span>Decline</button>
    </div>
`;
      // Attach event listeners to buttons
      card
        .querySelector(".confirm-button")
        .addEventListener("click", () => handleConfirm(item, card));
      card
        .querySelector(".decline-button")
        .addEventListener("click", () => handleDecline(item, card));
      cardsContainer.appendChild(card);
    } else if (item.confirmation) {
      addToHistory(item);
    }
  });
};

const handleConfirm = (booking, cardElement) => {
  updateBookingConfirmation(1, booking._id, true);
  cardElement.remove();
  let userId = booking.ownerId;
  socket.emit("Transaction", { userId });
};

function handleDecline(booking, cardElement) {
  updateBookingConfirmation(1, booking._id, false);
  cardElement.remove();
}

const fetchAndDisplayBookings = (userId) => {
  $.ajax({
    url: `user/bookings/${userId}`,
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
  userId = window.location.search.replace("?", "").split("=")?.[1] || 1;
  $.ajax({
    url: `user/bookings/${userId}`,
    type: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      filter: { bookingId: bookingId },
      update: {
        confirmation: confirmation,
      },
    }),
    success: function (data) {
      if (confirmation) {
        addToHistory(data);
      }
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

  const time = convertTo24Hour(item.date);
  const date = getDate(item.date);
  let user = null;
  //Todo: remove once the profile is merged
  let userId = window.location.search.replace("?", "").split("=")?.[1] || 1;
  if (userId.startsWith("O")) {
    user = `Sitter Name: ${item.sitterName}`;
  } else {
    user = `Owner Name: ${item.ownerName}`;
  }
  // if (item.type == "sitter") {
  //   user = `Sitter Name: ${item.sitterName}`;
  // } else {
  //   user = `Owner Name: ${item.ownerName}`;
  // }

  // Create the content for the history card
  historyCard.innerHTML = `
     
      <div class="history-title"> <span class="material-icons">pets</span> ${item.service} on ${date}</div>
      <div class="card-info">${user}</div>
      <div class="card-info">Date: ${date}</div>
      <div class="card-info">Time: ${time}</div>
      <div class="card-info">Location: ${item.address}</div>
      <a href="review.html" class="review-button">Leave a Review</a>
  `;

  // Append the new history card to the history container
  historyContainer.appendChild(historyCard);
}

const convertTo24Hour = (datetimeStr) => {
  // Create a Date object from the ISO string
  const dateObj = new Date(datetimeStr);

  // Extract date in the format YYYY-MM-DD
  const datePart = dateObj.toISOString().split("T")[0];

  // Extract time in the format HH:MM (and optionally AM/PM)
  let timePart = dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return timePart;
};

const getDate = (dateTimeStr) => {
  const dateObj = new Date(dateTimeStr);
  const datePart = dateObj.toISOString().split("T")[0];
  return datePart;
};

const showNotification = () => {
  var notification = document.getElementById("notification");
  notification.classList.add("show");

  // Hide the notification after 5 seconds
  setTimeout(function () {
    notification.classList.remove("show");
  }, 5000);
};

const closeNotification = () => {
  var notification = document.getElementById("notification");
  notification.classList.remove("show");
};

$(document).ready(() => {
  let userId = window.location.search.replace("?", "").split("=")?.[1] || 1;

  fetchAndDisplayBookings(userId);
});
