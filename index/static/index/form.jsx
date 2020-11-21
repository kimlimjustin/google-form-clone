function textAreaAdjust(element) {
    element.target.style.height = "auto";
    element.target.style.height = (10 + element.target.scrollHeight)+"px";
}
const Form = (code) => {
    const [formInfo, setFormInfo] = React.useState({});
    const [width, setWidth] = React.useState(0);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [bgColor, setBgColor] = React.useState('');
    const [textColor, setTextColor] = React.useState('');
    const csrf = Cookies.get('csrftoken');

    React.useEffect(() => {
        fetch(`/form/${code.code}/api`, {
            method: "GET",
            headers: {'X-CSRFToken': csrf},
        })
        .then(response => response.json())
        .then(result => {
            setFormInfo(result)
            document.body.style.backgroundColor = result.background_color;
            document.body.style.color = result.text_color;
            setTitle(result.title)
            setDescription(result.description)
            setBgColor(result.background_color);
            setTextColor(result.text_color);
        })
    }, [])

    React.useEffect(() => {
        if(title){
            fetch(`/form/${code.code}/edit_title`, {
                method: "POST",
                headers: {'X-CSRFToken': csrf},
                body: JSON.stringify({
                    "title": title
                })
            })
            .then(response => response.json())
            .then(result => {
                document.title = `${result.title} - Google Form CLONE`  
            })
        }
    }, [title])

    React.useEffect(() => {
        if(bgColor){
            fetch(`/form/${code.code}/edit_background_color`, {
                method: "POST",
                headers: {'X-CSRFToken': csrf},
                body: JSON.stringify({
                    "bgColor": bgColor
                })
            })
            .then(response => response.json())
            .then(result => {
                document.body.style.backgroundColor = result.bgColor;
            })
        }
    }, [bgColor])

    React.useEffect(() => {
        if(textColor){
            fetch(`/form/${code.code}/edit_text_color`, {
                method: "POST",
                headers: {'X-CSRFToken': csrf},
                body: JSON.stringify({
                    "textColor": textColor
                })
            })
            .then(response => response.json())
            .then(result => {
                document.body.style.color = result.textColor;
            })
        }
    }, [textColor])

    React.useEffect(() => {
        setWidth(window.innerWidth);
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth);
        })
    }, [])

    React.useEffect(() => {
        if(description){
            fetch(`/form/${code.code}/edit_description`, {
                method: "POST",
                headers: {'X-CSRFToken': csrf},
                body: JSON.stringify({
                    "description": description
                })
            })
            .then(response => response.json())
            .then(result => {})
        }
    }, [description])

    React.useEffect(() => {
        document.querySelectorAll("textarea").forEach(tx => {
            tx.style.height = tx.scrollHeight + 'px'
        })
    })

    React.useEffect(() => {
        document.querySelector("#customize-theme-btn").addEventListener('click', () => {
            document.querySelector("#customize-theme").style.display = "block";
        })
        document.querySelector("#close-customize-theme").addEventListener("click", () => {
            document.querySelector("#customize-theme").style.display = "none";
        })
        window.onclick = e => {
            if(e.target == document.querySelector("#customize-theme")) document.querySelector("#customize-theme").style.display = "none";
        }
    })
    
    return(
        <div className = "container-fluid">
            <div className="form-topnav">
                <a href = "/">
                    <img src = "/static/Icon/icon.png" alt = "Google Forms Icon(CLONE)" className="navbar-icon form-icon" title = "Forms" />
                </a>
                <input class="nav-text nav-form-title edit-on-click" value  = {title} type="text" onChange = {({target: {value}}) => setTitle(value)} placeholder = "Form title" />
                {width > 768?
                <div className="float-right">
                    <img src="/static/Icon/theme.png" alt="Theme icon" id="customize-theme-btn" title = "Customize theme" className="nav-form-menu-icon" />
                    <img src="/static/Icon/eye.png" alt="Preview icon" title = "Preview" className="nav-form-menu-icon" />
                    <img src="/static/Icon/setting.png" alt="Setting icon" title = "Setting" className="nav-form-menu-icon" />
                    <button className = "btn send-form-btn">Send</button>
                    <img src="/static/Icon/options.png" alt="Options icon" title = "More" className="nav-form-menu-icon" />
                </div>
                :<div className="float-right">
                    <img src="/static/Icon/theme.png" alt="Theme icon" id="customize-theme-btn" title = "Customize theme" className="nav-form-menu-icon" />
                    <img src="/static/Icon/send.png" alt ="Send icon" title = "Send" className="nav-form-menu-icon" />
                    <img src="/static/Icon/options.png" alt="Options icon" title = "More" className="nav-form-menu-icon" />
                </div>}
            </div>
            <div className="container">
                <div className="margin-top-bottom box question-box">
                    <div className="form-title-box">
                        <input type = "text" className="form-title edit-on-click" value = {title} onChange = {({target: {value}}) => setTitle(value)} placeholder = "Form title"
                         style={{color: textColor}} />
                    </div>
                    <textarea className="form-description edit-on-click" rows="1" placeholder="Form description" value = {description} spellCheck = "false"
                      onChange = {({target: {value}}) => setDescription(value)} onKeyUp = {textAreaAdjust}  style={{color: textColor}}></textarea>
                </div>
            </div>
            <div className="modal" id="customize-theme">
                <div className="modal-content">
                    <span className="modal-close-btn" id="close-customize-theme">&times;</span>
                    <h1 className="customize-theme-title">Theme options</h1>
                    <h3 className="customize-theme-subtitle">Background Color:</h3>
                    <input type="color"  value = {bgColor} list="bgColors" className="form-control" onChange = {({target: {value}}) => setBgColor(value)} />
                    <datalist id="bgColors">
                        <option value="#03a9f4"></option>
                        <option value="#00bcd4"></option>
                        <option value="#7ff0e7"></option>
                        <option value = "#e1d8f1"></option>
                        <option value = "#d1c4e9"></option>
                        <option value = "#f6f6f6"></option>
                    </datalist>
                    <h3 className="customize-theme-subtitle">Text Color:</h3>
                    <input type="color"  value = {textColor} list="textColors" className="form-control" onChange = {({target: {value}}) => setTextColor(value)} />
                    <datalist id="textColors">
                        <option value="#db4437"></option>
                        <option value="#673ab7"></option>
                        <option value="#3f51b5"></option>
                        <option value="#4285f4"></option>
                        <option value="#03a9f4"></option>
                        <option value="#00bcd4"></option>
                        <option value="#8a8a8a"></option>
                        <option value="#4c3d45"></option>
                        <option value="#272124"></option>
                    </datalist>
                </div>
            </div>
        </div>
    )
}