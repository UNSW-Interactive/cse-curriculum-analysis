const url = 'http://127.0.0.1:5000/graph';

(function getGraph() {
    fetch(url).then(
        res => {
            if (!res.ok) {
                throw res;
            }
            res.json().then(
                jsonresp => {
                    console.log(jsonresp);
                }
            );
        }
    )
        .catch(err => {
            throw err;
        })
})();

