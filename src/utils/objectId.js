const { ObjectId } = require("mongodb");

function converterId(id) {
    if (!ObjectId.isValid(id) || String(new ObjectId(id)) !== id) {
        throw new Error("ID inválido");
    }

    return new ObjectId(id);
}

module.exports = { converterId };
