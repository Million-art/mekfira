const checkTaskCompletion = async (task, telegramId) => {
  const BOT_TOKEN = '7007622708:AAFr6HY2YhQ1izrbQrbqJKjfqV26ZgSItVc';


  try {
    const telegramLink = task.task;

    // Extract the username from Telegram URL (handles both with and without "https://")
    const usernameMatch = telegramLink.match(/(?:https?:\/\/)?t\.me\/([a-zA-Z0-9_]+)/);
    if (!usernameMatch) {
      console.error("Invalid Telegram link format");
      return;
    }

    const chat_id = `@${usernameMatch[1]}`; // Prepends '@' to the extracted username
    console.log("Checking membership for chat:", chat_id, "and user ID:", telegramId);

    const checkChatMember = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getChatMember`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id,
        user_id: telegramId,
      }),
    });

    const response = await checkChatMember.json();
    if (response.ok) {
      timeout = 5000;
      console.log("User is a member of the channel:", response);
    } else {
      console.log("User is not a member or an error occurred:", response.description);
    }
  } catch (error) {
    console.error('Error checking Telegram membership:', error);
  }
}



module.exports = checkTaskCompletion;
