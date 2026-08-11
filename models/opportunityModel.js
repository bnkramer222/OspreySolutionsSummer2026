const db = require("../db/database");

const opportunityModel = {
    getAll: () => {
        return db.prepare("SELECT * FROM opportunities").all();
    },

    getById: (id) => {
        return db.prepare("SELECT * FROM opportunities WHERE id = ?").get(id);
    },

    getRecent: () => {
        return db.prepare(`
            SELECT * FROM opportunities 
            WHERE date >= date('now', '-60 days')
        `).all();
    },

    getByCenter: (center) => {
        return db.prepare("SELECT * FROM opportunities WHERE center = ?").all(center);
    },

    search: (keyword) => {
        return db.prepare(`
            SELECT * FROM opportunities 
            WHERE name LIKE ? OR description LIKE ?
        `).all(`%${keyword}%`, `%${keyword}%`);
    },

    create: (data) => {
        return db.prepare(`
            INSERT INTO opportunities (name, center, date, description, skills_needed, status)
            VALUES (?, ?, ?, ?, ?, ?)
        `).run(data.name, data.center, data.date, data.description, data.skills_needed, data.status);
    },

    update: (id, data) => {
        return db.prepare(`
            UPDATE opportunities 
            SET name = ?, center = ?, date = ?, description = ?, skills_needed = ?, status = ?
            WHERE id = ?
        `).run(data.name, data.center, data.date, data.description, data.skills_needed, data.status, id);
    },

    delete: (id) => {
        return db.prepare("DELETE FROM opportunities WHERE id = ?").run(id);
    },

    getMatches: (id) => {
        return db.prepare(`
            SELECT volunteers.* FROM volunteers
            INNER JOIN volunteer_opportunity_matches 
            ON volunteers.id = volunteer_opportunity_matches.volunteer_id
            WHERE volunteer_opportunity_matches.opportunity_id = ?
        `).all(id);
    }
};

module.exports = opportunityModel;