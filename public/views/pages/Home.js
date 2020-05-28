let Home = {
    render: async () => {
        let view = `
        <div id="new-form-box" class="box">
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
        const new_form_box = document.getElementById("new-form-box");
        
        firebase.auth().onAuthStateChanged(async firebaseUser => { 
            if (firebaseUser) {
                new_form_box.innerHTML = `
                    <a href="/#/newform">
                        <div class="create-form-box">
                        </div>
                        New Form
                    </a>
                `;
                const snapshot = await firebase.database().ref('users/' + firebaseUser.uid + '/forms').once('value');
                const formIds = snapshot.val() ? Object.values(snapshot.val()) : null;
                
                userForms.innerHTML = ``;
                if (formIds) {
                    for (const fid of formIds) {
                    const a = document.createElement("a");
                    const fname = (await firebase.database().ref('forms/' + fid + '/fname').once('value')).val();
                    a.setAttribute("href", "/#/formresult/" + fid);
                    a.innerHTML = fname;
                    userForms.appendChild(a);
                    }
                }
                
            } else {
                new_form_box.innerHTML = `
                    <div class="unsigned-box">
                        To see content, please, sign in first.
                    </div>
                `;
                userForms.innerHTML = ``;
            }
        })
        

    }

}

export default Home;