"use strict";
// Select DOM elements
const $ca89da83071998c6$var$fieldsContainer = document.getElementById("fields-container");
const $ca89da83071998c6$var$addFieldButton = document.getElementById("add-field");
const $ca89da83071998c6$var$saveFormButton = document.getElementById("save-form");
const $ca89da83071998c6$var$savedFormsList = document.getElementById("saved-forms");
const $ca89da83071998c6$var$formPreviewSection = document.getElementById("form-preview");
const $ca89da83071998c6$var$previewContainer = document.getElementById("preview-container");
const $ca89da83071998c6$var$backToBuilderButton = document.getElementById("back-to-builder");
// DOM Elements for Responses
const $ca89da83071998c6$var$formResponseSection = document.getElementById("form-responses");
const $ca89da83071998c6$var$responseContainer = document.getElementById("response-container");
// Centralized storage for current form responses
let $ca89da83071998c6$var$currentFormResponse = {};
// Store forms in localStorage
const $ca89da83071998c6$var$localStorageKey = "forms";
const $ca89da83071998c6$var$getFormsFromStorage = ()=>JSON.parse(localStorage.getItem($ca89da83071998c6$var$localStorageKey) || "[]");
const $ca89da83071998c6$var$saveFormsToStorage = (forms)=>localStorage.setItem($ca89da83071998c6$var$localStorageKey, JSON.stringify(forms));
// Get and Save Responses from Storage
const $ca89da83071998c6$var$localStorageResponseKey = "formResponses";
const $ca89da83071998c6$var$getResponsesFromStorage = ()=>JSON.parse(localStorage.getItem($ca89da83071998c6$var$localStorageResponseKey) || "[]");
const $ca89da83071998c6$var$saveResponsesToStorage = (responses)=>localStorage.setItem($ca89da83071998c6$var$localStorageResponseKey, JSON.stringify(responses));
// Generate unique IDs
const $ca89da83071998c6$var$generateId = ()=>"_" + Math.random().toString(36).substr(2, 9);
// Current form data
let $ca89da83071998c6$var$currentFields = [];
let $ca89da83071998c6$var$editingFormId = null; // Track the form being edited
// Add a new field
const $ca89da83071998c6$var$addField = ()=>{
    const fieldId = $ca89da83071998c6$var$generateId();
    const field = {
        id: fieldId,
        type: "text",
        label: ""
    };
    $ca89da83071998c6$var$currentFields.push(field);
    $ca89da83071998c6$var$renderFields();
};
// Render fields in the builder
const $ca89da83071998c6$var$renderFields = ()=>{
    $ca89da83071998c6$var$fieldsContainer.innerHTML = "";
    $ca89da83071998c6$var$currentFields.forEach((field)=>{
        const fieldElement = document.createElement("div");
        fieldElement.className = "field";
        fieldElement.innerHTML = `
        <input type="text" placeholder="Label" value="${field.label}" data-id="${field.id}" class="field-label">
        <select data-id="${field.id}" class="field-type">
          <option value="text" ${field.type === "text" ? "selected" : ""}>Text</option>
          <option value="checkbox" ${field.type === "checkbox" ? "selected" : ""}>Multiple Choice</option>
          <option value="checkbox" ${field.type === "checkbox" ? "selected" : ""}>Checkbox</option>
          <option value="dropdown" ${field.type === "dropdown" ? "selected" : ""}>Dropdown</option>
          <option value="radio" ${field.type === "radio" ? "selected" : ""}>Single Selection</option>
          <option value="date" ${field.type === "date" ? "selected" : ""}>Date</option>
        </select>
        <button data-id="${field.id}" class="delete-field">Delete</button>
        <div class="field-options" data-id="${field.id}" style="display: none;">
          <input type="text" placeholder="Add option" class="add-option" data-id="${field.id}" />
          <button class="add-option-btn" data-id="${field.id}">Add Option</button>
          <ul class="options-list" data-id="${field.id}"></ul>
        </div>
        <div class="field-validation">
          <label>Required:</label>
          <input type="checkbox" ${field.required ? "checked" : ""} data-id="${field.id}" class="required-check" />
        </div>
        <div class="options-container" data-id="${field.id}"></div>`;
        $ca89da83071998c6$var$fieldsContainer.appendChild(fieldElement);
        // Render options for radio/checkbox fields
        $ca89da83071998c6$var$renderOptions(field);
        // Attach event listeners for label, type, and delete actions
        const labelInputs = document.querySelectorAll(".field-label");
        labelInputs.forEach((input)=>input.addEventListener("input", (e)=>$ca89da83071998c6$var$updateFieldLabel(e.target.dataset.id, e.target.value)));
        const typeSelects = document.querySelectorAll(".field-type");
        typeSelects.forEach((select)=>select.addEventListener("change", (e)=>$ca89da83071998c6$var$updateFieldType(e.target.dataset.id, e.target.value)));
        const deleteButtons = document.querySelectorAll(".delete-field");
        deleteButtons.forEach((button)=>button.addEventListener("click", (e)=>$ca89da83071998c6$var$deleteField(e.target.dataset.id)));
        const requiredCheck = document.querySelectorAll(".required-check");
        requiredCheck.forEach((checkbox)=>checkbox.addEventListener("change", (e)=>$ca89da83071998c6$var$toggleFieldRequired(e.target.dataset.id, e.target.checked)));
        const optionInputs = document.querySelectorAll(".add-option");
        optionInputs.forEach((input)=>input.addEventListener("input", (e)=>$ca89da83071998c6$var$updateFieldOptions(e.target.dataset.id, e.target.value)));
        const addOptionBtns = document.querySelectorAll(".add-option-btn");
        addOptionBtns.forEach((button)=>button.addEventListener("click", (e)=>$ca89da83071998c6$var$addOptionToField(e.target.dataset.id)));
    });
};
// Render options for radio and checkbox fields
const $ca89da83071998c6$var$renderOptions = (field)=>{
    const optionsContainer = document.querySelector(`.options-container[data-id="${field.id}"]`);
    if (field.type === "radio" || field.type === "checkbox" || field.type === "dropdown") {
        optionsContainer.innerHTML = ""; // Clear previous options
        if (field.options) field.options.forEach((option, index)=>{
            const optionElement = document.createElement("div");
            optionElement.className = "option";
            optionElement.innerHTML = `
            <input type="text" value="${option}" data-id="${field.id}" data-index="${index}" class="option-input">
            <button data-id="${field.id}" data-index="${index}" class="delete-option">Delete</button>
          `;
            optionsContainer.appendChild(optionElement);
        });
        // Add "Add Option" button
        const addOptionButton = document.createElement("button");
        addOptionButton.textContent = "Add Option";
        addOptionButton.addEventListener("click", ()=>$ca89da83071998c6$var$addOption(field.id));
        optionsContainer.appendChild(addOptionButton);
        // Attach event listeners for option inputs and delete buttons
        const optionInputs = document.querySelectorAll(`.option-input[data-id="${field.id}"]`);
        optionInputs.forEach((input)=>input.addEventListener("input", (e)=>$ca89da83071998c6$var$updateOptionLabel(field.id, e.target.dataset.index, e.target.value)));
        const deleteOptionButtons = document.querySelectorAll(`.delete-option[data-id="${field.id}"]`);
        deleteOptionButtons.forEach((button)=>button.addEventListener("click", (e)=>$ca89da83071998c6$var$deleteOption(field.id, e.target.dataset.index)));
    }
};
// Delete an option
const $ca89da83071998c6$var$deleteOption = (fieldId, index)=>{
    const field = $ca89da83071998c6$var$currentFields.find((field)=>field.id === fieldId);
    if (field && (field.type === "radio" || field.type === "checkbox")) {
        const optionIndex = parseInt(index, 10);
        if (field.options && field.options[optionIndex] !== undefined) {
            field.options.splice(optionIndex, 1); // Remove the option
            $ca89da83071998c6$var$renderFields();
        }
    }
};
// Add option for radio/checkbox fields
const $ca89da83071998c6$var$addOption = (fieldId)=>{
    const field = $ca89da83071998c6$var$currentFields.find((field)=>field.id === fieldId);
    if (field && (field.type === "radio" || field.type === "checkbox" || field.type === "dropdown")) {
        field.options = field.options || [];
        field.options.push(""); // Add an empty option
        $ca89da83071998c6$var$renderFields();
    }
};
// Update option label
const $ca89da83071998c6$var$updateOptionLabel = (fieldId, index, label)=>{
    const field = $ca89da83071998c6$var$currentFields.find((field)=>field.id === fieldId);
    if (field && (field.type === "radio" || field.type === "checkbox" || field.type === "dropdown")) {
        const optionIndex = parseInt(index, 10);
        if (field.options && field.options[optionIndex] !== undefined) field.options[optionIndex] = label;
    }
};
// Update field label
const $ca89da83071998c6$var$updateFieldLabel = (id, label)=>{
    const field = $ca89da83071998c6$var$currentFields.find((field)=>field.id === id);
    if (field) field.label = label;
};
// Update field type
const $ca89da83071998c6$var$updateFieldType = (id, type)=>{
    const field = $ca89da83071998c6$var$currentFields.find((field)=>field.id === id);
    if (field) {
        field.type = type;
        $ca89da83071998c6$var$renderFields(); // Re-render fields to show options only for applicable types
    }
};
// Toggle field required state
const $ca89da83071998c6$var$toggleFieldRequired = (id, required)=>{
    const field = $ca89da83071998c6$var$currentFields.find((field)=>field.id === id);
    if (field) field.required = required;
};
// Update field options (for dropdown, radio, checkbox, radio)
const $ca89da83071998c6$var$updateFieldOptions = (id, value)=>{
    const field = $ca89da83071998c6$var$currentFields.find((field)=>field.id === id);
    if (field) {
        if (!field.options) field.options = [];
        field.options[0] = value; // Update the first option temporarily for now
    }
};
// Add option to field (for radio, checkbox, dropdown, and radio)
const $ca89da83071998c6$var$addOptionToField = (id)=>{
    const field = $ca89da83071998c6$var$currentFields.find((field)=>field.id === id);
    const optionInput = document.querySelector(`.add-option[data-id="${id}"]`);
    const optionValue = optionInput.value.trim();
    if (field && optionValue) {
        if (!field.options) field.options = [];
        field.options.push(optionValue);
        optionInput.value = ""; // Clear input
        $ca89da83071998c6$var$renderFields(); // Re-render to update options
    }
};
// Delete a field
const $ca89da83071998c6$var$deleteField = (id)=>{
    $ca89da83071998c6$var$currentFields = $ca89da83071998c6$var$currentFields.filter((field)=>field.id !== id);
    $ca89da83071998c6$var$renderFields();
};
// Save form
const $ca89da83071998c6$var$saveForm = ()=>{
    if ($ca89da83071998c6$var$editingFormId) {
        const forms = $ca89da83071998c6$var$getFormsFromStorage();
        const formIndex = forms.findIndex((form)=>form.id === $ca89da83071998c6$var$editingFormId);
        if (formIndex !== -1) {
            forms[formIndex].fields = $ca89da83071998c6$var$currentFields; // Update the fields of the form
            $ca89da83071998c6$var$saveFormsToStorage(forms);
            alert("Form updated!");
        }
    } else {
        const formName = prompt("Enter a name for this form:");
        if (!formName) return;
        const newForm = {
            id: $ca89da83071998c6$var$generateId(),
            name: formName,
            fields: $ca89da83071998c6$var$currentFields
        };
        const forms = $ca89da83071998c6$var$getFormsFromStorage();
        forms.push(newForm);
        $ca89da83071998c6$var$saveFormsToStorage(forms);
        alert("Form saved!");
    }
    $ca89da83071998c6$var$renderSavedForms();
    $ca89da83071998c6$var$currentFields = [];
    $ca89da83071998c6$var$editingFormId = null; // Reset editing form
    $ca89da83071998c6$var$renderFields();
};
// Render saved forms
const $ca89da83071998c6$var$renderSavedForms = ()=>{
    $ca89da83071998c6$var$savedFormsList.innerHTML = "";
    const forms = $ca89da83071998c6$var$getFormsFromStorage();
    forms.forEach((form)=>{
        const formElement = document.createElement("li");
        formElement.innerHTML = `
        <span>${form.name}</span>
        <div>
          <button data-id="${form.id}" class="preview-form">Preview</button>
          <button data-id="${form.id}" class="edit-form">Edit</button>
          <button data-id="${form.id}" class="delete-form">Delete</button>
          <button data-id="${form.id}" class="submit-form-response">Submit Response</button>
          <button data-id="${form.id}" class="view-response">View Response</button>
        </div>
      `;
        $ca89da83071998c6$var$savedFormsList.appendChild(formElement);
    });
    // Attach event listeners for preview and delete actions
    const previewButtons = document.querySelectorAll(".preview-form");
    previewButtons.forEach((button)=>button.addEventListener("click", (e)=>$ca89da83071998c6$var$previewForm(e.target.dataset.id)));
    const deleteButtons = document.querySelectorAll(".delete-form");
    deleteButtons.forEach((button)=>{
        button.addEventListener("click", (e)=>$ca89da83071998c6$var$deleteForm(e.target.dataset.id));
    });
    const editButtons = document.querySelectorAll(".edit-form");
    editButtons.forEach((button)=>button.addEventListener("click", (e)=>$ca89da83071998c6$var$editForm(e.target.dataset.id)));
    const submitResponseButtons = document.querySelectorAll(".submit-form-response");
    submitResponseButtons.forEach((button)=>button.addEventListener("click", (e)=>$ca89da83071998c6$var$renderFormForSubmission(e.target.dataset.id)));
    // Attach event listeners
    const viewButtons = document.querySelectorAll(".view-response");
    viewButtons.forEach((button)=>button.addEventListener("click", (e)=>$ca89da83071998c6$var$viewResponses(e.target.dataset.id)));
};
// Preview a form
const $ca89da83071998c6$var$previewForm = (id)=>{
    const forms = $ca89da83071998c6$var$getFormsFromStorage();
    const form = forms.find((form)=>form.id === id);
    if (!form) return;
    $ca89da83071998c6$var$previewContainer.innerHTML = "";
    form.fields.forEach((field)=>{
        var _a, _b, _c;
        const fieldElement = document.createElement("div");
        fieldElement.className = "field-preview";
        fieldElement.innerHTML = `<label>${field.label} ${field.required ? '<span style="color: red;">*</span>' : ""} : </label>`;
        if (field.type === "text") fieldElement.innerHTML += `<input type="text" disabled>`;
        else if (field.type === "radio" || field.type === "checkbox") (_a = field.options) === null || _a === void 0 || _a.forEach((option)=>{
            fieldElement.innerHTML += `<input type="${field.type}" disabled> ${option}`;
        });
        else if (field.type === "dropdown") {
            fieldElement.innerHTML += `<select disabled>`;
            (_b = field.options) === null || _b === void 0 || _b.forEach((option)=>{
                fieldElement.innerHTML += `<option>${option}</option>`;
            });
            fieldElement.innerHTML += `</select>`;
        } else if (field.type === "radio") (_c = field.options) === null || _c === void 0 || _c.forEach((option)=>{
            fieldElement.innerHTML += `<input type="radio" disabled> ${option}`;
        });
        else if (field.type === "date") fieldElement.innerHTML += `<input type="date" disabled>`;
        $ca89da83071998c6$var$previewContainer.appendChild(fieldElement);
    });
    $ca89da83071998c6$var$formPreviewSection.style.display = "block";
};
// Delete a form
const $ca89da83071998c6$var$deleteForm = (id)=>{
    let forms = $ca89da83071998c6$var$getFormsFromStorage();
    forms = forms.filter((form)=>form.id !== id);
    $ca89da83071998c6$var$saveFormsToStorage(forms);
    $ca89da83071998c6$var$renderSavedForms();
};
// Back to form builder
const $ca89da83071998c6$var$backToFormBuilder = ()=>{
    $ca89da83071998c6$var$formPreviewSection.style.display = "none";
};
// Edit form
const $ca89da83071998c6$var$editForm = (id)=>{
    const forms = $ca89da83071998c6$var$getFormsFromStorage();
    const form = forms.find((form)=>form.id === id);
    if (form) {
        $ca89da83071998c6$var$editingFormId = id; // Set form as being edited
        $ca89da83071998c6$var$currentFields = [
            ...form.fields
        ]; // Load fields into the builder
        $ca89da83071998c6$var$renderFields();
    }
};
// Event Listeners
$ca89da83071998c6$var$addFieldButton.addEventListener("click", $ca89da83071998c6$var$addField);
$ca89da83071998c6$var$saveFormButton.addEventListener("click", $ca89da83071998c6$var$saveForm);
$ca89da83071998c6$var$backToBuilderButton.addEventListener("click", $ca89da83071998c6$var$backToFormBuilder);
// Initial Render
$ca89da83071998c6$var$renderSavedForms();
// Add change event listener to update responses dynamically
const $ca89da83071998c6$var$handleInputChange = (event)=>{
    const target = event.target;
    if (!target) return;
    if (target.type === "checkbox") {
        const fieldId = target.name; // Group by name for checkboxes
        if (!Array.isArray($ca89da83071998c6$var$currentFormResponse[fieldId])) $ca89da83071998c6$var$currentFormResponse[fieldId] = [];
        const values = $ca89da83071998c6$var$currentFormResponse[fieldId];
        if (target.checked) values.push(target.value);
        else $ca89da83071998c6$var$currentFormResponse[fieldId] = values.filter((v)=>v !== target.value);
    } else if (target.type === "radio") $ca89da83071998c6$var$currentFormResponse[target.name] = target.value; // Use name for radio groups
    else $ca89da83071998c6$var$currentFormResponse[target.id] = target.value; // Use ID for text and dropdown
};
// Render Form for Submission
const $ca89da83071998c6$var$renderFormForSubmission = (id)=>{
    const forms = $ca89da83071998c6$var$getFormsFromStorage();
    const form = forms.find((form)=>form.id === id);
    $ca89da83071998c6$var$previewContainer.innerHTML = "";
    const formElement = document.createElement("form");
    formElement.id = "dynamic-form";
    if (form) {
        form.fields.forEach((field)=>{
            var _a, _b, _c;
            const fieldWrapper = document.createElement("div");
            fieldWrapper.className = "field";
            // Create field label
            const label = document.createElement("label");
            label.textContent = field.label;
            fieldWrapper.appendChild(label);
            // Create field based on type
            let inputElement;
            if (field.type === "text") {
                inputElement = document.createElement("input");
                inputElement.type = "text";
                inputElement.addEventListener("input", $ca89da83071998c6$var$handleInputChange);
            } else if (field.type === "checkbox") {
                inputElement = document.createElement("div");
                (_a = field.options) === null || _a === void 0 || _a.forEach((option)=>{
                    const optionWrapper = document.createElement("div");
                    const input = document.createElement("input");
                    input.type = "checkbox";
                    input.name = field.id; // Group by field ID
                    input.value = option;
                    input.addEventListener("change", $ca89da83071998c6$var$handleInputChange);
                    const optionLabel = document.createElement("label");
                    optionLabel.textContent = option;
                    optionWrapper.appendChild(input);
                    optionWrapper.appendChild(optionLabel);
                    inputElement.appendChild(optionWrapper);
                });
            } else if (field.type === "radio") {
                inputElement = document.createElement("div");
                (_b = field.options) === null || _b === void 0 || _b.forEach((option)=>{
                    const optionWrapper = document.createElement("div");
                    const input = document.createElement("input");
                    input.type = "radio";
                    input.name = field.id; // Group by field ID
                    input.value = option;
                    input.addEventListener("change", $ca89da83071998c6$var$handleInputChange);
                    const optionLabel = document.createElement("label");
                    optionLabel.textContent = option;
                    optionWrapper.appendChild(input);
                    optionWrapper.appendChild(optionLabel);
                    inputElement.appendChild(optionWrapper);
                });
            } else if (field.type === "dropdown") {
                inputElement = document.createElement("select");
                inputElement.id = field.id;
                (_c = field.options) === null || _c === void 0 || _c.forEach((option)=>{
                    const optionElement = document.createElement("option");
                    optionElement.value = option;
                    optionElement.textContent = option;
                    inputElement.appendChild(optionElement);
                });
                inputElement.addEventListener("change", $ca89da83071998c6$var$handleInputChange);
            } else if (field.type === "date") {
                inputElement = document.createElement("input");
                inputElement.type = "date";
                inputElement.addEventListener("input", $ca89da83071998c6$var$handleInputChange);
            } else {
                inputElement = document.createElement("input");
                inputElement.type = "text";
                inputElement.addEventListener("input", $ca89da83071998c6$var$handleInputChange);
            }
            inputElement.id = field.id;
            inputElement.className = "form-input";
            if (field.type === "checkbox" || field.type === "radio") inputElement.className = "checkbox";
            fieldWrapper.appendChild(inputElement);
            formElement.appendChild(fieldWrapper);
        });
        // Submit Button
        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        submitButton.type = "button";
        submitButton.addEventListener("click", ()=>$ca89da83071998c6$var$submitFormResponse(form.id));
        formElement.appendChild(submitButton);
    }
    $ca89da83071998c6$var$previewContainer.appendChild(formElement);
    $ca89da83071998c6$var$formPreviewSection.style.display = "block";
};
// Submit Form Response
const $ca89da83071998c6$var$submitFormResponse = (formId)=>{
    const responses = $ca89da83071998c6$var$getResponsesFromStorage();
    responses.push({
        formId: formId,
        responses: $ca89da83071998c6$var$currentFormResponse
    });
    $ca89da83071998c6$var$saveResponsesToStorage(responses);
    alert("Form submitted successfully!");
    $ca89da83071998c6$var$backToFormBuilder();
};
// Render Submitted Responses
const $ca89da83071998c6$var$renderResponses = ()=>{
    $ca89da83071998c6$var$responseContainer.innerHTML = "";
    const responses = $ca89da83071998c6$var$getResponsesFromStorage();
    const forms = $ca89da83071998c6$var$getFormsFromStorage();
    if (responses.length === 0) {
        alert("No responses found for this form.");
        return;
    }
    $ca89da83071998c6$var$responseContainer.innerHTML = `<h3>Responses</h3>`;
    responses.forEach((response, index)=>{
        const form = forms.find((f)=>f.id === response.formId);
        if (!form) return;
        const responseElement = document.createElement("div");
        responseElement.className = "response";
        const title = document.createElement("h3");
        title.textContent = `Responses for Form: ${form.name}`;
        responseElement.appendChild(title);
        Object.keys(response.responses).forEach((fieldId)=>{
            const value = response.responses[fieldId];
            const field = form.fields.find((f)=>f.id === fieldId);
            if (!field) return;
            const responseRow = document.createElement("div");
            responseRow.className = "response-row";
            responseRow.innerHTML = `<strong>${field.label}:</strong> ${value}`;
            responseElement.appendChild(responseRow);
        });
        $ca89da83071998c6$var$responseContainer.appendChild(responseElement);
    });
};
// View responses for a form
const $ca89da83071998c6$var$viewResponses = (formId)=>{
    const allResponses = $ca89da83071998c6$var$getResponsesFromStorage();
    const forms = $ca89da83071998c6$var$getFormsFromStorage();
    const responses = allResponses.filter((response)=>response.formId === formId);
    const form = forms.find((f)=>f.id === formId);
    if (!form) return;
    if (responses.length === 0) {
        alert("No responses found for this form.");
        return;
    }
    $ca89da83071998c6$var$previewContainer.innerHTML = `<h3>Responses</h3>`;
    responses.forEach((response, index)=>{
        const responseDiv = document.createElement("div");
        responseDiv.className = "response";
        const responseHeader = document.createElement("h4");
        responseHeader.textContent = `Response ${index + 1}`;
        responseDiv.appendChild(responseHeader);
        Object.keys(response.responses).forEach((fieldId)=>{
            const fieldDiv = document.createElement("div");
            const answer = response.responses[fieldId];
            const field = form.fields.find((f)=>f.id === fieldId);
            if (!field) return;
            fieldDiv.textContent = `${field.label}: ${Array.isArray(answer) ? answer.join(", ") : answer}`;
            responseDiv.appendChild(fieldDiv);
        });
        $ca89da83071998c6$var$previewContainer.appendChild(responseDiv);
    });
    $ca89da83071998c6$var$formPreviewSection.style.display = "block";
};


//# sourceMappingURL=app.js.map
