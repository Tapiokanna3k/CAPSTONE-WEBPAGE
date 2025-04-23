// Ensure the script is loaded
console.log("Script loaded");

// Array to store student data by seat number
const seatData = {};

/**
 * Function to generate seating rows dynamically.
 * @param {Number} totalSeats Total number of seats.
 * @param {Number} seatsPerRow Number of seats per row.
 * @returns {String} HTML string for seating rows.
 */
function generateSeatingRows(totalSeats, seatsPerRow) {
    let rows = "";

    for (let i = 0; i < totalSeats; i += seatsPerRow) {
        rows += "<tr>";
        for (let j = 0; j < seatsPerRow; j++) {
            const seatNumber = i + j + 1;
            if (seatNumber <= totalSeats) {
                rows += `<td><button onclick="openModal(${seatNumber})">${seatNumber}</button></td>`;
            }
        }
        rows += "</tr>";
    }
    return rows;
}

/**
 * Open the modal for a specific seat.
 * @param {Number} seatNumber The seat number to customize.
 */
function openModal(seatNumber) {
    const modal = document.getElementById("studentModal");
    const form = document.getElementById("studentForm");

    // Pre-fill form if data exists
    form.dataset.seatNumber = seatNumber;
    document.getElementById("studentId").value = seatData[seatNumber]?.studentId || "";
    document.getElementById("status").value = seatData[seatNumber]?.status || "Present";
    document.getElementById("note").value = seatData[seatNumber]?.note || "";

    modal.style.display = "block";
}

/**
 * Close the modal.
 */
function closeModal() {
    const modal = document.getElementById("studentModal");
    modal.style.display = "none";
}

// Attach close event to the modal
document.querySelector(".close").onclick = closeModal;

/**
 * Save student data and update the seat button.
 */
document.getElementById("studentForm").onsubmit = function (e) {
    e.preventDefault();

    const seatNumber = this.dataset.seatNumber;
    const studentId = document.getElementById("studentId").value;
    const status = document.getElementById("status").value;
    const note = document.getElementById("note").value;

    // Save data
    seatData[seatNumber] = { studentId, status, note };

    // Update seat button
    const button = document.querySelector(`button[onclick="openModal(${seatNumber})"]`);
    button.textContent = `${studentId} (${status})`;
    button.style.backgroundColor = status === "Present" ? "lightgreen" : status === "Late" ? "orange" : "red";

    closeModal();
};

// Dynamically generate seat map
document.addEventListener("DOMContentLoaded", () => {
    const seatingBody = document.getElementById("seating-chart-body");
    seatingBody.innerHTML = generateSeatingRows(60, 10); // Example: 60 seats, 10 per row
});