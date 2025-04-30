const biblioteca = {
    livros: [],

    //metodo p cadastrar um livro na biblioteca
    cadastrarLivro(livros){
        this.livros.push(livros)//add o livro no array
    },

    listarLivros(){
        return this.livros// retorna o array com livros
    },

    buscarLivro(titulo){
        const encontrado = this.livros.find(livros => livros.titulo === titulo)//find encontra strings
        if(encontrado){
            return encontrado;
        }else{
            return "Livro não encontrado"
        }

    },

    removerLivro(titulo){
        const index = this.livros.findIndex(livros => livros.titulo === titulo)//findIndex encontra numeros

        //se o index for diferente de -1, significa que o livro foi encontrado
        if(!index !== -1){
            this.livros.splice(index, 1)//remove o livro do array
            return "Livro removido com sucesso"
        }else{
            return "Livro não encontrado"
        }
    },

    atualizarLivro(titulo, novasInfo){
        const encontrado = this.livros.find(livros => livros.titulo === titulo)

        if(encontrado){
            Object.assign(encontrado, novasInfo);
            return "Livro atualizado com sucesso"
        }else{
            return "Livro não encontrado"
        }
    },

    contarLivro(){
        return this.livros.length
    },
}

biblioteca.cadastrarLivro({
    titulo: "Harry Potter",
    autor: "J.K. Rowling",
    ano: 2000
})

console.log(biblioteca.listarLivros());
console.log(biblioteca.buscarLivro());