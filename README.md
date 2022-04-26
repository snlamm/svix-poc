Steps to get this POC running:

First, get the svix-server running:
1. clone https://github.com/svix/svix-webhooks
2. cd into `./server` and run `docker-compose up` (note: if the wait_for script fails in the Dockerfile, replace it with `sleep 10`)
3. install [rust](https://www.rust-lang.org/tools/install)
4. cd into the `server/svix-server` directory and run `cargo run jwt generate`.
  This will generate a jwt token that can be used to interact with the svix-server.

(See the [docs](https://github.com/svix/svix-webhooks) for how to change environment variables - such as the jwt secret, whitelabel_headers, etc.)

Second, set up this svix-poc repository
1. In services/svix/router.ts, set the jwt token you just generated
2. run yarn && yarn dev
3. create an app using `POST localhost:3000/svix/app`, setting a `name` in the json body
4. copy the created app ID and set it to the appId variable in services/svix/router.ts
5. create an eventType using `POST localhost:3000/svix/event`
6. Install [ngrok](https://ngrok.com/download) and run `ngrok http 3000` to generate an http endpoint that webhook messages can be sent to.
7. Register an app endpoint using `POST localhost:3000/svix/endpoint`, setting the `url` in the json body to '<NGROK_ENDPOINT>/svix/process'
    - copy the secret sent back in the response
8. produce a message using `POST localhost:3000/svix/message`. The contents of the message should log in the terminal.
   - you can use the endpoint secret you copied to verify the message (see the [docs](https://docs.svix.com/receiving/verifying-payloads/how))

