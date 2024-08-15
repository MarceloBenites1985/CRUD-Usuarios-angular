# Projeto CRUD de Cadastro de Usuários com Angular 17 e Firebase

---

## Sumário

1. [Introdução](#Introdução)
2. [Configuração Inicial](#Configuração-Inicial)
3. [Instalação de Dependências](#Instalação-de-Dependências)
4. [Estrutura do Projeto](#Estrutura-do-Projeto)
5. [Configuração do Firebase](#Configuração-do-Firebase)
6. [Componentes e Serviços](#Componentes-e-Serviços)
    - [Serviço de Usuários (`users.service.ts`)](#Serviço-de-Usuários (`users.service.ts`))
    - [Componentes do Material Angular](#Componentes-do-Material-Angula)
7. [Scaffolding do Projeto](#Scaffolding-do-Projeto)
8. [Funcionalidades do CRUD](#Funcionalidades-do-CRUD)
    - [Cadastrar Usuário](#Cadastrar-Usuário)
    - [Adicionar Usuário](#Adicionar-Usuário)
    - [Editar Usuário](#Editar-Usuário)
    - [Deletar Usuário](#Deletar-Usuário)
9. [Conclusão](#Conclusão)

---

## Introdução

Este projeto é um exemplo de aplicação CRUD (Create, Read, Update, Delete) para cadastro de usuários, desenvolvido utilizando Angular 17, Typscript , Firebase e Angular Material . Ele abrange desde a configuração inicial até a implementação das funcionalidades principais, como adição, edição e remoção de usuários.

## Configuração Inicial

### Instalação do Angular CLI

Para ver mais sobre a documentação acesse aqui : https://angular.dev/overview

Antes de começar, é necessário instalar o Angular CLI para criar e gerenciar o projeto Angular. Você pode instalar o Angular CLI usando o seguinte comando:

```bash
bashCopiar código
npm install -g @angular/cli

```

### Criação do Projeto

Crie um novo projeto Angular utilizando o comando:

```bash
bashCopiar código
ng new CRUD-Usuarios-angular

```

Esse comando cria a estrutura básica do projeto Angular. Durante a configuração, escolha adicionar o Angular Routing e selecione a folha de estilo CSS.

### Inicialização do Projeto

Após a criação, navegue até o diretório do projeto e inicie o servidor de desenvolvimento:

```bash
bashCopiar código
cd CRUD-Usuarios-angular
ng serve

```

A aplicação estará disponível em `http://localhost:4200`.

## Instalação de Dependências

### Firebase

Para ver mais sobre a documentação acesse aqui :  https://firebase.google.com/?hl=pt-br

Instale as dependências necessárias para integração com o Firebase:

```bash
bashCopiar código
ng add @angular/fire

```

Siga as instruções para conectar o Firebase ao seu projeto Angular, fornecendo as credenciais do Firebase, como `apiKey`, `authDomain`, `projectId`, etc.

### Angular Material

Adicione o Angular Material ao seu projeto para utilizar os componentes prontos de UI, como tabelas, spinners e filtros:

```bash
bashCopiar código
ng add @angular/material

```

Escolha um tema de sua preferência durante a instalação.

## Estrutura do Projeto

A estrutura básica do projeto inclui as seguintes pastas e arquivos principais:

```bash
bashCopiar código
/src
  /app
    /crud
      /pages
        /home
          home.component.html
          home.component.scss
          home.component.ts
      /services
        users.service.ts
      crud.component.ts
      crud.component.html
    app.module.ts
    app-routing.module.ts
  /assets
    /images
  index.html
  styles.css

```

## Configuração do Firebase

### Inicialização do Firebase no Projeto

No arquivo `app.module.ts`, importe e configure o Firebase da seguinte maneira:

```tsx
typescriptCopiar código
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

No arquivo `environment.ts`, adicione as credenciais do Firebase:

```tsx
typescriptCopiar código
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "API_KEY",
    authDomain: "PROJECT_ID.firebaseapp.com",
    projectId: "PROJECT_ID",
    storageBucket: "PROJECT_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
  }
};

```
## Arquivo dos Modulos ` app.module.ts `

Neste arquivo é o arquivo responsável pelas importações do projeto é aqui que ficas os imports e as declarações do projeto.

```
import { NgModule } from '@angular/core';...

//ANGULAR MATERIAL
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';...



@NgModule({
  declarations: [...],
  imports: [...],
  providers: [...],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

## Componentes e Serviços

### `users.service.ts`

Este serviço é responsável pela comunicação com o Firebase Firestore, onde os dados dos usuários são armazenados. Ele contém métodos para adicionar, editar, remover e obter usuários.

```tsx
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'

import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private dataBaseStore: AngularFirestore) { }

  getAllUsers() {
    return this.dataBaseStore.collection('users', user => user.orderBy('name')).valueChanges({ idField: 'firebaseId' })as Observable<any[]>;
  }

  addUser(user: User){
    return this.dataBaseStore.collection('users').add(user);
  }

  update(userId: string, user:User){
    return this.dataBaseStore.collection('users').doc(userId).update(user);
  }

  deleteUser(userId: string){
    return this.dataBaseStore.collection('users').doc(userId).delete();
  }
}

```

### Componentes do Angular Material

  acesse aqui:  https://material.angular.io/

O projeto utiliza vários componentes do Angular Material, incluindo tabelas, spinners e filtros.

- **Tabela (MatTable)**: A tabela é utilizada para exibir a lista de usuários. Ela permite ordenação, paginação e filtragem.
- **Spinner (MatSpinner)**: Utilizado para indicar o carregamento dos dados.
- **Filtro (MatFormField + MatInput)**: Um campo de entrada utilizado para filtrar os dados da tabela em tempo real.
  
![Captura de tela 2024-08-15 101540](https://github.com/user-attachments/assets/0c0c107f-836b-477f-811a-2a8a8bf9c66a)



### Configuração do `modal-form-user.component`

No arquivo de template, a tabela é configurada da seguinte forma:

```html
<div class="container-fluid p-3">
    <mat-icon class="float-end hover" (click)="closeModal()" >close</mat-icon>

    <h1 class="titulo">Formulário de Usuário</h1>
    <h2 class="subtitulo">Preencha o formulário para salvar o usuário</h2>

    <form class="row" [formGroup]="formUser">
        <div class="col-12 col-md-6 mb-2" >
                <mat-form-field class="example-full-width w-100">
                    <mat-label>Nome</mat-label>
                    <input type="text" matInput formControlName="name" placeholder="Digite o nome">
                    @if (formUser.controls['name'].invalid) {
                    <mat-error>Por Favor digite um nome valido</mat-error>
                    }
                    
                </mat-form-field>
        </div>        
        <div class="col-12 col-md-6 mb-2" >    
                <mat-form-field class="example-full-width w-100">
                    <mat-label>E-mail</mat-label>
                    <input type="email" matInput formControlName="email" placeholder="Digite o e-mail">
                    @if (formUser.controls['email'].invalid) {
                    <mat-error>Por Favor digite um e-mail valido</mat-error>
                    }
                    
                </mat-form-field>
        </div>
        <div class="col-12 col-md-6 mb-2" >
            <mat-form-field class="example-full-width w-100">
                <mat-label>Setor</mat-label>
                <input type="text" matInput formControlName="sector" placeholder="Digite o setor">
                @if (formUser.controls['sector'].invalid) {
                <mat-error>Por Favor digite um nome valido</mat-error>
                }
                
            </mat-form-field>
        </div>    
        <div class="col-12 col-md-6 mb-2" >
            <mat-form-field class="example-full-width w-100">
                <mat-label>Cargo</mat-label>
                <input type="text" matInput formControlName="role" placeholder="Digite o Cargo">
                @if (formUser.controls['role'].invalid) {
                <mat-error>Por Favor digite um cargo valido</mat-error>
                }
                
            </mat-form-field>
    </div>
    <div class="col-12 col-md-6 mb-2">
            <mat-form-field class="w-100">
                <mat-label><mat-icon>favorite</mat-icon> Plano de Saúde</mat-label>
                <mat-select formControlName="healthPlan">
                @for (plano of planosSaude; track plano) {
                    <mat-option [value]="plano.descricao">{{plano.descricao}}</mat-option>
                }
                </mat-select>
            </mat-form-field>
    </div>  

    <div class="col-12 col-md-6 mb-2">
        <mat-form-field class="w-100">
            <mat-label> <mat-icon>favorite</mat-icon> Plano Odontológico </mat-label>
            <mat-select formControlName="dentalPlan">
                <mat-option *ngFor="let planoOdonto of  planosOdonto" [value]="planoOdonto.descricao">{{planoOdonto.descricao}}</mat-option>
            </mat-select>
        </mat-form-field>
    </div>

    <div class="col-12">
        <button class="botao-primario float-end" [disabled]="!formUser.valid" (click)="saveUser()">Salvar usuario</button>
    </div>
    </form>
</div>    

```

### Configuração do `MatProgressSpinnerModule`

O `MatProgressSpinnerModule` é utilizado durante o carregamento dos dados:

![Captura de tela 2024-08-15 101621](https://github.com/user-attachments/assets/b083e136-25b3-4395-8783-21d3f46e3c55)


```codico do file app.module.ts

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

```


```html
htmlCopiar código
<div class="col-4">
		<mat-progress-spinner class="example-margin mx-auto color-spinner" mode="determinate" value="80"></mat-progress-spinner>
		 <p class="info-spinner">4/5</p>
 </div>

```
```para mudar de cor
.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle, .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{
    stroke: var(--primary-color) !important;
}

```

## Scaffolding do Projeto

Para organizar o código, você pode utilizar o Angular CLI para gerar os componentes, serviços e módulos:

- **Gerar Componente**: `ng generate component crud/pages/home`
- **Gerar Serviço**: `ng g c crud/services/users`

Essa estrutura garante a modularidade e facilita a manutenção do código.

## Funcionalidades do CRUD

### Cadastrar Usuário

No componente de formulário de usuário, implemente o método para cadastrar usuário:

```tsx
typescriptCopiar código
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'

import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private dataBaseStore: AngularFirestore) { }

  getAllUsers() {
    return this.dataBaseStore.collection('users', user => user.orderBy('name')).valueChanges({ idFild: 'firebaseId' })as Observable<any[]>;
  }

```

### Adicionar Usuário

No componente de formulário de usuário, implemente o método para adicionar um novo usuário:

```tsx
typescriptCopiar código
addUser(user: User){
    return this.dataBaseStore.collection('users').add(user);
  }

```

### Editar Usuário

Para editar um usuário existente, recupere os dados no formulário e chame o método `update`:

```tsx
typescriptCopiar código
 update(userId: string, user:User){
    return this.dataBaseStore.collection('users').doc(userId).update(user);
  }

```

### Deletar Usuário

Para deletar um usuário, utilize o método `deleteUser`:

```tsx
typescriptCopiar código
deleteUser(userId: string){
    return this.dataBaseStore.collection('users').doc(userId).delete();
  }
}  

```

## Conclusão

Este projeto CRUD em Angular 17, integrado com Firebase e utilizando Angular Material, fornece uma base sólida para aplicações web que necessitam de operações básicas de gerenciamento de dados. Com uma estrutura modular e o uso de boas práticas, como serviços e componentes reutilizáveis, ele pode ser expandido e adaptado conforme necessário.

Essa documentação deve servir como um guia completo para a implementação, manutenção e expansão do projeto. Caso haja alguma dúvida ou necessidade de ajustes, fique à vontade para solicitar.

---

Espero que esta documentação atenda às suas necessidades. Se precisar de mais alguma informação ou ajuda, estou aqui para ajudar!
