const header = document.querySelector(".header");

const pagination = document.querySelector(".pagination");

const card_container = document.querySelector(".card-container");

const fetchData = async () => {
  try {
    header.textContent = "Loading...";
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const result = await response.json();

    const resultsPerPage = 18;

    const pageCount = generatePageNumbers(result, resultsPerPage);

    const createPageButton = pageCount.map((btnNumber) => {
      const button = document.createElement("button");
      button.classList.add("btn");
      button.innerText = btnNumber;
      pagination.appendChild(button);

      return button;
    });

    const pageResultData = pageResult(result, (pageValue = 1), resultsPerPage);
    countryDisplay(pageResultData);

    const page = createPageButton.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const pageValue = e.currentTarget.textContent;

        // #####################################

        const pageResultData = pageResult(result, pageValue, resultsPerPage);

        card_container.innerHTML = "";

        countryDisplay(pageResultData);
      });
    });
  } catch (error) {
    console.error(error);
  }
};
fetchData();

const generatePageNumbers = (data, resultsPerPage) => {
  pageNumbers = [];
  const length = data.length;
  const pageCount = Math.ceil(length / resultsPerPage);

  for (i = 0; i < pageCount; i++) {
    pageNumbers.push(i + 1);
  }

  return pageNumbers;
};

const pageResult = (data, pageNumber, resultsPerPage) => {
  const start = (pageNumber - 1) * resultsPerPage;
  const end = start + resultsPerPage;
  const pageData = data.slice(start, end);
  return pageData;
};

const createPageButton = (page_count) => {
  return page_count.map((btnNumber) => {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = btnNumber;
    pagination.appendChild(button);
    console.log(page_count);
  });
};

const countryDisplay = (data) => {
  data.map((data) => {
    const { capital, flags, name } = data;
    const flag = flags.png;
    const country = name.common;

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<img src=${flag} alt=${country} class="image" />
  <h4 class="country">${country}</h4>`;

    card_container.appendChild(card);

    return card_container;
  });
  header.textContent = "Countries";
};
