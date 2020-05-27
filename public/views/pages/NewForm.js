let NewForm = {
    render: async () => { 
        return `
            <div class="form-box">
                <div class="form-header-box">
                    <input id="form-name-input" type="text" placeholder="Form name">
                    <input id="form-description-input" type="text" placeholder="Description">
                </div>
                <form class="edit-form">
                    <div class="question-box">
                        <div id="main-question-box" class="main-question-box">
                            <div class="question-set-box">
                                <input type="text" placeholder="Question name">
                                <select id="question-type-select">
                                    <option id="text-answer-option">text answer</option>
                                    <option id="single-choice-option">single choice</option>
                                    <option id="multiple-choice-option">multiple choice</option>
                                </select>
                            </div>
                            <ul id="options-list" class="options-list">
                                <li class="option-box1">
                                    <input type="text" placeholder="option/text">
                                    <button id="delete-option-btn1" class="delete-option-btn" type="button"></button>
                                </li>
                            </ul>
                            <button id="add-option-btn" class="add-option-btn" type="button">Add option</button>
                        </div>
                        <div class="control-btns">
                            <button class="up-question-btn" type="button"></button>
                            <button class="add-question-btn" type="button"></button>
                            <button class="delete-question-btn" type="button"></button>
                            <button class="down-question-btn" type="button"></button>
                        </div>
                    </div>

                    <button id="save-form-btn" class="save-form-btn" type="button">Save</button>
                </form>
            </div>
        `;
    },

    after_render: async () => {
        const save_form_btn = document.getElementById("save-form-btn");
        const form_name = document.getElementById("form-name-input");
        const form_description = document.getElementById("form-description-input");
        const question_type = document.getElementById("question-type-select");
        const add_option_btn = document.getElementById("add-option-btn");
        const delete_option_btn = document.getElementById("delete-option-btn");
        
        save_form_btn.addEventListener('click', () => {
            console.log(form_name.value + " " + form_description.value);
        })

        question_type.addEventListener('change', () => {
            const text_answer_option = document.getElementById("text-answer-option");
            const single_choice_option = document.getElementById("single-choice-option");
            const multiple_choice_option= document.getElementById("multiple-choice-option");

            if (text_answer_option.selected) {
                add_option_btn.style.display = "none";
                delete_option_btn.style.display = "none";
            } else if (single_choice_option.selected) {
                add_option_btn.style.display = "block";
                delete_option_btn.style.display = "block";
            } else if (multiple_choice_option.selected) {
                add_option_btn.style.display = "block";
                delete_option_btn.style.display = "block";
            }
        })

        add_option_btn.addEventListener('click', () => {
            const options_list = document.getElementById("options-list");


        })
    }
}

export default NewForm;