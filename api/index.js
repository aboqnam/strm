const { addonBuilder } = require("stremio-addon-sdk");
const axios = require("axios");
const cheerio = require("cheerio");

const manifest = {
    id: "org.ammar.subsceneaddon",
    version: "1.0.0",
    name: "Subscene Subtitle Addon",
    description: "Stremio addon to fetch subtitles from Subscene.com",
    types: ["movie", "series"],
    resources: ["subtitles"],
    catalogs: [],
    idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

async function getDirectSubtitleLink(subPageUrl) {
    const url = `https://sub-scene.com${subPageUrl}`;
    try {
        const res = await axios.get(url);
        const $ = cheerio.load(res.data);

        const downloadLink = $(".download > a").attr("href");
        if (downloadLink) {
            return `https://sub-scene.com${downloadLink}`;
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
}

builder.defineSubtitlesHandler(async ({ id }) => {
    const searchUrl = `https://sub-scene.com/subtitles/searchbytitle?query=${id}`;
    try {
        const response = await axios.get(searchUrl);
        const $ = cheerio.load(response.data);

        const subs = [];
        const rows = $(".sub-list .sub-row").toArray();

        for (const elem of rows) {
            const language = $(elem).find(".language").text().trim();
            const subPageLink = $(elem).find("a").attr("href");

            if (!subPageLink) continue;

            if (language.toLowerCase().includes("english")) {
                const directLink = await getDirectSubtitleLink(subPageLink);
                if (directLink) {
                    subs.push({
                        id: directLink,
                        lang: "en",
                        name: "Subscene English Subtitle",
                        url: directLink,
                    });
                }
            }
        }
        return { subtitles: subs };
    } catch (e) {
        return { subtitles: [] };
    }
});

const handler = builder.getInterface();

module.exports = async (req, res) => {
    handler(req, res);
};
