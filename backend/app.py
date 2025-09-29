# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from nim import Nim, NimAI, train  # put your nim.py in backend/

app = Flask(__name__)
CORS(app)

# Simple in-memory storage for demo
GAMES = {}

# Root route (so Render homepage isn't 404)
@app.route("/")
def index():
    return jsonify({
        "message": "🎮 Welcome to the Nim AI Game API!",
        "routes": {
            "POST /train": "Train the AI (optional, improves gameplay)",
            "POST /start": "Start a new game",
            "GET /state/<game_id>": "Get current game state",
            "POST /move/<game_id>": "Make a move as human",
            "POST /ai_move/<game_id>": "Let the AI make a move"
        }
    })


@app.route('/train', methods=['POST'])
def train_ai():
    data = request.get_json() or {}
    n = int(data.get('n', 1000))
    ai = train(n)
    GAMES['ai'] = ai
    return jsonify({'status': 'trained', 'games': n})


@app.route('/start', methods=['POST'])
def start_game():
    data = request.get_json() or {}
    initial = data.get('initial', [1, 3, 5, 7])
    human_first = data.get('human_first', True)
    game = Nim(initial=initial)
    game_id = str(len(GAMES) + 1)
    # store game and reference AI (use trained AI if available)
    GAMES[game_id] = {
        'game': game,
        'ai': GAMES.get('ai', NimAI()),
        'human_player': 0 if human_first else 1
    }
    return jsonify({
        'game_id': game_id,
        'piles': game.piles,
        'player': game.player,
        'human_player': GAMES[game_id]['human_player']
    })


@app.route('/state/<game_id>', methods=['GET'])
def get_state(game_id):
    entry = GAMES.get(game_id)
    if not entry:
        return jsonify({'error': 'game not found'}), 404
    game = entry['game']
    return jsonify({'piles': game.piles, 'player': game.player, 'winner': game.winner})


@app.route('/move/<game_id>', methods=['POST'])
def make_move(game_id):
    data = request.get_json() or {}
    action = tuple(data.get('action'))
    entry = GAMES.get(game_id)
    if not entry:
        return jsonify({'error': 'game not found'}), 404
    game = entry['game']
    try:
        game.move(action)
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    return jsonify({'piles': game.piles, 'player': game.player, 'winner': game.winner})


@app.route('/ai_move/<game_id>', methods=['POST'])
def ai_move(game_id):
    entry = GAMES.get(game_id)
    if not entry:
        return jsonify({'error': 'game not found'}), 404
    game = entry['game']
    ai = entry['ai']
    # deterministic best move (epsilon=False)
    action = ai.choose_action(game.piles, epsilon=False)
    game.move(action)
    return jsonify({'action': action, 'piles': game.piles, 'player': game.player, 'winner': game.winner})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
