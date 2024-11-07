export class OrderValidation {
  public static validateCreateOrder(args: any) {
    try {
      if (!args) {
        throw new Error("Datos de la orden son requeridos");
      }

      if (!args.dni) {
        throw new Error("El dni es requerido");
      }

      if (!args.cellular) {
        throw new Error("El cellular es requerido");
      }

      if (!args.value && !args.amount) {
        throw new Error("El monto o valor de la orden es requerido");
      }
    } catch (error) {
      throw error;
    }
  }

  public static validateConfirmOrder(args: any) {
    try {
      if (!args) {
        throw new Error("Datos de confirmación son requeridos");
      }

      if (!args.sessionId) {
        throw new Error("El sessionId es requerido");
      }

      if (!args.tokenConfirm) {
        throw new Error("El token es requerido");
      }
    } catch (error) {
      throw error;
    }
  }
}
