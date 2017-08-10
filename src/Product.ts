// tslint:disable:variable-name
import { Table, Column, Model, DataType, NotNull, AllowNull } from "sequelize-typescript";
import { IProductExport } from "./interfaces";

@Table({
  tableName: "ProductData",
  freezeTableName: true,
  timestamps : false,
})
export class Product<T> extends Model<T> implements IProductExport {
  @NotNull
  @Column(DataType.INTEGER)
  public id: number;

  @NotNull
  @Column(DataType.DECIMAL(20, 10))
  public price: number;

  @NotNull
  @Column(DataType.STRING)
  public name: string;

  @AllowNull
  @Column(DataType.STRING)
  public description: string;

  @NotNull
  @Column(DataType.STRING)
  public imageUrl: string;
}
