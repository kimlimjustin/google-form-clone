function textAreaAdjust(element) {
    element.target.style.height = "auto";
    element.target.style.height = (element.target.scrollHeight)+"px";
}
const Form = (code) => {
    const [formInfo, setFormInfo] = React.useState({});
    const [width, setWidth] = React.useState(0);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    
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
            document.body.style.color = result.text_color;
            setTitle(result.title)
        })
    }, [])

    React.useEffect(() => {
        if(title) document.title = `${title} - Google Form CLONE`
    }, [title])

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
                <input class="nav-text nav-form-title edit-on-click" value  = {title} type="text" onChange = {({target: {value}}) => setTitle(value)} placeholder = "Form title" />
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
            <div className="container">
                <div className="margin-top-bottom box question-box">
                    <div className="form-title-box">
                        <input type = "text" className="form-title edit-on-click" value = {title} onChange = {({target: {value}}) => setTitle(value)} placeholder = "Form title" />
                    </div>
                    <textarea className="form-description edit-on-click" rows="1" placeholder="Form description" value = {description} 
                    onChange = {({target: {value}}) => setDescription(value)} onKeyUp = {textAreaAdjust}></textarea>
                </div>
            </div>
        </div>
    )
}