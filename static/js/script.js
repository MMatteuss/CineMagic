// Função para redirecionar ao clicar na logo
document.querySelector('.navbar-brand').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = "/";
});

// Função para lidar com a seleção de séries
document.getElementById('filmes-container').addEventListener('click', function(event) {
    if (event.target.classList.contains('assistir-serie')) {
        const imdbID = event.target.dataset.imdbid;
        const totalSeasons = event.target.dataset.totalSeasons;
        document.getElementById('imdbID').value = imdbID;
        document.getElementById('temporada').setAttribute('max', totalSeasons);
        document.getElementById('temporada').setAttribute('min', 1);
        $('#serieModal').modal('show');
    }
});

// Função para enviar o formulário de seleção de temporada e episódio
document.getElementById('serieForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const imdbID = document.getElementById('imdbID').value;
    const temporada = parseInt(document.getElementById('temporada').value);
    const episodio = parseInt(document.getElementById('episodio').value);
    const maxTemporadas = parseInt(document.getElementById('temporada').getAttribute('max'));

    // Verificar se a temporada está dentro do intervalo permitido
    if (temporada < 1 || temporada > maxTemporadas) {
        alert(`Por favor, insira uma temporada válida (1-${maxTemporadas})`);
        return;
    }

    const url = `https://ultraembed.com/serie/${imdbID}/${temporada}/${episodio}`;
    window.location.href = url;
});

// Função para lidar com o clique no botão "Cancelar" do modal
document.getElementById('serieModal').querySelector('.btn-close').addEventListener('click', function() {
    $('#serieModal').modal('hide');
});
document.getElementById('serieModal').querySelector('.btn-secondary').addEventListener('click', function() {
    $('#serieModal').modal('hide');
});

// Função para mostrar opções de compartilhamento
document.querySelector('.btn-compartilhar').addEventListener('click', function() {
    const opcoesCompartilhar = document.querySelector('.btn-compartilhar-opcoes');
    opcoesCompartilhar.style.display = (opcoesCompartilhar.style.display === 'none') ? 'block' : 'none';
});

// Funções para compartilhar em diferentes plataformas
document.querySelector('.btn-compartilhar-whatsapp').addEventListener('click', function() {
    const mensagem = "Olha só esse site de assistir filmes! (LINK_DO_SEU_SITE), corre lá!";
    const urlEncodedMensagem = encodeURIComponent(mensagem);
    const urlBase = "https://wa.me/?text=";

    window.location.href = urlBase + urlEncodedMensagem;
});

document.querySelector('.btn-compartilhar-telegram').addEventListener('click', function() {
    const mensagem = "Olha só esse site de assistir filmes! (LINK_DO_SEU_SITE), corre lá!";
    const urlEncodedMensagem = encodeURIComponent(mensagem);
    const urlBase = "https://t.me/share/url?url=LINK_DO_SEU_SITE&text=";

    window.location.href = urlBase + urlEncodedMensagem;
});

document.querySelector('.btn-compartilhar-facebook').addEventListener('click', function() {
    const mensagem = "Olha só esse site de assistir filmes! (LINK_DO_SEU_SITE), corre lá!";
    const urlEncodedMensagem = encodeURIComponent(mensagem);
    const urlBase = "https://www.facebook.com/sharer/sharer.php?u=LINK_DO_SEU_SITE";

    window.location.href = urlBase + urlEncodedMensagem;
});

document.querySelector('.btn-compartilhar-twitter').addEventListener('click', function() {
    const mensagem = "Olha só esse site de assistir filmes! (LINK_DO_SEU_SITE), corre lá!";
    const urlEncodedMensagem = encodeURIComponent(mensagem);
    const urlBase = "https://twitter.com/intent/tweet?text=";

    window.location.href = urlBase + urlEncodedMensagem;
});

