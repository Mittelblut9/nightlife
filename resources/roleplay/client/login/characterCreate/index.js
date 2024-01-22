window.addEventListener('load', () => {
    loadNavigation();
    const activeElement = document.querySelector('.character-selection-nav li.active').dataset.category;
    insertActiveHeadline(activeElement);
    
    createSettings();
    loadCustomLogic();
});

const elements = ['Infos', 'Eltern', 'D-N-A', 'Aussehen', 'Kleidung', 'Speichern'];
const elementClasses = [
    '.character-selection-content-info',
    '.character-selection-content-parents',
    '.character-selection-content-dna',
    '.character-selection-content-appearance',
    '.character-selection-content-clothing',
    '.character-selection-content-save',
];

let currentActiveElement = elements[0];

const types = { 
    text: 'text', 
    date: 'date', 
    select: 'select', 
    range: 'range', 
    list: 'list', 
    buttons: 'buttons', 
    colorList: 'colorList',
};

const settings = {
    infos: [
        '-info',
        {
            setting: 'Vorname',
            type: types.text,
            meta: 'firstname'
        },{
            setting: 'Nachname',
            type: types.text,
            meta: 'lastname'
        },{
            setting: 'Geburtsdatum',
            type: types.date,
            meta: 'birthdate'
        },{
            setting: 'Geschlecht',
            type: types.buttons,
            options: [
                {
                    setting: 'Männlich',
                    meta: 'gender-male'
                },
                {
                    setting: 'Weiblich',
                    meta: 'gender-woman'
                },
                {
                    setting: 'Divers',
                    meta: 'gender-divers'
                }
            ],
        },
    ],
    parents: [
        '-parents',
        {
            setting: 'Gesichtsform der Mutter',
            type: types.range,
            meta: 'motherFace'
        },{
            setting: 'Gesichtsform des Vaters',
            type: types.range,
            meta: 'fatherFace'
        },{
            setting: 'Hautfarbe der Mutter',
            type: types.range,
            meta: 'motherSkin'
        },{
            setting: 'Hautfarbe des Vaters',
            type: types.range,
            meta: 'fatherSkin'
        },{
            setting: 'Hautfarbemischung',
            type: types.range,
            meta: 'skinMix'
        },
    ],
    dna: [
        '-dna',
        {
            setting: 'Haare',
            type: types.range,
            meta: 'hair'
        }, {
            setting: 'Haarfarbe',
            type: types.colorList,
            options: [
                '#0c0c0c', '#1d1a17', '#281d18', '#3d1f15', '#682e19',
                '#954b29', '#a35234', '#9b5f3d', '#b57e54', '#c19167',
                '#af7f53', '#be9560', '#d0ac75', '#b37f43', '#dbac68',
                '#e4ba7e', '#bd895a', '#83422c', '#8e3a28', '#8a241c',
                '#962b20', '#a7271d', '#c4351f', '#d8421f', '#c35731',
                '#d24b21', '#816755', '#917660', '#a88c74', '#d0b69e',
                '#513442', '#744557', '#a94663', '#cb1e8e', '#f63f78',
                '#ed9393', '#0b917e', '#248081', '#1b4d6b', '#578d4b',
                '#235433', '#155146', '#889e2e', '#71881b', '#468f21',
                '#cc953d', '#ebb010', '#ec971a', '#e76816', '#e64810',
                '#ec4d0e', '#c22313', '#e43315', '#ae1b18', '#6d0c0e',
                '#281914', '#3d241a', '#4c281a', '#5d3929', '#69402b',
                '#291b16', '#0e0e10', '#e6bb84', '#d8ac74',
            ]
        }, {
            setting: 'Bart',
            type: types.range,
            meta: 'beard'
        }, {
            setting: 'Bartfarbe',
            type: types.colorList,
            //eslint-disable-next-line max-len
            options: [
                '#0c0c0c', '#1d1a17', '#281d18', '#3d1f15', '#682e19',
                '#954b29', '#a35234', '#9b5f3d', '#b57e54', '#c19167', 
                '#af7f53', '#d0ac75', '#b37f43', '#dbac68', '#e4ba7e',
                '#bd895a', '#83422c', '#816755', '#917660', '#a88c74',
                '#d0b69e', '#281914', '#281914', '#3d241a', '#4c281a',
                '#5d3929', '#69402b', '#291b16', '#0e0e10', '#e6bb84', 
                '#d8ac74',
            ]
        }, {
            setting: 'Bartlänge',
            type: types.range,
            meta: 'chinHeight'
        },{
            setting: 'Bartform',
            type: types.range,
            meta: 'chinForm'
        }
    ],
    appearance: [
        '-appearance',
        {
            setting: 'Nasebreite',
            type: types.range,
            meta: 'noseWidth'
        }, {
            setting: 'Nasenhöhe',
            type: types.range,
            meta: 'noseHeight'
        }, {
            setting: 'Nasenlänge',
            type: types.range,
            meta: 'noseLength'
        }, {
            setting: 'Nasenrücken',
            type: types.range,
            meta: 'noseBridge'
        }, {
            setting: 'Nasenposition',
            type: types.range,
            meta: 'noseTip'
        }, {
            setting: 'Nasenrückenform',
            type: types.range,
            meta: 'noseBridgeShift'
        }, {
            setting: 'Augenbrauenhöhe',
            type: types.range,
            meta: 'eyebrowHeight'
        }, {
            setting: 'Augenbrauenbreite',
            type: types.range,
            meta: 'eyebrowWidth'
        }, {
            setting: 'Schläfenhöhe',
            type: types.range,
            meta: 'cheekboneHeight'
        }, {
            setting: 'Schläfenbreite',
            type: types.range,
            meta: 'cheekboneWidth'
        }, {
            setting: 'Wangenbreite',
            type: types.range,
            meta: 'cheekWidth'
        }, {
            setting: 'Augen',
            type: types.range,
            meta: 'eyes'
        }, {
            setting: 'Lippen',
            type: types.range,
            meta: 'lips'
        }, { 
            setting: 'Kieferbreite',
            type: types.range,
            meta: 'jawWidth'
        }, {
            setting: 'Kieferhöhe',
            type: types.range,
            meta: 'jawHeight'
        }, {
            setting: 'Kinnposition',
            type: types.range,
            meta: 'chinPosition'
        }, {
            setting: 'Kinnbreite',
            type: types.range,
            meta: 'chinWidth'
        }, {
            setting: 'Kinnform',
            type: types.range,
            meta: 'chinShape'
        },
    ],
    clothing: [
        '-clothing',
        {
            setting: 'Unterhemd',
            type: types.range,
            meta: 'undershirt'
        }, 
        {
            setting: 'Hemd',
            type: types.range,
            meta: 'shirt'
        }, {
            setting: 'Hose',
            type: types.range,
            meta: 'pants'
        }, {
            setting: 'Hose 2',
            type: types.range,
            meta: 'pants2'
        }, {
            setting: 'Schuhe',
            type: types.range,
            meta: 'shoes'
        }, {
            setting: 'Schuhe 2',
            type: types.range,
            meta: 'shoes2'
        }
    ]
};

