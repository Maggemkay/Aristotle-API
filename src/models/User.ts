import {
	BaseEntity,
	Column,
	Entity,
	Index,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn,
	RelationId,
} from 'typeorm';

@Entity('user', { schema: process.env.DB_NAME })
export class User {
	@PrimaryGeneratedColumn('uuid', {
		name: 'Id',
	})
	public id!: string;

	@Column('varchar', {
		nullable: false,
		length: 64,
		name: 'FirstName',
	})
	public firstName: string;

	@Column('varchar', {
		nullable: false,
		length: 64,
		name: 'LastName',
	})
	public lastName: string;

	@Column('varchar', {
		nullable: false,
		length: 64,
		name: 'Username',
	})
	public username: string;

	@Column('varchar', {
		nullable: false,
		length: 256,
		name: 'Email',
	})
	public email: string;

	@Column('varchar', {
		nullable: false,
		length: 64,
		name: 'Password',
	})
	public password: string;

	constructor(
		firstName: string,
		lastName: string,
		username: string,
		email: string,
		password: string
	) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.email = email;
		this.password = password;
	}
}
