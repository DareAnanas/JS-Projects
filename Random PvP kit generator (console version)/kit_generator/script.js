let kitText = document.getElementById('kit');

document.addEventListener('DOMContentLoaded', () => {
    fetch('/equipment')
    .then(response => response.json())
    .then(equipment => {
        let kit = generateKit(equipment);
        kitText.textContent = kit.join('\n');
    }).catch(error => {
        console.error('Error fetching data:', error);
    })
})

function generateGiveCommands(kit) {
    
}

class SlotGenerator {
    equipment;

    constructor(equipment) {
        this.equipment = equipment;
    }

    generateSlot(category) {
        let random = _random(this.equipment[category].length);
        let slot = this.equipment[category][random];
        return slot;
    }

    
}

class EquipmentGenerator {
    equipment;
    slotGenerator;

    constructor(equipment) {
        this.equipment = equipment;
        this.slotGenerator = new SlotGenerator(equipment);
    }

    generateMeleeWeapon() {
        let slot = this.slotGenerator.generateSlot('melee_weapon');
        let material = this.slotGenerator.generateSlot('materials');
        slot = material + '_' + slot;
        return slot;
    }

    generateTool() {
        let slot = this.slotGenerator.generateSlot('tools');
        // let excludedTools = this.equipment.tools.filter(tool => tool != slot);
        if (checkToolForMaterial(slot)) {
            let material = this.slotGenerator.generateSlot('materials');
            slot = material + '_' + slot;
        }
        return slot;
    }
}

function generateKit(equipment) {
    let kit = [];
    let random;
    let slot;
    let equipmentGenerator = new EquipmentGenerator(equipment);

    let meleeWeapon = equipmentGenerator.generateMeleeWeapon();
    kit.push(meleeWeapon);

    random = _random(equipment.tools.length);
    slot = equipment.tools[random];
    let tools = equipment.tools.filter(tool => tool != slot);
    if (checkToolForMaterial(slot)) {
        random = _random(equipment.materials.length);
        slot = equipment.materials[random] + '_' + slot;
    }
    kit.push(slot);

    random = _random(tools.length);
    slot = tools[random];
    if (checkToolForMaterial(slot)) {
        random = _random(equipment.materials.length);
        slot = equipment.materials[random] + '_' + slot;
    }
    kit.push(slot);

    random = _random(equipment.food.length);
    slot = equipment.food[random];
    kit.push(slot);

    random = _random(equipment.building_blocks.length);
    slot = equipment.building_blocks[random];
    kit.push(slot);

    if (_random(2)) {
        random = _random(equipment.ranged_weapon.length);
        slot = equipment.ranged_weapon[random];
        kit.push(slot);
    } else {
        slot = 0;
    }

    if (slot != 0) {
        slot = 'arrow';
        kit.push(slot);
    } else {
        random = _random(equipment.boosts.length);
        slot = equipment.boosts[random];
        kit.push(slot);
    }

    let boosts = equipment.boosts.filter(boost => boost != slot);
    random = _random(boosts.length);
    slot = boosts[random];
    kit.push(slot);

    random = _random(equipment.special.length);
    slot = equipment.special[random];
    kit.push(slot);

    for (let armor_part of equipment.armor_parts) {
        random = _random(equipment.armor_materials.length);
        slot = equipment.armor_materials[random];
        slot = slot + '_' + armor_part;
        kit.push(slot);
    }

    return kit;
}

function _random(length) {
    return Math.floor(Math.random() * length);
}

function checkToolForMaterial(tool) {
    return tool == 'pickaxe' || tool == 'shovel';
}