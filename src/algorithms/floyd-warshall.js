function floydWarshallAlgorithm() {
    let dist = {};
    for (let i = 0; i < this.nodes.length; i++) {
        dist[this.nodes[i]] = {};
        // For existing edges assign the dist to be same as weight
        this.edges[this.nodes[i]].forEach(e => (dist[this.nodes[i]][e.node] = e.weight));
        this.nodes.forEach(n => {
            // For all other nodes assign it to infinity
            if (dist[this.nodes[i]][n] == undefined)
                dist[this.nodes[i]][n] = Infinity;
            // For self edge assign dist to be 0
            if (this.nodes[i] === n) dist[this.nodes[i]][n] = 0;
        });
    }
    this.nodes.forEach(i => {
        this.nodes.forEach(j => {
            this.nodes.forEach(k => {
                // Check if going from i to k then from k to j is better
                // than directly going from i to j. If yes then update
                // i to j value to the new value
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
            });
        });
    });
    return dist;
}


export default floydWarshallAlgorithm;