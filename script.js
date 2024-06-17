const categoryList = ['age', 'alone', 'amazing', 'anger', 'architecture', 'art', 'attitude', 'beauty', 'best', 'birthday', 'business', 'car', 'change', 'communication', 'computers', 'cool', 'courage', 'dad', 'dating', 'death', 'design', 'dreams', 'education', 'environmental', 'equality', 'experience', 'failure', 'faith', 'family', 'famous', 'fear', 'fitness', 'food', 'forgiveness', 'freedom', 'friendship', 'funny', 'future', 'god', 'good', 'government', 'graduation', 'great', 'happiness', 'health', 'history', 'home', 'hope', 'humor', 'imagination', 'inspirational', 'intelligence', 'jealousy', 'knowledge', 'leadership', 'learning', 'legal', 'life', 'love', 'marriage', 'medical', 'men', 'mom', 'money', 'morning', 'movies', 'success'];

document.getElementById("Random").addEventListener("click", GetRandomCategory);

function GetRandomCategory() {
  const category = categoryList[Math.floor(Math.random() * categoryList.length)];
  console.log(category);
  Quotes(category);
}

document.querySelectorAll(".para").forEach((element) => {
  element.addEventListener("click", () => {
    const category = element.getAttribute("data-category");
    myFunction(category);
  });
});

function myFunction(category) {
  Quotes(category);
}

document.getElementById("searchbtn").addEventListener("click", GetCategory);

document.getElementById("search").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    GetCategory();
  }
});

function GetCategory() {
  const searchInput = document.getElementById("search").value;
  const category = searchInput.toLowerCase();
  Quotes(category);
}

const apiKey = "sK85UvTSuRNuxT4piMGbsA==0zlA5GCtc4FUkOiz";

async function Quotes(category) {
  const quoteElement = document.querySelector(".quote-text");
  quoteElement.innerHTML = "<img src='Hourglass.gif' alt='Loading...'/>";

  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/quotes?category=${category}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey,
        },
      }
    );

    if (response.ok) {
      const quotes = await response.json();
      console.log(quotes);

      const quote = quotes[0].quote;
      console.log(quote);

      const author = quotes[0].author;
      console.log(author);

      quoteElement.innerHTML = `<sup><img src='openQoute-removebg-preview.png' height='30px'></sup>${quote}<sup><img src='closeQoutes-removebg-preview.png' height='30.5px'></sup>`;
      document.querySelector(".card-text").innerText = `-${author}`;
      document.querySelector(".card-header").innerText = `Quotes on ${category}`;

      document.getElementById("btn").onclick = () => NextQuote(category);
    } else {
      console.error(`Error: ${response.status} ${response.statusText}`);
      quoteElement.innerHTML = "Sorry, there was an error fetching the quote.";
    }
  } catch (error) {
    console.error("Error fetching the quote:", error);
    quoteElement.innerHTML = "Sorry, there was an error fetching the quote.";
  }
}

function NextQuote(category) {
  Quotes(category);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".quote-text").innerText = "Hi, Select any Category you want to see Quotes of";
  window.setTimeout(() => {
    document.getElementById('alert').innerHTML = "<div class='alert alert-success d-flex justify-content-center align-items-center' role='alert' style='margin: 0 auto; height: 75px; padding: 0 15px; text-align: center;'>Search Quotes of whichever Category you want!</div>";
}, 1400);

  window.setTimeout(()=>{
    document.getElementById('alert').innerHTML = "";
  }, 5000)
});
