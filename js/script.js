// https://openapi.programming-hero.com/api/phones?search=${searchText}
// https://openapi.programming-hero.com/api/phone/${id}

// Selecting HTML Element BY DOM

const phoneContainer = document.getElementById("phone-container");
const emptyState = document.getElementById("empty-state");
const spinner = document.getElementById("spinner");
const showAllBtn = document.getElementById("show-all-btn");
const modalBody = document.getElementById("modal-body");
// Search Phone

const searchPhone = () => {
  showElement(spinner, true);

  const inputField = document.getElementById("input-search");
  const inputText = inputField.value.toLowerCase();
  inputField.value = "";
  fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
    .then((res) => res.json())
    .then((result) => showPhone(result));
};

// Show Phone In HTML

const showPhone = (result) => {
  removeAllChild(phoneContainer);
  showElement(showAllBtn, false);

  const totalResult = result.data.length;
  console.log(totalResult);

  if (result.status) {
    showElement(emptyState, false);
    if (totalResult > 20) {
      printPhoneLoop(result.data, 0, 20);
      showElement(showAllBtn, true);
      showAllBtn.addEventListener("click", function () {
        printPhoneLoop(result.data, 20, totalResult);
        showElement(showAllBtn, false);
      });
    } else {
      printPhoneLoop(result.data, 0, totalResult);
    }
  } else {
    showElement(emptyState, true);
  }
  showElement(spinner, false);
};

// Print Phone Card

const printPhoneLoop = (phones, startInd, endInd) => {
  for (let i = startInd; i < endInd; i++) {
    const phone = phones[i];
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
              onclick="showDetails('${phone.slug}')"
              id="show-details-btn"
              class="btn btn-outline-primary d-block w-75 mx-auto py-2 fw-bold"
              data-bs-toggle="modal"
              data-bs-target="#phoneDetails"
            >
              View Details
            </button>
          </div>
      `;
    phoneContainer.appendChild(div);
  }
};

// Get Phone Data By Id
const showDetails = (id) => {
  showElement(spinner, true);
  removeAllChild(modalBody);
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => showModal(result.data));
};

// Showing Modal Window
const showModal = (phone) => {
  console.log(phone);
  const mContainer = document.createElement("div");
  mContainer.classList.add("container");
  mContainer.innerHTML = `
    
                <div class="row gx-0 gx-lg-5 gy-5">
                  <div class="col col-12 col-lg-5">
                    <div class="bg-light">
                      <img
                        class="d-block w-75 p-4 mx-auto"
                        src="${phone.image}"
                        alt="Phone Image"
                      />
                    </div>
                  </div>
                  <div class="col col-12 col-lg-7">
                    <h2>${phone.name}</h2>
                    <p class="text-primary text-capitalize">
                      ${
                        phone.releaseDate
                          ? phone.releaseDate
                          : "Release Date Not Found"
                      }
                    </p>
                    <hr />
                    <table class="table table-striped table-bordered">
                      <h5 class="text-secondary fw-bold mt-4 mb-3">
                        Main Features
                      </h5>
                      <tbody>
                      ${printSpecs(phone.mainFeatures)}
                      </tbody>
                    </table>
                    <table class="table table-striped table-bordered">
                      <h5 class="text-secondary fw-bold mt-4 mb-3">
                        Other Features
                      </h5>
                      <tbody>
                      ${printSpecs(phone.others)}
                      </tbody>
                    </table>
                  </div>
                </div>
              
  `;
  showElement(spinner, false);

  modalBody.appendChild(mContainer);
};

// Print Specs in Table

const printSpecs = (specs) => {
  let tRows = "";
  if (!specs) {
    return "No Other Feature Found";
  } else {
    for (const spec in specs) {
      if (Array.isArray(specs[spec])) {
        tRows += `
        <tr>
            <th class="text-capitalize pe-5 ps-3">${spec}</th>
            <td>${specs[spec].join(", ")}</td>
        </tr>
      `;
      } else {
        tRows += `
        <tr>
            <th class="text-capitalize pe-5 ps-3">${spec}</th>
            <td>${specs[spec]}</td>
        </tr>
      `;
      }
    }
    return tRows;
  }
};

// Toggle Visibility

const showElement = (element, isVisible) => {
  if (isVisible) {
    element.classList.remove("d-none");
    // console.log(element, isVisible);
  } else {
    element.classList.add("d-none");
    // console.log(element, isVisible);
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

// document.getElementById("show-details-btn").click();
