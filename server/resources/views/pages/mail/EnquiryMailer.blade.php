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
    .email-body {text-align:left; padding:20px; font-family:'Open Sans', sans-serif; line-height:1.6; font-size:16px; color:#262626; max-width:600px; margin:0 auto;}
    .dear-section {padding:20px 0; line-height:1.8; font-size:16px;}
    .contact-section {margin-top:40px; padding:20px; border-radius:8px;}
    .contact-item {margin-bottom:10px; font-size:16px; line-height:1.4;}
    .contact-label {font-weight:bold; color:#303233;}
    @media only screen and (max-width:600px) {
      .email-body {padding:10px;}
      h1 {font-size:24px!important;}
      p {font-size:16px!important;}
    }
  </style>
</head>
<body style="background-color:#F5F5F5; margin:0; padding:0;">
  <table style="margin:auto; max-width:600px; padding:10px;" cellpadding="0" cellspacing="0" style="background-color:#F5F5F5; width:100%;">
    <tr>
      <td align="center">

        <!-- Header (Full Width Background) -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#003a66;">
          <tr>
            <td style="padding:25px 10px 40px 10px; text-align:center;">
              <img src="https://litstructure.vercel.app/images/logo_lit.png" 
                   alt="Litstucture" style="height:60px;width:150px;display:block;margin:0 auto;">
            </td>
          </tr>
        </table>

        <!-- Body (Centered 600px) -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff; margin-top:0;">
          <tr>
            <td>
              <div class="email-body">
                <div class="dear-section">
                  <p>Dear {{ $name['name'] }},</p>
                  <p>Thank you for reaching out to Litstructure. We’re excited to help you build and structure a seamless digital experience</p>
                  <p>We’ve received your request and it has been routed to our technical team for review. You can expect a personalized response within 8 hours, including:</p>
                  <ul>
                  <li>A structured solution tailored to your requirements and objectives</li>
                  <li>Technical recommendations across web development, system design, and IoT integrations where applicable</li>
                  <li>Clear and transparent pricing with a detailed breakdown of deliverables</li>
                  </ul>
                  <!-- Enquiry Details Section -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; border-collapse: collapse; margin-top: 20px;">
                    
                      <!-- Section Title -->
                      <tr>
                        <td colspan="2" style="background-color: #003a66; color: #4A2E19; font-weight: bold; padding: 12px; font-size: 16px; border: 1px solid #003a66;">
                          Your Enquiry Details
                        </td>
                      </tr>
                    
                      <!-- Name Row -->
                      <tr>
                        <td style="width: 30%; padding: 10px; border: 1px solid #003a66; font-weight: bold; color: #4A2E19;">Name</td>
                        <td style="width: 70%; padding: 10px; border: 1px solid #003a66;">{{ $name['name'] }}</td>
                      </tr>
                    
                      <!-- Email Row -->
                      <tr>
                        <td style="width: 30%; padding: 10px; border: 1px solid #003a66; font-weight: bold; color: #4A2E19;">Email</td>
                        <td style="width: 70%; padding: 10px; border: 1px solid #003a66;">{{ $name['email'] }}</td>
                      </tr>
                    
                      <!-- Phone Row -->
                      <tr>
                        <td style="width: 30%; padding: 10px; border: 1px solid #003a66; font-weight: bold; color: #4A2E19;">Phone</td>
                        <td style="width: 70%; padding: 10px; border: 1px solid #003a66;">{{ $name['phone'] }}</td>
                      </tr>
                    
                    
                    
                      <!-- Message Row -->
                      <tr>
                        <td style="width: 30%; padding: 10px; border: 1px solid #003a66; font-weight: bold; color: #4A2E19;">Message</td>
                        <td style="width: 70%; padding: 10px; border: 1px solid #003a66;">{{ $name['message'] }}</td>
                      </tr>
                    
                    </table>
                  <p>If you have any additional details—such as project scope, preferred timelines, team size, or specific areas of interest like IoT solutions, web development, or digital systems—simply reply to this email and we’ll tailor the proposal to match your needs.
                  </p>
                  <p>
                    We look forward to supporting you.
                    </p>
                    <br/>
                    <p>
                        Warm Regards,
                    <br/>
                  <br><span class="contact-label">Phone:</span> +254 780 803490
                  <br><span class="contact-label">Email:</span> info@litstructure.com
                  </p>
                </div>

                  
               
              </div>
            </td>
          </tr>
        </table>

        <!-- Footer (Full Width Background) -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#003a66; margin-top:0;">
          <tr>
            <td style="padding:20px; text-align:center; color:#ffffff; font-family:'Open Sans', sans-serif; font-size:14px;">
              &copy; 20 {{ date('y') }} Litstructure. All rights reserved.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
