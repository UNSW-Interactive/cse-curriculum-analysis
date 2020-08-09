import cytoscape from 'cytoscape';
import { generateGraphElements, generatePrereqGraphElements } from './graph.js';
import { getCourseInfo, search, getRelation } from './api.js';
import { showLegend, showCourseInfo, showSearchResults, showCourseRelationship } from './sidebar.js';

function showCourseSimilarity(subcategories, cy) {
    const similarityGraph = document.getElementById('cy-similarity');
    const prereqGraph = document.getElementById('cy-prereqs');
    prereqGraph.style.display = "none";
    similarityGraph.style.display = "block";
    showLegend(subcategories);
    currGraph = cy;
    currGraphLegend = subcategories;
}

function showPrereqs(course_legend, cy) {
    const similarityGraph = document.getElementById('cy-similarity');
    const prereqGraph = document.getElementById('cy-prereqs');
    similarityGraph.style.display = "none";
    prereqGraph.style.display = "block";
    showLegend(course_legend);
    currGraph = cy;
    currGraphLegend = course_legend;
}

function OrNodeOrNot(a, b) {
    return (ele) => {
        return ele.data('or_node') ? a : b;
    };
}

function highlightCourse(courseNode, cy) {
    // when a course is typed in, light it up!
    // cy.elements().not(courseNode).addClass('semitransp').addClass('semitransp');
    courseNode.addClass('highlight');
}

var currGraph;
export var currGraphLegend;
(function main() {
    const subcategories_colours = [
        ['Algorithms and data structures', '#e6194b', 'ads'], // red
        ['Computer architecture', '#f58231', 'comparch'], //orange
        ['Formal methods', '#ffe119', 'fm'], //yellow 
        ['Computer security', '#3cb44b', 'sec'], // green 
        ['Artificial intelligence', '#4363d8', 'ai'], //blue
        ['Computational science', '#911eb4', 'cs'], // purp 
        ['Computer graphics', '#a9a9a9', 'graphics'], //grey 
        ['Database theory', '#000000', 'db'], //black
        ['Concurrency', '#9a6324', 'conc'] //brown
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
    const displayCourseInfoSidebar = node => {
        const targetNode = node.target;
        getCourseInfo(targetNode._private.data.id).then(course_info => {
            showCourseInfo(course_info);
        })
    };

    const displayEdgeInfoSidebar = edge => {
        const targetEdge = edge.target;
        console.log(edge.target._private.data);
        const edgeName = edge.target._private.data.id.slice(0, 16);
        const courseA = targetEdge._private.data.source;
        const courseB = targetEdge._private.data.target;
        getRelation(courseA, courseB).then(relationship_info => {
            showCourseRelationship(courseA, courseB, relationship_info, subcategories_colours, edgeName);
        })
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
        similarityGraph.nodes().on('click', displayCourseInfoSidebar);
        similarityGraph.edges().on('click', displayEdgeInfoSidebar);
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
        prereqsGraph.nodes().on('click', displayCourseInfoSidebar);

        showCourseSimilarity(subcategories_colours, similarityGraph);
        const searchField = document.getElementById('graphSearch');
        searchField.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                const searchKey = searchField.value.split(" ").join(",");
                search(searchKey).then(
                    search_response => {
                        showSearchResults(searchField.value, search_response);
                    }
                )
            }
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