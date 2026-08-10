const volunteers = [
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
const filter = document.getElementById("volunteer-filter");

filter.addEventListener("change", () => {

    const selectedFilter = filter.value;

    if (selectedFilter === "All") {

        listVolunteers(volunteers);

    } else if (selectedFilter === "Approved/Pending") {

        const filteredVolunteers = volunteers.filter(volunteer => {
            return volunteer.status === "Approved"
                || volunteer.status === "Pending Approval";
        });

        listVolunteers(filteredVolunteers);

    } else {

        const filteredVolunteers = volunteers.filter(
            volunteer => volunteer.status === selectedFilter
        );

        listVolunteers(filteredVolunteers);
    }

});

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

function listVolunteers(volunteersToDisplay) {
    const volunteerList = document.getElementById("volunteerList");
    volunteerList.innerHTML = "";

    volunteersToDisplay.forEach(volunteer => {
        const listItem = document.createElement("li");
        listItem.textContent = `${volunteer.firstName} ${volunteer.lastName} - ${volunteer.status}`;
        volunteerList.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    listVolunteers(volunteers);
}); 

