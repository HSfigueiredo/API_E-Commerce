create database dindin;

create table usuarios (
	id serial primary key,
	nome text not null,
  email text unique not null,
  senha text not null
);

create table categorias (
	id serial primary key,
  descricao text
);

create table transacoes(
	id serial primary key,
  descricao text,
  valor integer,
  data date,
  categoria_id integer references categorias(id),
  usuario_id integer references usuarios(id),
  tipo text
);

insert into categorias (descricao) values ('Alimentação');
insert into categorias (descricao) values ('Assinaturas e Serviços');
insert into categorias (descricao) values ('Casa');
insert into categorias (descricao) values ('Mercado');
insert into categorias (descricao) values ('Cuidados Pessoais');
insert into categorias (descricao) values ('Educação');
insert into categorias (descricao) values ('Família');
insert into categorias (descricao) values ('Lazer');
insert into categorias (descricao) values ('Pets');
insert into categorias (descricao) values ('Presentes');
insert into categorias (descricao) values ('Roupas');
insert into categorias (descricao) values ('Saúde');
insert into categorias (descricao) values ('Transporte');
insert into categorias (descricao) values ('Salário');
insert into categorias (descricao) values ('Vendas');
insert into categorias (descricao) values ('Outras receitas');
insert into categorias (descricao) values ('Outras despesas');



