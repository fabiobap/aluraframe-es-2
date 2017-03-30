class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        let self = this;
        this._listaNegociacoes = ProxyFactory.create(
            new ListaNegociacoes(),
        ['adiciona', 'esvazia'], model => 
                                 this._negociacoesView.update(model));

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);
        
        this._mensagem = ProxyFactory.create(
        new Mensagem(), ['texto'], model =>
        this._mensagemView.update(model));
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);

    }
    
    adiciona(event) {

        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = "Negociação concluída com sucesso!";
        this._limparFormulario();
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

    _limparFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();

    }
}