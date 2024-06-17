const apiKey = "sK85UvTSuRNuxT4piMGbsA==0zlA5GCtc4FUkOiz";

async function Facts() {
  const quoteElement = document.querySelector(".Facts-text");
  quoteElement.innerHTML = "<img src='Hourglass.gif' alt='Loading...'/>";

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
      const Facts = await response.json();
      console.log(Facts);

      const fact = Facts[0].fact;
      console.log(fact);

      document.getElementById('Fact').innerHTML = fact;
    } else {
      console.error(`Error: ${response.status} ${response.statusText}`);
      quoteElement.innerHTML = "Sorry, there was an error fetching the Fact.";
    }
  } catch (error) {
    console.error("Error fetching the quote:", error);
    quoteElement.innerHTML = "Sorry, there was an error fetching the Fact.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".Facts-text").innerText = "Hi , Get Daily Facts Here!!!";
  window.setTimeout(() => {
    document.getElementById('alert').innerHTML = "<div class='alert alert-success d-flex justify-content-center align-items-center' role='alert' style='margin: 0 auto; height: 75px; padding: 0 15px; text-align: center;'>Search Daily Random Facts you want!</div>";
}, 1400);

  window.setTimeout(()=>{
    document.getElementById('alert').innerHTML = "";
  }, 5000)
});

document.getElementById('Get-btn').addEventListener('click' , (event)=>{
     event.preventDefault();
     Facts();
});