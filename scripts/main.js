function home(){
    /* redirect back to homepage */
    window.location.href = "index.html";
}

function register(e){

    e.preventDefault();

    /* store user info at masai school server */
    const form = document.getElementById("formRegister");

    //create payload
    const formData = {
        name: form.name.value,
        email: form.email.value,
        username: form.username.value,
        mobile: form.phone.value,
        password: form.password.value,
        description: "N/A"
    }

    //store in remote server
    makeRequest(1, JSON.stringify(formData));
}

function loginUser(e){
    /* login user */

    e.preventDefault();

    const form = document.getElementById("formLogin");

    //create payload
    let formData = {
        password: form.password.value,
        username: form.username.value,
    }
    console.log(formData);

    //validate from remote server
    makeRequest(2, JSON.stringify(formData));    
}

function makeRequest(mode, data){
    /* make api call to fetch data */
    let url = "";
    if(mode == 1){
        //register
        url = "https://masai-api-mocker.herokuapp.com/auth/register";
        storeCredentials(url, data);
    }
    else if(mode == 2){
        //login
        url = "https://masai-api-mocker.herokuapp.com/auth/login";
        checkCredentials(url, data);
    }
}

async function storeCredentials(endpoint, data){
    /* make api post fetch to endpoint */
    try {
        const resp = await fetch(endpoint, {
            method: "POST",
            body: data,
            headers: {
                'Content-Type':'application/json',
            },
        });
        const results = await resp.json();
        console.log(results); 

        //registration success
        //initiate login process
        data = JSON.parse(data);
        let formData = {
            password: data.password,
            username: data.username,
        }
    
        //validate from remote server
        makeRequest(2, JSON.stringify(formData)); 

    } catch (error) {
        alert("Something went wrong. Please try again later!");
        console.log(error);
    }
}

async function checkCredentials(endpoint, data){
    /* make api post fetch to endpoint and get auth token */
    try {
        const resp = await fetch(endpoint, {
            method: "POST",
            body: data,
            headers: {
                'Content-Type':'application/json',
            },
        });
        const results = await resp.json();
        console.log(results);
        
        //extract token
        const token = results.token;

        //get profile
        data = JSON.parse(data);
        try {
            const resp2 = await fetch(`https://masai-api-mocker.herokuapp.com/user/${data.username}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const results2 = await resp2.json();
            console.log(results2);   

            //save locally for success page
            localStorage.setItem("user", JSON.stringify(results2));         

            //safely redirect user to success page
            window.location.href = "success.html";

        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        alert("Something went wrong..Please enter valid credentials and re-attempt.");
        console.log(error);
    }
}
