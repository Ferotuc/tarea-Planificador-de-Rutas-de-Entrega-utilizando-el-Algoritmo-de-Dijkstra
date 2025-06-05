from flask import Flask, render_template, request, jsonify
from dijkstra import dijkstra

app = Flask(__name__)

# Ejemplo de grafo
graph = {
    'A': {'B': 1, 'C': 4},
    'B': {'A': 1, 'C': 2, 'D': 5},
    'C': {'A': 4, 'B': 2, 'D': 1},
    'D': {'B': 5, 'C': 1}
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate_route', methods=['POST'])
def calculate_route():
    data = request.json
    start_node = data['start_node']
    distances = dijkstra(graph, start_node)
    return jsonify(distances)

if __name__ == '__main__':
    app.run(debug=True)
