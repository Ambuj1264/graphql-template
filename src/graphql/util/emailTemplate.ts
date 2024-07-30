import { ChangePasswordTemplateOptions } from "../../types/auth";
export function changePasswordTemplate(opts: ChangePasswordTemplateOptions) {
  const {
    firstName,
    tempPassword,
  } = opts;

  return `
    <!doctype html>
    <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      <style>
        .main-content {
            width: 100%;
            height: 100%;
            margin: 15px;
        }
      </style>
    </head>
    <body style="font-family: 'Trebuchet MS', sans-serif; font-size: 12px !important;">
      <img style="margin: 15px;" src="https://schedullingapp-files.s3.amazonaws.com/email_template_files/logo.png"></img>
      <div class="main-content">
        <h4 style="color: #1DC6C9; text-transform: uppercase;">HI ${firstName} ,</h4>
        <p>We have received your request to reset your password. Please use the temporary password listed below to login to your account.</p>
        <p>PASSWORD: ${tempPassword}</p>
        <br>
        <h4 style="color: #1DC6C9;">ANY QUESTIONS? EMAIL US: <a style="color: #F2D31B; font-weight: normal;" href="mailto: vishal.m@devtrust.biz">vishal.m@devtrust.biz</a></h4>
        <br>
      </div>
    </body>
    </html>
  `;
}

const resetPasswordEmail = function (
  urlLink: string,
) {
  const supportEmail = "sterneizer@gmail.com";
  const html = `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>Scheduling App - Reset</title>
</head>
<body width="100%" style="margin: 0; padding: 0 !important; background: #fff;">
<div style="background-color: #DFE7EA;; width: 600px; margin: 50px auto;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td valign="top" align="center"><table bgcolor="#ffffff" style="margin: 20px auto;" align="center" id="brick_container" cellspacing="0" cellpadding="0" border="0" width="550" class="email-container">
          <tr>
            <td style="width:550px; "><table align="left" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="550"><table cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td><div style="height:10px;line-height:10px;font-size: 10px; ">&nbsp;</div>
                          <table width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="float: right; padding: 10px 30px;"><table cellspacing="0" cellpadding="0" border="0">
                                  <tr>
                                    <td ><a href="${urlLink}" target="_blank">
                                    <img src="https://schedullingapp-files.s3.amazonaws.com/email_template_files/logo.png"></a></td>
                                  </tr>
                                </table></td>
                            </tr>
                          </table>
                          <div style="height:10px;line-height:10px;font-size: 10px; ">&nbsp;</div></td>
                      </tr>
                    </table></td>
                </tr>
              </table></td>
          </tr>
          <tr>
            <td width="550"><table width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td><table align="center" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td><a href="${urlLink}" target="_blank"><img src="https://schedullingapp-files.s3.amazonaws.com/email_template_files/reset.png" border="0" style=" display: block; margin: auto;"></a></td>
                      </tr>
                      <tr>
                        <td><div style="height:18px;line-height:18px;font-size:18px;">&nbsp;</div></td>
                      </tr>

                      <tr>
                        <td style=" text-align: center; color: #032D3E; font-family: Poppins; font-size: 24px; font-style: normal; font-weight: 600; line-height: normal;">Reset Password</td>
                      </tr>

                    </table></td>
                </tr>
              </table></td>
          </tr>
          <tr>
            <td><div style="height:10px;line-height:10px;font-size:10px;">&nbsp;</div></td>
          </tr>
          <tr>
            <td width="550" ><table width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td><div style="color: #000;  text-align: justify; font-family: Poppins; font-size: 16px;  font-style: normal;  font-weight: 400;  line-height: 24px; padding: 0px 30px;">We received a request to reset the password for your account. To proceed with the password reset, please click the button below:
                    </div></td>
                </tr>
				 <tr>
            <td><div style="height:20px;line-height:20px;font-size:20px;">&nbsp;</div></td>
          </tr>
          <tr>
            <td align="center"><a href="${urlLink}" target="”_blank”" style="width: 250px; height: 50px; border-radius: 30px;  border: 1px solid #014558; background: #014558; color: #FFF;text-align: center; font-family: Poppins; font-size: 14px; font-style: normal; font-weight: 500; padding: 10px 40px; text-decoration: none;">Reset Password</a></td>
          </tr>
				 <tr>
            <td><div style="height:40px;line-height:40px;font-size:40px;">&nbsp;</div></td>
          </tr>

        
				
				 <tr>
                  <td><div style="color: #000; text-align: justify;  font-family: Poppins;  font-size: 14px;  font-style: normal;  font-weight: 300; line-height: normal; padding: 0px 30px;">If you did not request this password reset, you can ignore this email. Your account will remain secure.<br>
                    </div></td>
                </tr>
                <tr>
                  <td><div style="height:40px;line-height:40px;font-size:40px;">&nbsp;</div></td>
                </tr>

                <tr>
                  <td><div style="width: 500px; margin: auto; height: 2px; background: #014558;">&nbsp;</div></td>
                </tr>

                <tr>
                  <td><div style="height:20px;line-height:20px;font-size:20px;">&nbsp;</div></td>
                </tr>

                <tr>
                  <td><div style="color: #014558;  text-align: justify;  font-family: Poppins;  font-size: 14px;  font-style: normal;  font-weight: 300;  line-height: normal; padding: 0px 30px;">Please note that the link will expire in 30 minutes, so make sure to use it as soon as possible. If you have any questions or need further assistance, please don't hesitate to contact our support team at  <a href="mailto:${supportEmail}">${supportEmail} </a>.
                    </div></td>
                </tr>

                <tr>
                  <td><div style="height:50px;line-height:50px;font-size:50px;">&nbsp;</div></td>
                </tr>

                <tr>
                  <td style="text-align: center; background: rgba(1, 69, 88, 0.15); height: 50px;"><div style="color: #014558;  color: #032D3E; font-family: Poppins;  font-size: 14px;  font-style: normal;  font-weight: 500;  line-height: normal; padding: 0px 30px;">Copyright 2023 @ All Rights Reserved
                    </div></td>
                </tr>
				
              </table></td>
          </tr>
		  
		  
		
        </table></td>
    </tr>
  </table>
</div>
</body>
</html>
<!--=======================================-->`;

  return {
    html: html,
  };
};

export default resetPasswordEmail;
