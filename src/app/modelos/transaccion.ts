export class Transaccion {
  id!:string;
  cliente!:string;
  id_cliente!:number;
  tipo!:string;
  fondo!:string;
  id_fondo!:number;
  fecha!:string;
  monto!:number

}

export class TransaccionResponse {
  status!: number;
  message!: string;
  data!: Transaccion;

}
