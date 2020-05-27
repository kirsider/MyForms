let Home = {
    render: async () => {
        let view = `
        <div class="box">
        <a href="/#/newform">
          <div class="create-form-box">
          </div>
          New Form
        </a>
      </div>
  
      <div class="templates-box">
        <h3>Your Forms</h3>
        <div id="user-forms" class="grid-wrapper">
          
        </div>
  
      </div>
        `;
        return view;
    }, 
    
    after_render: async () => {
        const userForms = document.getElementById("user-forms");
        
        firebase.auth().onAuthStateChanged(async firebaseUser => { 
            if (firebaseUser) {
                const snapshot = await firebase.database().ref('users/' + firebaseUser.uid + '/forms').once('value');
                const formIds = Object.values(snapshot.val());
                
                userForms.innerHTML = ``;
                for (const fid of formIds) {
                    const a = document.createElement("a");
                    const fname = (await firebase.database().ref('forms/' + fid + '/fname').once('value')).val();
                    a.setAttribute("href", "/#/form/" + fid);
                    a.innerHTML = fname;
                    userForms.appendChild(a);
                }
            } else {
               
                userForms.innerHTML = ``;
            }
        }) 
    }

}

export default Home;