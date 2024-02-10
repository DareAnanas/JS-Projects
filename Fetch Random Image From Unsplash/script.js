document.addEventListener('DOMContentLoaded', () => {
    const unsplashUrl = 'https://source.unsplash.com/random'; // Unsplash random image URL

    // Fetch the image
    fetch(unsplashUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.url; // Extract the image URL from the response
        })
        .then(imageUrl => {
            // Set the image source
            document.getElementById('unsplashImage').src = imageUrl;
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
});