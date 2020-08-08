export function showLegend(items) {
    clearSidebar();

    const divLegend = document.createElement('div');
    const h3Legend = document.createElement('h3');
    h3Legend.classList.add('title');
    h3Legend.appendChild(document.createTextNode('Legend'));
    const ulLegend = document.createElement('ul');
    ulLegend.classList.add('ordering');

    items.forEach(item => {
        const li = document.createElement('li');
        const colour_block = document.createElement('span');
        colour_block.style['background'] = item[1];
        li.appendChild(colour_block);
        li.appendChild(document.createTextNode(item[0]));
        ulLegend.appendChild(li);
    });

    divLegend.appendChild(h3Legend);
    divLegend.appendChild(ulLegend);
    addToSidebar(divLegend);
}

export function showCourseInfo(course_info) {
    clearSidebar();

    const divCI = document.createElement('div');
    const h3CI = document.createElement('h3');
    h3CI.classList.add('title');
    h3CI.innerText = course_info['course_code'];
    const h3subtitleCI = document.createElement('h3', { 'class': 'subtitle' });
    h3subtitleCI.innerText = course_info['course_name'];
    h3subtitleCI.classList.add('subtitle');
    const pCI = document.createElement('p');
    pCI.style.fontSize = 'small';
    const bCI = document.createElement('b');
    bCI.innerText = 'Prerequisites: '
    const spanCI = document.createElement('span');
    spanCI.innerText = course_info['handbook_prereqs'] && course_info['handbook_prereqs'].length > 0 ? course_info['handbook_prereqs'] : 'None';
    const br1 = document.createElement('br');
    const handbookSummary = document.createElement('div', { 'style': 'font-size: small' });
    handbookSummary.innerText = course_info['handbook_summary'];
    handbookSummary.style.fontSize = 'small';
    const br2 = document.createElement('br');
    const ulCI = document.createElement('ul');
    ulCI.style.marginLeft = '30px';
    const liCI1 = document.createElement('li');
    liCI1.classList.add('external-link');
    const liCI2 = document.createElement('li');
    liCI2.classList.add('external-link');
    const aCI1 = document.createElement('a');
    aCI1.innerText = 'Course Website';
    aCI1.setAttribute('href', course_info['host_url']);
    const aCI2 = document.createElement('a');
    aCI2.innerText = 'UNSW Handbook';
    aCI2.setAttribute('href', `https://www.handbook.unsw.edu.au/${course_info['grad_level']}/courses/2020/${course_info['course_code']}`);

    liCI1.appendChild(aCI1);
    liCI2.appendChild(aCI2);
    ulCI.appendChild(liCI1);
    ulCI.appendChild(liCI2);
    pCI.appendChild(bCI);
    pCI.appendChild(spanCI);
    divCI.appendChild(h3CI);
    divCI.appendChild(h3subtitleCI);
    divCI.appendChild(pCI);
    divCI.appendChild(br1);
    divCI.appendChild(handbookSummary);
    divCI.appendChild(br2);
    divCI.appendChild(ulCI);
    addToSidebar(divCI);
}

export function showSearchResults(search_term, search_results) {
    clearSidebar();
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.classList.add('title');
    h3.innerText = 'Results';
    const p = document.createElement('p');
    p.style.fontSize = 'small';
    const b = document.createElement('b');
    b.appendChild(document.createTextNode(search_term));

    const ul = document.createElement('ul');
    ul.style.marginLeft = '30px';
    search_results.forEach(course => {
        const li = document.createElement('li');
        li.classList.add('external-link');
        li.innerText = course;
        ul.appendChild(li);

    });
    p.appendChild(document.createTextNode('Courses that relate to '));
    p.appendChild(b);
    p.appendChild(document.createTextNode(' most:'));
    p.appendChild(ul);
    div.appendChild(h3);
    div.appendChild(p);

    addToSidebar(div);

};

export function showCourseRelationship(course_a, course_b, relationship_info, subcategories_colours) {
    clearSidebar();
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.classList.add('title');
    h3.innerText = 'Similarity';
    const p = document.createElement('p');
    p.style.fontSize = 'small';
    p.innerHTML = `<b>${course_a}</b> and <b>${course_b}</b> have these similarities:`;
    const subcats = Object.keys(relationship_info);
    subcats.forEach(subcat => {
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        const percentage = (parseFloat(relationship_info[subcat]['percentage']) * 100).toFixed(2);
        // summary.setAttribute('style', `--arrowColour: ${subcategories_colours.find(ele => ele[0] === subcat)[1]};`);
        summary.classList.add(`${subcategories_colours.find(ele => ele[0] === subcat)[2]}`);
        summary.appendChild(document.createTextNode(subcat + ` (${percentage}%)`));
        const ul = document.createElement('ul');
        ul.classList.add('ordering');
        ul.style.marginLeft = '30px';
        const wp_cats = relationship_info[subcat]['wp_categories'];
        wp_cats.forEach(wp_cat => {
            const li = document.createElement('li');
            li.classList.add('external-link');
            li.innerText = wp_cat; // todo: WP link
            ul.appendChild(li);
        })

        details.appendChild(summary);
        details.appendChild(ul);
        p.appendChild(details);
    });
    div.appendChild(h3);
    div.appendChild(p);


    addToSidebar(div);
}


function addToSidebar(node) {
    const sidebar = document.getElementById('sidebar');
    sidebar.appendChild(node);
}

function clearSidebar() {
    const el = document.getElementById('sidebar');
    el.innerHTML = '';
}