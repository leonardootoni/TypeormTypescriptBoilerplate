var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import AbstractEntity from './AbstractEntity';
var Blocked;
(function (Blocked) {
    Blocked["true"] = "true";
    Blocked["false"] = "false";
})(Blocked || (Blocked = {}));
let User = class User extends AbstractEntity {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Length(1, 50),
    Column(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    IsEmail(),
    Length(1, 50),
    Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Length(40, 150),
    Column(),
    __metadata("design:type", String)
], User.prototype, "hash", void 0);
__decorate([
    Column({ type: 'enum', enum: Blocked, default: Blocked.false }),
    __metadata("design:type", Boolean)
], User.prototype, "blocked", void 0);
__decorate([
    Column({ name: 'login_attempts', type: 'integer' }),
    __metadata("design:type", Number)
], User.prototype, "attempts", void 0);
__decorate([
    Column({ name: 'last_login_attempt', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "lastLoginAttempt", void 0);
User = __decorate([
    Entity({ name: 'users' })
], User);
export default User;
//# sourceMappingURL=User.js.map