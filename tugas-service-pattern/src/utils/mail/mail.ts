import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { ZOHO_MAIL_USER, ZOHO_MAIL_PASS } from "../env";

const transporter = nodemailer.createTransport({
    service: "Zoho",
    host: "smtp.zoho.com",
    port: 465,
    auth: {
        user: ZOHO_MAIL_USER,
        pass: ZOHO_MAIL_PASS
    },
    requireTLS: true,
});

const send = async ({
    to,
    subject,
    content
}: {
    to: string | string[];
    subject: string;
    content: string;
}) => {
    const result = await transporter.sendMail({
        from: ZOHO_MAIL_USER,
        to,
        subject,
        html: content,
    });
    
    console.log("Successfully send email to: ", to);
    return result;
};

const render = async (template: string, data: any) => {
    const content = await ejs.renderFile(
        path.join(__dirname, `templates/${template}`),
        data
    );

    return content as string;
};

export default {
    send, render
};