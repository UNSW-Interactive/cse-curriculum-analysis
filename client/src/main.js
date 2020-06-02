const url = 'http://127.0.0.1:5000'

const getGraph = () => {
    fetch(url).then(
        res => {
            if (!res.ok) {
                throw res;
            }
            return res.json();
        }
    )
        .catch(err => {
            throw err;
        })
}

