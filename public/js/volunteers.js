const filter = document.getElementById("volunteer-filter");
const volunteerList = document.getElementById("volunteerList");

let volunteers = [];

async function loadVolunteers() {
    const response = await fetch("/api/volunteers/search?q=");
    volunteers = await response.json();
    listVolunteers(volunteers);
}

function listVolunteers(list) {
    volunteerList.innerHTML = "";

    list.forEach(volunteer => {
        const item = document.createElement("li");

        item.innerHTML =
            volunteer.first_name + " " +
            volunteer.last_name + " - " +
            volunteer.approval_status +
            ' <button onclick="editVolunteer(' + volunteer.id + ')">Edit</button>';

        volunteerList.appendChild(item);
    });
}

filter.addEventListener("change", () => {
    const selected = filter.value;

    if (selected === "All") {
        listVolunteers(volunteers);
    } else if (selected === "Approved/Pending") {
        listVolunteers(
            volunteers.filter(v =>
                v.approval_status === "Approved" ||
                v.approval_status === "Pending Approval"
            )
        );
    } else {
        listVolunteers(
            volunteers.filter(v =>
                v.approval_status === selected
            )
        );
    }
});

function editVolunteer(id) {
    location.href = '/volunteer-form?id=' + id;
}

loadVolunteers();