function loadNavigation() {
    document.querySelectorAll('.character-selection-nav li').forEach((element, index) => {
        element.dataset.category = elements[index];

        element.addEventListener('click', () => {
            const newActiveElement = element.dataset.category;
    
            if (currentActiveElement === newActiveElement) {
                return;
            }
    
            const category = `data-category="${currentActiveElement}"`;
            document.querySelector(`.character-selection-nav li[${category}"]`).classList.remove('active');
            
            currentActiveElement = newActiveElement;
            insertActiveHeadline(newActiveElement);
            
            hideAllElements();

            element.classList.add('active');
            document.querySelector(elementClasses[elements.indexOf(newActiveElement)]).classList.remove('d-none');
        });
    });
}


function createSettings() {
    for (const parentValue of Object.values(settings)) {
        for(let i in parentValue) {
            const id = parentValue[0];
            const setting = parentValue[i].setting;
            const type = parentValue[i].type;
            const meta = parentValue[i].meta;
            const options = parentValue[i]?.options;

            const parentDiv = document.querySelector(`.character-selection-content${id}`);

            let newElement;

            const div = document.createElement('div');
            div.classList.add('mb-3');

            switch(type) {
            case types.text: {
                newElement = createTextInput(div, setting, meta, options);
                break;
            }
            case types.date: {
                newElement = createDateInput(div, setting, meta, options);
                break;
            }
            case types.buttons: {
                newElement = createButtons(div, setting, meta, options);
                break;
            }
            case types.range: {
                newElement = createRangeInput(div, setting, meta, options);
                break;
            }
            case types.colorList: {
                newElement = createColorList(div, setting, options);
                break;
            }
            }

            if(!newElement) {
                continue;
            }

            parentDiv.appendChild(newElement);
        }
    }
}

// ===========================================================================================
// ===========================================================================================
// ======================================CUSTOM LOGIC=========================================
// ===========================================================================================
// ===========================================================================================

function loadCustomLogic() {
    characterInfos();
}

