import { VersionColumn, BeforeInsert, BeforeUpdate, UpdateDateColumn, Column } from 'typeorm';
import { validateOrReject } from 'class-validator';

export default abstract class AbstractEntity {
  @Column({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @VersionColumn()
  private version!: number;

  @BeforeInsert()
  private beforeInsert(): void {
    // Workaround to solve a bug from 0.2.19 version
    this.createdAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async validateEntity(): Promise<void> {
    await validateOrReject(this);
  }
}
