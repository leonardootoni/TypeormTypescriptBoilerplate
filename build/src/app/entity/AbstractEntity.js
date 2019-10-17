var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { VersionColumn, BeforeInsert, BeforeUpdate, UpdateDateColumn, Column } from 'typeorm';
import { validateOrReject } from 'class-validator';
export default class AbstractEntity {
    beforeInsert() {
        // Workaround to solve a bug from 0.2.19 version
        this.createdAt = new Date();
    }
    async validateEntity() {
        await validateOrReject(this);
    }
}
__decorate([
    Column({ name: 'created_at', type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], AbstractEntity.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ name: 'updated_at' }),
    __metadata("design:type", Date)
], AbstractEntity.prototype, "updatedAt", void 0);
__decorate([
    VersionColumn(),
    __metadata("design:type", Number)
], AbstractEntity.prototype, "version", void 0);
__decorate([
    BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AbstractEntity.prototype, "beforeInsert", null);
__decorate([
    BeforeInsert(),
    BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AbstractEntity.prototype, "validateEntity", null);
//# sourceMappingURL=AbstractEntity.js.map