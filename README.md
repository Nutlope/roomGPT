# Todos

- [x] Replace model with controlnet and test it
  - [ ] Need to make sure to let replicate team know to keep it on when I launch
- [ ] Make UI look nicer, maybe dark theme
- [ ] Add dropdown with what kind of room it is
- [ ] Come up with 4 themes and add them to the restore page
- [ ] Add ability to make the links sharable - look at Replicate's projects
- [ ] Redo landing page, remove testimonials and either make it dark mode or use another lp
- [ ] Redo README

# [RestorePhotos.io](https://restorephotos.io/)

This project restores old face photos using AI. Watch the [4 minute explainer video](https://twitter.com/nutlope/status/1614794731396931585) to see how I built this or see the [15 second demo](https://twitter.com/nutlope/status/1612488923716136962).

[![Face Photo Restorer](./public/screenshot.png)](https://restorephotos.io/)

## How it works

It uses an ML model from the Applied Research Center called [GFPGAN](https://github.com/TencentARC/GFPGAN) on [Replicate](https://replicate.com/) to restore face photos. This application gives you the ability to upload any photo, which will send it through this ML Model using a Next.js API route, and return your restored photo.

## Running Locally

### Cloning the repository the local machine.

```bash
git clone
```

### Creating a account on Replicate to get an API key.

1. Go to [Replicate](https://replicate.com/) to make an account.
2. Click on your profile picture in the top right corner, and click on "Dashboard".
3. Click on "Account" in the navbar. And, here you can find your API token, copy it.

### Storing API key in .env file.

Create a file in root directory of project with env. And store your API key in it, as shown in the .example.env file.

If you'd also like to do rate limiting, create an account on UpStash, create a Redis database, and populate the two environment variables in `.env` as well. If you don't want to do rate limiting, you don't need to make any changes.

### Installing the dependencies.

```bash
npm install
```

### Running the application.

Then, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
npm run dev
```

## One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Nutlope/restorePhotos&env=REPLICATE_API_KEY&project-name=face-photo-restorer&repo-name=restore-photos)
