const tootleLoading = (displayStyle) => {
  document.getElementById("loading").style.display = displayStyle;
};

const tootleSearchResult = (displayStyle) => {
  document.getElementById("search-container").style.display = displayStyle;
};

const tootleResultCount = (displayStyle) => {
  document.getElementById("search-result-count").style.display = displayStyle;
};

const tootleNoResult = (displayStyle) => {
  document.getElementById("noResult-message").style.display = displayStyle;
};

const tootleNoText = (displayStyle) => {
  document.getElementById("noText-Input").style.display = displayStyle;
};

const searchBook = () => {
  const searchInput = document.getElementById("search-input");
  const noTextInput = document.getElementById("noText-Input");

  const searchText = searchInput.value;

  // display loading
  tootleLoading("block");
  tootleSearchResult("none");
  tootleResultCount("none");
  tootleNoResult("none");
  tootleNoText("none");

  // Crear data text content and value
  searchInput.value = "";
  noTextInput.textContent = "";

  // consition use when search empty
  if (searchText === "") {
    const div = document.createElement("div");

    div.innerHTML = `
            <p class="noText-Input">Please type your book name.</p>
            `;
    noTextInput.appendChild(div);

    tootleLoading("none");
    tootleSearchResult("none");
    tootleResultCount("none");
    tootleNoResult("none");
    tootleNoText("block");
  } else {
    // Load data

    const URL = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(URL)
      .then((res) => res.json())
      .then((data) => displayBook(data.docs));
  }
};

const displayBook = (result) => {
  const searchResult = document.getElementById("search-container");
  const searchResultCount = document.getElementById("search-result-count");
  const noResult = document.getElementById("noResult-message");

  // Crear data text content
  searchResult.textContent = "";
  searchResultCount.textContent = "";
  noResult.textContent = "";

  // condition use when result not found

  if (result.length === 0) {
    const div = document.createElement("div");

    div.innerHTML = `
        <p class="noResult-message">No books found.</p>
        `;
    noResult.appendChild(div);

    tootleLoading("none");
    tootleSearchResult("none");
    tootleResultCount("none");
    tootleNoResult("block");
    tootleNoText("none");
  } else {
    // Search result count
    const div = document.createElement("div");
    div.classList.add("result-count");
    div.innerHTML = `
    <div>
    <h3>${result.length} / ${result.length}</h3>
    </div>
    `;
    searchResultCount.appendChild(div);

    // card data show useing forEach
    result.forEach((data) => {
      const div = document.createElement("div");
      div.classList.add("card-col");
      div.innerHTML = `
      
    <div >
    <img class="card-col-img"
        src="https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg"
        alt="image" />
        <p class="card-col-p"><span>Book Name: </span>${data.title}</p>
    <p class="card-col-p"><span>Author Name: </span>${data.author_name}</p>
    <p class="card-col-p"><span>First publish year: </span>${data.first_publish_year}</p>
</div>
      
      `;
      searchResult.appendChild(div);
    });

    tootleLoading("none");
    tootleSearchResult("flex");
    tootleResultCount("block");
    tootleNoResult("block");
    tootleNoText("block");
  }
};
