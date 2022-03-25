// A Javascript program to find bridges in a given undirected graph

// This class represents a directed graph using adjacency
// list representation
class Graph {
    // Constructor
    constructor(v) {
        this.V = v;
        this.adj = new Array(v);

        this.NIL = -1;
        this.time = 0;
        for (let i = 0; i < v; ++i)
            this.adj[i] = [];
    }

    //Function to add an edge into the graph
    addEdge(v, w) {
        this.adj[v].push(w);  //Note that the graph is undirected.
        this.adj[w].push(v);
    }

    // A recursive function that finds and prints bridges
    // using DFS traversal
    // u --> The vertex to be visited next
    // visited[] --> keeps track of visited vertices
    // disc[] --> Stores discovery times of visited vertices
    // parent[] --> Stores parent vertices in DFS tree
    bridgeUtil(u, visited, disc, low, parent) {
        // Mark the current node as visited
        visited[u] = true;

        // Initialize discovery time and low value
        disc[u] = low[u] = ++this.time;

        // Go through all vertices adjacent to this

        for (let i of this.adj[u]) {
            let v = i;  // v is current adjacent of u

            // If v is not visited yet, then make it a child
            // of u in DFS tree and recur for it.
            // If v is not visited yet, then recur for it
            if (!visited[v]) {
                parent[v] = u;
                this.bridgeUtil(v, visited, disc, low, parent);

                // Check if the subtree rooted with v has a
                // connection to one of the ancestors of u
                low[u] = Math.min(low[u], low[v]);

                // If the lowest vertex reachable from subtree
                // under v is below u in DFS tree, then u-v is
                // a bridge
                if (low[v] > disc[u])
                    document.write(u + " " + v + "<br>");
            }

            // Update low value of u for parent function calls.
            else if (v != parent[u])
                low[u] = Math.min(low[u], disc[v]);
        }
    }

    // DFS based function to find all bridges. It uses recursive
    // function bridgeUtil()
    bridge() {
        // Mark all the vertices as not visited
        let visited = new Array(this.V);
        let disc = new Array(this.V);
        let low = new Array(this.V);
        let parent = new Array(this.V);


        // Initialize parent and visited, and ap(articulation point)
        // arrays
        for (let i = 0; i < this.V; i++) {
            parent[i] = this.NIL;
            visited[i] = false;
        }

        // Call the recursive helper function to find Bridges
        // in DFS tree rooted with vertex 'i'
        for (let i = 0; i < this.V; i++)
            if (visited[i] == false)
                this.bridgeUtil(i, visited, disc, low, parent);
    }
}

export default Graph;