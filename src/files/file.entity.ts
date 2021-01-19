import Country from 'src/countries/country.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToOne,
  AfterRemove,
} from 'typeorm';

import { join } from 'path';
import { promises } from 'fs';
import { envConfig } from '../config/env.load';
import * as uploadConfig from '../config/upload.config';

@Entity({ name: 'files' })
class File {
  constructor(hashedName: string) {
    this.hashedName = hashedName;
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  hashedName: string;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  setUrl() {
    if (!this.url) {
      this.url = `${envConfig.api.baseUrl}:${envConfig.api.port}${envConfig.api.prefix}/files/${this.hashedName}`;
    }
  }

  @AfterRemove()
  async removeUploadedImage() {
    const flagImagePath = join(uploadConfig.default.directory, this.hashedName);
    await promises.unlink(flagImagePath);
  }

  @OneToOne(() => Country, (country) => country.file)
  country: Country;
}

export default File;
