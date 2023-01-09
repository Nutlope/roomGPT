# [RestorePhotos.io](https://restorephotos.io/)

This project restores old face photos using AI. Watch the [15 second demo](https://twitter.com/nutlope/status/1612488923716136962).

[![Face Photo Restorer](./public/screenshot.png)](https://restorephotos.io/)

## How it works

It uses an ML model from the Applied Research Center called [GFPGAN](https://github.com/TencentARC/GFPGAN) on [Replicate](https://replicate.com/) to restore face photos. This application gives you the ability to upload any photo, which will send it through this ML Model using a Next.js API route, and return your restored photo.

## Running Locally

After cloning the repo, go to [Replicate](https://replicate.com/) to make an account and put your API key in a file called `.env`. If you'd also like to do rate limiting, create an account on UpStash, create a Redis database, and populate the two environment variables in `.env` as well. If you don't want to do rate limiting, you don't need to make any changes.

Then, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
npm run dev
```

## One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Nutlope/restorePhotos&env=REPLICATE_API_KEY&project-name=face-photo-restorer&repo-name=restore-photos)

## Future Tasks

- [ ] Implement a dynamic share page
  - [ ] Create a hash and store it in redis along with links to the old and new photos
  - [ ] With this new hash, create a new sharable dynamic page that has the photos side by side
  - [ ] Use Vercel OG to dynamically generate an OG card that contains the old and new pics side by side
- [ ] Add toggle to be able to restore both face photos or just old blurry photos using swinr model
- [ ] Improve the generation of the photo to extend beyond faces; maybe run it through a general model before
- [ ] Add a carousel of good examples to the index page
