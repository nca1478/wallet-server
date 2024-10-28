export function sendOrderEmail(args: any, urlRedirect: string) {
  const { order, tokenConfirm } = args;
  return `    
		<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Wallet App</title>
      </head>
      <body>
        <div>
          <h1>Confirmar pago de la Orden</h1>
          <p style="font-size: medium;">
            <strong>ID de la Orden:</strong> ${order.id}<br>
            <strong>Monto a Pagar:</strong> ${order.amount} USD.<br>
            <strong>Token para confirmar el pago:</strong> ${tokenConfirm}<br><br>
            <strong>Confirmar Pago:<strong> <a href="${urlRedirect}">aquí</a>
          </p>
        </div>
      </body>
    </html>
	`;
}
