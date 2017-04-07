class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagemView = new MensagemView($('#mensagemView'));

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');
        this._ordemAtual = '';

    }

    adiciona(event) {

        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = "Negociação concluída com sucesso!";
        this._limparFormulario();
    }

    importaNegociacoes() {

        let service = new NegociacaoService();

        Promise.all([
            service.obterNegociacoesDaSemana(),
            service.obterNegociacoesDaSemanaAnterior(),
            service.obterNegociacoesDaSemanaRetrasada()
        ]).then(negociacoes => {
            negociacoes.reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociacoes importadas com sucesso!';
        }).catch(error => this._mensagem.texto = error);
        /*        service.obterNegociacoesDaSemana()
                    .then(negociacoes => {
                        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                        this._mensagem.texto = "Negociação da semana obtida com sucesso!";
                    })
                    .catch(erro => this._mensagem.texto = erro);

                service.obterNegociacoesDaSemanaAnterior()
                    .then(negociacoes => {
                        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                        this._mensagem.texto = "Negociação da semana anterior obtida com sucesso!";
                    })
                    .catch(erro => this._mensagem.texto = erro);

                service.obterNegociacoesDaSemanaRetrasada()
                    .then(negociacoes => {
                        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                        this._mensagem.texto = "Negociação da semana retrasada obtida com sucesso!";
                    })
                    .catch(erro => this._mensagem.texto = erro);*/
    }

    apaga() {

        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Negociação apagadas com sucesso!";
    }
    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value, this._inputValor.value
        );

    }

    ordena(coluna) {
        if (this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }

    _limparFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();

    }
}