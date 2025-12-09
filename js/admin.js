

// Sistema C.R.I.S. - Painel de Administração
class CRISAdmin {
    constructor() {
        this.gameData = this.loadGameData();
        this.editingRace = null;
        this.editingClass = null;
        this.editingSkill = null;
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
        // Mesmos dados padrão do main.js
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

    // Inicialização
    init() {
        this.bindEvents();
        this.updateDashboard();
        this.loadRaces();
        this.loadClasses();
        this.loadSkills();
        this.loadSystemConfig();
        this.setupModifierDisplays();
        this.showNotification("Painel Admin C.R.I.S. carregado!", "success");
    }

    // Vincular eventos
    bindEvents() {
        // Navegação entre abas
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
        
        // Botões de ação
        document.getElementById('btn-export').addEventListener('click', () => this.showExportModal());
        document.getElementById('btn-import').addEventListener('click', () => this.importData());
        document.getElementById('btn-backup').addEventListener('click', () => this.createBackup());
        
        // Botões de raças
        document.querySelector('.btn-new-race').addEventListener('click', () => this.newRace());
        document.getElementById('btn-save-race').addEventListener('click', () => this.saveRace());
        document.getElementById('btn-clear-race').addEventListener('click', () => this.clearRaceForm());
        document.getElementById('btn-delete-race').addEventListener('click', () => this.deleteRace());
        
        // Botões de classes
        document.querySelector('.btn-new-class').addEventListener('click', () => this.newClass());
        document.getElementById('btn-save-class').addEventListener('click', () => this.saveClass());
        document.getElementById('btn-clear-class').addEventListener('click', () => this.clearClassForm());
        document.getElementById('btn-delete-class').addEventListener('click', () => this.deleteClass());
        
        // Botões de perícias
        document.querySelector('.btn-new-skill').addEventListener('click', () => this.newSkill());
        document.getElementById('btn-save-skill').addEventListener('click', () => this.saveSkill());
        document.getElementById('btn-delete-skill').addEventListener('click', () => this.deleteSkill());
        
        // Sistema
        document.getElementById('points-range').addEventListener('input', (e) => {
            document.getElementById('points-value').value = e.target.value;
            this.updateSystemConfig();
        });
        
        document.getElementById('points-value').addEventListener('change', (e) => {
            document.getElementById('points-range').value = e.target.value;
            this.updateSystemConfig();
        });
        
        ['attr-max-value', 'attr-min-value', 'formula-hp', 'formula-mp', 'formula-sp', 'formula-defense'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => this.updateSystemConfig());
        });
        
        document.getElementById('btn-export-all').addEventListener('click', () => this.showExportModal());
        document.getElementById('btn-import-all').addEventListener('click', () => this.importData());
        document.getElementById('btn-reset-system').addEventListener('click', () => this.resetSystem());
        
        // Modais
        document.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
        document.getElementById('btn-copy-json').addEventListener('click', () => this.copyJSON());
        document.getElementById('btn-download-json').addEventListener('click', () => this.downloadJSON());
        
