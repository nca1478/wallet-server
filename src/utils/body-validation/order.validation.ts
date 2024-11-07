export class OrderValidation {
  public static validateCreateOrder(args: any) {
    return new Promise((resolve, reject) => {
      if (!args) {
        reject("Datos de la orden son requeridos");
      }

      if (!args.dni) {
        reject("El dni es requerido");
      }

      if (!args.cellular) {
        reject("El cellular es requerido");
      }

      if (!args.value && !args.amount) {
        reject("El monto o valor de la orden es requerido");
      }

      resolve(args);
    });
  }

  public static validateConfirmOrder(args: any) {
    return new Promise((resolve, reject) => {
      if (!args) {
        reject("Datos de confirmación son requeridos");
      }

      if (!args.sessionId) {
        reject("El sessionId es requerido");
      }

      if (!args.tokenConfirm) {
        reject("El token es requerido");
      }

      resolve(args);
    });
  }
}
