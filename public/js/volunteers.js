const filter = document.getElementById("volunteer-filter");
const searchInput = document.getElementById("search-input");
const volunteerGrid = document.getElementById("volunteer-grid");
const noResults = document.getElementById("no-results");

let volunteers = [];

async function loadVolunteers() {
    const response = await fetch("/api/volunteers");
    volunteers = await response.json();
    listVolunteers(volunteers);
}

function listVolunteers(list) {
    volunteerGrid.innerHTML = "";

    if (list.length === 0) {
        noResults.style.display = "block";
        return;
    }

    noResults.style.display = "none";

    list.forEach(volunteer => {
        const card = document.createElement("div");
        card.className = "volunteer-card";

        card.innerHTML = `
            <div class="vol-left">
                <div class="vol-avatar">👤</div>

                <div class="vol-info">
                    <h3>${volunteer.first_name} ${volunteer.last_name}</h3>

                    <div class="vol-meta">
                        <span>${volunteer.email || ""}</span>
                        <span>${volunteer.approval_status}</span>
                    </div>
                </div>
            </div>

            <div class="vol-actions">
                <button class="btn btn-edit"
                    onclick="editVolunteer(${volunteer.id})">
                    Edit
                </button>
            </div>
        `;

        volunteerGrid.appendChild(card);
    });
}

function filterVolunteers() {
    const selected = filter.value;
    const search = searchInput.value.toLowerCase();

    let results = volunteers;

    if (selected === "Approved/Pending") {
        results = results.filter(v =>
            v.approval_status === "Approved" ||
            v.approval_status === "Pending Approval"
        );
    } else if (selected !== "All") {
        results = results.filter(v =>
            v.approval_status === selected
        );
    }

    results = results.filter(v =>
        v.first_name.toLowerCase().includes(search) ||
        v.last_name.toLowerCase().includes(search) ||
        v.username.toLowerCase().includes(search) ||
        (v.email || "").toLowerCase().includes(search)
    );

    listVolunteers(results);
}

function editVolunteer(id) {
    location.href = "/volunteer-form?id=" + id;
}

filter.addEventListener("change", filterVolunteers);
searchInput.addEventListener("input", filterVolunteers);

loadVolunteers();