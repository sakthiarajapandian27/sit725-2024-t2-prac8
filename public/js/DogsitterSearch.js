document.getElementById('searchdogsitter').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const location = document.getElementById('searchLocation').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>Loading...</p>'; // Show loading indicator

    try {
        const response = await fetch(`/api/search?location=${encodeURIComponent(location)}`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${errorText}`);
        }

        const results = await response.json();

        if (results.length === 0) {
            resultsDiv.innerHTML = '<p>No results found.</p>';
        } else {
            resultsDiv.innerHTML = results.map(result => `
                <div>
                    <h3>${result.firstName} ${result.lastName}</h3>
                    <p>${result.address}, ${result.suburb}, ${result.postalCode}</p>
                    <p>Email: ${result.email}</p>
                    <p>Phone: ${result.phone}</p>
                </div>
            `).join('');
        }
    } catch (err) {
        console.error('Error fetching search results:', err);
        resultsDiv.innerHTML = '<p>An error occurred while fetching results. Please try again later.</p>';
    }
});