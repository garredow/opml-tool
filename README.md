# OPML Tool

OPML Tool is a simple utility to manage OPML files on your KaiOS device.

## How do I use it?

### File Browser

<img src="screenshots/file_list.png?raw=true" width="240">
<img src="screenshots/file_list2.png?raw=true" width="240">

The first screen you'll see is the file browser. After you give it permission, it scans your device's storage for `opml` files. If you don't already have any `opml` files, you can create one in the "Actions" menu.

### File Info and Feeds

<img src="screenshots/file_detail.png?raw=true" width="240">
<img src="screenshots/file_detail2.png?raw=true" width="240">

Selecting a file will bring you to the file detail screen where you can see a list of your feeds and some extra information about the file. From here, you can do a number of things:

- Add Feed: Open a search view where you can search for podcasts to add.
- Delete Feed: Delete the currently selected feed.
- Revert Changes: Revert the file to how it was when you first opened it.
- Save File: Persist your changes to storage.
- Close File: Close the file without saving and brings you back to the file browser.

### Search

<img src="screenshots/search.png?raw=true" width="240">

Don't want to type in long URLs on your phone's T9 keypad? No problem. You can search Podcast Index and add feeds that way instead.

### Review Feed

<img src="screenshots/review_feed.png?raw=true" width="240">

When viewing an existing feed or a search result, this view brings in extra info from Podcast Index so you can get a better idea of what the feed is about. You can see the author, description, recent episodes, and more.

### Settings

<img src="screenshots/settings.png?raw=true" width="240">

Of course, gotta have some settings to play with. You can choose a theme and accent color.

## How to Install

1. Install dependencies

```
npm install
```

2. Build the app

```
npm run build:dev
```

3. Load the `build` folder as a packaged app using your Web IDE of choice (I like Waterfox Classic)
