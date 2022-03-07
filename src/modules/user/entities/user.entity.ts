import { Logger } from "@nestjs/common";
import { compare, hash } from "bcrypt";
import { Exclude } from "class-transformer";
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    @Exclude()
    password: string;

    @Exclude({toPlainOnly: false})
    private tempPassword: string;

    async comparePassword(plainPassword: string): Promise<boolean> {
        return compare(plainPassword, this.password);
    }

    @AfterLoad()
    private loadTempPassword(): void {
        Logger.log('load: ' + this.password  );

        this.tempPassword = this.password;
    }

    @BeforeInsert()
    @BeforeUpdate()
    private async hashPassword(): Promise<void> {
        Logger.log('hashPassword: ' + this.password + ' ' + this.tempPassword);

        if (this.tempPassword === this.password) {
            return;
        }

        this.password = await hash(this.password, 10);
    }

}
