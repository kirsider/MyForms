let NewForm = {
    render: async () => { 
        return `
            <div class="form-box">
                <div class="form-header-box">
                    <input id="form-name-input" type="text" placeholder="Form name">
                    <input id="form-description-input" type="text" placeholder="Description">
                </div>
                <form class="edit-form">
                    <ul id="questions-list" class="questions-list">
                        <li class="question-box">
                            <div class="main-question-box">
                                <div class="question-set-box">
                                    <input type="text" placeholder="Question name">
                                    <select>
                                        <option>text answer</option>
                                        <option>single choice</option>
                                        <option>multiple choice</option>
                                    </select>
                                </div>
                                <ul class="options-list">
                                    <li class="option-box">
                                        <input type="text" placeholder="option/text">
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

        const selects = document.getElementsByTagName("select");
        for (const select of selects) {
            select.addEventListener('change', onChangeSelect);
        }

        const add_option_btns = document.getElementsByClassName("add-option-btns");
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

        function onAddQuestionBtnClick(e) {
            const current_li = e.currentTarget.parentElement.parentElement;
            let new_li = document.createElement("li");
            new_li.setAttribute("class", "question-box");
            new_li.innerHTML = `<div class="main-question-box">
                <div class="question-set-box">
                    <input type="text" placeholder="Question name">
                    <select>
                        <option>text answer</option>
                        <option>single choice</option>
                        <option>multiple choice</option>
                    </select>
                </div>
                <ul class="options-list">
                    <li class="option-box">
                        <input type="text" placeholder="option/text">
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

            const selects = document.getElementsByTagName("select");
            for (const select of selects) {
                select.addEventListener('change', onChangeSelect);
            }

            const add_question_btns = document.getElementsByClassName("add-question-btn");
            for (const btn of add_question_btns) {
                btn.addEventListener('click', onAddQuestionBtnClick);
            }

            const delete_question_btns = document.getElementsByClassName("delete-question-btn");
            for (const btn of delete_question_btns) {
                btn.addEventListener('click', onDeleteQuestionBtnClick);
            }

            const up_question_btns = document.getElementsByClassName("up-question-btn");
            for (const btn of up_question_btns) {
                btn.addEventListener('click', onUpQuestionBtnClick);
            }

            const down_question_btns = document.getElementsByClassName("down-question-btn");
            for (const btn of down_question_btns) {
                btn.addEventListener('click', onDownQuestionBtnClick);
            }

            const add_option_btns = document.getElementsByClassName("add-option-btn");
            for (const btn of add_option_btns) {
                btn.addEventListener('click', onAddOptionBtnClick);
            }
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
                        <input type="text" placeholder="option/text">
                    </li>
                `;
                add_option_btn.style.display = "none";
            } else if (e.currentTarget.options[1].selected || e.currentTarget.options[2].selected) {
                options_list.innerHTML = ``;
                let li = document.createElement("li");
                li.setAttribute("class", "option-box");
                li.innerHTML = `
                    <input type="text" placeholder="option/text">
                    <button class="delete-option-btn" type="button"></button>
                `;
                options_list.appendChild(li);
                const btns = li.getElementsByClassName("delete-option-btn");
                for (const btn of btns) {
                    btn.addEventListener('click', () => {
                        options_list.removeChild(li);
                    })
                }
                add_option_btn.style.display = "block";
            }
        }

        function onAddOptionBtnClick(e) {
            const options_list = e.currentTarget.previousElementSibling;
            
            let li = document.createElement("li");
            li.setAttribute("class", "option-box");
            li.innerHTML = `
                <input type="text" placeholder="option/text">
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
    }
}

export default NewForm;