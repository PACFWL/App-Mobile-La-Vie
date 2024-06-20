
# La Vie - App Mobile

Aplicativo móvel de um menu digital com entrega ou compra localmente, desenvolvido com React Native e Expo para o PI do 5° Semestre do curso de DSM.

Nele você pode se cadastrar ou fazer login para pedir comida, pesquisar restaurantes por nome ou tipo, adicionar restaurantes à sua lista de favoritos, gerenciar seu pedido, gerenciar suas direções e cartões de crédito/débito, gerenciar seu perfil, fazer upload de uma foto de perfil, entre muitas outras coisas.

## Características

1. **Autenticação**: Os usuários podem se registrar e fazer login.
2. **Encomendar Comida**: Os usuários podem fazer pedidos para qualquer um dos restaurantes que o foodie oferece.
3. **Pesquisar e Filtrar Restaurantes e Comidas**: Os usuários podem filtrar restaurantes e comidas pesquisando o nome ou filtrando por tags.
4. **Restaurantes Favoritos**: Os usuários podem adicionar restaurantes como favoritos para que possam fazer pedidos rapidamente.
5. **Opções de Checkout**: O usuário pode aumentar, diminuir ou excluir itens do pedido e pode escolher a forma de pagamento.
6. **Histórico de pedidos**: Os usuários podem ver seu histórico de pedidos e mais detalhes sobre um pedido específico.
7. **Informações do usuário**: Os usuários podem ver suas informações e editá-las.
8. **Foto Avatar**: Os usuários podem fazer upload de uma foto avatar de sua biblioteca ou com a câmera.
9. **Endereços e Cartões**: Os usuários podem adicionar e gerenciar seus endereços e cartões.

## Instalação do Aplicativo

Para instalar o aplicativo, siga os seguintes passos:

1. Clone o repositório:
   ```bash
   git clone https://github.com/PACFWL/App-Mobile-La-Vie.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd App-Mobile-La-Vie
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

   Caso ocorra algum erro devido a dependências desatualizadas, use o comando:
   ```bash
   npm install --legacy-peer-deps
   ```

4. Execute o aplicativo:
   ```bash
   npx expo start
   ```

   Após executar o comando acima, você verá as seguintes opções:

   ```
   › Metro waiting on exp://10.0.0.107:8081
   › Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
   
   › Using Expo Go
   › Press s │ switch to development build
   
   › Press a │ open Android
   › Press w │ open web
   
   › Press j │ open debugger
   › Press r │ reload app
   › Press m │ toggle menu
   › Press o │ open project code in your editor
   
   › Press ? │ show all commands
   ```

Escolha a opção que melhor se adequa ao seu ambiente de desenvolvimento.
