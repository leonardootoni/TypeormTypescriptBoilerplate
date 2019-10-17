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
import AbstractEntity from './AbstractEntity';
var Blocked;
(function (Blocked) {
    Blocked["true"] = "true";
    Blocked["false"] = "false";
})(Blocked || (Blocked = {}));
let Group = class Group extends AbstractEntity {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Group.prototype, "id", void 0);
__decorate([
    Column({ length: 50, unique: true }),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    Column({ type: 'enum', enum: Blocked, default: Blocked.false }),
    __metadata("design:type", Boolean)
], Group.prototype, "blocked", void 0);
Group = __decorate([
    Entity({ name: 'groups' })
], Group);
export default Group;
//# sourceMappingURL=Group.js.map