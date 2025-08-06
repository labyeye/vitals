const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  // For development, you can use Gmail or any SMTP service
  // For production, use services like SendGrid, AWS SES, etc.
  
  if (process.env.NODE_ENV === 'production') {
    // Production email service configuration
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } else {
    // Development - use Gmail for testing
    // Make sure to set EMAIL_USER and EMAIL_PASS in .env file
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    } else {
      // Fallback to console transport if no email credentials
      console.log('⚠️ No email credentials found, using console transport');
      return nodemailer.createTransport({
        streamTransport: true,
        newline: 'unix',
        buffer: true
      });
    }
  }
};

// Send email verification
const sendVerificationEmail = async (email, firstName, verificationToken) => {
  try {
    const transporter = createTransporter();
    
    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${verificationToken}`;
    
    const mailOptions = {
      from: `"Evolv Team" <${process.env.EMAIL_FROM || 'noreply@evolv.com'}>`,
      to: email,
      subject: 'Verify Your Email Address - Evolv',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #2B463C, #688F4E);
              color: white;
              text-align: center;
              padding: 30px;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              background: linear-gradient(135deg, #688F4E, #2B463C);
              color: white;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 25px;
              font-weight: bold;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Welcome to Evolv!</h1>
            <p>Thanks for joining our protein-powered community</p>
          </div>
          
          <div class="content">
            <h2>Hi ${firstName}!</h2>
            
            <p>Welcome to Evolv! We're excited to have you as part of our community.</p>
            
            <p>To complete your registration and start your fitness journey with us, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </div>
            
            <p>This verification link will expire in 24 hours for security reasons.</p>
            
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #688F4E;">${verificationUrl}</p>
            
            <p>If you didn't create an account with Evolv, you can safely ignore this email.</p>
            
            <p>Best regards,<br>The Evolv Team</p>
          </div>
          
          <div class="footer">
            <p>&copy; 2025 Evolv. All rights reserved.</p>
            <p>This is an automated email, please do not reply.</p>
          </div>
        </body>
        </html>
      `,
      text: `
        Hi ${firstName}!
        
        Welcome to Evolv! We're excited to have you as part of our community.
        
        To complete your registration, please verify your email address by visiting this link:
        ${verificationUrl}
        
        This verification link will expire in 24 hours for security reasons.
        
        If you didn't create an account with Evolv, you can safely ignore this email.
        
        Best regards,
        The Evolv Team
      `
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Verification email sent:', info.messageId);
    
    // For development, log the email content
    if (process.env.NODE_ENV !== 'production') {
      console.log('=== DEVELOPMENT EMAIL LOG ===');
      console.log('To:', email);
      console.log('Subject:', mailOptions.subject);
      console.log('Verification URL:', verificationUrl);
      console.log('Email content logged instead of sent');
      console.log('=== END EMAIL LOG ===');
    }
    
    return {
      success: true,
      messageId: info.messageId || 'dev-message-id',
      previewUrl: null
    };
    
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send verification email');
  }
};

// Send welcome email after verification
const sendWelcomeEmail = async (email, firstName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Evolv Team" <${process.env.EMAIL_FROM || 'noreply@evolv.com'}>`,
      to: email,
      subject: '🎉 Welcome to Evolv - Your Journey Begins Now!',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Evolv</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #2B463C, #688F4E);
              color: white;
              text-align: center;
              padding: 30px;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              background: linear-gradient(135deg, #688F4E, #2B463C);
              color: white;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 25px;
              font-weight: bold;
              margin: 20px 0;
            }
            .feature {
              background: white;
              padding: 20px;
              margin: 15px 0;
              border-radius: 8px;
              border-left: 4px solid #688F4E;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎉 Welcome to Evolv!</h1>
            <p>Your email has been verified successfully</p>
          </div>
          
          <div class="content">
            <h2>Hi ${firstName}!</h2>
            
            <p>Congratulations! Your email has been verified and your Evolv account is now active.</p>
            
            <div class="feature">
              <h3>🏋️ Premium Protein Products</h3>
              <p>Explore our range of high-quality protein shakes and supplements.</p>
            </div>
            
            <div class="feature">
              <h3>⚡ Evolv Points Rewards</h3>
              <p>Earn points with every purchase and redeem them for discounts on future orders.</p>
            </div>
            
            <div class="feature">
              <h3>🎯 Tier-Based Benefits</h3>
              <p>Unlock Bronze, Silver, and Gold tiers for exclusive benefits and higher reward rates.</p>
            </div>
            
            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" class="button">Start Shopping</a>
            </div>
            
            <p>Ready to power up your fitness journey? Browse our products and make your first order!</p>
            
            <p>Best regards,<br>The Evolv Team</p>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId
    };
    
  } catch (error) {
    console.error('Welcome email sending error:', error);
    // Don't throw error for welcome email as it's not critical
    return { success: false, error: error.message };
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, firstName, resetToken) => {
  try {
    const transporter = createTransporter();
    
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: `"Evolv Team" <${process.env.EMAIL_FROM || 'noreply@evolv.com'}>`,
      to: email,
      subject: 'Reset Your Password - Evolv',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8fffe;
            }
            .container {
              background: white;
              padding: 40px;
              border-radius: 12px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 32px;
              font-weight: bold;
              color: #688F4E;
              margin-bottom: 10px;
            }
            .button {
              display: inline-block;
              background: linear-gradient(135deg, #688F4E 0%, #B1D182 100%);
              color: white;
              padding: 14px 28px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              margin: 20px 0;
              transition: transform 0.2s ease;
            }
            .button:hover {
              transform: translateY(-2px);
            }
            .warning {
              background-color: #fef3cd;
              border: 1px solid #fecf6b;
              border-radius: 8px;
              padding: 16px;
              margin: 20px 0;
              color: #856404;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              text-align: center;
              color: #666;
              font-size: 14px;
            }
            .link-info {
              background-color: #e3f2fd;
              border: 1px solid #90caf9;
              border-radius: 8px;
              padding: 16px;
              margin: 20px 0;
              color: #1565c0;
              word-break: break-all;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Evolv</div>
              <h1 style="color: #2B463C; margin-bottom: 10px;">Reset Your Password</h1>
            </div>
            
            <p>Hi ${firstName},</p>
            
            <p>We received a request to reset your password for your Evolv account. If you made this request, click the button below to reset your password:</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            
            <div class="warning">
              <strong>⚠️ Important:</strong> This password reset link will expire in 1 hour for security reasons.
            </div>
            
            <div class="link-info">
              <strong>Can't click the button?</strong> Copy and paste this link into your browser:<br>
              ${resetUrl}
            </div>
            
            <p><strong>If you didn't request this password reset:</strong></p>
            <ul>
              <li>You can safely ignore this email</li>
              <li>Your password will remain unchanged</li>
              <li>Consider updating your account password if you're concerned about security</li>
            </ul>
            
            <p>For your security, never share this reset link with anyone. Our team will never ask for your password or reset link via email or phone.</p>
            
            <p>Best regards,<br>The Evolv Security Team</p>
            
            <div class="footer">
              <p>This email was sent from an automated system. Please do not reply to this email.</p>
              <p>© ${new Date().getFullYear()} Evolv. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId
    };
    
  } catch (error) {
    console.error('Password reset email sending error:', error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail
};
