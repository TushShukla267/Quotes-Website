const apiKey = "sK85UvTSuRNuxT4piMGbsA==0zlA5GCtc4FUkOiz";

async function Facts() {
  const factElement = document.querySelector(".Facts-text");
  factElement.innerHTML = "<img src='Hourglass.gif' alt='Loading...'/>";

  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/facts`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey,
        },
      }
    );

    if (response.ok) {
      const facts = await response.json();
      console.log(facts);

      const fact = facts[0].fact;
      console.log(fact);

      // Clear previous animations
      factElement.style.animation = "none";
      factElement.innerHTML = "";


      // Split fact into words
      const words = fact.split(" ");

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        factElement.innerHTML += `${word}`;
        if (i < words.length - 1) {
          factElement.innerHTML += " "; // Add space between words
        }
        await new Promise(resolve => setTimeout(resolve, 200)); // Adjust timing here (200ms per word)
      }

      factElement.style.animation = "none";
      setTimeout(() => {
        factElement.style.animation = "";
      }, 20);


      document.getElementById('Fact').innerHTML = fact;
    } else {
      console.error(`Error: ${response.status} ${response.statusText}`);
      factElement.innerHTML = "Sorry, there was an error fetching the Fact.";
    }
  } catch (error) {
    console.error("Error fetching the fact:", error);
    factElement.innerHTML = "Sorry, there was an error fetching the Fact.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".Facts-text").innerText = "Hi, Get Daily Facts Here!!!";
  window.setTimeout(() => {
    document.getElementById('alert').innerHTML = "<div class='alert alert-success d-flex justify-content-center align-items-center' role='alert' style='margin: 0 auto; height: 75px; padding: 0 15px; text-align: center;'>Search Daily Random Facts you want!</div>";
  }, 1400);

  window.setTimeout(() => {
    document.getElementById('alert').innerHTML = "";
  }, 5000);

});

document.getElementById('Get-btn').addEventListener('click', (event) => {
  event.preventDefault();
  Facts();
});
