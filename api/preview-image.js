import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req, res) {
  try {
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
            Choose your move!
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating preview image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}
