# Account signup and automatic email setup

The storefront uses Firebase Authentication. When a shopper creates an account, Firebase creates the account and sends an email verification message. The shopper can sign in from the site after registering.

The **My profile** button shows the signed-in shopper's name, email, and saved bag. Each account's bag is stored separately in that browser and restored after sign-in. It does not sync between devices; that would require adding a cloud database such as Cloud Firestore.

## Connect the website

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Add a **Web app** to the project and copy its Firebase config into `auth-config.js` (`apiKey`, `authDomain`, `projectId`, and `appId`). These web config values are public; never add a service account key to the website.
3. Open **Security → Authentication**. Click **Get started** if shown, then open **Sign-in method** and enable **Email/Password**.
4. In **Authentication → Settings → Authorized domains**, add the website's deployed domain. For local development, add `localhost` if needed.
5. In **Authentication → Templates**, edit the email verification template. Set the sender name to `uncommon` and the subject to `Thanks for joining uncommon — verify your email`.

The existing verification email contains the action link needed to verify the account. Firebase's built-in templates have limited customization. A separate fully branded welcome email in addition to verification requires a trusted backend and an email provider.

Firebase's web SDK can be loaded from Google's CDN for this static site. The current version and imports are in `script.js`.

## Owner dashboard and order tracking

Checkout saves orders to Cloud Firestore. The owner signs in through the storefront's **Login as owner** option and manages orders at `owner.html`. See [ORDER_EMAIL_SETUP.md](ORDER_EMAIL_SETUP.md) for the owner account, secure rules, and deployment steps. No checkout email is sent. Customer profiles display owner-updated payment and shipping statuses live.
