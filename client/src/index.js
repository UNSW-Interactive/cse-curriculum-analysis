import cytoscape from 'cytoscape';

const url = 'http://127.0.0.1:5000';
// const url = 'http://localhost/api';

function getGraphData() {
    return fetch(url + '/graph').then(
        resp => {
            return resp.json();
        }
    )
}

function getPrereqs() {
    return fetch(url + '/prereqs').then(
        resp => {
            return resp.json();
        }
    )
}

function getCourseInfo(course_code) {
    return fetch(url + '/course/' + course_code).then(
        resp => {
            return resp.json();
        }
    )
}


function generateGraphElements() {
    return getGraphData().then(
        (graph_data) => {
            const courses = graph_data.nodes;
            const edges = graph_data.edges;
            let elements = courses.map(course_name => {
                return {
                    data: {
                        id: course_name
                    }
                }
            });
            const colour_course = {};
            courses.forEach(c => {
                colour_course[c] = {}
                graph_data.subcategories.forEach(s => {
                    colour_course[c][s] = 0;
                })
            })
            courses.forEach(
                (course) => {
                    if (course in edges) {
                        Object.keys(edges[course]).forEach(
                            neighbour => {
                                Object.keys(edges[course][neighbour]).forEach(
                                    subcategory => {
                                        const edge = {
                                            data: {
                                                id: course + neighbour + subcategory,
                                                source: course,
                                                target: neighbour,
                                                subcat: subcategory,
                                                weight: edges[course][neighbour][subcategory]
                                            }
                                        };
                                        colour_course[course][subcategory] += edges[course][neighbour][subcategory];
                                        colour_course[neighbour][subcategory] += edges[course][neighbour][subcategory];
                                        elements.push(edge);
                                    }
                                )
                            }
                        )
                    }

                }
            )
            return [elements, colour_course];
        }
    )
}

function getSrc(prereqs) {
    if (prereqs.length === 0) {
        console.log('shouldnt reach here');
        return null;
    }
    if (prereqs.length === 1) {
        return prereqs[0].data.source;
    }

    if (prereqs[0].data.or_node) {
        return prereqs[0].data.id;
    }

    return null;
}

function buildEdge(id, source, target) {
    return {
        data: {
            id: id,
            source: source,
            target: target
        }
    }
}

function buildNode(id, or_node = false) {
    return {
        data: {
            id: id,
            or_node: or_node
        }
    }
}

function parsePrereqs(main_course, handbook_prereqs, prereqs) {
    if (!Array.isArray(prereqs)) {
        // just 1 prereq
        const neighbour = Object.keys(prereqs)[0];
        return [buildEdge(neighbour + main_course, neighbour, main_course)];
    }

    const operation = prereqs[0];
    if (operation === 'AND') {
        const c1 = parsePrereqs(main_course, handbook_prereqs, prereqs[1]);
        const c2 = parsePrereqs(main_course, handbook_prereqs, prereqs[2]);
        const c1_src = getSrc(c1);
        const c2_src = getSrc(c2);
        const c1_to_main = buildEdge(main_course + c1_src, c1_src, main_course);
        const c2_to_main = buildEdge(main_course + c2_src, c2_src, main_course);
        return [
            ...(c1_src !== null ? [c1_to_main] : []),
            ...(c2_src !== null ? [c2_to_main] : []),
            ...c1, ...c2
        ];
    } else if (operation === 'OR') {
        // create new "OR" node if doesn't exist
        if (main_course.slice(main_course.length - 2) !== 'or') {
            const or_node_id = main_course + 'or';
            const or_node = buildNode(or_node_id, true);
            const or_node_edge_to_main = buildEdge(or_node_id + main_course, or_node_id, main_course);
            const c1 = parsePrereqs(or_node_id, handbook_prereqs, prereqs[1]);
            const c2 = parsePrereqs(or_node_id, handbook_prereqs, prereqs[2]);
            return [or_node, or_node_edge_to_main, ...c1, ...c2];
        } else {
            // or node already exists
            const c1 = parsePrereqs(main_course, handbook_prereqs, prereqs[1]);
            const c2 = parsePrereqs(main_course, handbook_prereqs, prereqs[2]);
            const new_c1 = c1.map(c11 => {
                return buildEdge(c11.data.id, c11.data.source, main_course);
            });
            const new_c2 = c2.map(c22 => {
                return buildEdge(c22.data.id, c22.data.source, main_course);
            });
            return [...new_c1, ...new_c2, ...c1, ...c2];
        }
    } else if (operation === 'WITH') {
        const c1 = parsePrereqs(main_course, handbook_prereqs, prereqs[1]);
        // todo: not extensible if coreq is an OR/AND
        const new_c1 = buildEdge(c1[0].data.id, c1[0].data.source, main_course);
        return [new_c1, ...c1];
    }
}

