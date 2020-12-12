import Utils from '../../services/Utils.js';

let NewForm = {
    render: async () => {
        return `
            <div class="form-box">
                <div class="form-header-box">
                    <input id="form-name-input" type="text" placeholder="Form name">
                    <input id="form-description-input" type="text" placeholder="Description">
                </div>
                <form id="form" class="edit-form">
                    <ul id="questions-list" class="questions-list">
                        <li class="question-box" draggable="true">
                            <div class="main-question-box">
                                <div class="question-set-box">
                                    <input name="qname" type="text" placeholder="Question name">
                                    <select name="qtype">
                                        <option selected>text answer</option>
                                        <option>single choice</option>
                                        <option>multiple choice</option>
                                    </select>
                                </div>
                                <ul class="options-list">
                                    <li class="option-box">
                                        <input name="option" type="text" placeholder="placeholder for input">
                                    </li>
                                </ul>
                                <button class="add-option-btn" type="button">Add option</button>
                            </div>
                            <div class="control-btns">
                                <button class="up-question-btn" type="button"></button>
                                <button class="add-question-btn" type="button"></button>
                                <button class="delete-question-btn" type="button"></button>
                                <button class="down-question-btn" type="button"></button>
                            </div>
                        </li>
                    </ul>

                    <button id="save-form-btn" class="save-form-btn" type="button">Save</button>
                </form>
            </div>
        `;
    },

    after_render: async () => {
        const questions_list = document.getElementById("questions-list");

        setAllEventListeners();

        var currentDragElement = null;

        function onDragStart(e) {
            currentDragElement = e.target;
            e.dataTransfer.effectAllowed = 'move';
        }

        function onDragOver(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }

            e.dataTransfer.dropEffect = 'move';

            return false;
        }


        function onDrop(e) {
            if (e.stopPropagation) {
                e.stopPropagation(); 
            }

            if (currentDragElement != this) {
                const question_boxes = document.getElementsByClassName("question-box"); 
                
                let pos1 = 0;
                let pos2 = 0;
                let cnt = 0;
                let li1;
                let li2;

                for (let i of question_boxes) {
                    if (i == this) {
                        pos1 = cnt;
                        li1 = i
                    }
                    if (i == currentDragElement ) {
                        pos2 = cnt;
                        li2 = i;
                    }
                    cnt++;
                }
                const questions = getFormData()['questions'];
                const q1 = questions[pos1];
                const q2 = questions[pos2];

                let tmp = li1.innerHTML;
                li1.innerHTML = li2.innerHTML;
                li2.innerHTML = tmp;

                const options = ["text answer", "single choice", "multiple choice"];

                li1.querySelector("input").value = q2["qname"];
                li1.querySelector("select")[options.indexOf(q2["type"])].selected = true;
                
                let optlist1 = li1.querySelector(".options-list");
                optlist1.innerHTML = ``; 
                if (q2["type"] == "text answer") {
                    let li = document.createElement("li");
                    li.setAttribute("class", "option-box")
                    let inp = document.createElement("input");
                    inp.name = "option";
                    inp.placeholder = "placeholder for input";
                    inp.type = "text";
                    inp.value = q2["options"][0];
                    li.appendChild(inp);
                    optlist1.appendChild(li);
                } else {
                    for (let ind of q2["options"]) {
                        let li = document.createElement("li");
                        li.setAttribute("class", "option-box")
                        let inp = document.createElement("input");
                        inp.name = "option";
                        inp.placeholder = "option/text";
                        inp.type = "text";
                        inp.value = ind;

                        let btn = document.createElement("button");
                        btn.type = "button";
                        btn.setAttribute("class", "delete-option-btn");
                        
                        li.appendChild(inp);
                        li.appendChild(btn);
                        optlist1.appendChild(li);

                        const btns = li.getElementsByClassName("delete-option-btn");
                        for (const btn of btns) {
                            btn.addEventListener('click', () => {
                                li.parentElement.removeChild(li);
                            })
                        }
                    }
                }

                li2.querySelector("input").value = q1["qname"];
                li2.querySelector("select")[options.indexOf(q1["type"])].selected = true;

                let optlist2 = li2.querySelector(".options-list");
                optlist2.innerHTML = ``; 
                if (q1["type"] == "text answer") {
                    let li = document.createElement("li");
                    li.setAttribute("class", "option-box")
                    let inp = document.createElement("input");
                    inp.name = "option";
                    inp.placeholder = "placeholder for input";
                    inp.type = "text";
                    inp.value = q1["options"][0];
                    li.appendChild(inp);
                    optlist2.appendChild(li);
                } else {
                    for (let ind of q1["options"]) {
                        let li = document.createElement("li");
                        li.setAttribute("class", "option-box")
                        let inp = document.createElement("input");
                        inp.name = "option";
                        inp.placeholder = "option/text";
                        inp.type = "text";
                        inp.value = ind;

                        let btn = document.createElement("button");
                        btn.type = "button";
                        btn.setAttribute("class", "delete-option-btn");
                        
                        li.appendChild(inp);
                        li.appendChild(btn);
                        optlist2.appendChild(li);

                        const btns = li.getElementsByClassName("delete-option-btn");
                        for (const btn of btns) {
                            btn.addEventListener('click', () => {
                                li.parentElement.removeChild(li);
                            })
                        }
                    }
                }
            
                setAllEventListeners();
            }
            return false;
        }

        function onAddQuestionBtnClick(e) {
            const current_li = e.currentTarget.parentElement.parentElement;
            let new_li = document.createElement("li");
            new_li.setAttribute("class", "question-box");
            new_li.setAttribute("draggable", "true");
            new_li.innerHTML = `
            <div class="main-question-box">
                <div class="question-set-box">
                    <input name="qname" type="text" placeholder="Question name">
                    <select name="qtype">
                        <option selected>text answer</option>
                        <option>single choice</option>
                        <option>multiple choice</option>
                    </select>
                </div>
                <ul class="options-list">
                    <li class="option-box">
                        <input name="option" type="text" placeholder="option/text">
                    </li>
                </ul>
                <button class="add-option-btn" type="button">Add option</button>
            </div>
            <div class="control-btns">
                <button class="up-question-btn" type="button"></button>
                <button class="add-question-btn" type="button"></button>
                <button class="delete-question-btn" type="button"></button>
                <button class="down-question-btn" type="button"></button>
            </div>`;

            questions_list.insertBefore(new_li, current_li.nextElementSibling);

            setAllEventListeners();
        }

        function onDeleteQuestionBtnClick(e) {
            if (questions_list.getElementsByClassName("question-box").length !== 1) {
                const current_li = e.currentTarget.parentElement.parentElement;
                questions_list.removeChild(current_li);
            }
        }

        function onUpQuestionBtnClick(e) {
            const current_li = e.currentTarget.parentElement.parentElement;
            if (current_li.previousElementSibling) {
                const prev_li = current_li.previousElementSibling;
                questions_list.insertBefore(current_li, prev_li);
            }
        }

        function onDownQuestionBtnClick(e) {
            const current_li = e.currentTarget.parentElement.parentElement;
            if (current_li.nextElementSibling) {
                const next_li = current_li.nextElementSibling;
                questions_list.insertBefore(next_li, current_li);
            }
        }

        function onChangeSelect(e) {
            const options_list = e.currentTarget.parentElement.nextElementSibling;
            console.log(options_list);
            const add_option_btn = options_list.nextElementSibling;

            if (e.currentTarget.options[0].selected) {
                options_list.innerHTML = `
                    <li class="option-box">
                        <input name="option" type="text" placeholder="placeholder for input">
                    </li>
                `;
                add_option_btn.setAttribute("class", "add-option-btn hide");
            } else if (e.currentTarget.options[1].selected || e.currentTarget.options[2].selected) {
                options_list.innerHTML = ``;
                let li = document.createElement("li");
                li.setAttribute("class", "option-box");
                li.innerHTML = `
                    <input name="option" type="text" placeholder="option/text">
                    <button class="delete-option-btn" type="button"></button>
                `;
                options_list.appendChild(li);
                const btns = li.getElementsByClassName("delete-option-btn");
                for (const btn of btns) {
                    btn.addEventListener('click', () => {
                        options_list.removeChild(li);
                    })
                }
                add_option_btn.setAttribute("class", "add-option-btn show");
            }
        }

        function onAddOptionBtnClick(e) {
            const options_list = e.currentTarget.previousElementSibling;
            let li = document.createElement("li");
            li.setAttribute("class", "option-box");
            li.innerHTML = `
                <input name="option" type="text" placeholder="option/text">
                <button class="delete-option-btn" type="button"></button>
            `;
            options_list.appendChild(li);
            const btns = li.getElementsByClassName("delete-option-btn");
            for (const btn of btns) {
                btn.addEventListener('click', () => {
                    options_list.removeChild(li);
                })
            }
        }
        
        function setAllDragNDropEventListeners() {
            const question_boxes = document.getElementsByClassName("question-box"); 
            for (const box of question_boxes) {
                box.addEventListener('dragstart', onDragStart, false);
                box.addEventListener('dragover', onDragOver, false);
                box.addEventListener('drop', onDrop, false);
            }
        }

        function setAllEventListeners() {
            const selects = document.getElementsByTagName("select");
            for (const select of selects) {
                select.addEventListener('change', onChangeSelect);
            }

            const add_option_btns = document.getElementsByClassName("add-option-btn");
            for (const btn of add_option_btns) {
                btn.addEventListener('click', onAddOptionBtnClick);
            }

            const add_question_btns = document.getElementsByClassName("add-question-btn");
            for (const btn of add_question_btns) {
                btn.addEventListener('click', onAddQuestionBtnClick, false);
            }

            const delete_question_btns = document.getElementsByClassName("delete-question-btn");
            for (const btn of delete_question_btns) {
                btn.addEventListener('click', onDeleteQuestionBtnClick, false);
            }

            const up_question_btns = document.getElementsByClassName("up-question-btn");
            for (const btn of up_question_btns) {
                btn.addEventListener('click', onUpQuestionBtnClick, false);
            }

            const down_question_btns = document.getElementsByClassName("down-question-btn");
            for (const btn of down_question_btns) {
                btn.addEventListener('click', onDownQuestionBtnClick, false);
            }

            setAllDragNDropEventListeners();
            
        }

        // save form event

        function getFormData() {
            const form_name_input = document.getElementById("form-name-input");
            const form_description_input = document.getElementById("form-description-input");

            let form = {
                "uid": firebase.auth().currentUser.uid,
                "fname": form_name_input.value,
                "description": form_description_input.value,
                "questions": []
            }

            const questionForm = document.getElementById("form");
            const formData = new FormData(questionForm);
            let cnt = -1;
            for (let [name, value] of formData) {
                if (name == "qname") {
                    form["questions"].push({
                        "qname": value,
                        "type": "",
                        "options": []
                    })
                    cnt++;
                } else if (name == "qtype") {
                    form["questions"][cnt]["type"] = value;
                } else if (name == "option") {
                    form["questions"][cnt]["options"].push(value);
                }

            }

            return form;
        }
        
        const save_form_btn = document.getElementById("save-form-btn");
        
        save_form_btn.addEventListener('click', async () => {
            let form = getFormData();

            const response = await fetch('https://localhost:44363/api/forms', {
                method: 'POST',
                body: JSON.stringify({
                    name: form.fname,
                    description: form.description,
                    userid: form.uid,
                    questions: form.questions
                }),
                headers: {'Content-Type': 'application/json' }
            });
        
            window.location.href = "/#/";
            Utils.createSnackbar("Form has been created!")
        })
    }
}

export default NewForm;