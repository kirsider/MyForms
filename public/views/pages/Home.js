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
            <h3 id="h3"></h3>
            <div id="user-forms" class="grid-wrapper">

            </div>
  
        </div>
        `;
        return view;
    }, 
    
    after_render: async () => {
        const userForms = document.getElementById("user-forms");
        const new_form_box = document.getElementById("new-form-box");
        const h3 = document.getElementById("h3");

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
                h3.innerHTML = `Your Forms`;
              
                if (formIds) {
                    let linkCount = formIds.length;
                    let links = new Array(linkCount);
    
                    for (let i = 0; i < linkCount; i++) {
                        const a = document.createElement("a");
                  
                        a.setAttribute("class", "skeleton");
                        userForms.appendChild(a);
                        links[i] = a;
                    }
                   
                    for (const i in formIds) {
                        const fname = (await firebase.database().ref('forms/' + formIds[i] + '/fname').once('value')).val();
                        links[i].setAttribute("class", "");
                        links[i].setAttribute("href", "/#/formresult/" + formIds[i]);
                        links[i].innerHTML = fname;
                    }
                }
                
            } else {
                new_form_box.innerHTML = `
                    <div class="unsigned-box">
                        To see content, please, sign in first.
                    </div>
                `;
                userForms.innerHTML = ``;
                h3.innerHTML = `Here will be your forms`;
            }
        })
        

    }

}

export default Home;