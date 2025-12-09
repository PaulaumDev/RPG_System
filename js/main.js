// Sistema C.R.I.S. - Ficha do Jogador
class CRISSystem {
    constructor() {
        this.gameData = this.loadGameData();
        this.character = this.loadCharacter();
        this.init();
    }

    // Carregar dados do jogo
    loadGameData() {
        const data = localStorage.getItem('cris_game_data');
        if (data) {
            try {
                return JSON.parse(data);
            } catch {
                return this.getDefaultGameData();
            }
        }
        return this.getDefaultGameData();
    }

    getDefaultGameData() {
        return {
            version: '2.0',
            races: {
                "Humano": { 
                    name: "Humano", 
                    description: "Versátil e adaptável",
                    modifiers: { STG: 0, VIR: 0, INT: 0, CAR: 0, SAB: 0, AGI: 0 },
                    movement: 9,
                    darkvision: 0,
                    abilities: "Versatilidade: +1 em todos os testes"
                },
                "Elfo": { 
                    name: "Elfo", 
                    description: "Ágil e sensível à magia",
                    modifiers: { STG: 0, VIR: -1, INT: 1, CAR: 0, SAB: 0, AGI: 2 },
                    movement: 9,
                    darkvision: 18,
                    abilities: "Visão no Escuro (18m), Resistência a Encantamento"
                },
                "Anão": { 
                    name: "Anão", 
                    description: "Robusto e resistente",
                    modifiers: { STG: 2, VIR: 2, INT: 0, CAR: 0, SAB: 0, AGI: -1 },
                    movement: 7,
                    darkvision: 18,
                    abilities: "Resistência a Veneno, Conhecimento de Pedras"
                }
            },
            classes: {
                "Guerreiro": {
                    name: "Guerreiro",
                    description: "Especialista em combate corpo a corpo",
                    modifiers: { STG: 2, VIR: 1, INT: 0, CAR: 0, SAB: 0, AGI: 0 },
                    hp_base: 10,
                    hp_mod: "VIR",
                    mp_base: 0,
                    mp_mod: "INT",
                    sp_base: 3,
                    sp_mod: "VIR",
                    proficiencies: ["armor_light", "armor_medium", "armor_heavy", "shields"],
                    abilities: "Ataque Extra: Pode fazer um ataque adicional por turno\nDurabilidade: +2 PV por nível"
                },
                "Mago": {
                    name: "Mago",
                    description: "Mestre das artes arcanas",
                    modifiers: { STG: 0, VIR: 0, INT: 3, CAR: 0, SAB: 1, AGI: 0 },
                    hp_base: 6,
                    hp_mod: "VIR",
                    mp_base: 8,
                    mp_mod: "INT",
                    sp_base: 2,
                    sp_mod: "CAR",
                    proficiencies: ["none"],
                    abilities: "Magia Arcana: Pode lançar magias do grimório\nFoco Mágico: +1 PM por nível"
                },
                "Ladino": {
                    name: "Ladino",
                    description: "Furtivo e especialista em habilidades",
                    modifiers: { STG: 0, VIR: 0, INT: 1, CAR: 1, SAB: 0, AGI: 3 },
                    hp_base: 8,
                    hp_mod: "VIR",
                    mp_base: 2,
                    mp_mod: "INT",
                    sp_base: 4,
                    sp_mod: "AGI",
                    proficiencies: ["armor_light"],
                    abilities: "Ataque Furtivo: +2d6 de dano em ataques surpresa\nEsquiva: +2 na Defesa"
                }
            },
            skills: {
                "Acrobacia": { attribute: "AGI", description: "Movimentos acrobáticos e equilíbrio" },
                "Arcanismo": { attribute: "INT", description: "Conhecimento de magia e itens mágicos" },
                "Atletismo": { attribute: "STG", description: "Saltos, escaladas e força física" },
                "Enganação": { attribute: "CAR", description: "Mentir e blefar" },
                "Furtividade": { attribute: "AGI", description: "Esconder-se e mover-se silenciosamente" },
                "História": { attribute: "INT", description: "Conhecimento histórico" },
                "Intimidação": { attribute: "CAR", description: "Amedrontar e coagir" },
                "Intuição": { attribute: "SAB", description: "Percepção de intenções e detectar mentiras" },
                "Investigação": { attribute: "INT", description: "Encontrar pistas e analisar cenas" },
                "Medicina": { attribute: "SAB", description: "Primeiros socorros e diagnóstico" },
                "Natureza": { attribute: "INT", description: "Conhecimento da natureza e animais" },
                "Percepção": { attribute: "SAB", description: "Notar coisas sutis no ambiente" },
                "Persuasão": { attribute: "CAR", description: "Convencer e negociar" },
                "Religião": { attribute: "INT", description: "Conhecimento de deuses e religiões" },
                "Sobrevivência": { attribute: "SAB", description: "Rastrear e sobreviver na natureza" }
            },
            config: {
                creation_points: 27,
                max_attribute: 18,
                min_attribute: 1,
                formulas: {
                    hp: "Base + (Mod VIG × Nível)",
                    mp: "Base + (Mod INT × Nível)",
                    sp: "Base + (Mod CAR × Nível)",
                    defense: "10 + Armadura + Mod AGI"
                }
            }
        };
    }

