export class WalletValidation {
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
