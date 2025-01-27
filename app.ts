// Select DOM elements
const fieldsContainer = document.getElementById(
  "fields-container"
) as HTMLElement;
const addFieldButton = document.getElementById(
  "add-field"
) as HTMLButtonElement;
const saveFormButton = document.getElementById(
  "save-form"
) as HTMLButtonElement;
const savedFormsList = document.getElementById("saved-forms") as HTMLElement;
const formPreviewSection = document.getElementById(
  "form-preview"
) as HTMLElement;
const previewContainer = document.getElementById(
  "preview-container"
) as HTMLElement;
const backToBuilderButton = document.getElementById(
  "back-to-builder"
) as HTMLButtonElement;

let editingFormId: string | null = null; // Track the form being edited

// Type Definitions
type Field = {
  id: string;
  type: string;
  label: string;
  options?: string[]; // For radio buttons, checkboxes, dropdown, single selection
  placeholder?: string; // For text inputs
  dateFormat?: string; // For date field
  required?: boolean; // Validation: Is the field required
};

type Form = {
  id: string;
  name: string;
  fields: Field[];
};

// Store forms in localStorage
const localStorageKey = "forms";
const getFormsFromStorage = (): Form[] =>
  JSON.parse(localStorage.getItem(localStorageKey) || "[]");
const saveFormsToStorage = (forms: Form[]) =>
  localStorage.setItem(localStorageKey, JSON.stringify(forms));

// Generate unique IDs
const generateId = (): string => "_" + Math.random().toString(36).substr(2, 9);

// Current form data
let currentFields: Field[] = [];

// Add a new field
const addField = () => {
  const fieldId = generateId();
  const field: Field = {
    id: fieldId,
    type: "text", // Default to text input
    label: "",
  };
  currentFields.push(field);
  renderFields();
};

// Render fields in the builder
const renderFields = () => {
  fieldsContainer.innerHTML = "";
  currentFields.forEach((field) => {
    const fieldElement = document.createElement("div");
    fieldElement.className = "field";
    fieldElement.innerHTML = `
        <input type="text" placeholder="Label" value="${
          field.label
        }" data-id="${field.id}" class="field-label">
        <select data-id="${field.id}" class="field-type">
          <option value="text" ${
            field.type === "text" ? "selected" : ""
          }>Text</option>
          <option value="checkbox" ${
            field.type === "checkbox" ? "selected" : ""
          }>Multiple Choice</option>
          <option value="checkbox" ${
            field.type === "checkbox" ? "selected" : ""
          }>Checkbox</option>
          <option value="dropdown" ${
            field.type === "dropdown" ? "selected" : ""
          }>Dropdown</option>
          <option value="radio" ${
            field.type === "radio" ? "selected" : ""
          }>Single Selection</option>
          <option value="date" ${
            field.type === "date" ? "selected" : ""
          }>Date</option>
        </select>
        <button data-id="${field.id}" class="delete-field">Delete</button>
        <div class="field-options" data-id="${field.id}" style="display: none;">
          <input type="text" placeholder="Add option" class="add-option" data-id="${
            field.id
          }" />
          <button class="add-option-btn" data-id="${
            field.id
          }">Add Option</button>
          <ul class="options-list" data-id="${field.id}"></ul>
        </div>
        <div class="field-validation">
          <label>Required:</label>
          <input type="checkbox" ${field.required ? "checked" : ""} data-id="${
      field.id
    }" class="required-check" />
        </div>
        <div class="options-container" data-id="${field.id}"></div>`;
    fieldsContainer.appendChild(fieldElement);

    // Render options for radio/checkbox fields
    renderOptions(field);

    // Attach event listeners for label, type, and delete actions
    const labelInputs = document.querySelectorAll(
      ".field-label"
    ) as NodeListOf<HTMLInputElement>;
    labelInputs.forEach((input) =>
      input.addEventListener("input", (e) =>
        updateFieldLabel(
          (e.target as HTMLInputElement).dataset.id!,
          (e.target as HTMLInputElement).value
        )
      )
    );

    const typeSelects = document.querySelectorAll(
      ".field-type"
    ) as NodeListOf<HTMLSelectElement>;
    typeSelects.forEach((select) =>
      select.addEventListener("change", (e) =>
        updateFieldType(
          (e.target as HTMLSelectElement).dataset.id!,
          (e.target as HTMLSelectElement).value
        )
      )
    );

    const deleteButtons = document.querySelectorAll(
      ".delete-field"
    ) as NodeListOf<HTMLButtonElement>;
    deleteButtons.forEach((button) =>
      button.addEventListener("click", (e) =>
        deleteField((e.target as HTMLButtonElement).dataset.id!)
      )
    );

    const requiredCheck = document.querySelectorAll(
      ".required-check"
    ) as NodeListOf<HTMLInputElement>;
    requiredCheck.forEach((checkbox) =>
      checkbox.addEventListener("change", (e) =>
        toggleFieldRequired(
          (e.target as HTMLInputElement).dataset.id!,
          (e.target as HTMLInputElement).checked
        )
      )
    );

    const optionInputs = document.querySelectorAll(
      ".add-option"
    ) as NodeListOf<HTMLInputElement>;
    optionInputs.forEach((input) =>
      input.addEventListener("input", (e) =>
        updateFieldOptions(
          (e.target as HTMLInputElement).dataset.id!,
          (e.target as HTMLInputElement).value
        )
      )
    );

    const addOptionBtns = document.querySelectorAll(
      ".add-option-btn"
    ) as NodeListOf<HTMLButtonElement>;
    addOptionBtns.forEach((button) =>
      button.addEventListener("click", (e) =>
        addOptionToField((e.target as HTMLButtonElement).dataset.id!)
      )
    );
  });
};

