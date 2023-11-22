# functions

## setup

### Discord API Key

1. Register App on Discord Developer Portal

2. Deploy to your Firebase Project
   ```sh
   $ firebase functions:config:set \
      discord.channel_id='1234567890' \
      discord.token='********.***.********'
   ```
3. Set `API Key` and `API Secret Key` into `.runtimeconfig.json`
   ```sh
   $ firebase functions:config:get > .runtimeconfig.json
   ```
