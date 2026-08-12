let volunteers = [
    {
        id: 1,
        firstName: "John",
        lastName: "Smith",
        status: "Approved"
    },
    {
        id: 2,
        firstName: "Sarah",
        lastName: "Jones",
        status: "Pending Approval"
    },
    {
        id: 3,
        firstName: "Mike",
        lastName: "Brown",
        status: "Inactive"
    }
];

async function loadVolunteers() { 
    const response = await fetch("/api/volunteers");
    volunteers = await response.json();
    listVolunteers();
}

function getVolunteers() {
    return volunteers;
}

function getVolunteerById(id) {
    return volunteers.find(volunteer => volunteer.id === id);
}

function addVolunteer(volunteer) {
    volunteers.push(volunteer);
}

function updateVolunteer(id, updatedVolunteer) {
    const index = volunteers.findIndex(volunteer => volunteer.id === id);
    if (index !== -1) {
        volunteers[index] = { ...volunteers[index], ...updatedVolunteer };
    }
}

function deleteVolunteer(id) {
    const index = volunteers.findIndex(volunteer => volunteer.id === id);
    if (index !== -1) {
        volunteers.splice(index, 1);
    }
}
function listVolunteers() {
    const volunteerList = document.getElementById("volunteerList");
    volunteerList.innerHTML = "";

    volunteers.forEach(volunteer => {
        const listItem = document.createElement("li");
        listItem.textContent = `${volunteer.first_name} ${volunteer.last_name} - ${volunteer.approval_status}`;
        volunteerList.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadVolunteers();
}); 
