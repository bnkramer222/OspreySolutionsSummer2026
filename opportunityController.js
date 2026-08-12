const opportunityModel = require("../models/opportunityModel");

const opportunityController = {

    list: (req, res) => {
        const { filter, search } = req.query;
        const searchTerm = typeof search === "string" ? search.trim() : "";

        if (filter || searchTerm) {
            let opportunities = [];

            if (searchTerm) {
                opportunities = opportunityModel.search(searchTerm);
            } else if (filter === "recent") {
                opportunities = opportunityModel.getRecent();
            } else if (filter === "center") {
                opportunities = opportunityModel.getByCenter(req.query.center);
            } else {
                opportunities = opportunityModel.getAll();
            }

            const noResults = opportunities.length === 0;

            return res.json({
                opportunities,
                filter: filter || "all",
                search: searchTerm,
                noResults,
                message: searchTerm && noResults
                    ? "No opportunities matched your search."
                    : null
            });
        }

        res.sendFile(require("path").join(__dirname, "../views/opportunities.html"));
    },

    showAddForm: (req, res) => {
        res.sendFile(require("path").join(__dirname, "../views/opportunity-form.html"));
    },

    add: (req, res) => {
        const { name, center, date, description, skills_needed, status } = req.body;
        if (!name || !center || !date) {
            return res.status(400).json({ error: "Name, center, and date are required" });
        }
        opportunityModel.create({ name, center, date, description, skills_needed, status: status || "Active" });
        res.redirect("/opportunities");
    },

    showEditForm: (req, res) => {
        const opportunity = opportunityModel.getById(req.params.id);
        if (!opportunity) {
            return res.status(404).json({ error: "Opportunity not found" });
        }
        res.sendFile(require("path").join(__dirname, "../views/opportunity-form.html"));
    },

    edit: (req, res) => {
        const { name, center, date, description, skills_needed, status } = req.body;
        if (!name || !center || !date) {
            return res.status(400).json({ error: "Name, center, and date are required" });
        }
        opportunityModel.update(req.params.id, { name, center, date, description, skills_needed, status });
        res.redirect("/opportunities");
    },

    delete: (req, res) => {
        opportunityModel.delete(req.params.id);
        res.redirect("/opportunities");
    },

    matches: (req, res) => {
        const matches = opportunityModel.getMatches(req.params.id);
        res.json({ matches });
    },

    getData: (req, res) => {
        const opportunity = opportunityModel.getById(req.params.id);
        if (!opportunity) {
            return res.status(404).json({ error: "Opportunity not found" });
        }
        res.json(opportunity);
    }

};

module.exports = opportunityController;
