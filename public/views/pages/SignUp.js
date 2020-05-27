let SignUp = {
    render: async () => {
        return `
        <div class="sign-box">
            <p>Sign up</p>
            <form class="sign-form">
                <input id="email_input" type="text" name="email" placeholder="Email"><br>
                <input id="pass_input" type="password" name="password" placeholder="Password"><br>
                <input id="confirm_pass_input" type="password" name="confirm" placeholder="Confirm password"><br>
                <button id="signup_btn" type="button">Sign up</button>
            </form>
        </div>
        `;
    },

    after_render: async () => {
        const signin_btn = document.getElementById("signup_btn");

        signin_btn.addEventListener("click", () => {
            event.preventDefault();

            const email_input = document.getElementById("email_input");
            const pass_input = document.getElementById("pass_input");
            const confirm_pass_input = document.getElementById("confirm_pass_input");

            if (pass_input.value !== confirm_pass_input.value) {
                alert("'Password' and 'Confirm password' don't match!");
            } else if (email_input.value === '' || pass_input.value === '' || confirm_pass_input.value === '') {
                alert("All fields must be filled!");
            } else {
                const auth = firebase.auth();
                const promise = auth.createUserWithEmailAndPassword(email_input.value, pass_input.value);
                promise.catch(e => alert(e.message));
            }

        })
    }
}

export default SignUp;