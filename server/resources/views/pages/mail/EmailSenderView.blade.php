<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>Email Send</title>
  <link href="https://fonts.googleapis.com/css?family=Oswald:300,700&display=swap" rel="stylesheet">
  <style type="text/css">
    body {width:100%;height:100%;margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
    h1, p {margin:0; padding:0;}
    .logo-container {text-align:center; width:100%;}
    .email-body {text-align:left; padding:20px; font-family:'Open Sans', sans-serif; line-height:1.5; font-size:16px; color:#262626;}
    .contact-section {margin-top:40px; background-color:#f9f9f9; padding:20px; border-radius:8px;}
    .contact-item {margin-bottom:10px; font-size:16px; line-height:1.4;}
    .contact-label {font-weight:bold; color:#303233;}
    @media only screen and (max-width:600px) {
      .email-body {padding:10px;}
      h1 {font-size:24px!important;}
      p {font-size:16px!important;}
    }
  </style>
</head>
<body style="background-color:#F5F5F5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F5F5;">
    <tr>
      <td align="center">
        
        <!-- Header -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#003a66;">
          <tr>
            <td style="padding:25px 10px 40px 10px; text-align:center;">
              <div class="logo-container">
                <img src="https://litstructure.vercel.app/images/logo_lit.png" 
                     alt="Litstructure" style="height:60px;width:150px;display:block;margin:0 auto;">
              </div>
            </td>
          </tr>
        </table>

        <!-- Body -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff; margin-top:0; max-width:600px;">
          <tr>
            <td class="email-body">
              <p style="margin-top:20px;">{!! $body!!}</p>
              
              <div class="contact-section">
                <p>For any urgent matters, our team will be glad to assist you:</p>
                <div class="contact-item"><span class="contact-label">Phone:</span>  +254 780 803490</div>
                <div class="contact-item"><span class="contact-label">Email:</span> info@litstructure.com</div>
              </div>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#003a66; margin-top:0;">
          <tr>
            <td style="padding:20px; text-align:center; color:#ffffff; font-family:'Open Sans', sans-serif; font-size:14px;">
              &copy; 20{{ date('y') }} Litstructure. All rights reserved.
            </td>
          </tr>
        </table>
        
      </td>
    </tr>
  </table>
</body>
</html>