// Função para enviar um e-mail para relatar um bug
document.querySelector('.btn-relatar-bug').addEventListener('click', function() {
    const email = "mailto:mateusmonteito57@gmail.com?subject=Bug%20no%20site%20de%20filmes%20CineMagic";
    window.location.href = email;
});

// Função para lidar com a pesquisa de filmes ou séries
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const input = document.querySelector("#nome_filme");
    const container = document.querySelector("#filmes-container");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        document.getElementById("loading").style.display = "block"; // Mostrar tela de carregamento
        const query = input.value.trim();
        if (query) {
            fetchFilmes(query);
        }
    });

    function fetchFilmes(query) {
        fetch(`/buscar-filme?nome_filme=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Adicione este log
                displayFilmes(data);
                document.getElementById("loading").style.display = "none"; // Ocultar tela de carregamento
            })
            .catch(error => {
                console.error("Erro ao buscar filmes:", error);
                document.getElementById("loading").style.display = "none"; // Ocultar tela de carregamento
            });
    }

    function displayFilmes(filmes) {
        container.innerHTML = "";
        if (filmes.length === 0) {
            container.innerHTML = "<p>Filme não encontrado</p>";
        } else {
            filmes.forEach(filme => {
                const card = document.createElement("div");
                card.className = "col-6 col-md-4 mb-3";

                card.innerHTML = `
                    <div class="card">
                        <img src="${filme.Poster}" class="card-img-top" alt="Poster do filme ${filme.Title}">
                        <div class="card-body">
                            <h5 class="card-title">${filme.Title}</h5>
                            <p class="card-text"><strong>Ano:</strong> ${filme.Year}</p>
                            <p class="card-text"><strong>Gênero:</strong> ${filme.Genre}</p>
                            <p class="card-text"><strong>Resumo:</strong> ${filme.Plot}</p>
                            <p class="card-text"><strong>Diretor:</strong> ${filme.Director}</p>
                            <p class="card-text"><strong>Elenco:</strong> ${filme.Actors}</p>
                            <p class="card-text"><strong>Duração:</strong> ${filme.Runtime}</p>
                            <p class="card-text"><strong>Idioma:</strong> ${filme.Language}</p>
                            <p class="card-text"><strong>País:</strong> ${filme.Country}</p>
                            <p class="card-text"><strong>Nota no IMDb:</strong> ⭐ ${filme.imdbRating}/10</p>
                            ${filme.Type === "series" ? 
                              `<button class="btn btn-primary assistir-serie" data-imdbid="${filme.imdbID}">Assistir</button>` : 
                              filme.link_ultraembed ? 
                              `<a href="https://ultraembed.com/filme/${filme.imdbID}" class="btn btn-primary">Assistir</a>` : 
                              `<p class="text-danger">Não disponível no ultraembed</p>`}
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        }
    }

    document.getElementById('next-page').addEventListener('click', function(event) {
        event.preventDefault();
        let currentPage = parseInt(document.getElementById('current-page').value);
        window.location.href = `/?page=${currentPage + 1}`;
    });

    document.getElementById('prev-page').addEventListener('click', function(event) {
        event.preventDefault();
        let currentPage = parseInt(document.getElementById('current-page').value);
        if (currentPage > 1) {
            window.location.href = `/?page=${currentPage - 1}`;
        }
    });
});

document.querySelector("form").addEventListener("submit", function(event) {
    document.getElementById("loading").style.display = "block";
});

// Função para mostrar opções de compartilhamento
document.getElementById('butaoCompartilhar').addEventListener('click', function() {
    const mensagem = "Veja só esse site de filmes (LINK_DO_SITE)";
    if (navigator.share) {
        navigator.share({
            title: 'CineMagic',
            text: mensagem,
            url: window.location.href
        }).then(() => {
            console.log('Compartilhamento bem-sucedido');
        }).catch((error) => {
            console.log('Erro ao compartilhar:', error);
        });
    } else {
        alert('Desculpe, seu navegador não suporta o compartilhamento.');
    }
});