import cytoscape from 'cytoscape';

const url = 'http://127.0.0.1:5000';

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
                                        elements.push(edge);
                                    }
                                )
                            }
                        )
                    }

                }
            )
            return elements;
        }
    )
}

function getPrereqSrc(prereq) {
    if (typeof prereq === 'object') {
        // no more operation
        return Object.keys(prereq)[0];
    }

    const operation = prereq[0];

}

function createEdge(dest, prereqs, i) {
    const all_edges = [];
    const operation = prereqs[i];
    if (operation === 'AND') {
        if (typeof prereqs[i + 1] === 'object' && typeof prereqs[i + 2] === 'object') {
            const c1 = Object.keys(prereqs[i + 1])[0];
            const c2 = Object.keys(prereqs[i + 2])[0];
            all_edges.push({
                data: {
                    id: dest + c1,
                    source: c1,
                    target: dest,
                    wam_req: prereqs[neighbour],
                    handbook_prereq: handbook_prereqs
                }
            }, {
                data: {
                    id: dest + c2,
                    source: c2,
                    target: dest,
                    wam_req: prereqs[neighbour],
                    handbook_prereq: handbook_prereqs
                }
            })
        }
    } else if (operation === 'OR') {
        // need to create OR node
        const or_node = {
            data: {
                id: 'or' //same
            }
        }
        const or_to_course = {
            data: {
                id: 'or' + dest,
                source: 'or', //same
                target: dest
            }
        }
        const courses_to_or = {
            data: {
                id: 'toor',

            }
        }
    }
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

function parsePrereqs(main_course, handbook_prereqs, prereqs) {
    // debugger;
    if (!Array.isArray(prereqs)) {
        // just 1 prereq
        const neighbour = Object.keys(prereqs)[0];
        return [{
            data: {
                id: neighbour + main_course,
                source: neighbour,
                target: main_course,
                wam_req: prereqs[neighbour],
                handbook_prereq: handbook_prereqs
            }
        }];
    }

    const operation = prereqs[0];
    if (operation === 'AND') {
        const c1 = parsePrereqs(main_course, handbook_prereqs, prereqs[1]);
        const c2 = parsePrereqs(main_course, handbook_prereqs, prereqs[2]);

        // then a function that takes in c1 --> returns the src

        const c1_src = getSrc(c1);
        const c2_src = getSrc(c2);
        const c1_to_main = [{
            data: {
                id: main_course + c1_src,
                source: c1_src,
                target: main_course,
                wam_req: prereqs[c1], // no
                handbook_prereq: handbook_prereqs
            }
        }];
        const c2_to_main = [{
            data: {
                id: main_course + c2_src,
                source: c2_src,
                target: main_course,
                wam_req: prereqs[c1], // no
                handbook_prereq: handbook_prereqs
            }
        }];
        return [
            ...(c1_src !== null ? c1_to_main : []),
            ...(c2_src !== null ? c2_to_main : []),
            ...c1, ...c2
        ];
    } else if (operation === 'OR') {
        // create new "OR" node
        // UNLESS one already exists
        if (main_course.slice(main_course.length - 2) !== 'or') {
            const or_node_id = main_course + 'or';
            const or_node = {
                data: {
                    id: or_node_id, //prob not dynamic
                    or_node: true
                }
            };
            const or_node_edge_to_main = {
                    data: {
                        id: or_node_id + main_course,
                        source: or_node_id,
                        target: main_course,
                        wam_req: prereqs[c1], // no
                        handbook_prereq: handbook_prereqs
                    }
                }
                // const parent =
            const c1 = parsePrereqs(or_node_id, handbook_prereqs, prereqs[1]);
            const c2 = parsePrereqs(or_node_id, handbook_prereqs, prereqs[2]);
            const c1_src = getSrc(c1);
            const c2_src = getSrc(c2);
            // if either c1 or c2 is an OR (both can't be true I'm pretty sure), then merge
            //todo: no items?
            if (c1[0].data.or_node) {
                // c2 could be AND or standalone
                // debugger;
                const new_c2 = c2.map(c22 => {
                    return {
                        data: {
                            id: c22.data.id,
                            source: c22.data.source,
                            target: c1[0].data.id,
                            wam_req: c22.data.wam_req, // no
                            handbook_prereq: c22.data.handbook_prereq
                        }
                    };
                });
                return [...c1, ...new_c2];
            } else if (c2[0].data.or_node) {
                console.log(" i don't think this is ever reached");
                // c2 could be AND or standalone
                const new_c1 = c1.map(c11 => {
                    return {
                        data: {
                            id: c11.data.id,
                            source: c11.data.source,
                            target: c2[0].data.id,
                            wam_req: c11.data.wam_req, // no
                            handbook_prereq: c11.data.handbook_prereq
                        }
                    };
                });
                return [...c2, ...new_c1];
            } else {
                // create the or node, two edges towards it, an edge out of it
                console.log('c1:', c1);
                console.log('c2:', c2);
                return [or_node, or_node_edge_to_main, ...c1, ...c2];
            }
        } else {
            // or node already exists
            const c1 = parsePrereqs(main_course, handbook_prereqs, prereqs[1]);
            console.log(c1);
            const c2 = parsePrereqs(main_course, handbook_prereqs, prereqs[2]);
            const c1_src = getSrc(c1);
            const c2_src = getSrc(c2);
            // todo: func to build data point
            const new_c1 = c1.map(c11 => {
                return {
                    data: {
                        id: c11.data.id,
                        source: c11.data.source,
                        target: main_course,
                        wam_req: c11.data.wam_req, // no
                        handbook_prereq: c11.data.handbook_prereq
                    }
                };
            });
            const new_c2 = c2.map(c22 => {
                return {
                    data: {
                        id: c22.data.id,
                        source: c22.data.source,
                        target: main_course,
                        wam_req: c22.data.wam_req, // no
                        handbook_prereq: c22.data.handbook_prereq
                    }
                };
            });
            return [...new_c1, ...new_c2, ...c1, ...c2];
        }
        // const or_node_id = main_course.slice(main_course.length - 2) === 'or' ? main_course : main_course + 'or';
        // const or_node_id = main_course + 'or';



    } else if (operation === 'WITH') {
        const c1 = parsePrereqs(main_course, handbook_prereqs, prereqs[1]);
        // todo: not extensible if coreq is an OR/AND
        const new_c1 = {
            data: {
                id: c1[0].id,
                source: c1[0].source,
                target: main_course,
                wam_req: c1[0].wam_req,
                handbook_prereq: c1[0].handbook_prereq
            }
        };
        return [new_c1];
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
        console.log(elements.length, courses.length);
        courses.forEach(course => {
            const handbook_prereqs = graph_data[course]['handbook_prereqs'];
            const prereqs = graph_data[course]['prereqs'] ? graph_data[course]['prereqs'] : {};

            if (Object.keys(prereqs).length === 0) {
                return;
            }

            console.log('------');
            console.log(course, prereqs);
            // debugger;
            elements = [...elements, ...parsePrereqs(course, handbook_prereqs, prereqs)];
            console.log(elements);
            console.log('******');
        });
        console.log(elements);
        return elements;
    })
}

