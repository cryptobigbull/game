export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Content-Type', 'text/html');
    res.status(405).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="og:title" content="Method Not Allowed" />
          <meta property="og:image" content="https://game-theta-eight.vercel.app/preview.png" />
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://game-theta-eight.vercel.app/preview.png" />
          <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
          <meta property="fc:frame:button:1" content="Try Again" />
          <meta property="fc:frame:post_url" content="https://game-theta-eight.vercel.app/api/play" />
        </head>
        <body>
          <p>Method Not Allowed. Please try again.</p>
        </body>
      </html>
    `);
    return;
  }

  try {
    let userChoice;
    if (req.body.untrustedData && req.body.untrustedData.buttonIndex) {
      const buttonIndex = req.body.untrustedData.buttonIndex;
      const choices = ['rock', 'paper', 'scissors'];
      userChoice = choices[buttonIndex - 1];
    } else {
      userChoice = req.body.userChoice;
    }

    const choices = ['rock', 'paper', 'scissors'];
    if (!choices.includes(userChoice)) {
      res.setHeader('Content-Type', 'text/html');
      res.status(400).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta property="og:title" content="Invalid Choice" />
            <meta property="og:image" content="https://game-theta-eight.vercel.app/preview.png" />
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="https://game-theta-eight.vercel.app/preview.png" />
            <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
            <meta property="fc:frame:button:1" content="Try Again" />
            <meta property="fc:frame:post_url" content="https://game-theta-eight.vercel.app/api/play" />
          </head>
          <body>
            <p>Invalid choice. Please try again.</p>
          </body>
        </html>
      `);
      return;
    }

    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = '';
    if (userChoice === computerChoice) result = "Tie";
    else if (
      (userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'paper' && computerChoice === 'rock') ||
      (userChoice === 'scissors' && computerChoice === 'paper')
    ) result = "Win";
    else result = "Lose";

    if (req.body.untrustedData && req.body.untrustedData.buttonIndex) {
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta property="og:title" content="Rock Paper Scissors Result" />
            <meta property="og:image" content="https://game-theta-eight.vercel.app/preview.png" />
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="https://game-theta-eight.vercel.app/preview.png" />
            <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
            <meta property="fc:frame:button:1" content="Play Again" />
            <meta property="fc:frame:post_url" content="https://game-theta-eight.vercel.app/api/play" />
          </head>
          <body>
            <p>You played: ${userChoice}</p>
            <p>Computer played: ${computerChoice}</p>
            <p>Result: ${result}</p>
          </body>
        </html>
      `);
    } else {
      res.status(200).json({ computerChoice, result });
    }
  } catch (error) {
    console.error('Error in /api/play:', error);
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="og:title" content="Rock Paper Scissors Error" />
          <meta property="og:image" content="https://game-theta-eight.vercel.app/preview.png" />
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://game-theta-eight.vercel.app/preview.png" />
          <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
          <meta property="fc:frame:button:1" content="Try Again" />
          <meta property="fc:frame:post_url" content="https://game-theta-eight.vercel.app/api/play" />
        </head>
        <body>
          <p>An error occurred. Please try again.</p>
        </body>
      </html>
    `);
  }
}
