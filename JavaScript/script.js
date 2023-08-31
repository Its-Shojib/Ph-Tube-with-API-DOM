let handleCategory = async () => {
    let response = await fetch(
        "https://openapi.programming-hero.com/api/videos/categories"
    );
    let data = await response.json();
    let categories = data.data;
    let tabContainer = document.getElementById("tab-container");
    categories.forEach((category) => {
        let div = document.createElement("div");
        div.innerHTML = `
          <a onclick="tabLoad('${category.category_id}')" class="tab bg-gray-300 mx-3 my-1 rounded-lg text-black">${category.category}</a>
          `;
        tabContainer.appendChild(div);
    });
};


let tabLoad = async (categoryId) => {
    let response = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    let data = await response.json();
    let items = data.data;
    console.log(items);
    Sort(categoryId);
    setData(items)

}
let Sort = async (id) => {
        let res = await fetch(
            `https://openapi.programming-hero.com/api/videos/category/${id}`
        );
        let data = await res.json();
        let items2 = data.data;
        document.getElementById("sort-btn").addEventListener("click", async function () {
            setData(items2.sort(byID));
            function byID(a, b) {
                return parseInt(b.others.views) - parseInt(a.others.views)
            }
        });
}
// Set the data to container
function setData(items) {
    let cardContainer = document.getElementById("card-container");
    let drawingContainer = document.getElementById("drawing-container");
    cardContainer.innerHTML = "";
    drawingContainer.innerHTML = "";
    if (items.length === 0) {
        let div = document.createElement("div");
        div.innerHTML = `
       <img class="text-center mx-auto" src="./Asset/Icon.png"> <br> <br>
       <p class="text-3xl text-center ">Oops!! Sorry, There is no content here</p>
       `;
        drawingContainer.appendChild(div);

    }
    else {
        items.forEach((item) => {
            let timeInSec = parseInt(item.others?.posted_date);
            let minutes = parseInt(timeInSec / 60);
            let hour = parseInt(minutes / 60);
            minutes = minutes % 60;
            let time = `${hour}hrs ${minutes} min ago`


            let div = document.createElement("div");
            div.innerHTML = `
            <div class="card h-84 rounded-xl bg-purple-100 relative">
                <figure class="px-5 pt-5">
                    <img class="w-full h-40" src="${item.thumbnail}" alt="Ph-image" class="rounded-xl" />
                </figure>
                <span class="text-sm bg-black text-white absolute  bottom-[185px] right-8">${item.others?.posted_date ? `${time}` : ""}</span>
                <div class="card-body flex flex-row justify-start gap-5">
                    <img src="${item.authors['0']?.profile_picture}" class="rounded-2xl w-10 h-10">
                    <div>
                        <h2 class="font-bold h-10">${item.title}</h2>
                        <span class="text-sm text-gray-400">${item.authors['0']?.profile_name} ${item.authors['0']?.verified ? "<img class='inline' src='./JavaScript/fi_10629607.svg'>" : ""}</span>
                        <br><br>
                        <p><span id="view-count">${item.others.views}</span> views</p>
                    </div>
                </div>
            </div>`;
            cardContainer.appendChild(div);
        })
    }
}

handleCategory();
tabLoad("1000");