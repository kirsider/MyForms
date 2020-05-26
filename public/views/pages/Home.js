let Home = {
    render: async () => {
        let view = `
        <div class="box">
        <a href="/Editor.html">
          <div class="create-form-box">
          </div>
          New Form
        </a>
      </div>
  
      <div class="templates-box">
        <h3>Templates</h3>
        <div class="grid-wrapper">
          <a href="/Form.html">1</a>
          <a href="t2.html">2</a>
          <a href="t3.html">3</a>
          <a href="t4.html">4</a>
        </div>
  
      </div>
        `
        return view
    }, 
    
    after_render: async () => {
        const account_link = document.getElementById("acc_link");

        firebase.auth().onAuthStateChanged(firebaseUser => { 
            if (firebaseUser) {
                console.log("rewrite link user");
                account_link.innerHTML = `
                    <button id="logout-btn">Log out(${firebaseUser.email})</button>
                `;
                const logout_btn = document.getElementById("logout-btn");
                logout_btn.addEventListener('click', () => {
                    firebase.auth().signOut();
                }) 
            } else {
                console.log("rewrite (no user)");
                account_link.innerHTML = `
                <a href='/#/signin'>
                    Sign In
                </a>
                `;
            }
        })
    }

}

export default Home;