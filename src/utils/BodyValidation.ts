export class BodyValidation {
  public static validateUser(args: any) {
    try {
      if (!args) {
        throw new Error("Datos del usuario/cliente son requeridos");
      }

      if (!args.name) {
        throw new Error("El nombre es requerido");
      }

      if (!args.email) {
        throw new Error("El email es requerido");
      }

      if (!args.password) {
        throw new Error("El password es requerido");
      }

      if (!args.cellular) {
        throw new Error("El cellular es requerido");
      }

      if (!args.dni) {
        throw new Error("El dni es requerido");
      }
    } catch (error) {
      throw error;
    }
  }

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

  public static validateRechargeWallet(args: any) {
    try {
      if (!args) {
        throw new Error("Datos de recarga son requeridos");
      }

      if (!args.dni) {
        throw new Error("El dni es requerido");
      }

      if (!args.cellular) {
        throw new Error("El cellular es requerido");
      }

      if (!args.value) {
        throw new Error("El valor de la recarga es requerido");
      }
    } catch (error) {
      throw error;
    }
  }

  public static validateWallet(args: any) {
    try {
      if (!args) {
        throw new Error("Datos del wallet son requeridos");
      }

      if (!args.dni) {
        throw new Error("El dni es requerido");
      }

      if (!args.cellular) {
        throw new Error("El cellular es requerido");
      }
    } catch (error) {
      throw error;
    }
  }
}
