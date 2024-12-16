document.getElementById('getForecast').addEventListener('click', async () => {
  const zipCode = document.getElementById('zipCode').value.trim();
  const apiKey = '2f1aff27b5004a67baa161308241412'; // Replace with your WeatherAPI key
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${zipCode}&days=7`;

  try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Invalid ZIP Code or API Error');

      const data = await response.json();
      const forecastDiv = document.getElementById('forecast');
      forecastDiv.innerHTML = ''; // Clear previous results

      // Display forecast for each day
      data.forecast.forecastday.forEach(day => {
          const date = new Date(day.date).toLocaleDateString();
          const highTemp = Math.round(day.day.maxtemp_f);
          const lowTemp = Math.round(day.day.mintemp_f);
          const condition = day.day.condition.text;
          const icon = day.day.condition.icon;

          // Create a weather card
          const card = document.createElement('div');
          card.className = 'weather-card';
          card.innerHTML = `
              <h3>${date}</h3>
              <img src="${icon}" alt="${condition}">
              <p><strong>High:</strong> ${highTemp} °F</p>
              <p><strong>Low:</strong> ${lowTemp} °F</p>
              <p>${condition}</p>
          `;
          forecastDiv.appendChild(card);
      });
  } catch (error) {
      alert(error.message);
  }
});
