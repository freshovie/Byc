function getProducts() {
  const mentos = document.querySelector(".mentos");
  const mentos2 = document.querySelector(".mentos2");
  const mentos3 = document.querySelector(".mentos3");
  const mentos4 = document.querySelector(".mentos4");

  const url = "http://localhost:1600/api/products";

  const methodProduct = {
    method: "GET",
  };

  let data = [];

  fetch(url, methodProduct)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      result.map((item) => {
        if (item[0]) {
          active = "active";
        }
        data += `
      <div class="col-sm-12 col-md-12 col-lg-3">
        <div class="card">
          <img src="${item.image[0]}" alt="">
          <div class="card-body">
              <p><strong>${item.name}</strong></p>
              <p>${item.code}</p>
              <p class="coloring">${item.description}</p>
              <p>$${item.price}</p>
              <div class="starlight">
                  <div class="imgs">
              <img src="/Assets/star.png" alt="">
              <img src="/Assets/star.png" alt="">
              <img src="/Assets/star.png" alt="">
              <img src="/Assets/star.png" alt="">
              <img src="/Assets/star-half.png" alt=""> 
                  </div>
                  <p>4.05</p>
              </div>
          </div>
          <div class="clickbtn">
              <button class="wishlist">
              <i class="fa-regular fa-pen-to-square"></i>
                  Edit
              </button>
              <button class="buynow">
              <i class="fa-solid fa-trash"></i>
                  Delete
              </button>
          </div>
      </div>
      </div>
      `;
      });
      mentos.innerHTML = data;
      mentos2.innerHTML = data;
      mentos3.innerHTML = data;
      mentos4.innerHTML = data;
    });
}

getProducts();

function wishProducts() {
  const carouselItem = document.querySelector(".smallCar");
  const carouselItem1 = document.querySelector(".smallCar2");
  const carouselItem2 = document.querySelector(".smallCar3");
  const carouselItem3 = document.querySelector(".smallCar4");

  console.log(carouselItem);
  const url = "http://localhost:1600/api/products";

  const methodProduct = {
    method: "GET",
  };

  let data = [];
  let active = "";

  fetch(url, methodProduct)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      result.map((item, idx) => {
        data += `
        <div class="carousel-item ${idx === 0 && "active"}">
        <div class="card">
          <img src="${item.image[0]}" alt="">
          <div class="card-body">
              <p><strong>${item.name}</strong></p>
              <p>${item.code}</p>
              <p class="coloring">${item.description}</p>
              <p>$${item.price}</p>
              <div class="starlight">
                  <div class="imgs">
              <img src="/Assets/star.png" alt="">
              <img src="/Assets/star.png" alt="">
              <img src="/Assets/star.png" alt="">
              <img src="/Assets/star.png" alt="">
              <img src="/Assets/star-half.png" alt=""> 
                  </div>
                  <p>4.05</p>
              </div>
          </div>
          <div class="clickbtn">
              <button class="wishlist">
              <i class="fa-regular fa-pen-to-square"></i>
                  Edit
              </button>
              <button class="buynow">
              <i class="fa-solid fa-trash"></i>
                  Delete
              </button>
          </div>
      </div>
      </div>
      `;
      });
      carouselItem.innerHTML += data;
      carouselItem1.innerHTML += data;
      carouselItem2.innerHTML += data;
      carouselItem3.innerHTML += data;
    });
}

wishProducts();