        // Atualizar displays de modificadores
        document.querySelectorAll('.mod-input').forEach(input => {
            input.addEventListener('input', () => this.updateModifierDisplay(input));
        });
    }

    // Trocar aba
    switchTab(tabId) {
        // Atualizar botões
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`.admin-tab[data-tab="${tabId}"]`).classList.add('active');
        
        // Atualizar conteúdo
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        document.getElementById(`tab-${tabId}`).classList.add('active');
    }

    // Atualizar dashboard
    updateDashboard() {
        const raceCount = Object.keys(this.gameData.races).length;
        const classCount = Object.keys(this.gameData.classes).length;
        
        document.getElementById('total-races').textContent = raceCount;
        document.getElementById('total-classes').textContent = classCount;
        document.getElementById('config-version').textContent = `v${this.gameData.version}`;
        
        const lastSave = localStorage.getItem('cris_last_save');
        if (lastSave) {
            const date = new Date(lastSave);
            document.getElementById('last-save').textContent = date.toLocaleTimeString('pt-BR');
        }
    }

    // ===== RAÇAS =====
    loadRaces() {
        const racesList = document.getElementById('races-list');
        if (!racesList) return;
        
        racesList.innerHTML = '';
        
        Object.values(this.gameData.races).forEach(race => {
            const raceDiv = document.createElement('div');
            raceDiv.className = 'entity-item';
            raceDiv.dataset.name = race.name;
            
            const modifiers = Object.entries(race.modifiers)
                .filter(([_, value]) => value !== 0)
                .map(([attr, value]) => `${attr}: ${value >= 0 ? '+' + value : value}`)
                .join(', ');
            
            raceDiv.innerHTML = `
                <div class="entity-info">
                    <div class="entity-name">${race.name}</div>
                    <div class="entity-description">${race.description}</div>
                    <div class="entity-modifiers">${modifiers || 'Sem modificadores'}</div>
                </div>
                <div class="entity-actions">
                    <button class="btn-edit-race" data-name="${race.name}">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            `;
            
            racesList.appendChild(raceDiv);
        });
        
        // Vincular botões de editar
        racesList.querySelectorAll('.btn-edit-race').forEach(btn => {
            btn.addEventListener('click', (e) => this.editRace(e.target.closest('.btn-edit-race').dataset.name));
        });
    }

    newRace() {
        this.editingRace = null;
        this.clearRaceForm();
        document.getElementById('race-name').focus();
    }

    editRace(raceName) {
        const race = this.gameData.races[raceName];
        if (!race) return;
        
        this.editingRace = raceName;
        
        document.getElementById('race-name').value = race.name;
        document.getElementById('race-description').value = race.description;
        
        // Modificadores
        ['STG', 'VIR', 'INT', 'CAR', 'SAB', 'AGI'].forEach(attr => {
            document.getElementById(`race-mod-${attr.toLowerCase()}`).value = race.modifiers[attr] || 0;
        });
        
        document.getElementById('race-movement').value = race.movement || 9;
        document.getElementById('race-darkvision').value = race.darkvision || 0;
        document.getElementById('race-abilities').value = race.abilities || '';
        
        // Atualizar displays
        this.updateAllModifierDisplays();
        
        // Mostrar botão de deletar
        document.getElementById('btn-delete-race').style.display = 'inline-block';
        
        this.showNotification(`Editando raça: ${raceName}`, "info");
    }

    saveRace() {
        const name = document.getElementById('race-name').value.trim();
        if (!name) {
            this.showNotification("Nome da raça é obrigatório!", "error");
            return;
        }
        
        const raceData = {
            name: name,
            description: document.getElementById('race-description').value,
            modifiers: {
                STG: parseInt(document.getElementById('race-mod-stg').value) || 0,
                VIR: parseInt(document.getElementById('race-mod-vir').value) || 0,
                INT: parseInt(document.getElementById('race-mod-int').value) || 0,
                CAR: parseInt(document.getElementById('race-mod-car').value) || 0,
                SAB: parseInt(document.getElementById('race-mod-sab').value) || 0,
                AGI: parseInt(document.getElementById('race-mod-agi').value) || 0
            },
            movement: parseInt(document.getElementById('race-movement').value) || 9,
            darkvision: parseInt(document.getElementById('race-darkvision').value) || 0,
            abilities: document.getElementById('race-abilities').value
        };
        
        if (this.editingRace && this.editingRace !== name) {
            // Remover antigo se o nome mudou
            delete this.gameData.races[this.editingRace];
        }
        
        this.gameData.races[name] = raceData;
        this.saveGameData();
        
        this.loadRaces();
        this.updateDashboard();
        
        if (this.editingRace) {
            this.showNotification(`Raça "${name}" atualizada com sucesso!`, "success");
        } else {
            this.showNotification(`Raça "${name}" criada com sucesso!`, "success");
            this.clearRaceForm();
        }
        
        this.editingRace = null;
        document.getElementById('btn-delete-race').style.display = 'none';
    }

    deleteRace() {
        if (!this.editingRace) return;
        
        if (confirm(`Tem certeza que deseja excluir a raça "${this.editingRace}"?`)) {
            delete this.gameData.races[this.editingRace];
            this.saveGameData();
            
            this.loadRaces();
            this.updateDashboard();
            this.clearRaceForm();
            
            this.showNotification(`Raça "${this.editingRace}" excluída!`, "warning");
            
            this.editingRace = null;
            document.getElementById('btn-delete-race').style.display = 'none';
        }
    }

    clearRaceForm() {
        document.getElementById('race-name').value = '';
        document.getElementById('race-description').value = '';
        
        ['STG', 'VIR', 'INT', 'CAR', 'SAB', 'AGI'].forEach(attr => {
            document.getElementById(`race-mod-${attr.toLowerCase()}`).value = 0;
        });
        
        document.getElementById('race-movement').value = 9;
        document.getElementById('race-darkvision').value = 0;
        document.getElementById('race-abilities').value = '';
        
        this.updateAllModifierDisplays();
    }

    // ===== CLASSES =====
    loadClasses() {
        const classesList = document.getElementById('classes-list');
        if (!classesList) return;
        
        classesList.innerHTML = '';
        
        Object.values(this.gameData.classes).forEach(cls => {
            const classDiv = document.createElement('div');
            classDiv.className = 'entity-item';
            classDiv.dataset.name = cls.name;
            
            const modifiers = Object.entries(cls.modifiers)
                .filter(([_, value]) => value !== 0)
                .map(([attr, value]) => `${attr}: ${value >= 0 ? '+' + value : value}`)
                .join(', ');
            
            classDiv.innerHTML = `
                <div class="entity-info">
                    <div class="entity-name">${cls.name}</div>
                    <div class="entity-description">${cls.description}</div>
                    <div class="entity-modifiers">${modifiers || 'Sem modificadores'}</div>
                </div>
                <div class="entity-actions">
                    <button class="btn-edit-class" data-name="${cls.name}">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            `;
            
            classesList.appendChild(classDiv);
        });
        
        // Vincular botões de editar
        classesList.querySelectorAll('.btn-edit-class').forEach(btn => {
            btn.addEventListener('click', (e) => this.editClass(e.target.closest('.btn-edit-class').dataset.name));
        });
    }

    newClass() {
        this.editingClass = null;
        this.clearClassForm();
        document.getElementById('class-name').focus();
    }

    editClass(className) {
        const cls = this.gameData.classes[className];
        if (!cls) return;
        
        this.editingClass = className;
        
        document.getElementById('class-name').value = cls.name;
        document.getElementById('class-description').value = cls.description;
        
        // Modificadores
        ['STG', 'VIR', 'INT', 'CAR', 'SAB', 'AGI'].forEach(attr => {
            document.getElementById(`class-mod-${attr.toLowerCase()}`).value = cls.modifiers[attr] || 0;
        });
        
        // Recursos
        document.getElementById('class-hp-base').value = cls.hp_base || 10;
        document.getElementById('class-hp-mod').value = cls.hp_mod || 'VIR';
        document.getElementById('class-mp-base').value = cls.mp_base || 0;
        document.getElementById('class-mp-mod').value = cls.mp_mod || 'INT';
        document.getElementById('class-sp-base').value = cls.sp_base || 3;
        document.getElementById('class-sp-mod').value = cls.sp_mod || 'CAR';
        
        // Proficiências
        document.getElementById('prof-armor-light').checked = cls.proficiencies.includes('armor_light');
        document.getElementById('prof-armor-medium').checked = cls.proficiencies.includes('armor_medium');
        document.getElementById('prof-armor-heavy').checked = cls.proficiencies.includes('armor_heavy');
        document.getElementById('prof-shields').checked = cls.proficiencies.includes('shields');
        
        document.getElementById('class-abilities').value = cls.abilities || '';
        
        // Atualizar displays
        this.updateAllModifierDisplays();
        
        // Mostrar botão de deletar
        document.getElementById('btn-delete-class').style.display = 'inline-block';
        
        this.showNotification(`Editando classe: ${className}`, "info");
    }

    saveClass() {
        const name = document.getElementById('class-name').value.trim();
        if (!name) {
            this.showNotification("Nome da classe é obrigatório!", "error");
            return;
        }
        
        // Coletar proficiencias
        const proficiencies = [];
        if (document.getElementById('prof-armor-light').checked) proficiencies.push('armor_light');
        if (document.getElementById('prof-armor-medium').checked) proficiencies.push('armor_medium');
        if (document.getElementById('prof-armor-heavy').checked) proficiencies.push('armor_heavy');
        if (document.getElementById('prof-shields').checked) proficiencies.push('shields');
        if (proficiencies.length === 0) proficiencies.push('none');
        
        const classData = {
            name: name,
            description: document.getElementById('class-description').value,
            modifiers: {
                STG: parseInt(document.getElementById('class-mod-stg').value) || 0,
                VIR: parseInt(document.getElementById('class-mod-vir').value) || 0,
                INT: parseInt(document.getElementById('class-mod-int').value) || 0,
                CAR: parseInt(document.getElementById('class-mod-car').value) || 0,
                SAB: parseInt(document.getElementById('class-mod-sab').value) || 0,
                AGI: parseInt(document.getElementById('class-mod-agi').value) || 0
            },
            hp_base: parseInt(document.getElementById('class-hp-base').value) || 10,
            hp_mod: document.getElementById('class-hp-mod').value,
            mp_base: parseInt(document.getElementById('class-mp-base').value) || 0,
            mp_mod: document.getElementById('class-mp-mod').value,
            sp_base: parseInt(document.getElementById('class-sp-base').value) || 3,
            sp_mod: document.getElementById('class-sp-mod').value,
            proficiencies: proficiencies,
            abilities: document.getElementById('class-abilities').value
        };
        
        if (this.editingClass && this.editingClass !== name) {
            // Remover antigo se o nome mudou
            delete this.gameData.classes[this.editingClass];
        }
        
        this.gameData.classes[name] = classData;
        this.saveGameData();
        
        this.loadClasses();
        this.updateDashboard();
        
        if (this.editingClass) {
            this.showNotification(`Classe "${name}" atualizada com sucesso!`, "success");
        } else {
            this.showNotification(`Classe "${name}" criada com sucesso!`, "success");
            this.clearClassForm();
        }
        
        this.editingClass = null;
        document.getElementById('btn-delete-class').style.display = 'none';
    }

    deleteClass() {
        if (!this.editingClass) return;
        
        if (confirm(`Tem certeza que deseja excluir a classe "${this.editingClass}"?`)) {
            delete this.gameData.classes[this.editingClass];
            this.saveGameData();
            
            this.loadClasses();
            this.updateDashboard();
            this.clearClassForm();
            
            this.showNotification(`Classe "${this.editingClass}" excluída!`, "warning");
            
            this.editingClass = null;
            document.getElementById('btn-delete-class').style.display = 'none';
        }
    }

    clearClassForm() {
        document.getElementById('class-name').value = '';
        document.getElementById('class-description').value = '';
        
        ['STG', 'VIR', 'INT', 'CAR', 'SAB', 'AGI'].forEach(attr => {
            document.getElementById(`class-mod-${attr.toLowerCase()}`).value = 0;
        });
        
        document.getElementById('class-hp-base').value = 10;
        document.getElementById('class-hp-mod').value = 'VIR';
        document.getElementById('class-mp-base').value = 0;
        document.getElementById('class-mp-mod').value = 'INT';
        document.getElementById('class-sp-base').value = 3;
        document.getElementById('class-sp-mod').value = 'CAR';
        
        document.getElementById('prof-armor-light').checked = false;
        document.getElementById('prof-armor-medium').checked = false;
        document.getElementById('prof-armor-heavy').checked = false;
        document.getElementById('prof-shields').checked = false;
        
        document.getElementById('class-abilities').value = '';
        
        this.updateAllModifierDisplays();
    }

    // ===== PERÍCIAS =====
    loadSkills() {
        const skillsList = document.getElementById('skills-list');
        if (!skillsList) return;
        
        skillsList.innerHTML = '';
        
        Object.entries(this.gameData.skills).forEach(([skillName, skillData]) => {
            const skillDiv = document.createElement('div');
            skillDiv.className = 'skill-item';
            skillDiv.dataset.name = skillName;
            
            skillDiv.innerHTML = `
                <div class="skill-info">
                    <div class="skill-name">${skillName}</div>
                    <div class="skill-attribute">Atributo: ${skillData.attribute}</div>
                </div>
                <div class="skill-actions">
                    <button class="btn-edit-skill" data-name="${skillName}">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            `;
            
            skillsList.appendChild(skillDiv);
        });
        
        // Vincular botões de editar
        skillsList.querySelectorAll('.btn-edit-skill').forEach(btn => {
            btn.addEventListener('click', (e) => this.editSkill(e.target.closest('.btn-edit-skill').dataset.name));
        });
    }

    newSkill() {
        this.editingSkill = null;
        document.getElementById('skill-name').value = '';
        document.getElementById('skill-attribute').value = 'STG';
        document.getElementById('skill-description').value = '';
        document.getElementById('btn-delete-skill').style.display = 'none';
        document.getElementById('skill-name').focus();
    }

    editSkill(skillName) {
        const skill = this.gameData.skills[skillName];
        if (!skill) return;
        
        this.editingSkill = skillName;
        
        document.getElementById('skill-name').value = skillName;
        document.getElementById('skill-attribute').value = skill.attribute;
        document.getElementById('skill-description').value = skill.description || '';
        document.getElementById('btn-delete-skill').style.display = 'inline-block';
        
        this.showNotification(`Editando perícia: ${skillName}`, "info");
    }

    saveSkill() {
        const name = document.getElementById('skill-name').value.trim();
        if (!name) {
            this.showNotification("Nome da perícia é obrigatório!", "error");
            return;
        }
        
        const attribute = document.getElementById('skill-attribute').value;
        const description = document.getElementById('skill-description').value;
        
        if (!['STG', 'VIR', 'INT', 'CAR', 'SAB', 'AGI'].includes(attribute)) {
            this.showNotification("Atributo inválido!", "error");
            return;
        }
        
        const skillData = {
            attribute: attribute,
            description: description
        };
        
        if (this.editingSkill && this.editingSkill !== name) {
            // Remover antigo se o nome mudou
            delete this.gameData.skills[this.editingSkill];
        }
        
        this.gameData.skills[name] = skillData;
        this.saveGameData();
        
        this.loadSkills();
        
        if (this.editingSkill) {
            this.showNotification(`Perícia "${name}" atualizada com sucesso!`, "success");
        } else {
            this.showNotification(`Perícia "${name}" criada com sucesso!`, "success");
            this.newSkill();
        }
        
        this.editingSkill = null;
    }

    deleteSkill() {
        if (!this.editingSkill) return;
        
        if (confirm(`Tem certeza que deseja excluir a perícia "${this.editingSkill}"?`)) {
            delete this.gameData.skills[this.editingSkill];
            this.saveGameData();
            
            this.loadSkills();
            this.newSkill();
            
            this.showNotification(`Perícia "${this.editingSkill}" excluída!`, "warning");
            
            this.editingSkill = null;
        }
    }

    // ===== SISTEMA =====
    loadSystemConfig() {
        const config = this.gameData.config;
        
        document.getElementById('points-range').value = config.creation_points;
        document.getElementById('points-value').value = config.creation_points;
        document.getElementById('attr-max-value').value = config.max_attribute;
        document.getElementById('attr-min-value').value = config.min_attribute;
        
        document.getElementById('formula-hp').value = config.formulas.hp;
        document.getElementById('formula-mp').value = config.formulas.mp;
        document.getElementById('formula-sp').value = config.formulas.sp;
        document.getElementById('formula-defense').value = config.formulas.defense;
        
        // Atualizar informações
        document.getElementById('system-version').textContent = `C.R.I.S. v${this.gameData.version}`;
        
        const lastBackup = localStorage.getItem('cris_last_backup');
        if (lastBackup) {
            const date = new Date(lastBackup);
            document.getElementById('last-backup-time').textContent = date.toLocaleString('pt-BR');
        }
        
        // Calcular tamanho dos dados
        const dataSize = JSON.stringify(this.gameData).length;
        document.getElementById('data-size').textContent = `${(dataSize / 1024).toFixed(2)} KB`;
    }

    updateSystemConfig() {
        this.gameData.config.creation_points = parseInt(document.getElementById('points-value').value) || 27;
        this.gameData.config.max_attribute = parseInt(document.getElementById('attr-max-value').value) || 18;
        this.gameData.config.min_attribute = parseInt(document.getElementById('attr-min-value').value) || 1;
        
        this.gameData.config.formulas = {
            hp: document.getElementById('formula-hp').value,
            mp: document.getElementById('formula-mp').value,
            sp: document.getElementById('formula-sp').value,
            defense: document.getElementById('formula-defense').value
        };
        
        this.saveGameData();
        this.showNotification("Configurações do sistema atualizadas!", "success");
    }

    resetSystem() {
        if (confirm("Tem certeza que deseja resetar o sistema? Todos os dados personalizados serão perdidos!")) {
            localStorage.removeItem('cris_game_data');
            this.gameData = this.getDefaultGameData();
            this.saveGameData();
            
            this.loadRaces();
            this.loadClasses();
            this.loadSkills();
            this.loadSystemConfig();
            this.updateDashboard();
            
            this.showNotification("Sistema resetado para padrões!", "success");
        }
    }

    // ===== EXPORTAÇÃO/IMPORTAÇÃO =====
    showExportModal() {
        const exportData = {
            ...this.gameData,
            export_info: {
                exported_at: new Date().toISOString(),
                system: "C.R.I.S. RPG System",
                version: this.gameData.version
            }
        };
        
        document.getElementById('export-data').value = JSON.stringify(exportData, null, 2);
        document.getElementById('export-modal').classList.add('active');
    }

    closeModal() {
        document.getElementById('export-modal').classList.remove('active');
    }

    copyJSON() {
        const textarea = document.getElementById('export-data');
        textarea.select();
        document.execCommand('copy');
        
        this.showNotification("JSON copiado para a área de transferência!", "success");
    }

    downloadJSON() {
        const data = document.getElementById('export-data').value;
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        const date = new Date().toISOString().split('T')[0];
        a.href = url;
        a.download = `cris_system_backup_${date}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        this.showNotification("Backup baixado com sucesso!", "success");
    }

    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const importedData = JSON.parse(event.target.result);
                    
                    // Validar estrutura básica
                    if (!importedData.races || !importedData.classes || !importedData.skills || !importedData.config) {
                        throw new Error("Arquivo inválido: estrutura incorreta");
                    }
                    
                    if (confirm("Importar estes dados? Os dados atuais serão substituídos.")) {
                        this.gameData = importedData;
                        this.saveGameData();
                        
                        this.loadRaces();
                        this.loadClasses();
                        this.loadSkills();
                        this.loadSystemConfig();
                        this.updateDashboard();
                        
                        this.showNotification("Dados importados com sucesso!", "success");
                    }
                } catch (error) {
                    this.showNotification("Erro ao importar arquivo: " + error.message, "error");
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    }

    createBackup() {
        this.saveGameData(true);
        localStorage.setItem('cris_last_backup', new Date().toISOString());
        this.loadSystemConfig();
        this.showNotification("Backup criado com sucesso!", "success");
    }

    // ===== UTILIDADES =====
    saveGameData(isBackup = false) {
        try {
            this.gameData.version = '2.0';
            localStorage.setItem('cris_game_data', JSON.stringify(this.gameData, null, 2));
            localStorage.setItem('cris_last_save', new Date().toISOString());
            
            if (isBackup) {
                localStorage.setItem('cris_last_backup', new Date().toISOString());
            }
            
            return true;
        } catch (e) {
            this.showNotification("Erro ao salvar dados!", "error");
            console.error(e);
            return false;
        }
    }

    setupModifierDisplays() {
        // Configurar displays de modificadores
        document.querySelectorAll('.mod-input').forEach(input => {
            this.updateModifierDisplay(input);
        });
    }

    updateModifierDisplay(input) {
        const value = parseInt(input.value) || 0;
        const displayId = input.id.replace('mod-', 'mod-') + '-display';
        const displayElement = document.getElementById(displayId);
        
        if (displayElement) {
            displayElement.textContent = value >= 0 ? `+${value}` : value;
            
            // Cor baseada no valor
            if (value > 0) {
                displayElement.style.color = '#2ecc71';
                displayElement.style.fontWeight = 'bold';
            } else if (value < 0) {
                displayElement.style.color = '#e74c3c';
                displayElement.style.fontWeight = 'bold';
            } else {
                displayElement.style.color = '#7f8c8d';
                displayElement.style.fontWeight = 'normal';
            }
        }
    }

    updateAllModifierDisplays() {
        document.querySelectorAll('.mod-input').forEach(input => {
            this.updateModifierDisplay(input);
        });
    }

    showNotification(message, type = "success") {
        // Implementação simples de notificação
        alert(`${type.toUpperCase()}: ${message}`);
    }
}

// Inicializar o sistema admin quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.CRISAdmin = new CRISAdmin();
});