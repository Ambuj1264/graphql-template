const paymentRequestTemplate = function (clientName: any, phoneNumber: any, amount: any) {
    const html = `
      <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>Scheduling App -Meeting</title>
  </head>
  
  <body width="100%" style="margin: 0; padding: 0 !important; background: #fff;">
    <div style="background-color: #DFE7EA;; width: 600px; margin: 50px auto;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td valign="top" align="center">
            <table bgcolor="#ffffff" style="margin: 20px auto;" align="center" id="brick_container" cellspacing="0"
              cellpadding="0" border="0" width="550" class="email-container">
              <tr>
                <td style="width:550px; ">
                  <table align="left" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td width="550">
                        <table cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td>
                              <div style="height:10px;line-height:10px;font-size: 10px; ">&nbsp;</div>
                              <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                  <td style="float: right; padding: 10px 30px;">
                                    <table cellspacing="0" cellpadding="0" border="0">
                                      <tr>
                                        <td><a href="#" target="_blank">
                                            <img src="https://schedullingapp-files.s3.amazonaws.com/email_template_files/logo.png"></a></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                              <div style="height:10px;line-height:10px;font-size: 10px; ">&nbsp;</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="height:10px;line-height:10px;font-size:10px;">&nbsp;</div>
                </td>
              </tr>
              <tr>
                <td width="550">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">

                  <tr>
                  <td><table align="center" cellspacing="0" cellpadding="0" border="0">
                      <tbody><tr>
                        <td><a href="#" target="_blank"><img src="https://schedullingapp-files.s3.amazonaws.com/email_template_files/invoice-logo.png" border="0" style=" display: block; margin: auto;"></a></td>
                      </tr>
                      <tr>
                        <td><div style="height:18px;line-height:18px;font-size:18px;">&nbsp;</div></td>
                      </tr>
                      <tr>
                        <td style=" text-align: center; color: #032D3E; font-family: Poppins; font-size: 24px; font-style: normal; font-weight: 600; line-height: normal;"></td>
                      </tr>
                    </tbody></table></td>
                </tr>
  
                    <tr>
                      <td>
                        <div
                          style="color: #000;  text-align: justify; font-family: Poppins; font-size: 16px;  font-style: normal;  font-weight: 400;  line-height: 24px; padding: 0px 30px;">
                          Hi <strong>
                          ${clientName}
                          </strong>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div style="height:10px;line-height:10px;font-size:10px;">&nbsp;</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div
                          style="color: #000;  text-align: justify; font-family: Poppins; font-size: 16px;  font-style: normal;  font-weight: 400;  line-height: 30px; padding: 0px 30px;">
                          <a href="#" style="color: #000; text-decoration: none; font-weight: 500;">Your current balance
                            is $${amount}</a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div style="height:10px;line-height:10px;font-size:10px;">&nbsp;</div>
                      </td>
                    </tr>
  
                    <tr>
                      <td>
                        <div
                          style="color: #000;  text-align: justify; font-family: Poppins; font-size: 16px;  font-style: normal;  font-weight: 400;  line-height: 30px; padding: 0px 30px;">
                          To make a payment using a credit card or charity card, please use the following link:
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <ul style="list-style: none; width: 100%; display: block; padding: 0;">
                          <li
                            style="text-decoration: none; color: #000;text-align: justify; font-family: Poppins; font-size: 16px;  font-style: normal;  font-weight: 400;  line-height: 30px; padding: 0px 30px;">
                            To pay by Credit card<a style="text-decoration: none; color: #0093fb;"
                              href="https://secure.cardknox.com/ezerlyeshivas"> Click HERE</a></li>
                          <li
                            style="text-decoration: none; color: #000;text-align: justify; font-family: Poppins; font-size: 16px;  font-style: normal;  font-weight: 400;  line-height: 30px; padding: 0px 30px;">
                            To pay by OJC card click<a style="text-decoration: none; color: #0093fb;"
                              href="https://secure.ojccardpaymentsite.org/MQAAADEAAAA2AAAAMAAAADAAAAA="> Click HERE</a>
                          </li>
                          <li
                            style="text-decoration: none; color: #000;text-align: justify; font-family: Poppins; font-size: 16px;  font-style: normal;  font-weight: 400;  line-height: 30px; padding: 0px 30px;">
                            To pay by Pledger card<a style="text-decoration: none; color: #0093fb;"
                              href="https://org.pledgercharitable.org/ChargeCard?ein=453570317B&camp="> Click HERE</a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div style="height:40px;line-height:40px;font-size:40px;">&nbsp;</div>
                      </td>
                    </tr>
  
  
  
                    <tr>
                      <td>
                        <div
                          style="color: #000; text-align: justify;  font-family: Poppins;  font-size: 14px;  font-style: normal;  font-weight: 300; line-height: normal; padding: 0px 30px;">
                          If you would like to use a different payment method, please contact our office at 845.694.6777,
                          Ext. 108.
                          <br>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div style="height:20px;line-height:20px;font-size:20px;">&nbsp;</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div
                          style="color: #000; text-align: justify;  font-family: Poppins;  font-size: 14px;  font-style: normal;  font-weight: 300; line-height: normal; padding: 0px 30px;">
                          If you have any questions or need further assistance, please don't hesitate to contact our
                          Billing
                          department at <a style="text-decoration: none; color: #0093fb;"
                            href="#">yisroelezer@gmail.com</a>, or call 845.694.6777 Ext. 108.
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div style="height:20px;line-height:20px;font-size:20px;">&nbsp;</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div
                          style="color: #000; text-align: justify;  font-family: Poppins;  font-size: 14px;  font-style: normal;  font-weight: 300; line-height: normal; padding: 0px 30px;">
                          Thanks, and regards.
                          <br>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div style="height:40px;line-height:40px;font-size:40px;">&nbsp;</div>
                      </td>
                    </tr>
  
                    <tr>
                      <td>
                      </td>
                    </tr>
  
                    <tr>
                      <td style="text-align: center; background: rgba(1, 69, 88, 0.15); height: 50px;">
                        <div
                          style="color: #014558;  color: #032D3E; font-family: Poppins;  font-size: 14px;  font-style: normal;  font-weight: 500;  line-height: normal; padding: 0px 30px;">
                          Copyright 2023 @ All Rights Reserved
                        </div>
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
  </body>
  
  </html>
  <!--=======================================-->
    `;
  
    return {
      html: html,
    };
  };
  
  export default paymentRequestTemplate;
  