export class WalletValidation {
  public static validateRecharge(args: any) {
    return new Promise((resolve, reject) => {
      if (!args) {
        reject("Datos de recarga son requeridos");
      }

      if (!args.dni) {
        reject("El dni es requerido");
      }

      if (!args.cellular) {
        reject("El cellular es requerido");
      }

      if (!args.value) {
        reject("El valor de la recarga es requerido");
      }

      resolve(args);
    });
  }

  public static validate(args: any) {
    return new Promise((resolve, reject) => {
      if (!args) {
        reject("Datos del wallet son requeridos");
      }

      if (!args.dni) {
        reject("El dni es requerido");
      }

      if (!args.cellular) {
        reject("El cellular es requerido");
      }

      resolve(args);
    });
  }
}
