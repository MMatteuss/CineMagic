# CineMagic

CineMagic é uma aplicação web desenvolvida para facilitar a busca e visualização de filmes e séries. O projeto utiliza **Python**, **JavaScript**, **HTML**, e **CSS**, integrando diferentes tecnologias para criar uma interface amigável e funcional.

## Funcionalidades

### Principais Recursos
- **Pesquisa de Filmes e Séries**: Busca baseada em palavras-chave, exibindo informações detalhadas sobre os resultados.
- **Assistir Séries**: Seleção de temporadas e episódios, com redirecionamento para o player correspondente.
- **Compartilhamento**: Botões para compartilhar o site em redes sociais como WhatsApp, Telegram, Facebook e Twitter.
- **Relatar Bugs**: Opção de envio de e-mail para relatar problemas.

### Outras Funcionalidades
- Sistema de paginação para navegar entre os resultados de busca.
- Modal interativo para seleção de temporadas e episódios.
- Tela de carregamento ao realizar buscas.

## Tecnologias Utilizadas

### Frontend
- **HTML5** e **CSS3**: Estrutura e estilo da aplicação.
- **Bootstrap**: Para responsividade e estilização.
- **JavaScript**: Gerenciamento de interações dinâmicas e manipulação do DOM.

### Backend
- **Python**: Implementação de endpoints e lógica do servidor.
- **Flask**: Framework utilizado para gerenciar as rotas e comunicação com o cliente.

## Como Executar o Projeto

### Pré-requisitos
- Python 3.x instalado na máquina.
- Gerenciador de pacotes pip.

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/cinemagic.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd cinemagic
   ```
3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
4. Inicie o servidor local:
   ```bash
   python app.py
   ```
5. Abra o navegador e acesse:
   ```
   http://127.0.0.1:5000/
   ```

## Estrutura do Projeto

```
CineMagic/
│
├── static/
│   ├── css/          # Arquivos de estilo
│   ├── js/           # Scripts JavaScript
│   ├── images/       # Imagens e ícones
│
├── templates/        # Arquivos HTML
│
├── app.py            # Arquivo principal da aplicação
├── requirements.txt  # Dependências do projeto
└── README.md         # Documentação do projeto
```

## Funcionalidades Detalhadas

### Busca de Filmes e Séries
A funcionalidade principal permite pesquisar filmes e séries com base em palavras-chave. Utiliza uma API externa para obter informações detalhadas, como:
- Poster
- Ano
- Gênero
- Resumo
- Diretor
- Elenco
- Nota IMDb

### Modal de Temporadas
Para séries, o modal interativo permite ao usuário escolher a temporada e o episódio, validando os valores antes de redirecionar ao player correspondente.

### Compartilhamento
Inclui botões para compartilhar diretamente nas redes sociais ou via API de compartilhamento nativa do navegador.

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias e correções.

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

---

**Desenvolvedor:** Mateus Araujo Monteiro  
Entre em contato: [mateusmonteiro57@gmail.com](mailto:mateusmonteiro57@gmail.com)

**GitHub:** [MMatteuss](https://github.com/MMatteuss)
