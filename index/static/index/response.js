document.addEventListener("DOMContentLoaded", () => {
    document.body.style.backgroundColor =  document.querySelector("#bg-color").innerHTML;
    document.body.style.color =  document.querySelector("#text-color").innerHTML;
    document.querySelectorAll(".txtClr").forEach(element => {
        element.style.color = document.querySelector("#text-color").innerHTML;
    })
})