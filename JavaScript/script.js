const handleCategory = async () => {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await response.json();
    let categories = data.data;
      const tabContainer = document.getElementById("tab-container");
      console.log(categories);
      categories.forEach((category) => {
      const div = document.createElement("div");
      div.innerHTML = `
          <a class="tab bg-gray-300 mx-3 my-1 rounded-lg text-black">${category.category}</a>
          `;
      tabContainer.appendChild(div);
    });
  };
handleCategory();