// Render options for radio and checkbox fields
const renderOptions = (field: Field) => {
  const optionsContainer = document.querySelector(
    `.options-container[data-id="${field.id}"]`
  ) as HTMLElement;

  if (
    field.type === "radio" ||
    field.type === "checkbox" ||
    field.type === "dropdown"
  ) {
    optionsContainer.innerHTML = ""; // Clear previous options

    if (field.options) {
      field.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "option";

        optionElement.innerHTML = `
            <input type="text" value="${option}" data-id="${field.id}" data-index="${index}" class="option-input">
            <button data-id="${field.id}" data-index="${index}" class="delete-option">Delete</button>
          `;
        optionsContainer.appendChild(optionElement);
      });
    }

    // Add "Add Option" button
    const addOptionButton = document.createElement("button");
    addOptionButton.textContent = "Add Option";
    addOptionButton.addEventListener("click", () => addOption(field.id));
    optionsContainer.appendChild(addOptionButton);

    // Attach event listeners for option inputs and delete buttons
    const optionInputs = document.querySelectorAll(
      `.option-input[data-id="${field.id}"]`
    ) as NodeListOf<HTMLInputElement>;
    optionInputs.forEach((input) =>
      input.addEventListener("input", (e) =>
        updateOptionLabel(
          field.id,
          (e.target as HTMLInputElement).dataset.index!,
          (e.target as HTMLInputElement).value
        )
      )
    );

    const deleteOptionButtons = document.querySelectorAll(
      `.delete-option[data-id="${field.id}"]`
    ) as NodeListOf<HTMLButtonElement>;
    deleteOptionButtons.forEach((button) =>
      button.addEventListener("click", (e) =>
        deleteOption(field.id, (e.target as HTMLButtonElement).dataset.index!)
      )
    );
  }
};

// Delete an option
const deleteOption = (fieldId: string, index: string) => {
  const field = currentFields.find((field) => field.id === fieldId);
  if (field && (field.type === "radio" || field.type === "checkbox")) {
    const optionIndex = parseInt(index, 10);
    if (field.options && field.options[optionIndex] !== undefined) {
      field.options.splice(optionIndex, 1); // Remove the option
      renderFields();
    }
  }
};

// Add option for radio/checkbox fields
const addOption = (fieldId: string) => {
  const field = currentFields.find((field) => field.id === fieldId);
  if (
    field &&
    (field.type === "radio" ||
      field.type === "checkbox" ||
      field.type === "dropdown")
  ) {
    field.options = field.options || [];
    field.options.push(""); // Add an empty option
    renderFields();
  }
};

// Update option label
const updateOptionLabel = (fieldId: string, index: string, label: string) => {
  const field = currentFields.find((field) => field.id === fieldId);
  if (
    field &&
    (field.type === "radio" ||
      field.type === "checkbox" ||
      field.type === "dropdown")
  ) {
    const optionIndex = parseInt(index, 10);
    if (field.options && field.options[optionIndex] !== undefined) {
      field.options[optionIndex] = label;
    }
  }
};

// Update field label
const updateFieldLabel = (id: string, label: string) => {
  const field = currentFields.find((field) => field.id === id);
  if (field) field.label = label;
};

// Update field type
const updateFieldType = (id: string, type: string) => {
  const field = currentFields.find((field) => field.id === id);
  if (field) {
    field.type = type;
    renderFields(); // Re-render fields to show options only for applicable types
  }
};

// Toggle field required state
const toggleFieldRequired = (id: string, required: boolean) => {
  const field = currentFields.find((field) => field.id === id);
  if (field) field.required = required;
};

// Update field options (for dropdown, radio, checkbox, radio)
const updateFieldOptions = (id: string, value: string) => {
  const field = currentFields.find((field) => field.id === id);
  if (field) {
    if (!field.options) field.options = [];
    field.options[0] = value; // Update the first option temporarily for now
  }
};

