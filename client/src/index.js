// import cytoscape from 'cytoscape';

// const url = 'http://127.0.0.1:5000/graph';

// (function getGraph() {
//     fetch(url).then(
//         res => {
//             if (!res.ok) {
//                 throw res;
//             }
//             res.json().then(
//                 jsonresp => {
//                     console.log(jsonresp);
//                 }
//             );
//         }
//     )
//         .catch(err => {
//             throw err;
//         })
// })();
console.log("234");

let cy = cytoscape({

        container: document.getElementById('cy'), // container to render in
      
        elements: [ // list of graph elements to start with
          {
            data: { id: 'COMP1511' }
          },
          { 
            data: { id: 'COMP1521' }
          },
          { 
            data: { id: 'COMP1531' }
          },
          { 
            data: { id: 'COMP2521' }
          },
          { 
            data: { id: 'COMP2511' }
          },
          {
            data: { id: 'COMP2121' }
          },
          {
            data: { id: 'COMP3231' }
          },
          { 
            data: { id: '1', source: 'COMP1511', target: 'COMP2521' }
          },
          { 
            data: { id: 'b', source: 'COMP1511', target: 'COMP1531' }
          },
          { 
            data: { id: 'c', source: 'COMP1511', target: 'COMP2121' }
          },
          { 
            data: { id: 'd', source: 'COMP1521', target: 'COMP2121' }
          },
          { 
            data: { id: 'e', source: 'COMP1521', target: 'COMP3231' }
          },
          { 
            data: { id: 'f', source: 'COMP1531', target: 'COMP2511' }
          },
          { 
            data: { id: 'g', source: 'COMP2521', target: 'COMP2511' }
          },
          { 
            data: { id: 'g', source: 'COMP2521', target: 'COMP3231' }
          },
          { 
            data: { id: 'h', source: 'COMP2121', target: 'COMP3231' }
          },
        ],
      
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
              'width': 3,
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier'
            }
          }
        ],
      
        // layout: {
        //   name: 'grid',
        // }
      
      });