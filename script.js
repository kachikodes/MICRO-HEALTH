const wrapper = document.querySelector(".wrapper"),
  selectBtn = wrapper.querySelector(".select-btn"),
  searchInp = wrapper.querySelector("input"),
  options = wrapper.querySelector(".options");

var globalPlan;

let countries = [
  "Individual Plan (&#8358;12,000)",
  "Family Plan (&#8358;72,000)",
];

function addCountry(selectedCountry) {
  options.innerHTML = "";
  countries.forEach((country) => {
    let isSelected = country == selectedCountry ? "selected" : "";
    let li = `<li onclick="updateName(this)" class="${isSelected}">${country}</li>`;
    options.insertAdjacentHTML("beforeend", li);
  });
}
addCountry();

function updateName(selectedLi) {
  // searchInp.value = "";
  addCountry(selectedLi.innerText);
  wrapper.classList.remove("active");
  selectBtn.firstElementChild.innerText = selectedLi.innerText;

  globalPlan = selectedLi.innerText;
  console.log(globalPlan);
}

// searchInp.addEventListener("keyup", () => {
//     let arr = [];
//     let searchWord = searchInp.value.toLowerCase();
//     arr = countries.filter(data => {
//         return data.toLowerCase().startsWith(searchWord);
//     }).map(data => {
//         let isSelected = data == selectBtn.firstElementChild.innerText ? "selected" : "";
//         return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
//     }).join("");
//     options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops! Country not found</p>`;
// });

selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));

let next = document.querySelector(".next");
let previous = document.querySelector(".previous");

next.addEventListener("click", (evt) => {
  document.querySelectorAll("fieldset")[0].style = "display:none";
  document.querySelectorAll("fieldset")[1].style = "display:block";
});

previous.addEventListener("click", (evt) => {
  document.querySelectorAll("fieldset")[1].style = "display:none";
  document.querySelectorAll("fieldset")[0].style = "display:block";
});

function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "view more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "view less";
    moreText.style.display = "inline";
  }
}

function onPlan() {
  console.log(globalPlan);
  let custom__plan = document.getElementById("custom__plan");
  let from__one = document.getElementById("from__one");
  let from__two = document.getElementById("from__two");
  if (globalPlan == "Individual Plan (₦12,000)") {
    custom__plan.style.display = "none";
    from__one.style.display = "block";
    from__two.style.display = "none";
  } else if (globalPlan == "Family Plan (₦72,000)") {
    custom__plan.style.display = "none";
    from__one.style.display = "none";
    from__two.style.display = "block";
  } else {
    alert("Sorry Invalid Process");
  }
}

function onPrevious(data) {
  // console.log('thank you Jesus')
  let custom__plan = document.getElementById("custom__plan");
  let from__one = document.getElementById("from__one");
  let from__two = document.getElementById("from__two");
  let success = document.getElementById("success");
  if (data == "one") {
    custom__plan.style.display = "block";
    from__one.style.display = "none";
    from__two.style.display = "none";
  } else {
    custom__plan.style.display = "block";
    from__one.style.display = "none";
    from__two.style.display = "none";
  }
  if (data == "success") {
    custom__plan.style.display = "block";
    from__one.style.display = "none";
    from__two.style.display = "none";
    success.style.display = "none";
  }
}


function fetchData() {
  fetch("/asset.json")
    .then((res) => res.json())
    .then((response) => {
      const selecting = document.getElementById("table_preferred");
      selecting.innerHTML = "";
      response.LIST.forEach((r, index) => {
        let li = `
        <tr data-bs-dismiss="modal" onclick="onSelectedData('${r.providerName}')">
          <th scope="row">${++index}</th>
          <td>${r.providerName}</td>
          <td>${r.coverageType}</td>
          <td>${r.address}</td>
          <td>${r?.cityTown? r.cityTown: '-'}</td>
          <td>${r?.state? r?.state:'-'}</td>
        </tr>
        `;
        selecting.insertAdjacentHTML("beforeend", li);
      });
    })
    .catch((error) => console.error("Error:", error));
}
fetchData();




function onSelectedData(event) {
  // console.log(event)
  let data = document.getElementById("hospital_one");
  data.value = event;
  return;
}

