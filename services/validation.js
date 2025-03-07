export function validateForm(data) {
    const errors = [ ];

    // Required fields per Part 3 are First Name, Last Name, and Email Address
    if (!data.fname || data.fname.trim() === "") {
        errors.push("First name is required");
    }

    if (!data.lname || data.lname.trim() === "") {
        errors.push("Last name is required");
    }

    if (!data.email || data.email.trim() === "" ||
        data.email.indexOf("@") === -1 ||
        data.email.indexOf(".") === -1) {
            errors.push("Email is required and must be valid");
    }

    return {
        isValid: errors.length === 0,
        errors
    }
}