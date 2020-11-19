document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#nav-ham").addEventListener("click", () => {
        document.querySelector("#sidebar").style.width = "250px";
    })
    document.querySelector("#close-sidebar").addEventListener('click', () => {
        document.querySelector("#sidebar").style.width = "0px";
    })
    document.querySelector("#create-blank-form").addEventListener("click", () => {
        const csrf = Cookies.get('csrftoken');
        fetch('/form/create', {
            method: "POST",
            headers: {'X-CSRFToken': csrf},
            body: JSON.stringify({
                title: "Untitled form"
            })
        })
        .then(response => response.json())
        .then(result => {
            window.location = `/form/${result.code}`
        })
    })
})