import Utils from './../../services/Utils.js';

let FormResult = {
    render: async () => {
        const request = Utils.parseRequestURL()
        const fid = request.id;

        const resultsDb = (await firebase.database().ref('results/').orderByChild('fid').equalTo(fid).once('value')).val();
        const form = (await firebase.database().ref('forms/' + fid).once('value')).val();
        
        if (!form) {
            return `
            <div class="form-box">
                <div class="form-header-box">
                    <p>Form not found :(</p>
                </div>
            </div>
            `;
        }
        
        const results = resultsDb ? Object.values(resultsDb) : null;

        if (results) {
            let questions = ``;
            for (const i in form['questions']) {
                questions += `
                <div class="main-question-box">
                    <div class="question-title-box">
                        ${form['questions'][i]['qname']}
                    </div>
                `;
    
                let box = ``;
                if (form['questions'][i]['type'] == "text answer") {
                    box += `<div class="text-answer-box">`;
                    let cnt = 1;
                    for (const res of results) {
                        let label = `
                        <label class="answer-container">
                             <b>${cnt + ". "}</b> ${res['answers'][i][0]}
                        </label> 
                        `;
                        box += label;
                        cnt++;
                    }
                    box += `</div>`;
                } else if (form['questions'][i]['type'] == "single choice") {
                    box += `<div class="radio-answer-box">`
                    for (const option of form['questions'][i]['options']) {
                        let cnt = 0;
                        for (const res of results) {
                            if (res['answers'][i][0] == option) {
                                cnt++;
                            }
                        }
                        let label = `
                        <label class="label-container">
                            ${option + " (" + cnt + " times)"}
                            <input type="radio" name="${i}" value="${option} disabled">
                            <span class="radiomark"></span>
                        </label> 
                        `
                        box += label;
                    }
                    box += `</div>`;
                } else if (form['questions'][i]['type'] == "multiple choice") {
                    box += `<div class="checkbox-answer-box">`
                    for (const option of form['questions'][i]['options']) {
                        let cnt = 0;
                        for (const res of results) {
                            if (res['answers'][i].includes(option)) {
                                cnt++;
                            }
                        }
                        let label = `
                        <label class="label-container">
                            ${option + " (" + cnt + " times)"}
                            <input type="checkbox" name="${i}" value="${option} disabled">
                            <span class="checkmark"></span>
                        </label> 
                        `
                        box += label;
                    }
                    box += `</div>`;
                }
    
                questions += box;
                questions += `</div>`;
            }
    
            let view = `
            <div class="form-box">
                <div class="form-header-box">
                    <p>${form.fname + " (" + results.length + " answers)"}</p>
                    <div class="description-box">
                        ${form.description}
                    </div>
                    <div class="description-box">
                        Share link to form:
                        <a href="/#/form/${fid}">
                            /#/form/${fid}
                        </a>
                    </div>
                </div>
                <form id="form" class="send-form-box">
                    ${questions}
                </form>
            </div>`;
    
            return view;
        }

        let questions = ``;
            for (const i in form['questions']) {
                questions += `
                <div class="main-question-box">
                    <div class="question-title-box">
                        ${form['questions'][i]['qname']}
                    </div>
                `;
    
                let box = ``;
                if (form['questions'][i]['type'] == "text answer") {
                    box += `<div class="text-answer-box">`;
                    box += `</div>`;
                } else if (form['questions'][i]['type'] == "single choice") {
                    box += `<div class="radio-answer-box">`
                    for (const option of form['questions'][i]['options']) {
                       
                        let label = `
                        <label class="label-container">
                            ${option + " (0 times)"}
                            <input type="radio" name="${i}" value="${option} disabled">
                            <span class="radiomark"></span>
                        </label> 
                        `
                        box += label;
                    }
                    box += `</div>`;
                } else if (form['questions'][i]['type'] == "multiple choice") {
                    box += `<div class="checkbox-answer-box">`
                    for (const option of form['questions'][i]['options']) {
                        let label = `
                        <label class="label-container">
                            ${option + " (0 times)"}
                            <input type="checkbox" name="${i}" value="${option} disabled">
                            <span class="checkmark"></span>
                        </label> 
                        `
                        box += label;
                    }
                    box += `</div>`;
                }
    
                questions += box;
                questions += `</div>`;
            }

        let view = `
            <div class="form-box">
                <div class="form-header-box">
                    <p>${form.fname + " (0 answers)"}</p>
                    <div class="description-box">
                        ${form.description}
                    </div>
                    <div class="description-box">
                        Share link to form:
                        <a href="/#/form/${fid}">
                            /#/form/${fid}
                        </a>
                    </div>
                </div>
                <form id="form" class="send-form-box">
                    ${questions}
                </form>
            </div>`;
    
        return view;
    },

    after_render: async () => {
    }
}


export default FormResult; 