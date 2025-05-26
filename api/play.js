res.setHeader('Content-Type', 'text/html');
res.status(200).send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="Rock Paper Scissors Result" />
      <meta property="og:description" content="You played: ${userChoice}. Computer played: ${computerChoice}. Result: ${result}" />
      <meta property="og:image" content="https://game-theta-eight.vercel.app/preview.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
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
