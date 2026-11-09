document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://eventcraft-873s.onrender.com/enquiry";

    // MOBILE NAVIGATION
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");
            navToggle.classList.toggle("active", isOpen);
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                navToggle.classList.remove("active");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // GALLERY FILTER
    const galleryTabs = document.querySelectorAll(".gallery-tab");
    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const filter = tab.dataset.filter;

            galleryTabs.forEach((item) => item.classList.remove("active"));
            tab.classList.add("active");

            galleryItems.forEach((item) => {
                const shouldShow =
                    filter === "all" || item.dataset.category === filter;
                item.hidden = !shouldShow;
            });
        });
    });

    // ENQUIRY FORM -> NODE/EXPRESS API -> MONGODB
    const enquiryForm = document.getElementById("enquiryForm");

    if (!enquiryForm) return;

    const statusMessage = document.getElementById("formStatus");
    const submitButton = enquiryForm.querySelector('button[type="submit"]');

    enquiryForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!enquiryForm.reportValidity()) return;

        const formData = new FormData(enquiryForm);

        const data = {
            name: String(formData.get("name") || "").trim(),
            email: String(formData.get("email") || "").trim(),
            phone: String(formData.get("phone") || "").trim(),
            eventType: String(formData.get("eventType") || "").trim(),
            eventDate: String(formData.get("eventDate") || "").trim(),
            guestCount: String(formData.get("guestCount") || "").trim(),
            message: String(formData.get("message") || "").trim()
        };

        const requiredFields = [
            data.name,
            data.email,
            data.phone,
            data.eventType,
            data.eventDate,
            data.guestCount,
            data.message
        ];

        if (requiredFields.some((value) => !value)) {
            if (statusMessage) {
                statusMessage.textContent = "Please fill all required fields.";
            }
            return;
        }

        try {
            if (statusMessage) {
                statusMessage.textContent = "Submitting your enquiry...";
            }

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Submitting...";
            }

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    result.message || "Enquiry submission failed. Please try again."
                );
            }

            if (statusMessage) {
                statusMessage.textContent =
                    result.message || "Enquiry submitted successfully!";
            }

            enquiryForm.reset();
        } catch (error) {
            console.error("Enquiry submission error:", error);

            if (statusMessage) {
                statusMessage.textContent =
                    error.message ||
                    "Could not connect to the server. Please try again.";
            }
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Submit Enquiry";
            }
        }
    });
});
