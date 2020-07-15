import cytoscape from 'cytoscape';

const url = 'http://127.0.0.1:5000';

function getGraphData() {
    return fetch(url + '/graph').then(
        resp => {
            return resp.json()
        }
    )
}



function generateGraphElements() {
    return getGraphData().then(
        (graph_data) => {
            console.log(graph_data);
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
                // const graph_data_keys = Object.keys(edges);
                // graph_data_keys.forEach(course => {
                //     const neighbours = Object.keys(graph_data[course]);
                //     neighbours.forEach(neighbour => {

            //         const subcategories = Object.keys(graph_data[course][neighbour]);
            //         subcategories.forEach(subcategory => {
            //             const edge = {
            //                 data: {
            //                     id: course + neighbour,
            //                     source: course,
            //                     target: neighbour,
            //                     subcat: subcategory,
            //                     weight: graph_data[course][neighbour][subcategory]
            //                 }
            //             };
            //             elements.push(edge);
            //         });
            //     })
            // });
            return elements;
        }
    )
}


// todo: this is not complete. just what we have from data


(function main() {
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
    generateGraphElements().then(elements => {
        console.log(elements.find(ele => ele['data']['id'] === 'COMP3821COMP6741'));
        let cy = cytoscape({
            container: document.getElementById('cy'), // container to render in
            elements: elements,
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
    })
})()