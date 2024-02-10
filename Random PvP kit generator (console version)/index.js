const express = require('express');
const filesystem = require('fs');
const path = require('path')

const app = express();
const port = 3000;

function getEquipment(equipmentDirName) {
    let equipment = {};
    let equipmentFileNames = filesystem.readdirSync(equipmentDirName);
    for (let equipmentFileName of equipmentFileNames) {
        equipment[path.basename(equipmentFileName, '.txt')] = [];
        let equipmentFileContent = filesystem.readFileSync(path.join(equipmentDirName, equipmentFileName), 'utf-8');
        equipmentFileContent = equipmentFileContent.split('\r\n');
        for (let e of equipmentFileContent) {
            equipment[path.basename(equipmentFileName, '.txt')].push(e);
        }
    }
    return equipment;
}

app.get('/', (request, response) => {
    const equipmentDirName = 'equipment';
    const equipment = getEquipment(equipmentDirName);
    // response.send(`This is equipment list: ${equipment}`);
    response.json(equipment);
})

app.listen(port, () => {
    console.log(`App started at addres: http://localhost:${port}`);
});