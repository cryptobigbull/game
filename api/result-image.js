import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge', // Use Edge runtime for better performance
};

export default async function handler(req, res) {
  try {
    const { searchParams } = new URL(req.url, `https://${req.headers.host}`);
    const userChoice = searchParams.get('userChoice') || 'rock';
    const computerChoice = searchParams.get('computerChoice') || 'paper';
    const result = searchParams.get('result') || 'Lose';

    // Generate the image using @vercel/og
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#f0f0f0',
            fontFamily: 'Arial',
            color: '#333',
          }}
        >
          <h1 style={{ fontSize: '60px', margin: '20px' }}>
            Rock Paper Scissors
          </h1>
          <p style={{ fontSize: '50px', margin: '10px' }}>
            You played: {userChoice}
          </p>
          <p style={{ fontSize: '50px', margin: '10px' }}>
            Computer played: {computerChoice}
          </p>
          <p style={{ fontSize: '50px', margin: '10px' }}>
            Result: {result}
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating result image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}
