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
  "COMP9242": {
    "COMP3211": {
      "Computer architecture": 28,
      "Concurrency (computer science)": 44,
      "Computational science": 2,
      "Computer security": 10,
      "Formal methods": 4
    },
    "COMP3821": {
      "Computer architecture": 8,
      "Computer security": 4,
      "Computational science": 6
    },
    "COMP1511": {
      "Algorithms and data structures": 2,
      "Computer architecture": 14,
      "Concurrency (computer science)": 34,
      "Computer security": 8,
      "Computational science": 2,
      "Formal methods": 4
    },
    "COMP6741": {
      "Concurrency (computer science)": 8,
      "Computational science": 4,
      "Computer security": 2,
      "Formal methods": 4
    },
    "COMP2111": {
      "Concurrency (computer science)": 24,
      "Computational science": 6,
      "Formal methods": 4,
      "Computer architecture": 2
    },
    "COMP3161": {
      "Computer security": 10,
      "Computational science": 8,
      "Concurrency (computer science)": 14,
      "Formal methods": 4,
      "Computer architecture": 4
    },
    "COMP3231": {
      "Computer architecture": 36,
      "Concurrency (computer science)": 64,
      "Computational science": 4,
      "Computer security": 14,
      "Formal methods": 4
    },
    "COMP4418": {
      "Computer security": 2,
      "Artificial intelligence": 2,
      "Computational science": 4,
      "Formal methods": 4,
      "Concurrency (computer science)": 2
    },
    "COMP6752": {
      "Concurrency (computer science)": 20,
      "Computational science": 4,
      "Formal methods": 4
    }
  },
  "COMP3211": {
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
    "COMP1511": {
      "Computer architecture": 116,
      "Formal methods": 6,
      "Concurrency (computer science)": 26,
      "Computer security": 14,
      "Algorithms and data structures": 12
    },
    "COMP6741": {
      "Formal methods": 6,
      "Computer architecture": 16,
      "Concurrency (computer science)": 18,
      "Computational science": 6,
      "Computer security": 4,
      "Algorithms and data structures": 6
    },
    "COMP2111": {
      "Formal methods": 6,
      "Computer architecture": 14,
      "Concurrency (computer science)": 20,
      "Computational science": 8,
      "Algorithms and data structures": 4
    },
    "COMP3161": {
      "Formal methods": 6,
      "Computer architecture": 8,
      "Computer security": 14,
      "Database theory": 2,
      "Computational science": 6,
      "Algorithms and data structures": 4,
      "Concurrency (computer science)": 4
    },
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
    "COMP6752": {
      "Formal methods": 6,
      "Computer architecture": 2,
      "Concurrency (computer science)": 6,
      "Database theory": 2,
      "Computational science": 10,
      "Algorithms and data structures": 4
    }
  },
  "COMP3821": {
    "COMP9242": {
      "Computational science": 22,
      "Computer security": 4,
      "Computer architecture": 2
    },
    "COMP3211": {
      "Algorithms and data structures": 22,
      "Computer architecture": 4,
      "Computational science": 6,
      "Computer security": 2
    },
    "COMP1511": {
      "Algorithms and data structures": 96,
      "Computational science": 56,
      "Computer architecture": 2,
      "Artificial intelligence": 2,
      "Computer security": 4
    },
    "COMP6741": {
      "Computational science": 206,
      "Algorithms and data structures": 156,
      "Computer architecture": 6,
      "Artificial intelligence": 2,
      "Formal methods": 2,
      "Computer security": 2
    },
    "COMP2111": {
      "Algorithms and data structures": 66,
      "Computational science": 128,
      "Computer architecture": 2,
      "Artificial intelligence": 2,
      "Formal methods": 2
    },
    "COMP3161": {
      "Computational science": 36,
      "Algorithms and data structures": 8,
      "Computer architecture": 2,
      "Computer security": 2
    },
    "COMP3231": {
      "Algorithms and data structures": 36,
      "Computational science": 30,
      "Artificial intelligence": 2
    },
    "COMP4418": {
      "Algorithms and data structures": 118,
      "Computational science": 130,
      "Computer security": 4,
      "Computer architecture": 2,
      "Artificial intelligence": 2,
      "Formal methods": 2
    },
    "COMP6752": {
      "Algorithms and data structures": 8,
      "Computational science": 8,
      "Computer architecture": 2
    }
  },
  "COMP1511": {
    "COMP9242": {
      "Concurrency (computer science)": 32,
      "Computer security": 26,
      "Computer architecture": 14,
      "Formal methods": 4,
      "Computational science": 2,
      "Algorithms and data structures": 2
    },
    "COMP3211": {
      "Computer security": 28,
      "Concurrency (computer science)": 14,
      "Algorithms and data structures": 20,
      "Computer architecture": 20,
      "Formal methods": 4
    },
    "COMP3821": {
      "Computer security": 6,
      "Algorithms and data structures": 16,
      "Computational science": 10,
      "Artificial intelligence": 2,
      "Computer architecture": 2
    },
    "COMP6741": {
      "Computer security": 4,
      "Concurrency (computer science)": 4,
      "Algorithms and data structures": 10,
      "Computational science": 12,
      "Computer architecture": 2,
      "Formal methods": 6
    },
    "COMP2111": {
      "Concurrency (computer science)": 14,
      "Algorithms and data structures": 8,
      "Computational science": 16,
      "Formal methods": 10
    },
    "COMP3161": {
      "Concurrency (computer science)": 22,
      "Algorithms and data structures": 24,
      "Formal methods": 24,
      "Computer security": 24,
      "Computational science": 6
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
    "COMP6752": {
      "Algorithms and data structures": 22,
      "Formal methods": 24,
      "Computational science": 2,
      "Concurrency (computer science)": 2
    }
  },
  "COMP6741": {
    "COMP9242": {
      "Computational science": 12,
      "Concurrency (computer science)": 4,
      "Computer security": 2,
      "Formal methods": 4
    },
    "COMP3211": {
      "Algorithms and data structures": 30,
      "Computational science": 4,
      "Concurrency (computer science)": 4,
      "Computer architecture": 8,
      "Computer security": 2,
      "Formal methods": 4
    },
    "COMP3821": {
      "Algorithms and data structures": 126,
      "Computational science": 164,
      "Computer architecture": 8,
      "Artificial intelligence": 6,
      "Formal methods": 6,
      "Computer security": 2
    },
    "COMP1511": {
      "Algorithms and data structures": 44,
      "Computational science": 22,
      "Concurrency (computer science)": 4,
      "Formal methods": 6,
      "Computer security": 2,
      "Computer architecture": 2
    },
    "COMP2111": {
      "Computational science": 130,
      "Algorithms and data structures": 32,
      "Artificial intelligence": 10,
      "Concurrency (computer science)": 4,
      "Computer architecture": 6,
      "Formal methods": 12
    },
    "COMP3161": {
      "Algorithms and data structures": 16,
      "Computational science": 26,
      "Computer architecture": 4,
      "Computer security": 2,
      "Artificial intelligence": 2,
      "Formal methods": 6
    },
    "COMP3231": {
      "Algorithms and data structures": 26,
      "Computational science": 18,
      "Concurrency (computer science)": 4,
      "Computer graphics": 2,
      "Computer architecture": 2,
      "Formal methods": 4
    },
    "COMP4418": {
      "Algorithms and data structures": 82,
      "Computational science": 140,
      "Artificial intelligence": 12,
      "Computer architecture": 6,
      "Formal methods": 12,
      "Computer security": 2
    },
    "COMP6752": {
      "Algorithms and data structures": 16,
      "Artificial intelligence": 4,
      "Computer architecture": 4,
      "Formal methods": 6,
      "Computational science": 4
    }
  },
  "COMP2111": {
    "COMP9242": {
      "Concurrency (computer science)": 8,
      "Formal methods": 8,
      "Computational science": 8,
      "Computer architecture": 2
    },
    "COMP3211": {
      "Formal methods": 8,
      "Algorithms and data structures": 8,
      "Computational science": 4,
      "Computer architecture": 12,
      "Concurrency (computer science)": 4
    },
    "COMP3821": {
      "Algorithms and data structures": 12,
      "Computational science": 32,
      "Computer architecture": 10,
      "Artificial intelligence": 2,
      "Formal methods": 2
    },
    "COMP1511": {
      "Concurrency (computer science)": 4,
      "Formal methods": 38,
      "Algorithms and data structures": 12,
      "Computational science": 14
    },
    "COMP6741": {
      "Formal methods": 22,
      "Algorithms and data structures": 14,
      "Computational science": 36,
      "Artificial intelligence": 16,
      "Computer architecture": 12,
      "Concurrency (computer science)": 2
    },
    "COMP3161": {
      "Concurrency (computer science)": 4,
      "Computational science": 58,
      "Formal methods": 58,
      "Algorithms and data structures": 8,
      "Computer security": 6,
      "Artificial intelligence": 16,
      "Computer architecture": 12
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
    "COMP6752": {
      "Artificial intelligence": 34,
      "Computational science": 34,
      "Formal methods": 64,
      "Algorithms and data structures": 8,
      "Computer architecture": 10,
      "Concurrency (computer science)": 2
    }
  },
  "COMP3161": {
    "COMP9242": {
      "Formal methods": 4,
      "Concurrency (computer science)": 20,
      "Computer security": 6,
      "Computational science": 12,
      "Computer architecture": 4
    },
    "COMP3211": {
      "Formal methods": 4,
      "Computer architecture": 4,
      "Computer security": 10,
      "Database theory": 2,
      "Computational science": 4,
      "Concurrency (computer science)": 2,
      "Algorithms and data structures": 2
    },
    "COMP3821": {
      "Computer architecture": 2,
      "Computer security": 2,
      "Computational science": 16,
      "Algorithms and data structures": 2
    },
    "COMP1511": {
      "Formal methods": 30,
      "Concurrency (computer science)": 22,
      "Algorithms and data structures": 8,
      "Computer security": 4,
      "Computational science": 8
    },
    "COMP6741": {
      "Formal methods": 6,
      "Computer architecture": 2,
      "Computer security": 2,
      "Computational science": 20,
      "Algorithms and data structures": 2,
      "Artificial intelligence": 2
    },
    "COMP2111": {
      "Formal methods": 36,
      "Computer security": 2,
      "Computational science": 48,
      "Computer architecture": 4,
      "Concurrency (computer science)": 16,
      "Artificial intelligence": 8,
      "Algorithms and data structures": 2
    },
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
    "COMP6752": {
      "Formal methods": 36,
      "Computer architecture": 2,
      "Computational science": 16,
      "Algorithms and data structures": 6,
      "Database theory": 2,
      "Concurrency (computer science)": 4,
      "Artificial intelligence": 8
    }
  },
  "COMP3231": {
    "COMP9242": {
      "Computer architecture": 86,
      "Concurrency (computer science)": 110,
      "Computer security": 16,
      "Computational science": 8,
      "Formal methods": 6
    },
    "COMP3211": {
      "Computer architecture": 92,
      "Concurrency (computer science)": 84,
      "Computer security": 14,
      "Formal methods": 6,
      "Algorithms and data structures": 6,
      "Computational science": 6
    },
    "COMP3821": {
      "Artificial intelligence": 4,
      "Algorithms and data structures": 6,
      "Computational science": 4
    },
    "COMP1511": {
      "Computer architecture": 64,
      "Concurrency (computer science)": 56,
      "Artificial intelligence": 4,
      "Algorithms and data structures": 12,
      "Formal methods": 10,
      "Computer security": 10,
      "Computational science": 2
    },
    "COMP6741": {
      "Formal methods": 6,
      "Concurrency (computer science)": 18,
      "Algorithms and data structures": 6,
      "Computational science": 8,
      "Computer graphics": 2,
      "Computer architecture": 2
    },
    "COMP2111": {
      "Concurrency (computer science)": 38,
      "Computational science": 8,
      "Formal methods": 12,
      "Algorithms and data structures": 6,
      "Computer architecture": 6
    },
    "COMP3161": {
      "Computer security": 10,
      "Computer architecture": 12,
      "Algorithms and data structures": 6,
      "Formal methods": 12,
      "Concurrency (computer science)": 24,
      "Computational science": 4
    },
    "COMP4418": {
      "Computer architecture": 8,
      "Algorithms and data structures": 6,
      "Formal methods": 10,
      "Computational science": 4
    },
    "COMP6752": {
      "Concurrency (computer science)": 36,
      "Algorithms and data structures": 6,
      "Formal methods": 14,
      "Computational science": 2
    }
  },
  "COMP4418": {
    "COMP9242": {
      "Concurrency (computer science)": 4,
      "Artificial intelligence": 4,
      "Formal methods": 2,
      "Computer security": 2,
      "Computational science": 14
    },
    "COMP3211": {
      "Algorithms and data structures": 2,
      "Computational science": 8,
      "Computer architecture": 16,
      "Formal methods": 2,
      "Computer security": 4,
      "Database theory": 2
    },
    "COMP3821": {
      "Algorithms and data structures": 32,
      "Computational science": 46,
      "Computer security": 4,
      "Computer architecture": 8,
      "Artificial intelligence": 6,
      "Formal methods": 6
    },
    "COMP1511": {
      "Algorithms and data structures": 30,
      "Formal methods": 10,
      "Concurrency (computer science)": 6,
      "Computational science": 56,
      "Computer security": 2
    },
    "COMP6741": {
      "Computational science": 70,
      "Algorithms and data structures": 28,
      "Artificial intelligence": 30,
      "Formal methods": 22,
      "Computer architecture": 10,
      "Computer security": 2
    },
    "COMP2111": {
      "Computational science": 106,
      "Concurrency (computer science)": 6,
      "Algorithms and data structures": 12,
      "Artificial intelligence": 58,
      "Formal methods": 28,
      "Computer architecture": 10
    },
    "COMP3161": {
      "Algorithms and data structures": 4,
      "Formal methods": 20,
      "Concurrency (computer science)": 6,
      "Computational science": 86,
      "Artificial intelligence": 14,
      "Computer security": 4,
      "Database theory": 2,
      "Computer architecture": 10
    },
    "COMP3231": {
      "Algorithms and data structures": 12,
      "Formal methods": 8,
      "Computational science": 10,
      "Computer architecture": 4
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
  "COMP6752": {
    "COMP9242": {
      "Concurrency (computer science)": 6,
      "Computational science": 4,
      "Formal methods": 6
    },
    "COMP3211": {
      "Concurrency (computer science)": 6,
      "Formal methods": 6,
      "Computational science": 4,
      "Database theory": 2,
      "Algorithms and data structures": 4,
      "Computer architecture": 2
    },
    "COMP3821": {
      "Computational science": 6,
      "Algorithms and data structures": 4,
      "Computer architecture": 2
    },
    "COMP1511": {
      "Concurrency (computer science)": 2,
      "Formal methods": 10,
      "Algorithms and data structures": 6,
      "Computational science": 2
    },
    "COMP6741": {
      "Formal methods": 8,
      "Artificial intelligence": 4,
      "Computational science": 4,
      "Algorithms and data structures": 4,
      "Computer architecture": 2
    },
    "COMP2111": {
      "Concurrency (computer science)": 4,
      "Computational science": 16,
      "Formal methods": 14,
      "Artificial intelligence": 10,
      "Algorithms and data structures": 4,
      "Computer architecture": 2
    },
    "COMP3161": {
      "Computational science": 12,
      "Concurrency (computer science)": 8,
      "Formal methods": 16,
      "Algorithms and data structures": 6,
      "Database theory": 2,
      "Artificial intelligence": 6,
      "Computer architecture": 2
    },
    "COMP3231": {
      "Concurrency (computer science)": 6,
      "Formal methods": 16,
      "Algorithms and data structures": 6,
      "Computational science": 2
    },
    "COMP4418": {
      "Formal methods": 12,
      "Algorithms and data structures": 2,
      "Artificial intelligence": 8,
      "Computational science": 12,
      "Database theory": 2,
      "Computer architecture": 2
    }
  }
}

// const courses = ['COMP9242', 'COMP3211', 'COMP3821', 'COMP1511', 'COMP6741', 'COMP2111', 'COMP3161', 'COMP3231', 'COMP4418', 'COMP6752'];


let elements = Object.keys(graph_data).map(course_name => {
  return {
    data: {
      id: course_name
    }
  }
});
const courses = Object.keys(graph_data);
courses.forEach(course => {
  const neighbours = Object.keys(graph_data[course]);
  neighbours.forEach(neighbour => {
    const edge = {
      data: {
        id: course+neighbour,
        source:course,
        target:neighbour
      }
    };
    const subcategories = Object.keys(graph_data[course][neighbour]);
    subcategories.forEach(subcategory => {
      edge[subcategory] = graph_data[course][neighbour][subcategory];
    });
    elements.push(edge);
  })
});
const subcategories = ['Algorithms and data structures', 'Computer architecture', 'Formal methods', 'Computer security', 'Artificial intelligence', 'Computational science', 'Computer graphics', 'Database theory', 'Concurrency (computer science)']
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
        'width': '3',
        'line-color': '#ccc',
        'curve-style': 'bezier'
      }
    }
  ],

  // layout: {
  //   name: 'grid',
  // }

});