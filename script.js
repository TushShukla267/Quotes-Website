const categoryList = [
  'age', 'alone', 'amazing', 'anger', 'architecture', 'art', 'attitude', 'beauty', 'best', 'birthday', 'business',
  'car', 'change', 'communication', 'computers', 'cool', 'courage', 'dad', 'dating', 'death', 'design', 'dreams',
  'education', 'environmental', 'equality', 'experience', 'failure', 'faith', 'family', 'famous', 'fear', 'fitness',
  'food', 'forgiveness', 'freedom', 'friendship', 'funny', 'future', 'god', 'good', 'government', 'graduation', 'great',
  'happiness', 'health', 'history', 'home', 'hope', 'humor', 'imagination', 'inspirational', 'intelligence', 'jealousy',
  'knowledge', 'leadership', 'learning', 'legal', 'life', 'love', 'marriage', 'medical', 'men', 'mom', 'money', 'morning',
  'movies', 'success'
];

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
  
  // Check if search input is not empty
  if (category.trim() !== "") {
    Quotes(category);
  } 
}


const apiKey = "sK85UvTSuRNuxT4piMGbsA==0zlA5GCtc4FUkOiz";

async function Quotes(category) {
  const quoteElement = document.querySelector(".quote-text");
  quoteElement.innerHTML = "<img src='Hourglass.gif' alt='Loading...'/>";
  document.querySelector(".card-text").innerText = "- Author"; // Clear previous author

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
      const quote = quotes[0].quote;
      const author = quotes[0].author;

      // Clear previous animations
      quoteElement.style.animation = "none";
      quoteElement.innerHTML = "";

      // Opening quote before the quote starts
      const qouteopen = "<sup><img src='openQoute-removebg-preview.png' height='30px'></sup>";

      // Split quote into words
      const words = quote.split(" ");

      // Construct the quote with words and spaces
      quoteElement.innerHTML = qouteopen; // Start with opening quote

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        quoteElement.innerHTML += `${word}`;
        if (i < words.length - 1) {
          quoteElement.innerHTML += " "; // Add space between words
        }
        await new Promise(resolve => setTimeout(resolve, 200)); // Adjust timing here (300ms per word)
      }

      // Closing quote after the quote ends
      const qouteclose = "<sup><img src='closeQoutes-removebg-preview.png' height='30.5px'></sup>";
      quoteElement.innerHTML += qouteclose;

      // Add author and category details
      document.querySelector(".card-text").innerText = `-${author}`;
      document.querySelector(".card-header").innerText = `Quotes on ${category}`;

      // Remove caret animation after typing
      quoteElement.style.animation = "none";
      setTimeout(() => {
        quoteElement.style.animation = "";
      }, 20);

      // Setup next quote button functionality
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
  }, 5000);

  // Pull to refresh implementation for mobile
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    let startY = 0;
    let endY = 0;

    document.addEventListener('touchstart', (event) => {
      startY = event.touches[0].pageY;
    });

    document.addEventListener('touchmove', (event) => {
      endY = event.touches[0].pageY;
    });

    document.addEventListener('touchend', () => {
      if (startY < endY && (endY - startY) > 50) {
        location.reload();
      }
    });
  }

  // Collapse navbar after clicking a link on mobile
  $(document).on('click', '.navbar-collapse.show', function (e) {
    if ($(e.target).is('a') || $(e.target).is('button')) {
      $(this).collapse('hide');
    }
  });
});
