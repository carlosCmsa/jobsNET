create table curriculos(
	id int primary key auto_increment,
    nome varchar(100) not null,
    profissão varchar(30) not null,
    data_de_nascimento varchar(10) not null,
    endereco varchar(200) not null,
    telefone_fixo varchar(10) not null,
    telefone_celular varchar(11) not null,
    email varchar(100) not null,
    identidade varchar(9) not null,
    cpf varchar(11) not null,
    estado_civil varchar(50),
    sexo varchar(50),
    possui_veiculo varchar(10),
    possui_habilitacao varchar(10) 
);
