document.addEventListener("DOMContentLoaded", () => {
    document.body.style.backgroundColor =  document.querySelector("#bg-color").innerHTML;
    document.body.style.color =  document.querySelector("#text-color").innerHTML;
    document.querySelectorAll(".txtClr").forEach(element => {
        element.style.color = document.querySelector("#text-color").innerHTML;
    })
    document.querySelectorAll(".textarea-adjust").forEach(tx => {
        tx.style.height = "auto";
        tx.style.height = (10 + tx.scrollHeight)+"px";
        tx.addEventListener('input', e => {
            tx.style.height = "auto";
            tx.style.height = (10 + tx.scrollHeight)+"px";
        })
    })
    document.querySelectorAll('input[type="checkbox"]').forEach(element => {
        document.getElementsByName(element.name).forEach(checkbox => {
            checkbox.addEventListener("input", function(){
                let totalChecked = 0
                document.getElementsByName(element.name).forEach(checkbox => {
                    if(checkbox.checked) totalChecked++;
                })
                if(totalChecked > 0){
                    document.getElementsByName(element.name).forEach(checkbox => {
                        checkbox.removeAttribute("required")
                    })
                }else{
                    document.getElementsByName(element.name).forEach(checkbox => {
                        checkbox.setAttribute("required", '')
                    })
                }
            })
        })
    })
})