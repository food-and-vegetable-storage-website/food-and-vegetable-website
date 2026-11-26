# Chillora

## Run on your laptop
1. Extract this ZIP.
2. Open the folder in Visual Studio Code.
3. For the simplest preview, open `index.html` in Chrome or Edge. Food items are saved in that browser's local storage.
4. For service-worker/offline support, serve the folder over localhost. In VS Code, install the Live Server extension, right-click `index.html`, and choose **Open with Live Server**.

## Included
- Magenta/cyan responsive dashboard.
- Food inventory, quantity, storage place and notes.
- Automatic 2/3/4/5/7-day reminders and manual reminder dates.
- Vegetable shelf-life reference for tomatoes, potatoes, onions, spinach, carrots, cucumbers, broccoli, cauliflower, capsicum, peas, beans, eggplant, cabbage, lettuce, mushrooms, garlic, zucchini and pumpkin.
- Temperature guidance uses Celsius (°C).
- Browser notification permission and service-worker push-message handler.

## Important notification limits
The built-in reminder checker runs while the page is open. Browser notifications can appear while the tab is open if permission is granted. The service worker enables offline caching and can display push messages, but it does **not** schedule future reminders by itself.

To deliver notifications when the site/tab is closed, you need:
1. HTTPS hosting.
2. A push subscription from each device/browser.
3. A server-side scheduler (for example, Firebase Cloud Functions + Cloud Scheduler) that checks due reminders.
4. A push service such as Firebase Cloud Messaging or Web Push, with credentials kept on the server.
5. User permission and a supported browser/device with internet access.

A phone that is fully powered off cannot receive notifications while it is off. If the phone is powered on but locked or the browser is closed, push notifications may work after the backend is configured, depending on OS/browser settings and battery restrictions.

## Shelf-life safety note
The figures are approximate quality ranges, not guarantees. Actual safety depends on freshness, handling, preparation, packaging and temperature. Keep refrigerators at 4 °C or colder. Raw whole potatoes are generally best kept in a cool, dark, dry, ventilated place rather than refrigerated. When in doubt, discard food that shows spoilage; never taste-test questionable food.

## Online database and future integrations
This starter currently stores items locally in the browser. It does not yet sync between devices. To add cloud sync, connect a Firebase project (Authentication + Firestore) and replace localStorage operations in `app.js` with authenticated Firestore reads/writes. Any future smart-assistant integration should call its service through a secure backend function; never place a private API key in browser JavaScript.
