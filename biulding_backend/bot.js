// const crypto = require('crypto');
// const { Telegraf, Markup } = require('telegraf');
// const authMiddleware = require('./middleware/authMiddleware');
// const { validate } = require('@telegram-apps/init-data-node');

// const bot = new Telegraf(process.env.BOT_TOKEN);
// const keyboard = Markup.inlineKeyboard([
//   Markup.button.webApp('Launch app', 'https://telegram-web-app-wheat.vercel.app/'),
//   Markup.button.url('Join channel', 'https://t.me/millionsairdrop'),
//   Markup.button.callback('how it works', 'How it works'),
// ]).resize(true);



// Routes 
// app.post('/auth', (req, res) => {
//   try {
//     console.log('Request received at /auth');

//     const authHeader = req.headers['authorization'];
//     console.log('Authorization Header:', authHeader);

//     const botToken = '7007622708:AAFr6HY2YhQ1izrbQrbqJKjfqV26ZgSItVc';

//     // Step 1: Check that the authorization header starts with 'tma'
//     if (!authHeader || !authHeader.startsWith('tma ')) {
//       console.log('Unauthorized: Missing or incorrect authorization header');
//       return res.status(401).send('Unauthorized');
//     }

//     const initDataRaw = authHeader.split(' ')[1];
//     console.log('Init Data Raw:', initDataRaw);

//     const params = new URLSearchParams(initDataRaw);

//     // Step 2: Extract and delete the hash from params
//     const hash = params.get('hash');
//     if (!hash) {
//       console.log('Hash not found in parameters');
//       return res.status(400).send('Hash not found');
//     }
//     params.delete('hash'); // Remove 'hash' key from params

//     // Step 3: Create the sorted array of key-value pairs
//     const sortedPairs = Array.from(params.entries())
//       .map(([key, value]) => `${key}=${value}`)
//       .sort();

//     // Step 4: Join the sorted pairs into a single string
//     const joinedPairs = sortedPairs.join('\n');

//     // Step 5: Create the HMAC-SHA256 using the string "WebAppData" and your bot token
//     const secretKey = crypto.createHmac('sha256', 'WebAppData')
//       .update(botToken)
//       .digest();  // Use binary result, not 'hex'

//     // Step 6: Create the HMAC-SHA256 of the joined pairs using the key generated in step 5
//     const computedHash = crypto.createHmac('sha256', secretKey)
//       .update(joinedPairs)
//       .digest('hex');  // Final digest in hex


//     // Step 7: Compare the computed hash with the hash from the init data
//     if (computedHash === hash) {
//       console.log('Init data is valid');
//       return res.send('Init data is valid');
//     } else {
//       console.log('Invalid init data');
//       return res.status(401).send('Invalid init data');
//     }

//   } catch (error) {
//     console.error('An error occurred:', error);
//     return res.status(500).send('Server error');
//   }
// });


//  app.use('/withdrawal',withdrawalRoutes);


// bot.start(async (ctx) => {
//   try {
//     console.log('New user connected:', ctx.chat);
//     ctx.replyWithHTML(`Welcome to Mella, ${ctx.chat.first_name}`, keyboard);

//     // SQL query including all columns
//     const sql = `INSERT INTO users (telegramId, firstName, lastName, username, balance, referredBy)
//                  VALUES (?, ?, ?, ?, ?, ?)`;

//     // Execute the query with values, setting balance to 0 and referredBy to NULL by default
//     connection.query(sql, [
//       ctx.chat.id,              // telegramId
//       ctx.chat.first_name,      // firstName
//       ctx.chat.last_name || null, // lastName (use NULL if not available)
//       ctx.chat.username || null, // username (use NULL if not available)
//       0,                        // balance set to 0
//       null                      // referredBy set to NULL
//     ]);
//   } catch (err) {
//     console.error('Error inserting user into the database:', err);
//     ctx.reply(`Sorry, there was an error registering you please send /restart again.`);
//   }
// });


// bot.action('launch_app', (ctx) => {
//   ctx.reply('Launching the app...');
// });

// bot.action('How it works', (ctx) => {
//   ctx.reply('it wokrs like magic🤣');
// });

// bot.action('join_channel', (ctx) => {
//   ctx.reply('Joining the channel...');
// });

// bot.launch().then(() => {
//   console.log('Bot started');
// }).catch((err) => {
//   console.error('Error starting bot:', err);
// });