// Add option to field (for radio, checkbox, dropdown, and radio)
const addOptionToField = (id: string) => {
  const field = currentFields.find((field) => field.id === id);
  const optionInput = document.querySelector(
    `.add-option[data-id="${id}"]`
  ) as HTMLInputElement;
  const optionValue = optionInput.value.trim();
  if (field && optionValue) {
    if (!field.options) field.options = [];
    field.options.push(optionValue);
    optionInput.value = ""; // Clear input
    renderFields(); // Re-render to update options
  }
};

// Delete a field
const deleteField = (id: string) => {
  currentFields = currentFields.filter((field) => field.id !== id);
  renderFields();
};

// Save form
const saveForm = () => {
  const formName = prompt("Enter a name for this form:");
  if (!formName) return;

  const newForm: Form = {
    id: generateId(),
    name: formName,
    fields: currentFields,
  };

  const forms = getFormsFromStorage();
  forms.push(newForm);
  saveFormsToStorage(forms);

  alert("Form saved!");
  renderSavedForms();
  currentFields = [];
  renderFields();
};

// Render saved forms
const renderSavedForms = () => {
  savedFormsList.innerHTML = "";
  const forms = getFormsFromStorage();
  forms.forEach((form) => {
    const formElement = document.createElement("li");
    formElement.innerHTML = `
        <span>${form.name}</span>
        <div>
          <button data-id="${form.id}" class="preview-form">Preview</button>
          <button data-id="${form.id}" class="edit-form">Edit</button>
          <button data-id="${form.id}" class="delete-form">Delete</button>
        </div>
      `;
    savedFormsList.appendChild(formElement);
  });

  // Attach event listeners for preview and delete actions
  const previewButtons = document.querySelectorAll(
    ".preview-form"
  ) as NodeListOf<HTMLButtonElement>;
  previewButtons.forEach((button) =>
    button.addEventListener("click", (e) =>
      previewForm((e.target as HTMLButtonElement).dataset.id!)
    )
  );

  const deleteButtons = document.querySelectorAll(
    ".delete-form"
  ) as NodeListOf<HTMLButtonElement>;
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) =>
      deleteForm((e.target as HTMLButtonElement).dataset.id!)
    );
  });

  const editButtons = document.querySelectorAll(
    ".edit-form"
  ) as NodeListOf<HTMLButtonElement>;
  editButtons.forEach((button) =>
    button.addEventListener("click", (e) =>
      editForm((e.target as HTMLButtonElement).dataset.id!)
    )
  );
};

// Preview a form
const previewForm = (id: string) => {
  const forms = getFormsFromStorage();
  const form = forms.find((form) => form.id === id);
  if (!form) return;

  previewContainer.innerHTML = "";
  form.fields.forEach((field) => {
    const fieldElement = document.createElement("div");
    fieldElement.className = "field-preview";
    fieldElement.innerHTML = `<label>${field.label} : </label>`;
    if (field.type === "text") {
      fieldElement.innerHTML += `<input type="text" disabled>`;
    } else if (field.type === "radio" || field.type === "checkbox") {
      field.options?.forEach((option) => {
        fieldElement.innerHTML += `<input type="${field.type}" disabled> ${option}`;
      });
    } else if (field.type === "dropdown") {
      fieldElement.innerHTML += `<select disabled>`;
      field.options?.forEach((option) => {
        fieldElement.innerHTML += `<option>${option}</option>`;
      });
      fieldElement.innerHTML += `</select>`;
    } else if (field.type === "radio") {
      field.options?.forEach((option) => {
        fieldElement.innerHTML += `<input type="radio" disabled> ${option}`;
      });
    } else if (field.type === "date") {
      fieldElement.innerHTML += `<input type="date" disabled>`;
    }
    previewContainer.appendChild(fieldElement);
  });

  formPreviewSection.style.display = "block";
};

// Delete a form
const deleteForm = (id: string) => {
  let forms = getFormsFromStorage();
  forms = forms.filter((form) => form.id !== id);
  saveFormsToStorage(forms);
  renderSavedForms();
};

// Back to form builder
const backToFormBuilder = () => {
  formPreviewSection.style.display = "none";
};

// Edit form
const editForm = (id: string) => {
  const forms = getFormsFromStorage();
  const form = forms.find((form) => form.id === id);
  if (form) {
    editingFormId = id; // Set form as being edited
    currentFields = [...form.fields]; // Load fields into the builder
    renderFields();
  }
};

// Save updated form
const saveUpdatedForm = () => {
  if (editingFormId) {
    const forms = getFormsFromStorage();
    const formIndex = forms.findIndex((form) => form.id === editingFormId);
    if (formIndex !== -1) {
      forms[formIndex].fields = currentFields; // Update the fields of the form
      saveFormsToStorage(forms);
      alert("Form updated!");
      renderSavedForms();
      currentFields = [];
      editingFormId = null; // Reset editing form
      renderFields();
    }
  }
};

// Event Listeners
addFieldButton.addEventListener("click", addField);
saveFormButton.addEventListener("click", saveForm);
backToBuilderButton.addEventListener("click", backToFormBuilder);

// Initial Render
renderSavedForms();