function generatePrereqGraphElements() {
    return getPrereqs().then(graph_data => {
        const courses = Object.keys(graph_data);
        let elements = courses.map(course_name => {
            return {
                data: {
                    id: course_name
                }
            }
        });
        courses.forEach(course => {
            const handbook_prereqs = graph_data[course]['handbook_prereqs'];
            const prereqs = graph_data[course]['prereqs'] ? graph_data[course]['prereqs'] : {};

            if (Object.keys(prereqs).length === 0) {
                return;
            }

            elements = [...elements, ...parsePrereqs(course, handbook_prereqs, prereqs)];
        });
        return elements;
    })
}

function showCourseSimilarity(subcategories, cy) {
    const similarityGraph = document.getElementById('cy-similarity');
    const prereqGraph = document.getElementById('cy-prereqs');
    prereqGraph.style.display = "none";
    similarityGraph.style.display = "block";
    showLegend(subcategories)
    currGraph = cy;
}


function showPrereqs(course_legend, cy) {
    const similarityGraph = document.getElementById('cy-similarity');
    const prereqGraph = document.getElementById('cy-prereqs');
    similarityGraph.style.display = "none";
    prereqGraph.style.display = "block";
    showLegend(course_legend)
    currGraph = cy;
}

function showLegend(items) {
    const legend = document.getElementById('legend-list');
    while (legend.lastElementChild) {
        legend.removeChild(legend.lastElementChild);
    }

    items.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('legend');
        const colour_block = document.createElement('span');
        colour_block.style['background'] = item[1];
        li.appendChild(colour_block);
        li.appendChild(document.createTextNode(item[0]));
        legend.appendChild(li);
    })
}

function OrNodeOrNot(a, b) {
    return (ele) => {
        return ele.data('or_node') ? a : b;
    };
}

function displayInfo(course_code) {
    getCourseInfo(course_code).then(course_info => {
        const h_course_title = document.getElementById('course-title');
        const h_course_subtitle = document.getElementById('course-subtitle');
        const span_prereqs = document.getElementById('course-prerequisites');
        const p_handbook_summary = document.getElementById('course-handbook-summary');
        const a_host_url = document.getElementById('course-host-url');
        const a_handbook_url = document.getElementById('course-handbook-url');
        h_course_title.innerText = course_code;
        h_course_subtitle.innerText = course_info['course_name'];
        span_prereqs.innerText = course_info['handbook_prereqs'] && course_info['handbook_prereqs'].length > 0 ? course_info['handbook_prereqs'] : 'None';
        p_handbook_summary.innerText = course_info['handbook_summary'];
        a_host_url.setAttribute('href', course_info['host_url']); // todo: any we coudln't get?
        a_handbook_url.setAttribute('href', `https://www.handbook.unsw.edu.au/${course_info['grad_level']}/courses/2020/${course_code}`);

        // show the compononent
        document.getElementById('course-info').style.display = 'block';
        document.getElementById('legend-divider').style.display = 'block';
    })
}

function highlightCourse(courseNode, cy) {
    // when a course is typed in, light it up!
    // cy.elements().not(courseNode).addClass('semitransp').addClass('semitransp');
    courseNode.addClass('highlight');
}

