
from flask import Flask, render_template, request, jsonify
import requests
from concurrent.futures import ThreadPoolExecutor
from deep_translator import GoogleTranslator
import random

app = Flask(__name__)

# Variável para a chave da API (chave ativada)
API_KEY = "55e0f40"

def buscar_filmes_series_por_nome(nome_filme, page=1):
    url = "https://www.omdbapi.com/"
    params = {
        "s": nome_filme,
        "apikey": API_KEY,
        "page": page
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        filmes_series = response.json().get('Search', [])
        print(f"Resultados da pesquisa para '{nome_filme}': {filmes_series}")  # Log para debug
        if not filmes_series:
            return []
        with ThreadPoolExecutor() as executor:
            detalhes_filmes_series = list(executor.map(buscar_detalhes_filme, [item['imdbID'] for item in filmes_series]))
        return [item for item in detalhes_filmes_series if item['link_ultraembed']]
    else:
        print(f"Erro na requisição: {response.status_code}")  # Log para debug
        return []

def buscar_detalhes_filme(imdb_id):
    url = "https://www.omdbapi.com/"
    params = {
        "i": imdb_id,
        "apikey": API_KEY
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        item = response.json()
        # Substituir valores "N/D" ou "N/A" por "Nada encontrado"
        for chave in ['Genre', 'Plot', 'Director', 'Actors', 'Runtime', 'Language', 'Country', 'imdbRating']:
            if item.get(chave) in ["N/A", "N/D"]:
                item[chave] = "Nada encontrado"
        
        # Verificar disponibilidade no Ultraembed
        item['link_ultraembed'] = verificar_link_ultraembed(imdb_id)
        if item['link_ultraembed']:
            # Traduzir detalhes para português
            item = traduzir_detalhes(item)
        return item
    else:
        print(f"Erro na requisição de detalhes: {response.status_code}")  # Log para debug
        return None

def traduzir_detalhes(item):
    tradutor_pt = GoogleTranslator(source="en", target="pt")
    for chave in ['Title', 'Genre', 'Plot', 'Director', 'Actors', 'Runtime', 'Language', 'Country']:
        if chave in item and item[chave] != "Nada encontrado":
            item[chave] = tradutor_pt.translate(item[chave])
    return item

def verificar_link_ultraembed(imdb_id):
    # Tentar verificar a disponibilidade como filme
    url_filme = f"https://ultraembed.com/filme/{imdb_id}"
    response_filme = requests.head(url_filme)
    if response_filme.status_code == 200:
        return True

    # Tentar verificar a disponibilidade como série
    url_serie = f"https://ultraembed.com/serie/{imdb_id}"
    response_serie = requests.head(url_serie)
    if response_serie.status_code == 200:
        return True

    # Se não encontrado nem como filme nem como série
    print(f"Link não disponível para o item com ID {imdb_id}")
    return False

def buscar_filmes_aleatorios(page=1):
    # Lista de palavras aleatórias para buscar filmes
    palavras_aleatorias = ["love", "war", "dream", "life", "night", "day", "world", "friend", "home", "journey"]
    palavra_aleatoria = random.choice(palavras_aleatorias)
    return buscar_filmes_series_por_nome(palavra_aleatoria, page)

@app.route("/", methods=["GET", "POST"])
def index():
    filmes_series = []
    filmes_aleatorios = []
    nome_filme = None
    page = request.args.get('page', 1, type=int)

    if request.method == "POST":
        nome_filme = request.form.get("nome_filme")
        tradutor = GoogleTranslator(source="pt", target="en")
        traducao = tradutor.translate(nome_filme)
        print(f"Buscando por: {traducao}")  # Log para debug
        filmes_series = buscar_filmes_series_por_nome(traducao, page)
    
    else:
        # Exibir filmes aleatórios ao carregar a página inicialmente
        filmes_aleatorios = buscar_filmes_aleatorios(page)
    
    mensagem = None
    if not filmes_series and nome_filme:
        mensagem = f"'{nome_filme}' não foi encontrado, tente novamente."
    
    return render_template("index.html", filmes=filmes_series, filmes_aleatorios=filmes_aleatorios, mensagem=mensagem, page=page)


@app.route("/filmes")
def filmes_por_categoria():
    categoria = request.args.get('categoria')
    page = request.args.get('page', 1, type=int)
    filmes_series = buscar_filmes_series_por_nome(categoria, page)

    return jsonify(filmes_series)

@app.route("/buscar-filme", methods=["GET"])
def buscar_filme():
    nome_filme = request.args.get("nome_filme")
    page = request.args.get("page", 1, type=int)
    tradutor = GoogleTranslator(source="pt", target="en")
    traducao = tradutor.translate(nome_filme)
    filmes_series = buscar_filmes_series_por_nome(traducao, page)

    return jsonify(filmes_series)

if __name__ == "__main__":
    app.run(port=8080)
