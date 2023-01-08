# RestorePhotos.io

A site that restores people in old photos, specifically faces.

## Todos v1

- [x] Get initial API route to work
- [x] Figure how to feed API an image from the UI
- [x] Create the UI for uploading an image
- [x] Add header with an image icon, restorephotos.io, then a GitHub icon with the repo at the top right
- [x] Footer with links to Next.js, Vercel, and Replicate
- [x] Improve how hero section looks using Untitled UI / Tailwind UI
- [x] Add a new section from Tailwind/Untitled UI to show some examples

## Todos v2

- [x] Improve the landing page design
- [x] Add a new "generate" page with the file picker
- [x] Make it work for real

## Todos v3

- [x] Implement some kind of loading state
- [x] Add Framer Motion for smooth animations when switching states
- [x] Use Next.js Image Component everywhere
- [x] Improve picture I'm showing
- [x] Add Vercel Analytics
- [x] Troubleshoot Vercel deployment
- [x] Improved footer
- [x] Improve loading pattern for second image, maybe render placeholder and just load it in
- [x] Make sure it's good on mobile – add more space between two photos for example
- [x] Add OG card
- [x] Improve accessibility
- [ ] Write out README
- [ ] Add to templates marketplace + share on Twitter

## Future Tasks

- [ ] Migrate from react-uploader to S3 + filepond to have access to uploaded photos
- [ ] Implement a dynamic share page
  - [ ] Use Vercel OG to dynamically generate an OG card that contains the old and new pics side by side
  - [ ] Create a hash and store it in redis or postgres along with links to the old and new photos
  - [ ] With this new hash, create a new sharable dynamic page that has the photos side by side
- [ ] Add toggle to be able to restore both face photos and other old photos using swinr model
- [ ] [Maybe] Add a testimonial section from Twitter after launching
- [ ] [Maybe] Add a carousel of examples to the index page
- [ ] [Maybe] Migrate to the `/app` directory
