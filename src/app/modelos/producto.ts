export class Producto {
  _id!: ID;
  producto!: String;
  usuario!:string;
  numero_serie!:string;
  fecha_registro!: string;
  estado!:string;
}

export class ID{
  $oid!:string;
}
