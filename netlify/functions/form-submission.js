// Netlify Function to send email notifications when form is submitted
export async function handler(event) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { payload } = JSON.parse(event.body);
    
    // Extract form data
    const formData = payload.data;
    const name = formData.name;
    const email = formData.email;
    const message = formData.message;

    // Email content
    const emailContent = `
New Contact Form Submission from Seven30.com

Name: ${name}
Email: ${email}

Message:
${message}

---
Submitted at: ${new Date().toLocaleString()}
    `;

    // For now, just log it (we'll add SendGrid integration next)
    console.log('Form submission received:', emailContent);

    // TODO: Add SendGrid or other email service here
    // For now, the form data is stored in Netlify's Forms dashboard

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submission received' }),
    };
  } catch (error) {
    console.error('Error processing form:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
