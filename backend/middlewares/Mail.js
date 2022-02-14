const nodemailer = require('nodemailer');

const createTransport = () => {
    const transport = nodemailer.createTransport({
        host: 'pro2.mail.ovh.net',
        port: 587,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASS
        }
    })
    return transport;
}

module.exports = async function sendMail(id, name, email, pass, role){
    const html = `<!DOCTYPE html><html lang="es"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Email</title> <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet"> <style>*{padding: 0; margin: 0;}*, *::after, *::before{box-sizing: border-box; font-family: 'IBM Plex Sans Thai Looped', sans-serif;}</style></head><body> <table style='width: 600px; margin: 0 auto;'> <tr> <td style='background-color: rgb(2, 9, 110); text-align: center; padding: 1.5rem;'> <p style='color: #fff; font-size: 1.8rem; text-transform: uppercase; font-weight: 500;'>Avistadrone</p></td></tr><tr> <td style='text-align: center;'> <h3 style='font-weight: 500; margin-top: 2rem; font-size: 1.4rem;'>Cuenta Creada Satisfactoriamente !</h3> <div style='background-color: rgba(202, 202, 202, 0.192); margin-top: 2rem; padding: 1.5rem 0;'> <div style='width: 60%; margin: 0 auto; text-align: left; font-weight: 500;'> <p style='font-size: 1.2rem; text-align: center;'>Datos del Administrador</p><p style='margin: .5rem 0;'><span style='background-color: rgba(189, 189, 189, 0.288); padding: .2rem .8rem; border-radius: .3rem; margin-right: .6rem; font-size: .9rem;'>Nombre:</span>${name}</p><p style='margin: .5rem 0;'><span style='background-color: rgba(189, 189, 189, 0.288); padding: .2rem .8rem; border-radius: .3rem; margin-right: .6rem; font-size: .9rem;'>Contraseña:</span>${pass}</p><p style='margin: .5rem 0;'><span style='background-color: rgba(189, 189, 189, 0.288); padding: .2rem .8rem; border-radius: .3rem; margin-right: .6rem; font-size: .9rem;'>Role:</span>${role}</p></div></div></td></tr><tr> <td style='text-align: center; padding: 3rem 0;'> <a href='http://localhost:3000/verify/${id}' style='background-color: rgb(2, 9, 110); color: white; font-size: 1.2rem; border-radius: .3rem; text-decoration: none; padding: .5rem 1rem; box-shadow: 0px 0px 13px 4px rgba(109, 109, 109, 0.445);'>Verificar Cuenta</a> </td></tr><tr> <td style='padding: 1rem; background-color: rgba(202, 202, 202, 0.192);'> <p style='text-align: center; font-size: 1rem;'>Te han registrado correctamente en el Panel de Administración de Avistradrones. Recuerda que tienes que verificar la cuenta con este email, sino, no podrás acceder.</p></td></tr><tr> <td style='text-align: center; padding-top: 2rem;'> <a style='font-size: 1.2rem; font-weight: 600;'>www.pipok.es</a> </td></tr></table></body></html>`;
    const transporter = createTransport();
    const info = await transporter.sendMail({
        from: 'info@realrobertojr.es',
        to: email,
        subject: 'Código Login AdminPanel',
        html: html
    })
    console.log('Mail del Código de Login Enviado: ' + info.messageId);
    return
}