function showCourseSimilarity() {
    const similarityGraph = document.getElementById('cy-similarity');
    const prereqGraph = document.getElementById('cy-prereqs');
    prereqGraph.style.display = "none";
    similarityGraph.style.display = "block";
}


function showPrereqs() {
    const similarityGraph = document.getElementById('cy-similarity');
    const prereqGraph = document.getElementById('cy-prereqs');
    similarityGraph.style.display = "none";
    prereqGraph.style.display = "block";
}


(function main() {
    const showCourseSimilarityButton = document.getElementById('showSimilarity');
    const showPrereqsButton = document.getElementById('showPrereqs');
    showCourseSimilarityButton.addEventListener('click', showCourseSimilarity, false);
    showPrereqsButton.addEventListener('click', showPrereqs, false);
    const subcategories_colours = {
        'Algorithms and data structures': '#e6194b', // red
        'Computer architecture': '#f58231', //orange
        'Formal methods': '#ffe119', //yellow 
        'Computer security': '#3cb44b', // green 
        'Artificial intelligence': '#4363d8', //blue
        'Computational science': '#911eb4', // purp 
        'Computer graphics': '#a9a9a9', //grey 
        'Database theory': '#000000', //black
        'Concurrency (computer science)': '#9a6324' //brown
    }
    Promise.all([generateGraphElements(), generatePrereqGraphElements()]).then(graphs_elements => {
        console.log(graphs_elements[1]);
        cytoscape({
            container: document.getElementById('cy-similarity'),
            elements: graphs_elements[0],
            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(id)'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        // 'width': 'mapData(weight, 0, 100, 1, 10)',
                        'width': 'mapData(weight, 0, 200, 1, 10)',
                        'line-color': (ele) => {
                            return subcategories_colours[ele.data('subcat')]
                        },
                        'curve-style': 'bezier'
                    }
                }
            ],
            layout: {
                name: 'circle',
            }
        });
        cytoscape({
            container: document.getElementById('cy-prereqs'),
            elements: graphs_elements[1],
            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': '#333',
                        'label': 'data(id)'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        // 'width': 'mapData(weight, 0, 100, 1, 10)',
                        'width': '3px',
                        'curve-style': 'straight',
                        'target-arrow-shape': 'triangle'
                    }
                }
            ],
            layout: {
                name: 'breadthfirst',
            }
        });
        showCourseSimilarity();
    })
})()