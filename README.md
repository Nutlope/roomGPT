# [RestorePhotos.io](https://restorephotos.io/)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Nutlope/restorePhotos&env=REPLICATE_API_KEY&project-name=face-photo-restorer&repo-name=restore-photos)

This project will restore old face photos and make them higher quality using AI.

[![Face Photo Restorer](./public/og-image.png)](https://restorephotos.io/)

## How it works

It uses an ML modal from the Applied Research Center called [GFPGAN](https://github.com/TencentARC/GFPGAN) on [Replicate](https://replicate.com/) to restore face photos. The application gives you the ability to upload any photo, which will send it through this ML Model using a Next.js API route, and return your restored photo.

## Running Locally

After cloning the repo, go to [Replicate](https://replicate.com/) to make an account and put your API key in a file called `.env`.

Then, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
npm run dev
```

## One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Nutlope/restorePhotos&env=REPLICATE_API_KEY&project-name=face-photo-restorer&repo-name=restore-photos)

## Future Tasks

- [x] Add download link to high res version of restored image
- [x] Show the restored photo larger on the screen
- [x] Add comparison slider
- [ ] Add rate limiting based on IP Address and throw an error in the app for it
- [ ] Make sure all env variables are updated, especially the upstash ones
- [ ] Add to templates marketplace + share on Twitter
- [ ] Migrate from react-uploader to S3 + filepond to have access to uploaded photos
- [ ] Implement a dynamic share page
  - [ ] Use Vercel OG to dynamically generate an OG card that contains the old and new pics side by side
  - [ ] Create a hash and store it in redis or postgres along with links to the old and new photos
  - [ ] With this new hash, create a new sharable dynamic page that has the photos side by side
- [ ] Add toggle to be able to restore both face photos and other old photos using swinr model
- [ ] [Maybe] Add a testimonial section from Twitter after launching
- [ ] [Maybe] Add a carousel of examples to the index page
- [ ] [Maybe] Migrate to the `/app` directory
