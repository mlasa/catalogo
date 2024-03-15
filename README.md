Esse projeto está sendo desenvolvido com HTML, CSS, JavaScript e JQuery. Eu poderia não estar usando JQuery, mas é uma ferramenta que agiliza o desenvolvimento pois possui muitas funções úteis para pequenas manipulações na tela. Funções estas, que se fossem feitas somente com JavaScript, provavelmente demoraria um tempo considerável extra.
E outro ponto, é que eu uso JQuery no meu trabalho e eu pensei em dar uma aquecida nessa habilidade também!

## Enfrentando problemas de código

### 1 - Não pude adicionar funcoes ao evento onclick dos elementos html do template
Precisei usar o JQuery para escutar o evento de click.

### 2 - Sumiço de eventos
Eu tenho uma listagem de items em uma tela, e para não mostrar muitos items de uma só vez, existe a possibilidade de clicar em um botão "ver mais" e carregar o restante. Esses items meus, deveriam ter uma funcionalidade, pois isso foi atribuído no evento onclick. Só que eu descobri, que os elementos que eram carregados depois do carregamento inicial não possuiam essa atribuição. 
Então descobri que eu poderia atribuir o click ao elemento pai que agrupava todos os items, porque ele sempre existe em tela, então sempre tera a função atribuída. E podemos delegar esse click para elementos-filho(mesmo que não diretos, ou elementos-neto kk) dentro do elemento-pai, mesmo que esses elementos-filhos sejam adicionados posteriormente, e isso resolveu o meu problema!