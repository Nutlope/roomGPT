# [RestorePhotos.io](https://restorephotos.io/)

This project will restore old face photos and make them higher quality using AI.

[![Face Photo Restorer](./public/og-image.png)](https://restorephotos.io/)

## How it works

It uses an ML modal from the Applied Research Center called [GFPGAN](https://github.com/TencentARC/GFPGAN) on [Replicate](https://replicate.com/) to restore face photos. The application gives you the ability to upload any photo, which will send it through this ML Model using a Next.js API route, and return your restored photo.

## Running Locally

After cloning the repo, go to [Replicate](https://replicate.com/) to make an account and put your API key in a file called `.env`. If you'd also like to do rate limiting, create an account on UpStash, create a Redis database, and put the two environment variables in `.env` as well. If you don't want to do rate limiting, delete those lines from the `/generate` API route (L14-17, L21-28).

Then, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
npm run dev
```

## One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Nutlope/restorePhotos&env=REPLICATE_API_KEY,UPSTASH_REDIS_REST_URL,UPSTASH_REDIS_REST_TOKEN&project-name=face-photo-restorer&repo-name=restore-photos)

## Current Tasks

- [x] v1 with header, footer, and landing page copy
- [x] write API route to interact with ML Model through replicate
- [x] build a `/restore` page with an upload that does the image restoration
- [x] Add download link to high res version of restored image
- [x] Add a comparison slider to more clearly see before/after
- [x] Add rate limiting based on IP Address and throw an error in the app for it
- [x] Make sure all env variables are updated, especially the upstash ones
- [x] Add a testimonial section from Twitter
- [x] Go over all links
- [x] Make sure it's good on mobile
- [ ] Connect restorePhotos.io to Vercel project
- [ ] Make repo OSS, add to templates marketplace + tweet it out
- [ ] Clean up code a little – The `any` and other things

## Future Tasks

- [ ] Migrate from react-uploader to S3 + filepond to have access to uploaded photos for the dynamic share page
- [ ] Implement a dynamic share page
  - [ ] Use Vercel OG to dynamically generate an OG card that contains the old and new pics side by side
  - [ ] Create a hash and store it in redis or postgres along with links to the old and new photos
  - [ ] With this new hash, create a new sharable dynamic page that has the photos side by side
- [ ] Add toggle to be able to restore both face photos and other old photos using swinr model
- [ ] Improve the generation of the photo to extend beyond faces; maybe run it through a general model before
- [ ] Add a carousel of good examples to the index page