var currGraph;
(function main() {
    const subcategories_colours = [
        ['Algorithms and data structures', '#e6194b'], // red
        ['Computer architecture', '#f58231'], //orange
        ['Formal methods', '#ffe119'], //yellow 
        ['Computer security', '#3cb44b'], // green 
        ['Artificial intelligence', '#4363d8'], //blue
        ['Computational science', '#911eb4'], // purp 
        ['Computer graphics', '#a9a9a9'], //grey 
        ['Database theory', '#000000'], //black
        ['Concurrency', '#9a6324'] //brown
    ];
    const course_level_colours = [
        ['Level 1 course', '#3cb44b'],
        ['Level 2 course', '#4363d8'],
        ['Level 3 course', '#ffe119'],
        ['Level 4 course', '#f58231'],
        ['Level 6 course', '#e6194b'],
        ['Level 9 course', '#911eb4'],
    ]
    const edge_weight_threshold = 30;
    const showCourseSimilarityButton = document.getElementById('showSimilarity');
    const showPrereqsButton = document.getElementById('showPrereqs');

    toggleSidebar.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.style.display === 'flex') {
            sidebar.style.zIndex = 0;
            sidebar.style.display = 'none';
        } else {
            sidebar.style.zIndex = 2;
            sidebar.style.display = 'flex';
        }

    })
    const showCourseInfo = node => {
        const targetNode = node.target;
        displayInfo(targetNode._private.data.id);
    }
    Promise.all([generateGraphElements(), generatePrereqGraphElements()]).then(graphs_elements => {

        const similarityGraphElements = graphs_elements[0][0].filter(ele => !ele.data.weight || ele.data.weight > edge_weight_threshold);
        const similarityGraphColouredNodes = graphs_elements[0][1];
        const similarityGraph = cytoscape({
            container: document.getElementById('cy-similarity'),
            elements: similarityGraphElements,
            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': ele => {
                            const courseLinks = similarityGraphColouredNodes[ele.data('id')]
                            const highest_subcat = Object.keys(courseLinks).reduce((a, b) => courseLinks[a] > courseLinks[b] ? a : b);
                            return subcategories_colours.find(ele => ele[0] === highest_subcat)[1];
                        },
                        'color': 'white',
                        'label': ele => ele.data('id').slice(0, 4) + '\n' + ele.data('id').slice(4, 8),
                        'width': '60px',
                        'height': '60px',
                        "text-valign": "center",
                        "text-halign": "center",
                        "text-wrap": "wrap",
                    }
                },
                {
                    selector: 'node.highlight',
                    style: {
                        'border-color': 'black',
                        'border-width': '2px'
                    }
                },
                {
                    selector: 'node.semitransp',
                    style: { 'opacity': '0.5' }
                },
                {
                    selector: 'edge',
                    style: {
                        // 'width': 'mapData(weight, 0, 100, 1, 10)',
                        'width': `mapData(weight, ${edge_weight_threshold}, 200, 1, 10)`,
                        'line-color': ele => subcategories_colours.find(ele2 => ele2[0] == ele.data('subcat'))[1],
                        'curve-style': 'bezier'
                    }
                }
            ],
            layout: {
                name: 'circle',
            }
        });
        similarityGraph.nodes().on('click', showCourseInfo);
        similarityGraph.on('mouseover', 'node', function(e) {
            highlightCourse(e.target, similarityGraph);
        });
        similarityGraph.on('mouseout', 'node', function(e) {
            var sel = e.target;
            similarityGraph.elements().removeClass('semitransp');
            sel.removeClass('highlight');
        });

        const prereqsGraph = cytoscape({
            container: document.getElementById('cy-prereqs'),
            elements: graphs_elements[1],
            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': ele => {
                            return ele.data('or_node') ? 'black' :
                                course_level_colours.find(lvl => 'Level ' + ele.data('id').charAt(4) + ' course' === lvl[0])[1];
                        },
                        'label': ele => ele.data('or_node') ? '' : ele.data('id').slice(0, 4) + '\n' + ele.data('id').slice(4, 8),
                        'width': OrNodeOrNot('15px', '80px'),
                        'height': OrNodeOrNot('15px', '80px'),
                        'shape': OrNodeOrNot('round-diamond', 'ellipse'),
                        "text-valign": "center",
                        "text-halign": "center",
                        "text-wrap": "wrap",
                        "color": ele => {
                            // return ele.data('or_node') ? '#000000' : '#' + ('000000' + (('0xffffff' ^ course_level_colours[ele.data('id').charAt(4)]).toString(16))).slice(-6)
                            return "#ffffff"; // todo: complement colour of bg colour
                        }
                    }
                },
                {
                    selector: 'node.highlight',
                    style: {
                        'border-color': 'black',
                        'border-width': '2px'
                    }
                },
                {
                    selector: 'node.semitransp',
                    style: { 'opacity': '0.5' }
                },
                {
                    selector: 'edge',
                    style: {
                        // 'width': 'mapData(weight, 0, 100, 1, 10)',
                        'width': '3px',
                        'curve-style': 'straight',
                        'target-arrow-shape': 'vee',
                        'target-arrow-color': ele => {
                            // ele.data('to_or_node') ? '#000000' : 'grey',
                            if (ele.data('target').slice(ele.data('target').length - 2) === 'or') {
                                return 'silver';
                            }
                            return '#202020';
                        },
                        'line-color': ele => {
                            // ele.data('to_or_node') ? '#000000' : 'grey',
                            if (ele.data('target').slice(ele.data('target').length - 2) === 'or') {
                                return 'silver';
                            }
                            return '#202020';
                        }
                    }
                }
            ],
            layout: {
                name: 'breadthfirst',
            }
        });

        // TODO: Easy way of sharing these events for both graphs
        prereqsGraph.on('mouseover', 'node', function(e) {
            highlightCourse(e.target, prereqsGraph);
        });
        prereqsGraph.on('mouseout', 'node', function(e) {
            var sel = e.target;
            prereqsGraph.elements().removeClass('semitransp');
            sel.removeClass('highlight');
        });
        prereqsGraph.nodes().on('click', showCourseInfo);

        showCourseSimilarity(subcategories_colours, similarityGraph);
        document.getElementById('graphSearch').addEventListener('keyup', (event) => {
            if (event.target.value.length === 8) {
                const courseNode = currGraph.getElementById(event.target.value.toUpperCase());
                if (courseNode.empty()) {
                    return;
                }
                // console.log(courseNode);
                highlightCourse(courseNode, currGraph);
                currGraph.elements().not(courseNode).addClass('semitransp').addClass('semitransp');
            }
        });

        showCourseSimilarityButton.addEventListener('click', _ => showCourseSimilarity(subcategories_colours, similarityGraph), false);
        showPrereqsButton.addEventListener('click', _ => showPrereqs(course_level_colours, prereqsGraph), false);
    })
})()