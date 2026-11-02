/* Sokudela Funeral Directors — Task 3 JavaScript */
"use strict";

const serviceItems = [
  {name:"Funeral Planning", category:"Planning", description:"Guidance with planning, scheduling, documentation and coordination."},
  {name:"Burial Arrangements", category:"Arrangements", description:"Support coordinating burial arrangements and relevant service providers."},
  {name:"Cremation Arrangements", category:"Arrangements", description:"Clear information and coordination support for families considering cremation."},
  {name:"Funeral Transport", category:"Transport", description:"Professional coordination of funeral transport and collection arrangements."},
  {name:"Memorial Support", category:"Memorial", description:"Assistance with memorial planning, programmes and practical coordination."},
  {name:"Family Consultation", category:"Planning", description:"A respectful consultation process focused on each family's needs."}
];

function renderServices(items) {
  const grid = document.querySelector("#dynamic-services");
  if (!grid) return;
  grid.innerHTML = items.length ? items.map((item, i) => `
    <article class="service-card">
      <div class="service-icon">${String(i + 1).padStart(2, "0")}</div>
      <p class="eyebrow dark">${item.category}</p>
      <h2>${item.name}</h2>
      <p>${item.description}</p>
      <a href="enquiry.html?service=${encodeURIComponent(item.name)}">Enquire about this service →</a>
    </article>`).join("") : '<p role="status">No services match your search. Try another keyword.</p>';
}

function setupServiceSearch() {
  const grid = document.querySelector("#dynamic-services");
  if (!grid) return;
  const search = document.querySelector("#service-search");
  const sort = document.querySelector("#service-sort");
  const update = () => {
    const term = (search?.value || "").trim().toLowerCase();
    const items = serviceItems.filter(item =>
      (item.name + " " + item.category + " " + item.description).toLowerCase().includes(term)
    );
    if (sort?.value === "za") items.sort((a,b) => b.name.localeCompare(a.name));
    else if (sort?.value === "az") items.sort((a,b) => a.name.localeCompare(b.name));
    renderServices(items);
  };
  search?.addEventListener("input", update);
  sort?.addEventListener("change", update);
  renderServices(serviceItems);
}

function showFormMessage(form, message, isError = false) {
  const output = form.querySelector("[data-form-message]");
  if (!output) return;
  output.textContent = message;
  output.classList.toggle("form-error", isError);
  output.classList.toggle("form-success", !isError);
}

function setupForms() {
  document.querySelectorAll("form[data-sokudela-form]").forEach(form => {
    form.addEventListener("submit", async event => {
      event.preventDefault();
      if (!form.reportValidity()) {
        showFormMessage(form, "Please check the highlighted fields and try again.", true);
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());
      const kind = form.dataset.sokudelaForm;

      if (kind === "enquiry") {
        const service = data.service || "the selected service";
        showFormMessage(form, `Thank you, ${data.name}. Your enquiry about ${service} has been checked. This academic prototype cannot confirm prices or availability; please contact the organisation directly for a quotation.`);
        form.reset();
        return;
      }

      // Contact email: open a pre-addressed email after client-side validation.
      // Replace this academic placeholder with a verified organisation email before launch.
      const recipient = "info@sokudelafuneraldirectors.example";
      const subject = encodeURIComponent(`Website message: ${data.messageType || "General enquiry"}`);
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\nMessage type: ${data.messageType || "General"}\n\nMessage:\n${data.message}`
      );
      showFormMessage(form, "Your message has been prepared. Your email application will open so you can review and send it. The displayed recipient is an academic placeholder and must be replaced with a verified address.");
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupServiceSearch();
  setupForms();
  function setupForms() {
  document.querySelectorAll("form[data-sokudela-form]").forEach(form => {
    form.addEventListener("submit", async event => {
      event.preventDefault();

      if (!form.reportValidity()) {
        showFormMessage(form, "Please check the required fields and try again.", true);
        return;
      }

      const submitButton = form.querySelector('[type="submit"]');

      if (submitButton) {
        submitButton.disabled = true;
      }

      try {
        const data = Object.fromEntries(new FormData(form).entries());

        const response = await fetch(
          "https://formsubmit.co/ajax/olothandoguzana@gmail.com",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              ...data,
              _subject: "New Sokudela Website Enquiry",
              _template: "table"
            })
          }
        );

        const result = await response.json();

        if (!response.ok ||
            String(result.success).toLowerCase() !== "true") {
          throw new Error("Submission failed");
        }

        showFormMessage(form, "Thank you! Your message has been submitted successfully.");
        form.reset();

      } catch (error) {
        showFormMessage(form, "Your message could not be sent. Please try again.", true);

      } finally {
        if (submitButton) {
          submitButton.disabled = false;
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupServiceSearch();
  setupForms();
});
