export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  // Determine user choice: from Frame (buttonIndex) or standalone app (userChoice)
  let userChoice;
  if (req.body.untrustedData && req.body.untrustedData.buttonIndex) {
    // Farcaster Frame request
    const buttonIndex = req.body.untrustedData.buttonIndex; // 1=Rock, 2=Paper, 3=Scissors
    const choices = ['rock', 'paper', 'scissors'];
    userChoice = choices[buttonIndex - 1]; // 1 -> rock, 2 -> paper, 3 -> scissors
  } else {
    // Standalone app request
    userChoice = req.body.userChoice;
  }

  // Validate userChoice
  const choices = ['rock', 'paper', 'scissors'];
  if (!choices.includes(userChoice)) {
    res.status(400).json({ error: 'Invalid choice' });
    return;
  }

  // Compute game result
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  let result = '';
  if (userChoice === computerChoice) result = "It's a tie! 🤝";
  else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) result = "You win! 🎉";
  else result = "You lose! 😞";

  // Check if this is a Frame request (Warpcast) or standalone app request
  if (req.body.untrustedData && req.body.untrustedData.buttonIndex) {
    // Return HTML for Farcaster Frame
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
      <html>
        <head>
          <meta property="og:title" content="Rock Paper Scissors Result" />
          <meta property="og:image" content="https://game-theta-eight.vercel.app/preview.png" />
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://game-theta-eight.vercel.app/preview.png" />
          <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
          <meta property="fc:frame:button:1" content="Play Again 🔄" />
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
    // Return JSON for standalone app
    res.status(200).json({ computerChoice, result });
  }
}
