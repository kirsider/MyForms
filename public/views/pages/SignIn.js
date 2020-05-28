import Utils from '../../services/Utils.js';

let SignIn = {
    render: async () => {
        return `
        <div class="sign-box">
        <p>Sign in</p>
        <form class="sign-form">
            <input id="email_input" type="text" name="email" placeholder="E-mail"><br>
            <input id="pass_input" type="password" name="password" placeholder="Password"><br>
            <button id="signin_btn" type="button">Login</button>
        </form>
        <a href="/#/signup">Don't have account? Sign up!</a>
        </div>`
    },
    
    after_render: async () => {
        const signin_btn = document.getElementById("signin_btn");

        signin_btn.addEventListener("click", () => {
            event.preventDefault();

            const email_input = document.getElementById("email_input");
            const pass_input = document.getElementById("pass_input");

            const auth = firebase.auth();
            const promise = auth.signInWithEmailAndPassword(email_input.value, pass_input.value);
            promise
                .then(function(usr) {
                    window.location.href = "/#/";
                })
                .catch(e => Utils.createSnackbar(e.message));
        })
    }

}

export default SignIn;