    // Carregar personagem
    loadCharacter() {
        const data = localStorage.getItem('cris_character');
        if (data) {
            try {
                return JSON.parse(data);
            } catch {
                return this.getDefaultCharacter();
            }
        }
        return this.getDefaultCharacter();
    }

    getDefaultCharacter() {
        return {
            name: "",
            race: "Humano",
            class: "Guerreiro",
            origin: "Acolyte",
            level: 1,
            attributes: {
                STG: 10,
                VIR: 10,
                INT: 10,
                CAR: 10,
                SAB: 10,
                AGI: 10
            },
            skills: {},
            resources: {
                hp_current: 12,
                hp_max: 12,
                mp_current: 0,
                mp_max: 0,
                sp_current: 3,
                sp_max: 3,
                san_current: 12,
                san_max: 12
            },
            combat: {
                defense: 10,
                initiative: 0,
                movement: 9,
                protection: 0
            },
            resistances: {
                fire: 0,
                cold: 0,
                electricity: 0,
                acid: 0,
                poison: 0,
                psychic: 0
            },
            inventory: [],
            attacks: [],
            abilities: [],
            spells: []
        };
    }

    // Inicialização
    init() {
        this.bindEvents();
        this.populateSelects();
        this.loadSkills();
        this.calculateAll();
        this.updateUI();
        this.showNotification("Sistema C.R.I.S. carregado!", "success");
    }

