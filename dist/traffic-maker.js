"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playYuHsuanCodeVideo = void 0;
const events_1 = require("events");
const playwright_1 = require("playwright");
const log4js_1 = __importDefault(require("log4js"));
const constant_1 = require("./constant");
const logger = log4js_1.default.getLogger("Traffic-Maker");
const playYuHsuanCodeVideo = async (videos) => {
    try {
        const browser = await playwright_1.chromium.launch({
            headless: false
        });
        const context = await browser.newContext();
        const emitter = new events_1.EventEmitter();
        // Emit
        // emitter.emit('foo', foo);
        // emitter.emit('bar', bar);
        // // Listen
        // emitter.on('foo', foo => console.log(foo));
        // // emitter.on('bar', bar => console.log(bar));
        emitter.on("close-page", page => {
            page.close();
        });
        videos.map(async (video) => {
            const link = `${constant_1.youtubeBaseLink}/${video.url}`;
            logger.info(`Start to play ${video.name}`);
            const page = await context.newPage();
            await page.goto(link, { "waitUntil": "networkidle" });
            await page.evaluate(async () => {
                // 0. Get the video instance
                let videoPlayer = document.getElementsByTagName("video")[0];
                // 1. Click play button
                await videoPlayer.play();
                // 2. Cancel voice
                videoPlayer.volume = 0;
                // 3. Turning playing speed to 2x
                videoPlayer.playbackRate = 2;
                // 4. Close the page if video is finished
                videoPlayer.addEventListener('ended', async (event) => {
                    console.log("Video is finished !!!");
                    emitter.emit("close-page", page);
                    // await page.close();
                });
                // 5. Check is the video stop (loop)
                // [Deprecated ?]
                // let checkPlayingLoop = setInterval(function(){
                //     if(videoPlayer.paused) videoPlayer.play()
                // },5000);
                // 6. Check that could we skip the ads. (loop)
                let checkAdsLoop = setInterval(function () {
                    let adsBtn = document.getElementsByClassName("ytp-ad-skip-button")[0];
                    if (adsBtn) {
                        adsBtn.click();
                        console.log("Skip Ads !!!");
                    }
                }, 5000);
            });
        });
        // browser.close();
    }
    catch (err) {
        logger.error(err);
    }
};
exports.playYuHsuanCodeVideo = playYuHsuanCodeVideo;
