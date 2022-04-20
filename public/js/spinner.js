const spinner = document.querySelector(".lds-roller");
const form = document.querySelector(".searchForm")
const a = document.querySelector(".toDetails")

if (form) {
    form.addEventListener("submit", () => {
        spinner.style.display = "inline-block";
        spinner.style.flexDirecton = "center";
        spinner.style.alignItems = "center";
    })
}

if (a) {
    a.addEventListener("click", () => {
        spinner.style.display = "flex";
        spinner.style.flexDirecton = "center";
        spinner.style.alignItems = "center";
    })
}
