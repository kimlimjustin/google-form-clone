const Form = (code) => {
    React.useEffect(() => {
        const csrf = Cookies.get('csrftoken');
        fetch(`/form/${code.code}/api`, {
            method: "GET",
            headers: {'X-CSRFToken': csrf},
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
        })
    }, [])
    return(
        <div className = "container-fluid">
            <div className="form-topnav">
                <a href = "/">
                    <img src = "/static/icon.png" alt = "Google Forms Icon(CLONE)" class="navbar-icon form-icon" title = "Forms" />
                </a>
            </div>
        </div>
    )
}