/**
 * @file app.js
 * @description Architektura pro asynchronní injekci datového modelu do DOM stromu.
 */

const DATA_SOURCE = 'profile.json';

// Hlavní řídící funkce - spouští asynchronní operaci
function bootstrap() {
    fetch(DATA_SOURCE)
        .then(response => {
            // Red Pen: fetch() nevyhodí chybu při 404. Musíme stav ověřit manuálně.
            if (!response.ok) {
                throw new Error(`Sektor narušen: HTTP status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Data úspěšně dekódována, delegujeme renderování
            renderName(data.name);
            renderSkills(data.skills);
            renderInterests(data.interests);
            renderProjects(data.projects);
        })
        .catch(error => {
            console.error("Kolaps vlnové funkce selhal. Data nelze načíst:", error);
            document.getElementById('name').textContent = "Chyba inicializace datového modelu";
        });
}

function renderName(name) {
    if (!name) return;
    document.getElementById('name').textContent = name;
}

function renderSkills(skills) {
    if (!skills || skills.length === 0) return;
    const container = document.getElementById('skills');
    
    skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        container.appendChild(li);
    });
}

function renderInterests(interests) {
    if (!interests || interests.length === 0) return;
    const container = document.getElementById('interests');
    
    // Generování nadpisu až v momentě, kdy máme reálná data
    const h2 = document.createElement('h2');
    h2.textContent = "Interests";
    container.appendChild(h2);

    const ul = document.createElement('ul');
    interests.forEach(interest => {
        const li = document.createElement('li');
        li.textContent = interest;
        ul.appendChild(li);
    });
    container.appendChild(ul);
}

function renderProjects(projects) {
    if (!projects || projects.length === 0) return;
    const container = document.getElementById('projects');
    
    const h2 = document.createElement('h2');
    h2.textContent = "Projects";
    container.appendChild(h2);

    projects.forEach(project => {
        // Red Pen: Zapouzdření do <article> pro lepší sémantiku a budoucí CSS
        const article = document.createElement('article');
        article.className = 'project-card';
        
        const title = document.createElement('h3');
        title.textContent = project.title;
        
        const desc = document.createElement('p');
        desc.textContent = project.description;
        
        const link = document.createElement('a');
        link.href = project.link;
        link.textContent = "Source code";
        link.target = "_blank"; // Správná praxe u externích odkazů
        
        article.appendChild(title);
        article.appendChild(desc);
        article.appendChild(link);
        
        container.appendChild(article);
    });
}

// Exekuce
bootstrap();