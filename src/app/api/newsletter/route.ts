import { NextRequest, NextResponse } from 'next/server';

interface NewsletterRequest {
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: NewsletterRequest = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // TODO: Integrate with Contentful or email service
    // For now, we'll log the email and simulate a successful response
    console.log('Newsletter signup:', {
      email,
      timestamp: new Date().toISOString(),
      source: 'website'
    });

    // In a real implementation, you would:
    // 1. Store in a database
    // 2. Send to email marketing service (Mailchimp, ConvertKit, etc.)
    // 3. Send confirmation email to subscriber
    // 4. Log analytics event

    // Example Contentful integration (when ready):
    // const contentfulResponse = await fetch(`${process.env.CONTENTFUL_SPACE_URL}/entries`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     fields: {
    //       email: { 'en-US': email },
    //       subscribedAt: { 'en-US': new Date().toISOString() },
    //       status: { 'en-US': 'active' }
    //     }
    //   }),
    // });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    // Success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to newsletter!',
        email: email
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter signup error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// Optional: Add GET handler for health check
export async function GET() {
  return NextResponse.json(
    { 
      status: 'Newsletter API is running',
      timestamp: new Date().toISOString()
    },
    { status: 200 }
  );
}