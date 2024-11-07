export class UserValidation {
  public static validate(args: any) {
    return new Promise((resolve, reject) => {
      if (!args) {
        reject("Datos del usuario/cliente son requeridos");
      }

      if (!args.name) {
        reject("El nombre es requerido");
      }

      if (!args.email) {
        reject("El email es requerido");
      }

      if (!args.password) {
        reject("El password es requerido");
      }

      if (!args.cellular) {
        reject("El cellular es requerido");
      }

      if (!args.dni) {
        reject("El dni es requerido");
      }

      resolve(args);
    });
  }
}