function characterInfos() {
    const setButtonStyle = (buttons, activeButton) => {
        buttons.forEach(button => {
            button.classList.remove('btn-success');
        });
        activeButton.classList.add('btn-success');
    };

    const createDiversSettings = () => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('mt-4');
        newDiv.id = 'divers-settings';

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('mt-4', 'alert', 'alert-info');
        infoDiv.innerHTML = 'Aus technischen Gründen musst Du dich für ein Basis Geschlecht entscheiden.';
        newDiv.appendChild(infoDiv);

        createButtons(newDiv, 'Männlich', 'divers-gender-male');
        createButtons(newDiv, 'Weiblich', 'divers-gender-woman');

        const parentDiv = document.querySelector('.character-selection-content-info');
        parentDiv.appendChild(newDiv);

        const newButtons = document.querySelectorAll('#divers-settings .btn');
        newButtons.forEach(newButton => {
            newButton.addEventListener('click', () => {
                setButtonStyle(newButtons, newButton);
            });
        });
    };

    const buttons = document.querySelectorAll('.character-selection-content-info .btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            setButtonStyle(buttons, button);

            if (button.id === 'gender-divers') {
                createDiversSettings();
            } else {
                document.getElementById('divers-settings')?.remove();
            }
        });
    });
}

// ===========================================================================================
// ===========================================================================================
// ============================================HELPERS========================================
// ===========================================================================================
// ===========================================================================================

function hideAllElements() {
    document.querySelectorAll('.character-selection-content .settings').forEach(element => {
        element.classList.add('d-none');
    });
}

function insertActiveHeadline(text) {
    document.getElementById('character-selected').innerHTML = text;
}

function createTextInput(div, setting, meta, options) {
    const input = (setting, meta) => {
        return `
            <label for="firstname" class="form-label">${setting}</label>
            <input type="text" class="form-control" id="${meta}" placeholder="${setting}">
        `;
    };

    if(options) {
        for(let i in options) {
            if(typeof options[i] === 'object') {
                div.innerHTML = input(options[i].setting, options[i].meta);
                continue;
            }
            div.innerHTML += input(options[i], meta);
        }
    } else {
        div.innerHTML += input(setting, meta);
    }

    return div;
}

function createDateInput(div, setting, meta, options) {
    const input = (setting, meta) => {
        return `
            <label for="firstname" class="form-label">${setting}</label>
            <input type="date" class="form-control" id="${meta}" placeholder="${setting}">
        `;
    };

    if(options) {
        for(let i in options) {
            if(typeof options[i] === 'object') {
                div.innerHTML += input(options[i].setting, options[i].meta);
                continue;
            }
            div.innerHTML += input(options[i], meta);
        }
    }else {
        div.innerHTML += input(setting, meta);
    }
    return div;
}

function createButtons(div, setting, meta, options) {
    div.classList.add('mt-4');

    const button = (setting, meta) => {
        return `
            <div class="btn btn-primary mx-2" id="${meta}">${setting}</div>
        `;
    };

    if(options) {
        for(let i in options) {
            if(typeof options[i] === 'object') {
                div.innerHTML += button(options[i].setting, options[i].meta);
                continue;
            }
            div.innerHTML += button(options[i], meta);
        }
    }else {
        div.innerHTML += button(setting, meta);
    }
    
    return div;
}

function createRangeInput(div, setting, meta, options) {
    const input = (setting, meta) => {
        return `
            <label for="firstname" class="form-label">${setting}</label>
            <input type="range" class="form-range" id="${meta}" placeholder="${setting}" value="0">
        `;
    };

    if(options) {
        for(let i in options) {
            const type = typeof options[i];
            if(type === 'object') {
                div.innerHTML = input(options[i].setting, options[i].meta);
                continue;
            }
            div.innerHTML += input(setting, meta);
        }
    }else {
        div.innerHTML += input(setting, meta);
    }

    return div;
}

function createColorList(div, setting, options) {
    const list = document.createElement('ul');
    list.classList.add('d-flex');
    list.classList.add('flex-wrap');
    list.classList.add('list-unstyled');

    const headline = document.createElement('p');
    headline.innerHTML = setting;
    div.appendChild(headline);

    const listDiv = (setting, index) => {
        return `
            <li 
                class="m-2 rounded-circle" 
                style="background-color: ${setting}; width: 2rem; height: 2rem; cursor: pointer" 
                id="${headline.innerHTML}-${index}"></li>
        `;
    };

    for(let i in options) {
        list.innerHTML += listDiv(options[i], i);
        continue;
    }

    div.appendChild(list);
    return div;
}