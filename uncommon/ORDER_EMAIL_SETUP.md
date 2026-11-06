# Owner dashboard and order tracking setup

Checkout stores orders in Cloud Firestore through the `placeOrder` Firebase callable. The checkout email feature has been removed. The owner dashboard at `owner.html` displays orders and lets the verified owner account update payment and shipping statuses. Customer profiles listen for status changes and update live.

## Register the owner account

1. In Firebase Console, select the same Firebase project used by the storefront: `uncommon-84574`. Ensure **Authentication > Sign-in method > Email/Password** is enabled.
2. On the storefront sign-in dialog, choose **Login as owner**, then **Create owner account**.
3. Register with owner username `anson`, a password of at least 8 characters, and matching confirmation. The owner email (`ansonlim04@gmail.com`) is attached securely to the account by the app; it is not entered in the owner form.
4. Open the verification email sent to the owner email address. Then return to the site, choose **Login as owner**, and sign in with `anson` and the password you created.

If the owner account already exists, skip registration and use **Login as owner**. The password itself is never saved in the website source. Owner access is granted only to the fixed, verified owner email, so other customers cannot claim owner access by choosing the same username.

## Configure and deploy

Create a Cloud Firestore database in the same project if it does not exist. Then from the project folder:

```powershell
npm install -g firebase-tools
firebase login
firebase use uncommon-84574
npm --prefix functions install
firebase deploy --only firestore:rules,functions
```

Cloud Functions deployment requires Firebase's Blaze plan. The `placeOrder` function records order details and validates product sizes/prices on the server. Deploy to the exact same Firebase project shown in `auth-config.js` (currently `uncommon-84574`); the website, Authentication, Firestore, and callable function must all use the same project. There are no email secrets or mail provider setup steps.

After deployment, confirm Firebase Console > Functions shows `placeOrder` in `asia-southeast1`. Ensure Firestore Database is created in that same project. If checkout reports an internal error, open Functions > `placeOrder` > Logs and inspect the latest invocation. Check Firestore > `orders` before retrying because an order may already have been written. Successfully saved orders appear on the already-open owner dashboard automatically.

## Use the owner dashboard

After registering and verifying the owner email, choose **Login as owner**, enter `anson` and the password you created, then open the owner order dashboard. You can review each customer's account, products, sizes, amounts, payment method and full shipping address. Update the payment and shipping dropdowns and press **Save updates**. Customers see the new status in **My profile > Your orders**.

QR payments are not automatically verified. An order starts as `awaiting-verification` and `Order received`. Confirm the transfer yourself before setting payment to `paid`. Shipping status choices are `Order received`, `Processing`, `Shipped`, `Delivered`, and `Cancelled`.

The rules only allow the verified `ansonlim04@gmail.com` account to read all orders and change the two status fields. Customers can read only their own order records. If you change the owner email, update it in both `firestore.rules`, `script.js`, and `owner.js`, then redeploy.

If a checkout fails, check Firebase Console > **Functions > Logs** and **Firestore Database > Data > orders** before retrying. An order may already have been saved.
