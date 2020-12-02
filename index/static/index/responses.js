document.addEventListener("DOMContentLoaded", () => {
    const csrf = Cookies.get('csrftoken');
    document.body.style.backgroundColor =  document.querySelector("#bg-color").innerHTML;
    document.body.style.color =  document.querySelector("#text-color").innerHTML;
    document.querySelector("#customize-theme-btn").addEventListener('click', () => {
        document.querySelector("#customize-theme").style.display = "block";
        document.querySelector("#close-customize-theme").addEventListener('click', () => {
            document.querySelector("#customize-theme").style.display = "none";
        })
        window.onclick = e => {
            if(e.target == document.querySelector("#customize-theme")) document.querySelector("#customize-theme").style.display = "none";
        }
    })
    document.querySelector("#input-bg-color").addEventListener("input", function(){
        document.body.style.backgroundColor = this.value;
        fetch('edit_background_color', {
            method: "POST",
            headers: {'X-CSRFToken': csrf},
            body: JSON.stringify({
                "bgColor": this.value
            })
        })
    })
    document.querySelector("#input-text-color").addEventListener("input", function(){
        document.querySelectorAll(".txt-clr").forEach(element => {
            element.style.color = this.value;
        })
        fetch('edit_text_color', {
            method: "POST",
            headers: {'X-CSRFToken': csrf},
            body: JSON.stringify({
                "textColor": this.value
            })
        })
    })
    document.querySelectorAll(".open-setting").forEach(ele => {
        ele.addEventListener('click', () => {
            document.querySelector("#setting").style.display = "block";
        })
        document.querySelector("#close-setting").addEventListener('click', () => {
            document.querySelector("#setting").style.display = "none";
        })
        window.onclick = e => {
            if(e.target == document.querySelector("#setting")) document.querySelector("#setting").style.display = "none";
        }
    })
    document.querySelector("#delete-form").addEventListener("submit", e => {
        e.preventDefault();
        if(window.confirm("Are you sure? This action CANNOT be undone.")){
            fetch('delete', {
                method: "DELETE",
                headers: {'X-CSRFToken': csrf}
            })
            .then(() => window.location = "/")
        }
    })
    document.querySelectorAll("#send-form-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector("#send-form").style.display = "block";
        })
        document.querySelector("#close-send-form").addEventListener("click", () => {
            document.querySelector("#send-form").style.display = "none";
        })
        window.onclick = e => {
            if(e.target == document.querySelector("#send-form")) document.querySelector("#send-form").style.display = "none";
        }
    })
    document.querySelectorAll("[copy-btn]").forEach(btn => {
        btn.addEventListener("click", () => {
            var url = document.getElementById("copy-url");
            navigator.clipboard.writeText(url.value);
            document.querySelector("#send-form").style.display = "none";
        })
    })
    document.querySelector("#setting-form").addEventListener("submit", e => {
        e.preventDefault();
        fetch('edit_setting', {
            method: "POST",
            headers: {'X-CSRFToken': csrf},
            body: JSON.stringify({
                "collect_email": document.querySelector("#collect_email").checked,
                "is_quiz": document.querySelector("#is_quiz").checked,
                "authenticated_responder": document.querySelector("#authenticated_responder").checked,
                "confirmation_message": document.querySelector("#comfirmation_message").value,
                "edit_after_submit": document.querySelector("#edit_after_submit").checked,
                "allow_view_score": document.querySelector("#allow_view_score").checked
            })
        })
        document.querySelector("#setting").style.display = "none";
        if(!document.querySelector("#collect_email").checked){
            if(document.querySelector(".collect-email")) document.querySelector(".collect-email").parentNode.removeChild(document.querySelector(".collect-email"))
        }else{
            if(!document.querySelector(".collect-email")){
                let collect_email = document.createElement("div");
                collect_email.classList.add("collect-email")
                collect_email.innerHTML = `<h3 class="question-title">Email address <span class="require-star">*</span></h3>
                <input type="text" autoComplete="off" aria-label="Valid email address" disabled dir = "auto" class="require-email-edit"
                placeholder = "Valid email address" />
                <p class="collect-email-desc">This form is collecting email addresses. <span class="open-setting">Change settings</span></p>`
                document.querySelector("#form-head").appendChild(collect_email)
            }
        }
        if(document.querySelector("#is_quiz").checked){
            if(!document.querySelector("#add-score")){
                let is_quiz = document.createElement('a')
                is_quiz.setAttribute("href", "score");
                is_quiz.setAttribute("id", "add-score");
                is_quiz.innerHTML = `<img src = "/static/Icon/score.png" id="add-score" class = "form-option-icon" title = "Add score" alt = "Score icon" />`;
                document.querySelector(".question-options").appendChild(is_quiz)
            }
            if(!document.querySelector(".score")){
                let quiz_nav = document.createElement("span");
                quiz_nav.classList.add("col-4");
                quiz_nav.classList.add("navigation");
                quiz_nav.classList.add('score');
                quiz_nav.innerHTML =   `<a href = "score" class="link">Scores</a>`;
                [...document.querySelector(".form-navigation").children].forEach(element => {
                    element.classList.remove("col-6")
                    element.classList.add('col-4')
                })
                document.querySelector(".form-navigation").insertBefore(quiz_nav, document.querySelector(".form-navigation").childNodes[2])
            }
        }else{
            if(document.querySelector("#add-score")) document.querySelector("#add-score").parentNode.removeChild(document.querySelector("#add-score"))
            if(document.querySelector(".score")){
                [...document.querySelector(".form-navigation").children].forEach(element => {
                    element.classList.remove("col-4")
                    element.classList.add('col-6')
                })
                document.querySelector(".score").parentNode.removeChild(document.querySelector(".score"))
            }
        }
    })
    document.querySelectorAll(".textarea-adjust").forEach(tx => {
        tx.style.height = "auto";
        tx.style.height = (10 + tx.scrollHeight)+"px";
        tx.addEventListener('input', e => {
            tx.style.height = "auto";
            tx.style.height = (10 + tx.scrollHeight)+"px";
        })
    })
    if(document.querySelector("#delete-responses")){
        document.querySelector("#delete-responses").addEventListener("click", () => {
            if(window.confirm("Are you sure? This action CANNOT be undone.")){
                fetch('responses/delete', {
                    method: "DELETE",
                    headers: {'X-CSRFToken': csrf}
                })
                .then(() => {
                    let ele = document.createElement("div");
                    ele.classList.add('margin-top-bottom');
                    ele.classList.add('box');
                    ele.classList.add('question-box');
                    ele.innerHTML = '<h1 class="response-title">0 responses</h1>';
                    document.querySelector("#responses").parentNode.replaceChild(ele, document.querySelector("#responses"))
                })
            }
        })
    }
})