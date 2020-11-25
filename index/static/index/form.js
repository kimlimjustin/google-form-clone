document.addEventListener("DOMContentLoaded", () => {
    const csrf = Cookies.get('csrftoken');
    document.body.style.backgroundColor =  document.querySelector("#bg-color").innerHTML;
    document.body.style.color =  document.querySelector("#text-color").innerHTML;
    document.querySelectorAll(".txt-clr").forEach(element => {
        element.style.color = document.querySelector("#text-color").innerHTML;
    })
    document.querySelectorAll(".input-form-title").forEach(title => {
        title.addEventListener("input", function(){
            fetch(`edit_title`, {
                method: "POST",
                headers: {'X-CSRFToken': csrf},
                body: JSON.stringify({
                    "title": this.value
                })

            })
            document.title = `${this.value} - Google Forms CLONE`
            document.querySelectorAll(".input-form-title").forEach(ele => {
                ele.value = this.value;
            })
        })
    })
    document.querySelector("#input-form-description").addEventListener("input", function(){
        fetch('edit_description', {
            method: "POST",
            headers: {'X-CSRFToken': csrf},
            body: JSON.stringify({
                "description": this.value
            })
        })
    })
    document.querySelectorAll(".textarea-adjust").forEach(tx => {
        tx.style.height = "auto";
        tx.style.height = (10 + tx.scrollHeight)+"px";
        tx.addEventListener('input', e => {
            tx.style.height = "auto";
            tx.style.height = (10 + tx.scrollHeight)+"px";
        })
    })
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
                "allow_view_score": document.querySelector("#allow_view_score").checked,
                "see_response": document.querySelector("#see_response").checked
            })
        })
        document.querySelector("#setting").style.display = "none";
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
    document.querySelectorAll("#input-question").forEach(question => {
        question.addEventListener('input', function(){
            fetch('edit_question', {
                method: "POST",
                headers: {'X-CSRFToken': csrf},
                body: JSON.stringify({
                    id: this.dataset.id,
                    question: this.value,
                    question_type: document.querySelector("#input-question-type").value,
                    required: document.querySelector("#required-checkbox").checked
                })
            })
        })
    })
    const changeType = () => {
        document.querySelectorAll("#input-question-type").forEach(ele => {
            ele.addEventListener('input', function(){
                fetch('edit_question', {
                    method: "POST",
                    headers: {'X-CSRFToken': csrf},
                    body: JSON.stringify({
                        id: this.dataset.id,
                        question: document.querySelector("#input-question").value,
                        question_type: this.value,
                        required: document.querySelector("#required-checkbox").checked
                    })
                })
                document.querySelectorAll(".choices").forEach(choicesElement => {
                    if(choicesElement.dataset.id === this.dataset.id){
                        if(this.value !== "multiple choice" && this.value !== "checkbox"){
                            choicesElement.parentNode.removeChild(choicesElement)
                        }else{
                            fetch(`get_choice/${this.dataset.id}`, {
                                method: "GET"
                            })
                            .then(response => response.json())
                            .then(result => {
                                let ele = document.createElement("div");
                                ele.classList.add('choices');
                                ele.setAttribute("data-id", result["question_id"])
                                let choices = '';
                                if(this.value === "multiple choice"){
                                    for(let i in result["choices"]){
                                        if(i){ choices += `<div class="choice">
                                        <input type="radio" id="${result["choices"][i].id}" disabled>
                                        <label for="${result["choices"][i].id}">
                                            <input type="text" data-id="${result["choices"][i].id}" class="edit-choice" value="${result["choices"][i].choice}">
                                        </label>
                                        <span class="remove-option" title="Remove" data-id="${result["choices"][i].id}">&times;</span></div>`}
                                    }
                                }else if(this.value === "checkbox"){
                                    for(let i in result["choices"]){
                                        if(i){choices += `<div class="choice">
                                        <input type="checkbox" id="${result["choices"][i].id}" disabled>
                                        <label for="${result["choices"][i].id}">
                                            <input type="text" data-id="${result["choices"][i].id}" class="edit-choice" value="${result["choices"][i].choice}">
                                        </label>
                                        <span class="remove-option" title="Remove" data-id="${result["choices"][i].id}">&times;</span></div>`}
                                    }
                                }
                                ele.innerHTML = `<div class="choice">${choices}</div>
                                <div class="choice">
                                    <input type = "radio" id = "add-choice" disabled />
                                    <label for = "add-choice" class="add-option" id="add-option" data-question="${result["question_id"]}"
                                    data-type = "${result["question"]}">Add option</label>
                                </div>`;
                                choicesElement.parentNode.replaceChild(ele, choicesElement);
                            })
                        }
                    }
                })
            })
        })
    }
    changeType()
    document.querySelector("#required-checkbox").addEventListener('input', function(){
        fetch('edit_question', {
            method: "POST",
            headers: {'X-CSRFToken': csrf},
            body: JSON.stringify({
                id: this.dataset.id,
                question: document.querySelector("#input-question").value,
                question_type: document.querySelector("#input-question-type").value,
                required: this.checked
            })
        })
    })
    const editChoice = () => {
        document.querySelectorAll(".edit-choice").forEach(choice => {
            choice.addEventListener("input", function(){
                fetch('edit_choice', {
                    method: "POST",
                    headers: {'X-CSRFToken': csrf},
                    body: JSON.stringify({
                        "id": this.dataset.id,
                        "choice": this.value
                    })
                })
            })
        })
    }
    editChoice()
    const removeOption = () => {
        document.querySelectorAll(".remove-option").forEach(ele => {
            ele.addEventListener("click",function(){
                fetch('remove_choice', {
                    method: "POST",
                    headers: {'X-CSRFToken': csrf},
                    body: JSON.stringify({
                        "id": this.dataset.id
                    })
                })
                .then(() => {
                    this.parentNode.parentNode.removeChild(this.parentNode)
                })
            })
        })
    }
    removeOption()
    document.querySelectorAll("#add-option").forEach(question =>{
        question.addEventListener("click", function(){
            fetch('add_choice', {
                method: "POST",
                headers: {'X-CSRFToken': csrf},
                body: JSON.stringify({
                    "question": this.dataset.question
                })
            })
            .then(response => response.json())
            .then(result => {
                let element = document.createElement("div");
                element.classList.add('choice');
                if(this.dataset.type === "multiple choice"){
                    element.innerHTML = `<input type="radio" id="${result["id"]}" disabled>
                    <label for="${result["id"]}">
                        <input type="text" value="${result["choice"]}" class="edit-choice" data-id="${result["id"]}">
                    </label>
                    <span class="remove-option" title = "Remove" data-id="${result["id"]}">&times;</span>`;
                }else if(this.dataset.type === "checkbox"){
                    element.innerHTML = `<input type="checkbox" id="${result["id"]}" disabled>
                    <label for="${result["id"]}">
                        <input type="text" value="${result["choice"]}" class="edit-choice" data-id="${result["id"]}">
                    </label>
                    <span class="remove-option" title = "Remove" data-id="${result["id"]}">&times;</span>`;
                }
                let choices = document.querySelector(".choices");
                choices.insertBefore(element, choices.childNodes[choices.childNodes.length -2]);
                editChoice()
                removeOption()
            })
        })
    })
})