    // Vincular eventos
    bindEvents() {
        // Botões de salvar/carregar
        document.getElementById('btn-save-sheet').addEventListener('click', () => this.saveCharacter());
        document.getElementById('btn-load-sheet').addEventListener('click', () => this.loadCharacterFile());
        
        // Controles de nível
        document.getElementById('btn-level-up').addEventListener('click', () => this.changeLevel(1));
        document.getElementById('btn-level-down').addEventListener('click', () => this.changeLevel(-1));
        document.getElementById('char-level').addEventListener('change', (e) => {
            this.character.level = parseInt(e.target.value) || 1;
            this.calculateAll();
            this.updateUI();
        });
        
        // Atributos
        document.querySelectorAll('.attr-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const attr = e.target.closest('.attribute').dataset.attr;
                this.changeAttribute(attr, -1);
            });
        });
        
        document.querySelectorAll('.attr-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const attr = e.target.closest('.attribute').dataset.attr;
                this.changeAttribute(attr, 1);
            });
        });
        
        // Inputs de atributos
        document.querySelectorAll('.attr-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const attr = e.target.id.replace('attr-', '').toUpperCase();
                const value = parseInt(e.target.value) || 10;
                this.setAttribute(attr, value);
            });
        });
        
        // Seletores
        ['char-name', 'char-race', 'char-class', 'char-origin'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', (e) => this.updateCharacterData(e));
            }
        });
        
        // Recursos
        document.getElementById('hp-current').addEventListener('change', (e) => {
            this.character.resources.hp_current = parseInt(e.target.value) || 0;
            this.saveCharacter();
        });
        
        document.getElementById('mp-current').addEventListener('change', (e) => {
            this.character.resources.mp_current = parseInt(e.target.value) || 0;
            this.saveCharacter();
        });
        
        document.getElementById('sp-current').addEventListener('change', (e) => {
            this.character.resources.sp_current = parseInt(e.target.value) || 0;
            this.saveCharacter();
        });
        
        // Botão de ataque
        document.querySelector('.btn-add-attack').addEventListener('click', () => this.addAttack());
        
        // Botão de inventário
        document.querySelector('.btn-add-item').addEventListener('click', () => this.addInventoryItem());
        
        // Tabs de habilidades
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabId = e.target.dataset.tab;
                this.switchTab(tabId);
            });
        });
    }

    // Popular selects
    populateSelects() {
        const raceSelect = document.getElementById('char-race');
        const classSelect = document.getElementById('char-class');
        
        raceSelect.innerHTML = '<option value="">Selecione uma raça...</option>';
        classSelect.innerHTML = '<option value="">Selecione uma classe...</option>';
        
        // Raças
        Object.values(this.gameData.races).forEach(race => {
            const option = document.createElement('option');
            option.value = race.name;
            option.textContent = race.name;
            raceSelect.appendChild(option);
        });
        
        // Classes
        Object.values(this.gameData.classes).forEach(cls => {
            const option = document.createElement('option');
            option.value = cls.name;
            option.textContent = cls.name;
            classSelect.appendChild(option);
        });
        
        // Definir valores atuais
        if (this.character.race && this.gameData.races[this.character.race]) {
            raceSelect.value = this.character.race;
        }
        
        if (this.character.class && this.gameData.classes[this.character.class]) {
            classSelect.value = this.character.class;
        }
        
        document.getElementById('char-name').value = this.character.name || '';
        document.getElementById('char-level').value = this.character.level || 1;
    }

    // Carregar perícias
    loadSkills() {
        const skillsGrid = document.querySelector('.skills-grid');
        if (!skillsGrid) return;
        
        skillsGrid.innerHTML = '';
        
        // Agrupar perícias por atributo
        const skillsByAttr = {};
        Object.entries(this.gameData.skills).forEach(([skillName, skillData]) => {
            const attr = skillData.attribute;
            if (!skillsByAttr[attr]) skillsByAttr[attr] = [];
            skillsByAttr[attr].push({ name: skillName, ...skillData });
        });
        
        // Criar seções por atributo
        Object.entries(skillsByAttr).forEach(([attr, skills]) => {
            const attrName = this.getAttributeName(attr);
            
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-category';
            
            const title = document.createElement('h3');
            title.textContent = attrName;
            categoryDiv.appendChild(title);
            
            skills.forEach(skill => {
                const skillDiv = document.createElement('div');
                skillDiv.className = 'skill-item';
                
                const skillName = document.createElement('span');
                skillName.className = 'skill-name';
                skillName.textContent = skill.name;
                
                const skillBonus = document.createElement('span');
                skillBonus.className = 'skill-bonus';
                skillBonus.id = `skill-${skill.name.toLowerCase()}`;
                skillBonus.textContent = this.calculateSkillBonus(skill.name);
                
                skillDiv.appendChild(skillName);
                skillDiv.appendChild(skillBonus);
                categoryDiv.appendChild(skillDiv);
            });
            
            skillsGrid.appendChild(categoryDiv);
        });
    }

    // Calcular tudo
    calculateAll() {
        this.calculateModifiers();
        this.calculateResources();
        this.calculateCombat();
        this.calculateSkills();
        this.updatePoints();
    }

    // Calcular modificadores
    calculateModifiers() {
        const race = this.gameData.races[this.character.race];
        const cls = this.gameData.classes[this.character.class];
        
        this.character.modifiers = {};
        
        ['STG', 'VIR', 'INT', 'CAR', 'SAB', 'AGI'].forEach(attr => {
            const baseValue = this.character.attributes[attr] || 10;
            const raceMod = race ? race.modifiers[attr] || 0 : 0;
            const classMod = cls ? cls.modifiers[attr] || 0 : 0;
            const totalValue = baseValue + raceMod + classMod;
            
            // Calcular modificador (valor - 10) / 2, arredondado para baixo
            const modifier = Math.floor((totalValue - 10) / 2);
            this.character.modifiers[attr] = modifier;
        });
    }

    // Calcular recursos
    calculateResources() {
        const cls = this.gameData.classes[this.character.class];
        const level = this.character.level;
        
        if (!cls) return;
        
        // Pontos de Vida
        const hpModAttr = cls.hp_mod || 'VIR';
        const hpMod = this.character.modifiers[hpModAttr] || 0;
        const hpBase = cls.hp_base || 10;
        this.character.resources.hp_max = hpBase + (hpMod * level);
        
        // Pontos de Mana
        const mpModAttr = cls.mp_mod || 'INT';
        const mpMod = this.character.modifiers[mpModAttr] || 0;
        const mpBase = cls.mp_base || 0;
        this.character.resources.mp_max = mpBase + (mpMod * level);
        
        // Pontos de Esforço
        const spModAttr = cls.sp_mod || 'CAR';
        const spMod = this.character.modifiers[spModAttr] || 0;
        const spBase = cls.sp_base || 3;
        this.character.resources.sp_max = spBase + (spMod * level);
        
        // Sanidade
        const sanMod = this.character.modifiers['SAB'] || 0;
        this.character.resources.san_max = 12 + sanMod;
        
        // Garantir que valores atuais não excedam máximos
        ['hp_current', 'mp_current', 'sp_current', 'san_current'].forEach(resource => {
            const current = this.character.resources[resource];
            const max = this.character.resources[resource.replace('_current', '_max')];
            if (current > max) {
                this.character.resources[resource] = max;
            }
        });
    }

    // Calcular combate
    calculateCombat() {
        const race = this.gameData.races[this.character.race];
        
        // Defesa
        const agiMod = this.character.modifiers['AGI'] || 0;
        this.character.combat.defense = 10 + agiMod + (this.character.combat.protection || 0);
        
        // Iniciativa
        this.character.combat.initiative = agiMod;
        
        // Movimento
        this.character.combat.movement = race ? race.movement : 9;
        
        // Resistências (baseadas em raça e classe)
        const conMod = this.character.modifiers['VIR'] || 0;
        this.character.resistances = {
            fire: conMod,
            cold: conMod,
            electricity: Math.floor(conMod / 2),
            acid: Math.floor(conMod / 2),
            poison: conMod + (race && race.name === 'Anão' ? 2 : 0),
            psychic: this.character.modifiers['SAB'] || 0
        };
    }

    // Calcular perícias
    calculateSkills() {
        this.character.skills = {};
        
        Object.entries(this.gameData.skills).forEach(([skillName, skillData]) => {
            const attr = skillData.attribute;
            const mod = this.character.modifiers[attr] || 0;
            const training = this.character.skills_training ? (this.character.skills_training[skillName] || 0) : 0;
            this.character.skills[skillName] = mod + (training * 2);
        });
    }

    // Calcular pontos disponíveis
    calculatePoints() {
        const baseTotal = 60; // 6 atributos × 10
        const currentTotal = Object.values(this.character.attributes).reduce((a, b) => a + b, 0);
        const pointsUsed = currentTotal - baseTotal;
        const maxPoints = this.gameData.config.creation_points || 27;
        return Math.max(0, maxPoints - pointsUsed);
    }

    // Atualizar interface
    updateUI() {
        // Atributos
        ['STG', 'VIR', 'INT', 'CAR', 'SAB', 'AGI'].forEach(attr => {
            const valueElement = document.getElementById(`attr-${attr.toLowerCase()}`);
            const modElement = document.getElementById(`mod-${attr.toLowerCase()}`);
            
            if (valueElement) {
                valueElement.value = this.character.attributes[attr] || 10;
            }
            
            if (modElement) {
                const mod = this.character.modifiers ? (this.character.modifiers[attr] || 0) : 0;
                modElement.textContent = mod >= 0 ? `+${mod}` : mod;
                
                // Cor baseada no valor
                if (mod > 0) {
                    modElement.style.backgroundColor = '#2ecc71';
                } else if (mod < 0) {
                    modElement.style.backgroundColor = '#e74c3c';
                } else {
                    modElement.style.backgroundColor = '#3498db';
                }
            }
        });
        
        // Recursos
        const res = this.character.resources;
        document.getElementById('hp-current').value = res.hp_current || 0;
        document.getElementById('hp-max').textContent = res.hp_max || 0;
        document.getElementById('mp-current').value = res.mp_current || 0;
        document.getElementById('mp-max').textContent = res.mp_max || 0;
        document.getElementById('sp-current').value = res.sp_current || 0;
        document.getElementById('sp-max').textContent = res.sp_max || 0;
        document.getElementById('san-current').value = res.san_current || 0;
        document.getElementById('san-max').textContent = res.san_max || 0;
        
        // Valores base
        const cls = this.gameData.classes[this.character.class];
        if (cls) {
            document.getElementById('hp-base').textContent = cls.hp_base || 10;
            document.getElementById('mp-base').textContent = cls.mp_base || 0;
            document.getElementById('sp-base').textContent = cls.sp_base || 3;
            document.getElementById('san-base').textContent = '12';
        }
        
        // Combate
        const combat = this.character.combat;
        document.getElementById('defense-value').textContent = combat.defense || 10;
        document.getElementById('initiative-value').textContent = combat.initiative >= 0 ? `+${combat.initiative}` : combat.initiative;
        document.getElementById('movement-value').textContent = `${combat.movement || 9}m`;
        document.getElementById('protection-value').textContent = combat.protection || 0;
        
        // Resistências
        const resists = this.character.resistances;
        document.getElementById('res-fire').textContent = resists.fire >= 0 ? `+${resists.fire}` : resists.fire;
        document.getElementById('res-cold').textContent = resists.cold >= 0 ? `+${resists.cold}` : resists.cold;
        document.getElementById('res-elec').textContent = resists.electricity >= 0 ? `+${resists.electricity}` : resists.electricity;
        document.getElementById('res-acid').textContent = resists.acid >= 0 ? `+${resists.acid}` : resists.acid;
        document.getElementById('res-poison').textContent = resists.poison >= 0 ? `+${resists.poison}` : resists.poison;
        document.getElementById('res-psychic').textContent = resists.psychic >= 0 ? `+${resists.psychic}` : resists.psychic;
        
        // Atualizar perícias
        Object.entries(this.character.skills || {}).forEach(([skillName, bonus]) => {
            const skillElement = document.getElementById(`skill-${skillName.toLowerCase()}`);
            if (skillElement) {
                skillElement.textContent = bonus >= 0 ? `+${bonus}` : bonus;
            }
        });
        
        // Atualizar inventário
        this.updateInventoryUI();
        
        // Atualizar ataques
        this.updateAttacksUI();
        
        // Atualizar habilidades
        this.updateAbilitiesUI();
    }

    // Atualizar inventário
    updateInventoryUI() {
        const inventoryList = document.getElementById('inventory-list');
        if (!inventoryList) return;
        
        inventoryList.innerHTML = '';
        
        let totalWeight = 0;
        
        this.character.inventory.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'inv-item';
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = `${item.name} (${item.quantity || 1})`;
            
            const weightSpan = document.createElement('span');
            weightSpan.textContent = `${item.weight || 0} kg`;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.className = 'btn-delete-small';
            deleteBtn.addEventListener('click', () => this.removeInventoryItem(index));
            
            itemDiv.appendChild(nameSpan);
            itemDiv.appendChild(weightSpan);
            itemDiv.appendChild(deleteBtn);
            inventoryList.appendChild(itemDiv);
            
            totalWeight += (item.weight || 0) * (item.quantity || 1);
        });
        
        document.getElementById('current-weight').textContent = totalWeight.toFixed(1);
        document.getElementById('max-weight').textContent = '45';
    }

    // Atualizar ataques
    updateAttacksUI() {
        const attacksList = document.getElementById('attacks-list');
        if (!attacksList) return;
        
        attacksList.innerHTML = '';
        
        if (this.character.attacks.length === 0) {
            // Ataques padrão baseados na classe
            const cls = this.gameData.classes[this.character.class];
            if (cls) {
                if (cls.name === 'Guerreiro') {
                    this.character.attacks = [
                        { name: 'Espada Longa', bonus: '+5', damage: '1d8+3', crit: '19-20', type: 'Corte' },
                        { name: 'Adaga', bonus: '+4', damage: '1d4+3', crit: '19-20', type: 'Perfuração' }
                    ];
                } else if (cls.name === 'Mago') {
                    this.character.attacks = [
                        { name: 'Bastão Arcano', bonus: '+2', damage: '1d6+1', crit: '20', type: 'Concussão' },
                        { name: 'Raio de Fogo', bonus: '+5', damage: '1d10', crit: '20', type: 'Fogo' }
                    ];
                } else if (cls.name === 'Ladino') {
                    this.character.attacks = [
                        { name: 'Adagas Duplas', bonus: '+6', damage: '1d4+4', crit: '19-20', type: 'Perfuração' },
                        { name: 'Arco Curto', bonus: '+5', damage: '1d6+3', crit: '20', type: 'Perfuração' }
                    ];
                }
            }
        }
        
        this.character.attacks.forEach((attack, index) => {
            const attackDiv = document.createElement('div');
            attackDiv.className = 'attack-item';
            
            attackDiv.innerHTML = `
                <div class="attack-header">
                    <strong>${attack.name}</strong>
                    <span class="attack-bonus">${attack.bonus}</span>
                </div>
                <div class="attack-details">
                    <span>Dano: ${attack.damage}</span>
                    <span>Crítico: ${attack.crit}</span>
                    <span>Tipo: ${attack.type}</span>
                </div>
                <button class="btn-delete-attack" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            attacksList.appendChild(attackDiv);
        });
        
        // Vincular botões de deletar
        attacksList.querySelectorAll('.btn-delete-attack').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.closest('.btn-delete-attack').dataset.index);
                this.removeAttack(index);
            });
        });
    }

    // Atualizar habilidades
    updateAbilitiesUI() {
        const abilitiesList = document.getElementById('abilities-list');
        if (!abilitiesList) return;
        
        abilitiesList.innerHTML = '';
        
        if (this.character.abilities.length === 0) {
            // Habilidades padrão baseadas na classe
            const cls = this.gameData.classes[this.character.class];
            const race = this.gameData.races[this.character.race];
            
            if (cls && cls.abilities) {
                const abilityLines = cls.abilities.split('\n');
                abilityLines.forEach(line => {
                    if (line.trim()) {
                        this.character.abilities.push({
                            name: line.split(':')[0] || 'Habilidade',
                            description: line.split(':')[1] || line
                        });
                    }
                });
            }
            
            if (race && race.abilities) {
                this.character.abilities.push({
                    name: `Habilidade Racial: ${race.name}`,
                    description: race.abilities
                });
            }
        }
        
        this.character.abilities.forEach((ability, index) => {
            const abilityDiv = document.createElement('div');
            abilityDiv.className = 'ability-item';
            
            abilityDiv.innerHTML = `
                <div class="ability-header">
                    <strong>${ability.name}</strong>
                    <button class="btn-delete-ability" data-index="${index}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="ability-description">
                    ${ability.description}
                </div>
            `;
            
            abilitiesList.appendChild(abilityDiv);
        });
        
        // Vincular botões de deletar
        abilitiesList.querySelectorAll('.btn-delete-ability').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.closest('.btn-delete-ability').dataset.index);
                this.removeAbility(index);
            });
        });
    }

    // Atualizar pontos disponíveis
    updatePoints() {
        const points = this.calculatePoints();
        document.getElementById('points-remaining').textContent = points;
        
        // Cor baseada nos pontos
        const pointsElement = document.getElementById('points-remaining');
        if (points < 5) {
            pointsElement.style.color = '#e74c3c';
        } else if (points < 10) {
            pointsElement.style.color = '#f39c12';
        } else {
            pointsElement.style.color = '#2ecc71';
        }
        
        document.getElementById('attr-max').textContent = this.gameData.config.max_attribute || 18;
    }

    // Mudar atributo
    changeAttribute(attr, delta) {
        const current = this.character.attributes[attr] || 10;
        const max = this.gameData.config.max_attribute || 18;
        const min = this.gameData.config.min_attribute || 1;
        
        let newValue = current + delta;
        
        // Verificar limites
        if (newValue < min) newValue = min;
        if (newValue > max) newValue = max;
        
        // Verificar pontos disponíveis
        const points = this.calculatePoints();
        const baseTotal = 60;
        const currentTotal = Object.values(this.character.attributes).reduce((a, b) => a + b, 0);
        const newTotal = currentTotal - current + newValue;
        const pointsUsed = newTotal - baseTotal;
        const maxPoints = this.gameData.config.creation_points || 27;
        
        if (pointsUsed > maxPoints && delta > 0) {
            this.showNotification("Pontos insuficientes!", "error");
            return;
        }
        
        this.character.attributes[attr] = newValue;
        this.calculateAll();
        this.updateUI();
    }

    // Definir atributo específico
    setAttribute(attr, value) {
        const max = this.gameData.config.max_attribute || 18;
        const min = this.gameData.config.min_attribute || 1;
        
        let newValue = Math.max(min, Math.min(max, value));
        
        // Verificar pontos
        const points = this.calculatePoints();
        const baseTotal = 60;
        const current = this.character.attributes[attr] || 10;
        const currentTotal = Object.values(this.character.attributes).reduce((a, b) => a + b, 0);
        const newTotal = currentTotal - current + newValue;
        const pointsUsed = newTotal - baseTotal;
        const maxPoints = this.gameData.config.creation_points || 27;
        
        if (pointsUsed > maxPoints && newValue > current) {
            this.showNotification("Pontos insuficientes!", "error");
            this.character.attributes[attr] = current;
            this.updateUI();
            return;
        }
        
        this.character.attributes[attr] = newValue;
        this.calculateAll();
        this.updateUI();
    }

    // Mudar nível
    changeLevel(delta) {
        const current = this.character.level || 1;
        const newLevel = Math.max(1, Math.min(20, current + delta));
        
        if (newLevel !== current) {
            this.character.level = newLevel;
            this.calculateAll();
            this.updateUI();
            this.showNotification(`Nível alterado para ${newLevel}`, "success");
        }
    }

    // Atualizar dados do personagem
    updateCharacterData(e) {
        const element = e.target;
        const id = element.id;
        const value = element.value;
        
        switch(id) {
            case 'char-name':
                this.character.name = value;
                break;
            case 'char-race':
                this.character.race = value;
                // Aplicar modificadores de raça
                this.calculateAll();
                this.updateUI();
                this.showNotification(`Raça alterada para ${value}`, "success");
                break;
            case 'char-class':
                this.character.class = value;
                // Aplicar modificadores de classe
                this.calculateAll();
                this.updateUI();
                this.showNotification(`Classe alterada para ${value}`, "success");
                break;
            case 'char-origin':
                this.character.origin = value;
                break;
        }
        
        this.saveCharacter();
    }

    // Adicionar ataque
    addAttack() {
        const name = prompt("Nome do ataque:");
        if (!name) return;
        
        const bonus = prompt("Bônus de ataque (ex: +5):", "+3");
        const damage = prompt("Dano (ex: 1d8+3):", "1d6+2");
        const crit = prompt("Crítico (ex: 19-20):", "20");
        const type = prompt("Tipo de dano (ex: Corte, Perfuração):", "Concussão");
        
        this.character.attacks.push({
            name,
            bonus: bonus || "+3",
            damage: damage || "1d6+2",
            crit: crit || "20",
            type: type || "Concussão"
        });
        
        this.updateAttacksUI();
        this.saveCharacter();
        this.showNotification("Ataque adicionado!", "success");
    }

    // Remover ataque
    removeAttack(index) {
        if (confirm("Remover este ataque?")) {
            this.character.attacks.splice(index, 1);
            this.updateAttacksUI();
            this.saveCharacter();
            this.showNotification("Ataque removido!", "warning");
        }
    }

    // Adicionar item ao inventário
    addInventoryItem() {
        const nameInput = document.getElementById('item-name');
        const weightInput = document.getElementById('item-weight');
        
        const name = nameInput.value.trim();
        const weight = parseFloat(weightInput.value) || 0;
        
        if (!name) {
            this.showNotification("Digite o nome do item!", "error");
            nameInput.focus();
            return;
        }
        
        this.character.inventory.push({
            name,
            weight,
            quantity: 1
        });
        
        nameInput.value = '';
        weightInput.value = '';
        
        this.updateInventoryUI();
        this.saveCharacter();
        this.showNotification("Item adicionado ao inventário!", "success");
    }

    // Remover item do inventário
    removeInventoryItem(index) {
        if (confirm("Remover este item do inventário?")) {
            this.character.inventory.splice(index, 1);
            this.updateInventoryUI();
            this.saveCharacter();
            this.showNotification("Item removido!", "warning");
        }
    }

    // Remover habilidade
    removeAbility(index) {
        if (confirm("Remover esta habilidade?")) {
            this.character.abilities.splice(index, 1);
            this.updateAbilitiesUI();
            this.saveCharacter();
            this.showNotification("Habilidade removida!", "warning");
        }
    }

    // Trocar aba
    switchTab(tabId) {
        // Atualizar botões
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add('active');
        
        // Atualizar conteúdo
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`tab-${tabId}`).classList.add('active');
    }

    // Calcular bônus de perícia
    calculateSkillBonus(skillName) {
        const skillData = this.gameData.skills[skillName];
        if (!skillData) return "+0";
        
        const attr = skillData.attribute;
        const mod = this.character.modifiers ? (this.character.modifiers[attr] || 0) : 0;
        const training = this.character.skills_training ? (this.character.skills_training[skillName] || 0) : 0;
        const total = mod + (training * 2);
        
        return total >= 0 ? `+${total}` : total.toString();
    }

    // Obter nome do atributo
    getAttributeName(abbr) {
        const names = {
            'STG': 'FORÇA',
            'VIR': 'VIGOR',
            'INT': 'INTELECTO',
            'CAR': 'CARISMA',
            'SAB': 'SABEDORIA',
            'AGI': 'AGILIDADE'
        };
        return names[abbr] || abbr;
    }

    // Salvar personagem
    saveCharacter() {
        try {
            localStorage.setItem('cris_character', JSON.stringify(this.character, null, 2));
            this.showNotification("Ficha salva com sucesso!", "success");
            return true;
        } catch (e) {
            this.showNotification("Erro ao salvar ficha!", "error");
            console.error(e);
            return false;
        }
    }

    // Carregar personagem de arquivo
    loadCharacterFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const loadedData = JSON.parse(event.target.result);
                    this.character = loadedData;
                    this.populateSelects();
                    this.calculateAll();
                    this.updateUI();
                    this.showNotification("Ficha carregada com sucesso!", "success");
                } catch (error) {
                    this.showNotification("Erro ao carregar ficha! Arquivo inválido.", "error");
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    }

    // Exportar personagem
    exportCharacter() {
        const data = JSON.stringify(this.character, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        const name = this.character.name || 'personagem';
        a.href = url;
        a.download = `cris_ficha_${name.replace(/\s+/g, '_')}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        this.showNotification("Ficha exportada como JSON!", "success");
    }

    // Mostrar notificação
    showNotification(message, type = "success") {
        const notification = document.getElementById('notification');
        if (!notification) return;
        
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
}

// Inicializar o sistema quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.CRIS = new CRISSystem();
    
    // Adicionar ícones Font Awesome dinamicamente
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
});