// https://openapi.programming-hero.com/api/phones?search=${searchText}
// https://openapi.programming-hero.com/api/phone/${id}

const phoneContainer = document.getElementById("phone-container");

const searchPhone = () => {
  const inputField = document.getElementById("input-search");
  const inputText = inputField.value;
  fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
    .then((res) => res.json())
    .then((result) => showPhone(result));
};
const showPhone = (result) => {
  if (result.status) {
    // console.log(result.data);
    removeAllChild(phoneContainer);
    result.data.forEach((phone) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
        <div class="p-4 shadow bg-body rounded rounded-3">
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
  }
  console.log(result);
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
  if (event.keyCode === 13) {
    document.getElementById("button-search").click();
  }
});
