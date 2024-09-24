document.getElementById('reviewForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const reviewData = {
        sitterName: document.getElementById('sitterName').value,
        rating: document.getElementById('rating').value,
        comment: document.getElementById('comment').value,
    };

    try {
        const response = await fetch('/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Review submitted:', result);
            // Optionally, clear the form or display success message
            document.getElementById('reviewForm').reset(); // Clear form
        } else {
            console.error('Error submitting review:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

async function loadReviews() {
    const response = await fetch('/reviews');
    const reviews = await response.json();

    const reviewSection = document.getElementById("reviewsContainer");
    reviewSection.innerHTML = ""; // Clear existing reviews

    reviews.forEach((review) => {
        const reviewDiv = document.createElement("div");
        reviewDiv.innerHTML = `<strong>${review.sitterName}</strong> (Rating: ${review.rating})<br>${review.comment}`;
        reviewSection.appendChild(reviewDiv);
    });
}

// Call loadReviews when the page loads
window.onload = loadReviews;
