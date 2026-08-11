const opportunityModel = require("../models/opportunityModel");

const opportunityController = {

    list: (req, res) => {
        const { filter, search } = req.query;

        if (filter || search) {
            let opportunities = [];

            if (search) {
                opportunities = opportunityModel.search(search);
            } else if (filter === "recent") {
                opportunities = opportunityModel.getRecent();
            } else if (filter === "center") {
                opportunities = opportunityModel.getByCenter(req.query.center);
            } else {
                opportunities = opportunityModel.getAll();
            }

            return res.json({ opportunities, filter, search });
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