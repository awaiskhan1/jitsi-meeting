import nodemailer from "nodemailer";

export const nodeMailerTransport = (): nodemailer.Transporter<any> => {
  const dummy = {
    password:"dopb hsve krwn amwx",
    email: "a.khan@nexum-ai.com"
  }
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        auth: {
          user: process.env.NEXT_PRIVATE_EMAIL ?? dummy.email,
          pass: process.env.NEXT_PRIVATE_PASSWORD ?? dummy.password,
        },
    });

    return transporter;
}