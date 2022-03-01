// https://openapi.programming-hero.com/api/phones?search=${searchText}
// https://openapi.programming-hero.com/api/phone/${id}

const phoneContainer = document.getElementById("phone-container");
const emptyState = document.getElementById("empty-state");
const spinner = document.getElementById("spinner");

const searchPhone = () => {
  showElement(spinner, true);
  setTimeout(function () {
    console.log("I am the third log after 5 seconds");
  }, 5000);

  const inputField = document.getElementById("input-search");
  const inputText = inputField.value;
  fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
    .then((res) => res.json())
    .then((result) => showPhone(result));

  // showElement(spinner, false);
};
const showPhone = (result) => {
  removeAllChild(phoneContainer);
  if (result.status) {
    showElement(emptyState, false);

    // console.log(result.data);
    result.data.forEach((phone) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
        <div class="p-4 shadow-sm bg-body rounded rounded-3">
            <div class="bg-light">
              <img
                class="img-fluid mx-auto w-50 d-block py-4"
                src="${phone.image}"
              />
            </div>
            <h4 class="text-center mt-3 mb-2">${phone.phone_name}</h4>
            <h5 class="text-center mb-4 text-secondary">${phone.brand}</h5>
            <button
              type="button"
              class="btn btn-outline-primary d-block w-75 mx-auto py-2 fw-bold"
              data-bs-toggle="modal"
              data-bs-target="#foodDetails53043"
            >
              View Details
            </button>
          </div>
      `;
      phoneContainer.appendChild(div);
    });
  } else {
    console.log("empty");
    showElement(emptyState, true);
  }
  console.log(result);
  showElement(spinner, false);
};

// Toggle Visibility

const showElement = (element, isVisible) => {
  if (isVisible) {
    element.classList.remove("d-none");
    console.log(element, isVisible);
  } else {
    element.classList.add("d-none");
    console.log(element, isVisible);
  }
};

// Remove Child Nodes
const removeAllChild = (parent) => {
  var first = parent.firstElementChild;
  while (first) {
    first.remove();
    first = parent.firstElementChild;
  }
};

// Add event listener for enter key

document.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("button-search").click();
  }
});
