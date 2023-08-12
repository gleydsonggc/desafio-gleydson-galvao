const Erros = Object.freeze({
    NAO_HA_ITENS_CARRINHO: 'Não há itens no carrinho de compra!',
    FORMA_PAGAMENTO_INVALIDA: 'Forma de pagamento inválida!',
    ITEM_INVALIDO: 'Item inválido!',
    QUANTIDADE_INVALIDA: 'Quantidade inválida!',
    ITEM_EXTRA_SEM_PRINCIPAL: 'Item extra não pode ser pedido sem o principal'
});

class CaixaDaLanchonete {
    cardapio = new Map();
    metodosPagamento = new Map();

    constructor() {
        this.cardapio.set('cafe', 3.00);
        this.cardapio.set('chantily', 1.50);
        this.cardapio.set('suco', 6.20);
        this.cardapio.set('sanduiche', 6.50);
        this.cardapio.set('queijo', 2.00);
        this.cardapio.set('salgado', 7.25);
        this.cardapio.set('combo1', 9.50);
        this.cardapio.set('combo2', 7.50);

        this.metodosPagamento.set('dinheiro', 0.95);
        this.metodosPagamento.set('debito', 1.00);
        this.metodosPagamento.set('credito', 1.03);
    }   

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!itens || itens.length < 1) return Erros.NAO_HA_ITENS_CARRINHO;
        if (!this.metodosPagamento.has(metodoDePagamento)) return Erros.FORMA_PAGAMENTO_INVALIDA;

        let temCafe = false;
        let temSanduiche = false;
        let soma = 0;
        for (const item of itens) {
            let [codigo, quantidade] = item.replace(/ /g, '').split(',');
            quantidade = parseInt(quantidade);
            
            if (!this.cardapio.has(codigo)) return Erros.ITEM_INVALIDO;
            if (quantidade < 1) return Erros.QUANTIDADE_INVALIDA;
            
            if (codigo === 'cafe') temCafe = true;
            if (codigo === 'sanduiche') temSanduiche = true;
            if ((codigo === 'chantily' && !temCafe)
                || (codigo === 'queijo' && !temSanduiche)) return Erros.ITEM_EXTRA_SEM_PRINCIPAL;
            
            const preco = this.cardapio.get(codigo);
            soma += quantidade * preco;
        }

        const taxa = this.metodosPagamento.get(metodoDePagamento);
        soma *= taxa;

        return `R$ ${soma.toFixed(2)}`.replace('.',',');
    }

}

export { CaixaDaLanchonete };
