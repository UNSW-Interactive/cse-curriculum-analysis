import cytoscape from 'cytoscape';

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

const graph_data = {
  "COMP1511": {
    "COMP2111": {
      "Concurrency (computer science)": 14,
      "Algorithms and data structures": 8,
      "Computational science": 16,
      "Formal methods": 10
    },
    "COMP3231": {
      "Algorithms and data structures": 30,
      "Formal methods": 24,
      "Concurrency (computer science)": 22,
      "Computer architecture": 22,
      "Computational science": 6,
      "Artificial intelligence": 2,
      "Computer security": 22
    },
    "COMP4418": {
      "Concurrency (computer science)": 14,
      "Algorithms and data structures": 40,
      "Formal methods": 26,
      "Computer security": 4,
      "Computational science": 16
    },
    "COMP6741": {
      "Computer security": 4,
      "Concurrency (computer science)": 4,
      "Algorithms and data structures": 10,
      "Computational science": 12,
      "Computer architecture": 2,
      "Formal methods": 6
    },
    "COMP9242": {
      "Concurrency (computer science)": 32,
      "Computer security": 26,
      "Computer architecture": 14,
      "Formal methods": 4,
      "Computational science": 2,
      "Algorithms and data structures": 2
    },
    "COMP3161": {
      "Concurrency (computer science)": 22,
      "Algorithms and data structures": 24,
      "Formal methods": 24,
      "Computer security": 24,
      "Computational science": 6
    },
    "COMP3821": {
      "Computer security": 6,
      "Algorithms and data structures": 16,
      "Computational science": 10,
      "Artificial intelligence": 2,
      "Computer architecture": 2
    },
    "COMP6752": {
      "Algorithms and data structures": 22,
      "Formal methods": 24,
      "Computational science": 2,
      "Concurrency (computer science)": 2
    },
    "COMP3211": {
      "Computer security": 28,
      "Concurrency (computer science)": 14,
      "Algorithms and data structures": 20,
      "Computer architecture": 20,
      "Formal methods": 4
    }
  },
  "COMP2111": {
    "COMP3821": {
      "Algorithms and data structures": 12,
      "Computational science": 32,
      "Computer architecture": 10,
      "Artificial intelligence": 2,
      "Formal methods": 2
    },
    "COMP6752": {
      "Artificial intelligence": 34,
      "Computational science": 34,
      "Formal methods": 64,
      "Algorithms and data structures": 8,
      "Computer architecture": 10,
      "Concurrency (computer science)": 2
    },
    "COMP3211": {
      "Formal methods": 8,
      "Algorithms and data structures": 8,
      "Computational science": 4,
      "Computer architecture": 12,
      "Concurrency (computer science)": 4
    },
    "COMP3231": {
      "Computational science": 30,
      "Formal methods": 30,
      "Algorithms and data structures": 10,
      "Computer architecture": 4,
      "Concurrency (computer science)": 6
    },
    "COMP4418": {
      "Artificial intelligence": 36,
      "Computational science": 66,
      "Formal methods": 48,
      "Concurrency (computer science)": 4,
      "Algorithms and data structures": 4,
      "Computer architecture": 12
    },
    "COMP6741": {
      "Formal methods": 22,
      "Algorithms and data structures": 14,
      "Computational science": 36,
      "Artificial intelligence": 16,
      "Computer architecture": 12,
      "Concurrency (computer science)": 2
    },
    "COMP9242": {
      "Concurrency (computer science)": 8,
      "Formal methods": 8,
      "Computational science": 8,
      "Computer architecture": 2
    },
    "COMP3161": {
      "Concurrency (computer science)": 4,
      "Computational science": 58,
      "Formal methods": 58,
      "Algorithms and data structures": 8,
      "Computer security": 6,
      "Artificial intelligence": 16,
      "Computer architecture": 12
    }
  },
  "COMP3231": {
    "COMP4418": {
      "Computer architecture": 8,
      "Algorithms and data structures": 6,
      "Formal methods": 10,
      "Computational science": 4
    },
    "COMP6741": {
      "Formal methods": 6,
      "Concurrency (computer science)": 18,
      "Algorithms and data structures": 6,
      "Computational science": 8,
      "Computer graphics": 2,
      "Computer architecture": 2
    },
    "COMP9242": {
      "Computer architecture": 86,
      "Concurrency (computer science)": 110,
      "Computer security": 16,
      "Computational science": 8,
      "Formal methods": 6
    },
    "COMP3821": {
      "Artificial intelligence": 4,
      "Algorithms and data structures": 6,
      "Computational science": 4
    },
    "COMP6752": {
      "Concurrency (computer science)": 36,
      "Algorithms and data structures": 6,
      "Formal methods": 14,
      "Computational science": 2
    }
  },
  "COMP3161": {
    "COMP3231": {
      "Formal methods": 10,
      "Concurrency (computer science)": 6,
      "Computer security": 4,
      "Algorithms and data structures": 6,
      "Computational science": 6,
      "Computer architecture": 6
    },
    "COMP4418": {
      "Formal methods": 10,
      "Computer architecture": 4,
      "Computer security": 6,
      "Concurrency (computer science)": 18,
      "Algorithms and data structures": 4,
      "Computational science": 32,
      "Database theory": 2,
      "Artificial intelligence": 2
    },
    "COMP6741": {
      "Formal methods": 6,
      "Computer architecture": 2,
      "Computer security": 2,
      "Computational science": 20,
      "Algorithms and data structures": 2,
      "Artificial intelligence": 2
    },
    "COMP9242": {
      "Formal methods": 4,
      "Concurrency (computer science)": 20,
      "Computer security": 6,
      "Computational science": 12,
      "Computer architecture": 4
    },
    "COMP3821": {
      "Computer architecture": 2,
      "Computer security": 2,
      "Computational science": 16,
      "Algorithms and data structures": 2
    },
    "COMP6752": {
      "Formal methods": 36,
      "Computer architecture": 2,
      "Computational science": 16,
      "Algorithms and data structures": 6,
      "Database theory": 2,
      "Concurrency (computer science)": 4,
      "Artificial intelligence": 8
    },
    "COMP3211": {
      "Formal methods": 4,
      "Computer architecture": 4,
      "Computer security": 10,
      "Database theory": 2,
      "Computational science": 4,
      "Concurrency (computer science)": 2,
      "Algorithms and data structures": 2
    }
  },
  "COMP6741": {
    "COMP9242": {
      "Computational science": 12,
      "Concurrency (computer science)": 4,
      "Computer security": 2,
      "Formal methods": 4
    },
    "COMP6752": {
      "Algorithms and data structures": 16,
      "Artificial intelligence": 4,
      "Computer architecture": 4,
      "Formal methods": 6,
      "Computational science": 4
    }
  },
  "COMP4418": {
    "COMP6741": {
      "Computational science": 70,
      "Algorithms and data structures": 28,
      "Artificial intelligence": 30,
      "Formal methods": 22,
      "Computer architecture": 10,
      "Computer security": 2
    },
    "COMP9242": {
      "Concurrency (computer science)": 4,
      "Artificial intelligence": 4,
      "Formal methods": 2,
      "Computer security": 2,
      "Computational science": 14
    },
    "COMP6752": {
      "Algorithms and data structures": 4,
      "Formal methods": 22,
      "Computational science": 18,
      "Artificial intelligence": 40,
      "Database theory": 2,
      "Computer architecture": 8
    }
  },
  "COMP3211": {
    "COMP3231": {
      "Computer architecture": 158,
      "Formal methods": 6,
      "Concurrency (computer science)": 34,
      "Computer security": 14,
      "Algorithms and data structures": 6,
      "Computational science": 8
    },
    "COMP4418": {
      "Formal methods": 6,
      "Computer architecture": 24,
      "Computer security": 6,
      "Database theory": 2,
      "Algorithms and data structures": 4,
      "Computational science": 4
    },
    "COMP6741": {
      "Formal methods": 6,
      "Computer architecture": 16,
      "Concurrency (computer science)": 18,
      "Computational science": 6,
      "Computer security": 4,
      "Algorithms and data structures": 6
    },
    "COMP9242": {
      "Computer architecture": 124,
      "Formal methods": 6,
      "Concurrency (computer science)": 32,
      "Computer security": 12,
      "Computational science": 2
    },
    "COMP3821": {
      "Computer architecture": 4,
      "Computational science": 6,
      "Computer security": 4,
      "Algorithms and data structures": 6
    },
    "COMP6752": {
      "Formal methods": 6,
      "Computer architecture": 2,
      "Concurrency (computer science)": 6,
      "Database theory": 2,
      "Computational science": 10,
      "Algorithms and data structures": 4
    }
  },
  "COMP6752": {
    "COMP9242": {
      "Concurrency (computer science)": 6,
      "Computational science": 4,
      "Formal methods": 6
    }
  },
  "COMP3821": {
    "COMP4418": {
      "Algorithms and data structures": 118,
      "Computational science": 130,
      "Computer security": 4,
      "Computer architecture": 2,
      "Artificial intelligence": 2,
      "Formal methods": 2
    },
    "COMP6741": {
      "Computational science": 206,
      "Algorithms and data structures": 156,
      "Computer architecture": 6,
      "Artificial intelligence": 2,
      "Formal methods": 2,
      "Computer security": 2
    },
    "COMP9242": {
      "Computational science": 22,
      "Computer security": 4,
      "Computer architecture": 2
    },
    "COMP6752": {
      "Algorithms and data structures": 8,
      "Computational science": 8,
      "Computer architecture": 2
    }
  }
}

const courses = ['COMP9242', 'COMP3211', 'COMP3821', 'COMP1511', 'COMP6741', 'COMP2111', 'COMP3161', 'COMP3231', 'COMP4418', 'COMP6752'];
let elements = courses.map(course_name => {
  return {
    data: {
      id: course_name
    }
  }
});
const graph_data_keys = Object.keys(graph_data);
graph_data_keys.forEach(course => {
  const neighbours = Object.keys(graph_data[course]);
  neighbours.forEach(neighbour => {
    
    const subcategories = Object.keys(graph_data[course][neighbour]);
    subcategories.forEach(subcategory => {
      const edge = {
        data: {
          id: course + neighbour,
          source: course,
          target: neighbour,
          subcat: subcategory,
          weight: graph_data[course][neighbour][subcategory]
        }
      };
      elements.push(edge);
    });
  })
});

// todo: this is not complete. just what we have from data
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
// const edges = 

console.log(elements);
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