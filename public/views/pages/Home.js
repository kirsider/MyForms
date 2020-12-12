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

              
                userForms.innerHTML = ``;

                const DbForms = await fetch('https://localhost:44363/api/forms/userforms/' + firebaseUser.uid).then(response => response.json()); 
              
                if (DbForms) {
                    let linkCount = DbForms.length;
                    let links = new Array(linkCount);
    
                    for (let i = 0; i < linkCount; i++) {
                        const a = document.createElement("a");
                  
                        a.setAttribute("class", "skeleton");
                        userForms.appendChild(a);
                        links[i] = a;
                    }
                   
                    for (const i in DbForms) {
                        const fname = DbForms[i].fname;
                        links[i].setAttribute("class", "");
                        links[i].setAttribute("href", "/#/formresult/" + DbForms[i].id);
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
            }
        })
        

    }

}

export default Home;