# client-side routing vs server routing

Ah — this is a classic “client-side routing vs server routing” issue. It happens because React Router uses client-side routing, but your server (or static hosting) doesn’t know about these routes.

Here’s what’s happening:

1. Localhost

- Vite dev server handles all routes via index.html.
- Going to /login works because Vite knows to serve index.html for any path.

2. Deployed site

- When you refresh mywebsite.com/login, the server tries to find a real /login file.
- Since it doesn’t exist on the server, it returns 404.
- But clicking links inside your app works fine because React Router intercepts them client-side.

Nginx example:

```nginx
location / {
root /var/www/mywebsite;
index index.html;
try_files $uri /index.html;
}
```

### Serve React app for all routes: if the requested file doesn't exist, return index.html

### This allows React Router to handle client-side routing including 404 pages

```command
sudo nano /etc/nginx/sites-available/default
```

```nginx
try_files $uri /index.html;
```

### SPA fallback: let React Router handle all unmatched routes

If you’re redirecting all HTTP(80) → HTTPS(443), then only the HTTPS block needs the try_files rule because users will always end up on HTTPS.
