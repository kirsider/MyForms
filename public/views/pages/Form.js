import Utils from './../../services/Utils.js'

let Form = {
    render: async () => {
        const request = Utils.parseRequestURL()
        const fid = request.id;
        const form = (await firebase.database().ref('forms/' + fid).once('value')).val();

        let questions = ``;
        for (const i in form['questions']) {
            console.log(form['questions'][i]);
            questions += `
            <div class="main-question-box">
                <div class="question-title-box">
                    ${form['questions'][i]['qname']}
                </div>
            `;

            let box = ``;
            if (form['questions'][i]['type'] == "text answer") {
                box += `
                <div class="text-answer-box">
                    <input type="text" name="${i}" placeholder="${form['questions'][i]['options'][0]}">
                </div>
                `;
            } else if (form['questions'][i]['type'] == "single choice") {
                box += `<div class="radio-answer-box">`
                for (const option of form['questions'][i]['options']) {
                    let label = `
                    <label class="label-container">
                        ${option}
                        <input type="radio" name="${i}" value="${option}">
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
                        ${option}
                        <input type="checkbox" name="${i}" value="${option}">
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
                <p>${form.fname}</p>
                <div class="description-box">
                    ${form.description}
                </div>
            </div>
            <form id="form" class="send-form-box">
                ${questions}
                <button id="send-form-btn" class="send-btn" type="button">Send</button>
            </form>
        </div>`;

        return view;
    },

    after_render: async () => {
        const request = Utils.parseRequestURL();
        const fid = request.id;

        const send_form_btn = document.getElementById("send-form-btn");

        send_form_btn.addEventListener('click', () => {   
            const answerForm = document.getElementById("form");
            const formData = new FormData(answerForm);

            let result = {
                "fid": fid,
                "answers": {}
            }

            for (let [name, value] of formData) {
                console.log(name + ": " + value);
                result["answers"][name] = result["answers"][name] ? result["answers"][name] : [];
                result["answers"][name].push(value);
            }

            firebase.database().ref('results/').push(result);

            window.location.href = "/#/";
            alert("Your answer has been recorded!");
        })
    }
}

export default Form; 