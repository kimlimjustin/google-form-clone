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
                is_quiz.setAttribute("href", "/");
                is_quiz.setAttribute("id", "add-score");
                is_quiz.innerHTML = `<img src = "/static/Icon/score.png" id="add-score" class = "form-option-icon" title = "Add score" alt = "Score icon" />`;
                document.querySelector(".question-options").appendChild(is_quiz)
            }
        }else{
            if(document.querySelector("#add-score")){
                document.querySelector("#add-score").parentNode.removeChild(document.querySelector("#add-score"))
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
    document.querySelectorAll(".input-score").forEach(element => {
        element.addEventListener("input", function(){
            fetch('edit_score', {
                method: "POST",
                headers: {'X-CSRFToken': csrf},
                body: JSON.stringify({
                    question_id: this.dataset.id,
                    score: this.value
                })
            })
        })
    })
    document.querySelectorAll("[answer-key]").forEach(element => {
        element.addEventListener("input", function(){
            if(this.dataset.question_type === "multiple choice"){
                fetch('answer_key', {
                    method: "POST",
                    headers: {'X-CSRFToken': csrf},
                    body: JSON.stringify({
                        "question_id": this.dataset.id,
                        "answer_key": document.querySelector(`input[name="${this.name}"]:checked`).value
                    })
                })
            }else if(this.dataset.question_type === "checkbox"){
                answers = []
                document.getElementsByName(this.name).forEach(element => {
                    if(element.checked) answers.push(element.value)
                })
                fetch('answer_key', {
                    method: "POST",
                    headers: {'X-CSRFToken': csrf},
                    body: JSON.stringify({
                        "question_id": this.dataset.id,
                        "answer_key": answers
                    })
                })
            }
            else{
                fetch('answer_key', {
                    method: "POST",
                    headers: {'X-CSRFToken': csrf},
                    body: JSON.stringify({
                        "question_id": this.dataset.id,
                        "answer_key": this.value
                    })
                })
            }
        })
    })
    document.getElementsByName('feedback').forEach(element => {
        element.addEventListener("input", function(){
            fetch('feedback', {
                method: "POST",
                headers: {'X-CSRFToken': csrf},
                body: JSON.stringify({
                    "question_id": this.dataset.id,
                    "feedback": this.value
                })
            })
        })
    })
})