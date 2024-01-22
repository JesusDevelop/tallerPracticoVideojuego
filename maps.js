const emojis = {
    "-": " ",
    O: "🚪",
    X: "💣",
    I: "🚽",
    PLAYER: "💩",
    BOMB_COLLISION: "🔥",
    GAME_OVER: "👎",
    WIN: "🏆",
    HEART: "❤️",
  };
  const maps = [];
  maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
  `);
  maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
  maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `);
  maps.push(`
  XXXXXX-IXX
  X---XX-XXX
  X-X---X-XX
  X-XXX-X--X
  XIX---XX-X
  XXX-XXXX-X
  XXX------X
  XXX-XXXXXX
  XXX----OXX
  XXXXXXXXXX
`);