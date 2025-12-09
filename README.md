# Sistema RPG C.R.I.S. (Character Roleplay Interactive System)

Sistema completo de ficha de RPG com painel de administração e recursos avançados.

## 📋 Funcionalidades

### ✅ Ficha do Jogador
- **Atributos** (STG, VIR, INT, CAR, SAB, AGI) com sistema de pontos
- **Cálculos Automáticos**: PV, PM, PE, Sanidade, Defesa, Iniciativa
- **Perícias** organizadas por atributo
- **Inventário** com sistema de peso
- **Ataques** personalizáveis
- **Habilidades e Magias**
- **Save/Load** local e exportação JSON

### ⚙️ Painel de Administração
- **Gerenciar Raças**: Criar/editar/remover raças com modificadores
- **Gerenciar Classes**: Configurar classes com fórmulas de recursos
- **Gerenciar Perícias**: Definir perícias do sistema
- **Configurações do Sistema**: Pontos, fórmulas, limites
- **Backup/Exportação**: Salvar e carregar configurações

## 🚀 Como Usar

### 1. Estrutura de Arquivos

rpg-system/
├── index.html # Ficha do jogador
├── admin.html # Painel de administração
├── css/
│ └── style.css # Estilos unificados
├── js/
│ ├── main.js # Lógica da ficha
│ └── admin.js # Lógica do admin
└── data/
├── classes.json # Dados de classes
└── races.json # Dados de raças

### 2. Primeiros Passos
1. Abra `index.html` em seu navegador
2. Use o painel admin (`admin.html`) para configurar o sistema
3. Crie seu personagem na ficha principal

### 3. Painel Admin
- **Raças**: Defina modificadores de atributos, movimentação, habilidades
- **Classes**: Configure fórmulas de PV/PM/PE, proficiências, habilidades
- **Sistema**: Ajuste pontos de criação, fórmulas, limites
- **Exporte** suas configurações para backup

## 🛠️ Tecnologias
- HTML5, CSS3, JavaScript Vanilla
- LocalStorage para armazenamento local
- JSON para exportação/importação
- Font Awesome para ícones
- Google Fonts para tipografia

## 🔧 Personalização

### Modificando Raças
No painel admin, você pode:
- Adicionar novas raças
- Definir modificadores de -3 a +3
- Configurar movimentação e visão no escuro
- Adicionar habilidades especiais

### Modificando Classes
- Definir modificadores base
- Configurar fórmulas de recursos (PV, PM, PE)
- Adicionar proficiências
- Criar habilidades únicas

### Fórmulas Personalizadas
No painel de sistema, você pode modificar:
- Pontos iniciais (15-35)
- Máximo por atributo (15-20)
- Fórmulas de PV, PM, PE, Defesa

## 💾 Armazenamento
- **LocalStorage**: Dados salvos no navegador
- **Exportação JSON**: Backup completo do sistema
- **Importação**: Restaure configurações de arquivo

## 📱 Responsividade
- Layout responsivo para desktop, tablet e mobile
- Grid CSS para organização flexível
- Media queries para diferentes tamanhos de tela

## 🎨 Design
- Tema medieval-moderno
- Cores temáticas (papiro, bronze, dourado)
- Ícones Font Awesome
- Sombras e transições suaves

## 🔄 Atualizações Futuras
1. Sistema de magias completo
2. Banco de dados de monstros
3. Calculadora de combate
4. Sistema de party/grupo
5. Modo offline com Service Workers

## 📄 Licença
Sistema livre para uso pessoal e adaptação.

---

**Desenvolvido para jogadores e mestres de RPG**
*Sistema C.R.I.S. v2.0 - 2024*