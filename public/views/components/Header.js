let Header = {
    render: async () => {
        return `
        <div class="main-link">
            <a href='/#/'>
                My Forms
            </a>
        </div>
        <div id="acc_link" class="account-link">
            <a id="sign-in-link" href='/#/signin'>
                Sign In
            </a>
            <button id="logout-btn"></button>
        </div>
        `;
    },

    after_render: async () => {
        const sign_in_link = document.getElementById("sign-in-link");
        const logout_btn = document.getElementById("logout-btn");

        logout_btn.addEventListener('click', () => {
            firebase.auth().signOut()
                .then(function(usr) {
                    window.location.href = "/#/";
                });
        })
        
        firebase.auth().onAuthStateChanged(firebaseUser => { 
            if (firebaseUser) {
                sign_in_link.style.display = "none";
                logout_btn.style.display = "block";  
                logout_btn.innerHTML = "Log out(" + firebaseUser.email + ")";
            } else {
                sign_in_link.style.display = "block";
                logout_btn.style.display = "none";  
            }
        })
    }
}

export default Header;