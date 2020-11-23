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
            tx.style.height = "auto";
            tx.style.height = 10 + tx.scrollHeight + 'px';
        })
    })

    const editSetting = e => {
        e.preventDefault()
        fetch(`/form/${code.code}/edit_setting`, {
            method: "POST",
            headers: {'X-CSRFToken': csrf},
            body: JSON.stringify({
                "form": formInfo
            })
        })
        .then(response => response.json())
        .then(() => document.querySelector("#setting").style.display = "none")
    }

    const deleteForm = e => {
        e.preventDefault();
        if(window.confirm("Are you sure? This action CANNOT be undone.")){
            fetch(`/form/${code.code}/delete`, {
                method: "DELETE",
                headers: {'X-CSRFToken': csrf}
            })
            .then(() => window.location = "/")
        }
    }

    React.useEffect(() => {
        document.querySelector("#customize-theme-btn").addEventListener('click', () => {
            document.querySelector("#customize-theme").style.display = "block";
        })
        document.querySelector("#close-customize-theme").addEventListener("click", () => {
            document.querySelector("#customize-theme").style.display = "none";
        })
        if(document.querySelector("#setting-btn")){
            document.querySelector("#setting-btn").addEventListener('click', () => {
                document.querySelector("#setting").style.display = "block";
            })
        }
        document.querySelector("#close-setting").addEventListener('click', () => {
            document.querySelector("#setting").style.display = "none";
        })
        if(document.querySelector("#open-setting")){
            document.querySelector("#open-setting").addEventListener('click', () => {
                document.querySelector("#setting").style.display = "block";
            })
        }
        window.onclick = e => {
            if(e.target == document.querySelector("#customize-theme")) document.querySelector("#customize-theme").style.display = "none";
            if(e.target == document.querySelector("#setting")) document.querySelector("#setting").style.display = "none";
        }
    })
    React.useEffect(() => {
        console.log(formInfo)
    }, [formInfo])

    return(
        <div className = "container-fluid">
            <div className="form-topnav">
                <a href = "/">
                    <img src = "/static/Icon/icon.png" alt = "Google Forms Icon(CLONE)" className="navbar-icon form-icon" title = "Forms" />
                </a>
                <input class="nav-text nav-form-title edit-on-click" value  = {title} type="text" onChange = {({target: {value}}) => setTitle(value)} 
                placeholder = "Form title" />
                {width > 768?
                <div className="float-right">
                    <img src="/static/Icon/theme.png" alt="Theme icon" id="customize-theme-btn" title = "Customize theme" className="nav-form-menu-icon" />
                    <img src="/static/Icon/eye.png" alt="Preview icon" title = "Preview" className="nav-form-menu-icon" />
                    <img src="/static/Icon/setting.png" alt="Setting icon" id="setting-btn" title = "Setting" className="nav-form-menu-icon" />
                    <button className = "btn send-form-btn">Send</button>
                </div>
                :<div className="float-right">
                    <img src="/static/Icon/theme.png" alt="Theme icon" id="customize-theme-btn" title = "Customize theme" className="nav-form-menu-icon" />
                    <img src="/static/Icon/send.png" alt ="Send icon" title = "Send" className="nav-form-menu-icon" />
                    <img src="/static/Icon/setting.png" alt="Setting icon" id="setting-btn" title = "Setting" className="nav-form-menu-icon" />
                </div>}
            </div>
            <div className="container">
                <div className="margin-top-bottom box question-box">
                    <div className="form-title-box">
                        <input type = "text" className="form-title edit-on-click" value = {title} onChange = {({target: {value}}) => setTitle(value)} 
                        placeholder = "Form title" style={{color: textColor}} />
                    </div>
                    <textarea className="form-description edit-on-click" rows="1" placeholder="Form description" value = {description} spellCheck = "false"
                      onChange = {({target: {value}}) => setDescription(value)} onKeyUp = {textAreaAdjust}  style={{color: textColor}}></textarea>
                    {formInfo.collect_email?
                    <div className="collect-email">
                        <h3 className="question-title">Email address <span className="require-star">*</span></h3>
                        <input type="text" autoComplete="off" aria-label="Valid email address" disabled dir = "auto" className="require-email-edit"
                        placeholder = "Valid email address" />
                        <p className="collect-email-desc">This form is collecting email addresses. <span id="open-setting">Change settings</span></p>
                    </div>
                    :null}
                </div>
                {formInfo.questions && formInfo.questions.map(question => {
                    return <div className="margin-top-bottom box question-box" key = {question.id}>
                        <input type = "text" className = "question-title edit-on-click" value ={question.question} onChange = {({target: {value}}) => {
                            let copy = Object.assign({}, formInfo);
                            copy.questions[question.pk].question = value;
                            setFormInfo(copy);
                        }} />
                        <select name="" className="question-type-select" value = {question.question_type} onChange = {({target: {value}}) => {
                            let copy = Object.assign({}, formInfo);
                            copy.questions[question.pk].question_type  = value;
                            setFormInfo(copy);
                        }}>
                            <option value="short">Short answer</option>
                            <option value="paragraph">Paragraph</option>
                            <option value="multiple choice">Multiple choice</option>
                            <option value="checkbox">checkbox</option>
                        </select>
                        {question.question_type == "multiple choice"?
                        <div className="choices">
                            {question.choices.map(choice => {
                                return <div className="choice">
                                    <input type = "radio" id = {choice.id} disabled />
                                    <label htmlFor = {choice.id}>
                                        <input type = "text" value = {choice.choice} onChange = {({target: {value}}) => {
                                            let copy = Object.assign({}, formInfo);
                                            copy.questions[question.pk].choices[choice.pk].choice = value;
                                            setFormInfo(copy);
                                        }} className="edit-choice" />
                                    </label>
                                    <span className="remove-option" title = "Remove">&times;</span>
                                </div>
                            })}
                            <div className="choice">
                                <input type = "radio" id = "add-choice" disabled />
                                <label htmlFor = "add-choice" className="add-option">Add option</label>
                            </div>
                        </div>
                        :null}
                        <div className="choice-option">
                            <input type="checkbox" id="required-checkbox" checked = {question.required} onChange = {({target: {checked}}) => {
                                let copy = Object.assign({}, formInfo);
                                copy.questions[question.pk].required  = checked;
                                setFormInfo(copy);
                            }} />
                            <label className="required" htmlFor = "required-checkbox">Required</label>
                        </div>
                    </div>
                })}
                <div className="question-options">
                    <img src = "/static/Icon/add.png" className="question-option-icon" title = "Add question" alt = "Add question icon" />
                    <img src = "/static/Icon/eye.png" className = "question-option-icon" title = "Preview" alt = "Preview icon" />
                </div>
            </div>
            <div className="modal" id="customize-theme">
                <div className="modal-content">
                    <span className="modal-close-btn" id="close-customize-theme">&times;</span>
                    <h1 className="modal-title">Theme options</h1>
                    <h3 className="modal-subtitle">Background Color:</h3>
                    <input type="color"  value = {bgColor} list="bgColors" className="form-control" onChange = {({target: {value}}) => setBgColor(value)} />
                    <datalist id="bgColors">
                        <option value="#03a9f4"></option>
                        <option value="#00bcd4"></option>
                        <option value="#7ff0e7"></option>
                        <option value = "#e1d8f1"></option>
                        <option value = "#d1c4e9"></option>
                        <option value = "#f6f6f6"></option>
                        <option value="#f1f3f4"></option>
                    </datalist>
                    <h3 className="modal-subtitle">Text Color:</h3>
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
            <div className="modal" id="setting">
                <div className="modal-content">
                    <form onSubmit = {editSetting}>
                        <span className="modal-close-btn" id="close-setting">&times;</span>
                        <h1 className = "modal-title">Setting</h1>
                        {width<= 768?
                            <h4 className="setting-preview-form"><a href = "/">Preview form here</a></h4>
                        :null}
                        <div className="modal-division">
                            <div className="form-group">
                                <h3 className="modal-subtitle">General</h3>
                                <input type="checkbox" id="collect_email" checked = {formInfo.collect_email} onChange = {({target: {checked}}) => {
                                    if(checked) setFormInfo({...formInfo, collect_email: true})
                                    else setFormInfo({...formInfo, collect_email: false})
                                }} />
                                <label htmlFor="collect_email" className="setting-form-label">Collect email address</label>
                            </div>
                            <div className="form-group">
                                <input type="checkbox" id="is_quiz" checked = {formInfo.is_quiz} onChange = {({target: {checked, value}}) => {
                                    if(checked) setFormInfo({...formInfo, is_quiz: true})
                                    else setFormInfo({...formInfo, is_quiz: false})
                                }} />
                                <label htmlFor="is_quiz" className="setting-form-label">Make this as a quiz</label>
                            </div>
                            <div className="form-group">
                                <input type="checkbox" id="authenticated_responder" checked = {formInfo.authenticated_responder} onChange = {({target: {checked, value}}) => {
                                    if(checked) setFormInfo({...formInfo, authenticated_responder: true})
                                    else setFormInfo({...formInfo, authenticated_responder: false})
                                }} />
                                <label htmlFor="authenticated_responder" className="setting-form-label">Respondent account must be authenticated. (Signed in required)</label>
                            </div>
                        </div>
                        <div className="modal-division">
                            <div className="form-group">
                                <h3 className="modal-subtitle">Confirmation message:</h3>
                                <textarea rows = "1" className="confirmation-msg-input edit-on-click" value={formInfo.confirmation_message} spellCheck = "false"
                                onChange = {({target: {value}}) => setFormInfo({...formInfo, confirmation_message: value})} onKeyUp = {textAreaAdjust} />
                            </div>
                        </div>
                        <div className="modal-division">
                            <div className="form-group">
                                <h3 className="modal-subtitle">Respondents can:</h3>
                                <input type="checkbox" id="edit_after_submit" checked = {formInfo.edit_after_submit} onChange = {({target: {checked, value}}) => {
                                    if(checked) setFormInfo({...formInfo, edit_after_submit: true})
                                    else setFormInfo({...formInfo, edit_after_submit: false})
                                }} />
                                <label htmlFor="edit_after_submit" className="setting-form-label">Edit after submit</label>
                            </div>
                            <div className="form-group">
                                <input type="checkbox" id="see_response" checked = {formInfo.see_response} onChange = {({target: {checked, value}}) => {
                                    if(checked) setFormInfo({...formInfo, see_response: true})
                                    else setFormInfo({...formInfo, see_response: false})
                                }} />
                                <label htmlFor="see_response" className="setting-form-label">View responses from other respondents</label>
                            </div>
                            <div className="form-group">
                                <input type="checkbox" id="allow_view_score" checked = {formInfo.allow_view_score} onChange = {({target: {checked, value}}) => {
                                    if(checked) setFormInfo({...formInfo, allow_view_score: true})
                                    else setFormInfo({...formInfo, allow_view_score: false})
                                }} />
                                <label htmlFor="allow_view_score" className="setting-form-label">View score</label>
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Save" className="form-control btn btn-save-setting" />
                            </div>
                        </div>
                    </form>
                    <form className="modal-division" onSubmit = {deleteForm}>
                        <fieldset className="form-group">
                            <legend className="modal-subtitle text-danger danger-zone">Danger Zone</legend>
                            <h3 className="delete-form-title">Delete this form</h3>
                            <p className="delete-form-description">Once you delete a form, there is no going back. Please be certain.</p>
                            <input type = "submit" className="form-control delete-form-btn" value="Delete" />
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}