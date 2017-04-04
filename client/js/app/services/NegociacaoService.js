class NegociacaoService {
    
    constructor(){
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {
            
            this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            })
            .catch(error => {
                console.log(error);
                reject('Não foi possivel importar as negociacoes da semana!');
            });
        });
    }    
    
    obterNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {
            
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/anterior');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                } else {
                    console.log(xhr.responseText);
                    reject('Não foi possivel importar as negociacoes da semana anterior!');
                }
            }
        }
        xhr.send();
        });
    }    
    obterNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {
            
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/retrasada');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                } else {
                    console.log(xhr.responseText);
                    reject('Não foi possivel importar as negociacoes da semana retrasada!');
                }
            }
        }
        xhr.send();
        });
    }
}