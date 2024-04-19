import * as sgMail from '@sendgrid/mail';
import { NextRequest, NextResponse } from 'next/server';
import axios from "axios";


type EmailFormData = {
   name: string;
   email: string;
   description: string;
   screenshotURL: string;
};

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        console.log(body);
        const { name, email, description, screenshotURL } : EmailFormData = body;
        let request = await axios.get(screenshotURL, {responseType: 'arraybuffer'});
        const extension =
        "." + screenshotURL.substring(screenshotURL.lastIndexOf(".") + 1);
        console.log(extension)

        let buffer = Buffer.from(request.data).toString("base64");

        let attachment = [
          {
            content: buffer,
            filename: `Screenshot-${email}`,
            type: extension == '.png' ? 'image/png' : ' image/jpeg',
            disposition: 'attachment'
          }
        ]

        sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

        const msg = {
            to: "vieru.alexandruu@gmail.com",
            from: "vieru.alexandruu@gmail.com",
            subject: `${name} reported a bug`,
            // attachments: attachment,
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
            <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
                <head>
                  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
                  <!--[if !mso]><!-->
                  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
                  <!--<![endif]-->
                  <!--[if (gte mso 9)|(IE)]>
                  <xml>
                    <o:OfficeDocumentSettings>
                      <o:AllowPNG/>
                      <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                  </xml>
                  <![endif]-->
                  <!--[if (gte mso 9)|(IE)]>
              <style type="text/css">
                body {width: 600px;margin: 0 auto;}
                table {border-collapse: collapse;}
                table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
                img {-ms-interpolation-mode: bicubic;}
              </style>
            <![endif]-->
                  <style type="text/css">
                body, p, div {
                  font-family: inherit;
                  font-size: 14px;
                }
                body {
                  color: #000000;
                }
                body a {
                  color: #1188E6;
                  text-decoration: none;
                }
                p { margin: 0; padding: 0; }
                table.wrapper {
                  width:100% !important;
                  table-layout: fixed;
                  -webkit-font-smoothing: antialiased;
                  -webkit-text-size-adjust: 100%;
                  -moz-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
                }
                img.max-width {
                  max-width: 100% !important;
                }
                .column.of-2 {
                  width: 50%;
                }
                .column.of-3 {
                  width: 33.333%;
                }
                .column.of-4 {
                  width: 25%;
                }
                ul ul ul ul  {
                  list-style-type: disc !important;
                }
                ol ol {
                  list-style-type: lower-roman !important;
                }
                ol ol ol {
                  list-style-type: lower-latin !important;
                }
                ol ol ol ol {
                  list-style-type: decimal !important;
                }
                @media screen and (max-width:480px) {
                  .preheader .rightColumnContent,
                  .footer .rightColumnContent {
                    text-align: left !important;
                  }
                  .preheader .rightColumnContent div,
                  .preheader .rightColumnContent span,
                  .footer .rightColumnContent div,
                  .footer .rightColumnContent span {
                    text-align: left !important;
                  }
                  .preheader .rightColumnContent,
                  .preheader .leftColumnContent {
                    font-size: 80% !important;
                    padding: 5px 0;
                  }
                  table.wrapper-mobile {
                    width: 100% !important;
                    table-layout: fixed;
                  }
                  img.max-width {
                    height: auto !important;
                    max-width: 100% !important;
                  }
                  a.bulletproof-button {
                    display: block !important;
                    width: auto !important;
                    font-size: 80%;
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                  }
                  .columns {
                    width: 100% !important;
                  }
                  .column {
                    display: block !important;
                    width: 100% !important;
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                    margin-left: 0 !important;
                    margin-right: 0 !important;
                  }
                  .social-icon-column {
                    display: inline-block !important;
                  }
                }
              </style>
                  <!--user entered Head Start--><link href="https://fonts.googleapis.com/css?family=Fredoka+One&display=swap" rel="stylesheet"><style>
            body {font-family: 'Fredoka One', cursive;}
            </style><!--End Head user entered-->
                </head>
                <body>
                  <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#e5dcd2;">
                    <div class="webkit">
                      <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#e5dcd2">
                        <tr>
                          <td valign="top" bgcolor="#e5dcd2" width="100%">
                            <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td width="100%">
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td>
                                        <!--[if mso]>
                <center>
                <table><tr><td width="600">
              <![endif]-->
                                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                                  <tr>
                                                    <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                <tr>
                  <td role="module-content">
                    <p></p>
                  </td>
                </tr>
              </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:40px 30px 40px 30px;" bgcolor="#ffffff" data-distribution="1,3">
                <tbody>
                  <tr role="module-content">
                    <td height="100%" valign="top"><table width="135" style="width:135px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
                  <tbody>
                    <tr>
                      <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="94bbc42f-e9c6-4a03-9831-3e71a4e772c1">
                <tbody>
                  <tr>
                    <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="left">
                      <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="135" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/47d451ace9ca46f7/3dc15f01-16db-4826-8173-f27a19c337e9/320x320.png">
                    </td>
                  </tr>
                </tbody>
              </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="a49dad4f-c526-4d45-b4a7-140a0a3988e2" data-mc-module-version="2019-10-22">
                <tbody>
                  <tr>
                    <td style="padding:18px 0px 18px 20px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="font-size: 18px; font-family: arial, helvetica, sans-serif">New bug reported</span></div><div></div></div></td>
                  </tr>
                </tbody>
              </table></td>
                    </tr>
                  </tbody>
                </table><table width="405" style="width:405px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-1">
                  <tbody>
                    <tr>
                      <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="5f5be84e-389b-42e3-a07f-f6c165b9f603">
                <tbody>
                  <tr>
                    <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 10px;" valign="top" align="center">
                      <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="135" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/47d451ace9ca46f7/d960d266-8c66-4c3c-9bfd-04ee5af2ba1e/1200x655.png">
                    </td>
                  </tr>
                </tbody>
              </table></td>
                    </tr>
                  </tbody>
                </table></td>
                  </tr>
                </tbody>
              </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="20d0ef14-8584-4426-aced-22c07cfda4a0">
                <tbody>
                  <tr>
                    <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                      <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
                        <tbody>
                          <tr>
                            <td style="padding:0px 0px 10px 0px;" bgcolor="#008eff"></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="95da0398-7fbb-45e7-b0bd-f157d51435dd" data-mc-module-version="2019-10-22">
                <tbody>
                  <tr>
                    <td style="padding:60px 30px 0px 30px; line-height:36px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 42px; font-family: arial, helvetica, sans-serif; color: #008eff"><strong>We have not so good news</strong></span></div><div></div></div></td>
                  </tr>
                </tbody>
              </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="20d0ef14-8584-4426-aced-22c07cfda4a0.1">
                <tbody>
                  <tr>
                    <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                      <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
                        <tbody>
                          <tr>
                            <td style="padding:0px 0px 10px 0px;" bgcolor="#008EFF"></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="ee9671c1-9e70-43f7-81fc-6cf0401c6820" data-mc-module-version="2019-10-22">
                <tbody>
                  <tr>
                    <td style="padding:18px 30px 0px 30px; line-height:28px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 24px; color: #2b9b34">Here's the reported bug's description from</span></div><div></div></div></td>
                  </tr>
                </tbody>
              </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="ee9671c1-9e70-43f7-81fc-6cf0401c6820.1" data-mc-module-version="2019-10-22">
                <tbody>
                  <tr>
                    <td style="padding:18px 30px 0px 30px; line-height:28px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 24px; color: #2b9b34">${name}</span></div><div></div></div></td>
                  </tr>
                </tbody>
              </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="ee9671c1-9e70-43f7-81fc-6cf0401c6820.1.1" data-mc-module-version="2019-10-22">
                <tbody>
                  <tr>
                    <td style="padding:18px 30px 0px 30px; line-height:28px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 24px; color: #2b9b34">${email}</span></div><div></div></div></td>
                  </tr>
                </tbody>
              </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="0fe97cb0-a52d-459c-976f-0cd25b291923">
                <tbody>
                  <tr>
                    <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                      <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
                        <tbody>
                          <tr>
                            <td style="padding:0px 0px 10px 0px;" bgcolor="#2B9B34"></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="11201feb-c176-4404-985e-2dab06321f41" data-mc-module-version="2019-10-22">
                <tbody>
                  <tr>
                    <td style="padding:25px 40px 25px 40px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-family: &quot;lucida sans unicode&quot;, &quot;lucida grande&quot;, sans-serif">${description}</span></div>
            <div style="font-family: inherit; text-align: center"><br></div>
                  </tr>
                </tbody>
              </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="02f01142-fb90-4a13-8d56-6595f03082fe">
                <tbody>
                  <tr>
                    <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                      <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
                        <tbody>
                          <tr>
                            <td style="padding:0px 0px 10px 0px;" bgcolor="#2B9B34"></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="8dda6fca-4acf-4779-9ddf-d539282ce425">
                <tbody>
                  <tr>
                    <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                    <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="600" alt="" data-proportionally-constrained="true" data-responsive="true" src=${screenshotURL}>
                    </td>
                  </tr>
                </tbody>
              </table></td>
                                                  </tr>
                                                </table>
                                                <!--[if mso]>
                                              </td>
                                            </tr>
                                          </table>
                                        </center>
                                        <![endif]-->
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </center>
                </body>
              </html>`,
        };

        await sgMail.send(msg);
        return NextResponse.json({message:"OK"}, { status: 201 });
    } catch (err) {
        console.error(err);
        return new NextResponse("Internal Error", { status: 500 });    }
}