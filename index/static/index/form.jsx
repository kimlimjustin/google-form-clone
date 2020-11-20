const editData = e =>{
    const el = e.target;
    const input = document.createElement("input");
    input.setAttribute("value", el.textContent);
    input.setAttribute('class', el.className)
    el.replaceWith(input);

    const save = () => {
        const previous = document.createElement(el.tagName.toLowerCase());
        previous.onclick = editData;
        previous.textContent = input.value;
        previous.className = el.className
        input.replaceWith(previous)

    };

    input.addEventListener("blur", save, {
        once: true
    })
    input.focus();
}

const Form = (code) => {
    const [formInfo, setFormInfo] = React.useState({});
    const [width, setWidth] = React.useState(0);
    
    React.useEffect(() => {
        const csrf = Cookies.get('csrftoken');
        fetch(`/form/${code.code}/api`, {
            method: "GET",
            headers: {'X-CSRFToken': csrf},
        })
        .then(response => response.json())
        .then(result => {
            setFormInfo(result)
            document.body.style.backgroundColor = result.background_color;
        })
    }, [])

    React.useEffect(() => {
        for (var child of document.querySelectorAll('[data-editable]')) {
            child.onclick = editData;
        }
    }, [])

    React.useEffect(() => {
        if(formInfo.title) document.title = `${formInfo.title} - Google Form CLONE`
    }, [formInfo.title])

    React.useEffect(() => {
        setWidth(window.innerWidth);
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth);
        })
    }, [])
    
    return(
        <div className = "container-fluid">
            <div className="form-topnav">
                <a href = "/">
                    <img src = "/static/Icon/icon.png" alt = "Google Forms Icon(CLONE)" className="navbar-icon form-icon" title = "Forms" />
                </a>
                <span class="nav-text nav-form-title" data-editable>{formInfo.title}</span>
                {width > 768?
                <div className="float-right">
                    <img src="/static/Icon/theme.png" alt="Theme icon" title = "Customize theme" className="nav-form-menu-icon" />
                    <img src="/static/Icon/eye.png" alt="Preview icon" title = "Preview" className="nav-form-menu-icon" />
                    <img src="/static/Icon/setting.png" alt="Setting icon" title = "Setting" className="nav-form-menu-icon" />
                    <button className = "btn send-form-btn">Send</button>
                    <img src="/static/Icon/options.png" alt="Options icon" title = "More" className="nav-form-menu-icon" />
                </div>
                :<div className="float-right">
                    <img src="/static/Icon/theme.png" alt="Theme icon" title = "Customize theme" className="nav-form-menu-icon" />
                    <img src="/static/Icon/send.png" alt ="Send icon" title = "Send" className="nav-form-menu-icon" />
                    <img src="/static/Icon/options.png" alt="Options icon" title = "More" className="nav-form-menu-icon" />
                </div>}
            </div>
        </div>
    )
}